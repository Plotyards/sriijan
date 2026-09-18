/**
 * WebRTC Live Sync Engine
 * Real-time peer-to-peer live state synchronization across browser tabs and devices
 * utilizing WebRTC DataChannels with graceful fallback to BroadcastChannel.
 */

const RTC_CONFIG = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

class WebRTCLiveSyncService {
  constructor() {
    this.clientId = 'client_' + Math.random().toString(36).substring(2, 9);
    this.listeners = new Set();
    this.statusListeners = new Set();
    this.peers = new Map(); // peerId -> { pc, dc }
    this.isConnected = false;
    this.transport = 'initializing';
    this.channelName = 'sriizan_webrtc_sync';

    // BroadcastChannel for signaling & instant local fallback
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.signalingChannel = new BroadcastChannel(this.channelName + '_signal');
      this.localBroadcastChannel = new BroadcastChannel(this.channelName + '_data');
      this.setupSignaling();
      this.setupLocalFallback();
    }

    // Initialize WebRTC signaling discovery
    this.initWebRTC();
  }

  setupSignaling() {
    if (!this.signalingChannel) return;

    this.signalingChannel.onmessage = async (event) => {
      const { senderId, targetId, type, data } = event.data || {};
      if (!senderId || senderId === this.clientId) return;

      try {
        if (type === 'discovery-ping') {
          // A new peer has arrived, initiate WebRTC offer
          this.initiatePeerConnection(senderId, true);
        } else if (targetId === this.clientId) {
          if (type === 'offer') {
            await this.handleOffer(senderId, data);
          } else if (type === 'answer') {
            await this.handleAnswer(senderId, data);
          } else if (type === 'ice-candidate') {
            await this.handleCandidate(senderId, data);
          }
        }
      } catch (err) {
        console.debug('[WebRTC Sync] Signaling message error:', err);
      }
    };

    // Broadcast our presence to discover other active peers
    this.signalingChannel.postMessage({
      senderId: this.clientId,
      type: 'discovery-ping'
    });
  }

  setupLocalFallback() {
    if (!this.localBroadcastChannel) return;

    this.localBroadcastChannel.onmessage = (event) => {
      const message = event.data;
      if (message && message.senderId !== this.clientId) {
        this.notifyListeners(message);
      }
    };
  }

  initWebRTC() {
    if (typeof window === 'undefined' || !window.RTCPeerConnection) {
      this.transport = 'broadcast-channel';
      this.isConnected = true;
      this.notifyStatus();
      return;
    }

    this.transport = 'webrtc-ready';
    this.isConnected = true;
    this.notifyStatus();
  }

  createPeerConnection(remotePeerId) {
    if (this.peers.has(remotePeerId)) {
      return this.peers.get(remotePeerId).pc;
    }

    const pc = new RTCPeerConnection(RTC_CONFIG);

    pc.onicecandidate = (event) => {
      if (event.candidate && this.signalingChannel) {
        this.signalingChannel.postMessage({
          senderId: this.clientId,
          targetId: remotePeerId,
          type: 'ice-candidate',
          data: event.candidate
        });
      }
    };

    pc.ondatachannel = (event) => {
      const dc = event.channel;
      this.setupDataChannel(dc, remotePeerId);
    };

    this.peers.set(remotePeerId, { pc, dc: null });
    return pc;
  }

  setupDataChannel(dc, remotePeerId) {
    dc.onopen = () => {
      console.log(`[WebRTC Live Sync] DataChannel OPEN with peer: ${remotePeerId}`);
      this.transport = 'webrtc-datachannel';
      this.isConnected = true;
      const peer = this.peers.get(remotePeerId);
      if (peer) peer.dc = dc;
      this.notifyStatus();
    };

    dc.onclose = () => {
      const peer = this.peers.get(remotePeerId);
      if (peer) peer.dc = null;
      this.notifyStatus();
    };

    dc.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message && message.senderId !== this.clientId) {
          this.notifyListeners(message);
        }
      } catch (err) {
        console.error('[WebRTC Sync] Parse error:', err);
      }
    };
  }

  async initiatePeerConnection(remotePeerId, isOfferer) {
    const pc = this.createPeerConnection(remotePeerId);

    if (isOfferer) {
      const dc = pc.createDataChannel('sriizan-sync-dc');
      this.setupDataChannel(dc, remotePeerId);

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      if (this.signalingChannel) {
        this.signalingChannel.postMessage({
          senderId: this.clientId,
          targetId: remotePeerId,
          type: 'offer',
          data: offer
        });
      }
    }
  }

  async handleOffer(senderId, offer) {
    const pc = this.createPeerConnection(senderId);
    await pc.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    if (this.signalingChannel) {
      this.signalingChannel.postMessage({
        senderId: this.clientId,
        targetId: senderId,
        type: 'answer',
        data: answer
      });
    }
  }

  async handleAnswer(senderId, answer) {
    const peer = this.peers.get(senderId);
    if (peer && peer.pc) {
      await peer.pc.setRemoteDescription(new RTCSessionDescription(answer));
    }
  }

  async handleCandidate(senderId, candidate) {
    const peer = this.peers.get(senderId);
    if (peer && peer.pc) {
      try {
        await peer.pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.debug('[WebRTC Sync] ICE candidate error:', e);
      }
    }
  }

  /**
   * Broadcast a real-time event across WebRTC DataChannels & local BroadcastChannel
   * @param {string} type - Event type (e.g., 'STAGE_PROGRESS_UPDATED', 'PRICE_UPDATED')
   * @param {object} payload - Associated payload data
   */
  broadcast(type, payload = {}) {
    const message = {
      senderId: this.clientId,
      timestamp: Date.now(),
      type,
      payload
    };

    const serialized = JSON.stringify(message);
    let sentOverWebRTC = false;

    // Send through all active WebRTC DataChannels
    this.peers.forEach(({ dc }) => {
      if (dc && dc.readyState === 'open') {
        try {
          dc.send(serialized);
          sentOverWebRTC = true;
        } catch (err) {
          console.debug('[WebRTC Sync] Send failed, falling back:', err);
        }
      }
    });

    // Always mirror through local BroadcastChannel for zero-latency multi-tab guarantee
    if (this.localBroadcastChannel) {
      try {
        this.localBroadcastChannel.postMessage(message);
      } catch (e) {
        console.debug('[BroadcastChannel] Post failed:', e);
      }
    }

    // Also dispatch custom DOM event on current window
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sriizan:live-sync', { detail: message }));
    }

    return { success: true, sentOverWebRTC };
  }

  /**
   * Register a listener for live state updates
   */
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Register a listener for connection status changes
   */
  onStatusChange(callback) {
    this.statusListeners.add(callback);
    callback({
      isConnected: this.isConnected,
      transport: this.transport,
      activePeers: this.getActivePeerCount()
    });
    return () => this.statusListeners.delete(callback);
  }

  notifyListeners(message) {
    this.listeners.forEach((fn) => {
      try {
        fn(message);
      } catch (err) {
        console.error('[WebRTC Sync Listener Error]:', err);
      }
    });
  }

  notifyStatus() {
    const status = {
      isConnected: this.isConnected,
      transport: this.transport,
      activePeers: this.getActivePeerCount()
    };
    this.statusListeners.forEach(fn => fn(status));
  }

  getActivePeerCount() {
    let count = 0;
    this.peers.forEach(({ dc }) => {
      if (dc && dc.readyState === 'open') count++;
    });
    return count;
  }
}

export const webrtcSync = new WebRTCLiveSyncService();
