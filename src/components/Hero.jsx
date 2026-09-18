import { useState, useRef } from 'react';
import { 
  ArrowRight, ShieldCheck, Building2, TrendingUp, Lock, Sparkles, 
  Volume2, VolumeX, Play, Pause, Radio, Eye
} from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = ({ onTrackClick, onSellClick, onServicesClick }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative overflow-hidden bg-white text-slate-900 pt-28 sm:pt-34 pb-16 sm:pb-20 border-b border-slate-200/80">
      {/* Background Ambient Construction Drone Video Banner */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/construction-hero-poster.jpg"
          className="w-full h-full object-cover opacity-15 sm:opacity-20 scale-105 filter saturate-125 contrast-105"
        >
          <source src="/construction-hero.mp4" type="video/mp4" />
        </video>
        {/* Soft gradients to guarantee 100% crisp typography & contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/75"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Clean, Authoritative Real Estate Typography (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-left lg:col-span-7 space-y-6"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-950 font-bold text-xs shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="font-extrabold tracking-wide">Real Estate, Simplified</span>
            <span className="text-emerald-700/60 font-normal">|</span>
            <span className="text-emerald-800 font-semibold hidden sm:inline">Live Construction Tracking & Direct Resale</span>
            <span className="text-emerald-800 font-semibold sm:hidden">Live Tracking</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[56px] font-black tracking-tight leading-[1.1] text-slate-950 font-serif">
            Know What's Being Built. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
              Know What's Available.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
            Monitor verified civil construction milestones and 4K drone surveys for your under-construction flat — or list directly on India's transparent resale marketplace with 0% brokerage.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onTrackClick}
              className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 transition-all duration-200 shadow-md shadow-emerald-800/20 flex items-center justify-center gap-2 cursor-pointer border border-emerald-600"
            >
              <Building2 className="h-4 w-4 text-emerald-300" />
              <span>Track Construction Live</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSellClick}
              className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all duration-200 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer border border-amber-400"
            >
              <TrendingUp className="h-4 w-4 text-slate-950 stroke-[2.5]" />
              <span>Sell My Property (List Free)</span>
            </motion.button>

            <button
              onClick={onServicesClick}
              className="px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer ml-1"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              <span>Hire Creators & Experts →</span>
            </button>
          </div>

          {/* Institutional Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-5 sm:gap-6 text-xs text-slate-600 font-semibold border-t border-slate-200/80">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-700" />
              <span>100% RERA Registered Audits</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock size={15} className="text-emerald-700" />
              <span>Encrypted Owner-Only Media</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles size={15} className="text-amber-500" />
              <span>Direct Resale Buyers</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: High-Tech Live 4K Construction Drone Surveillance Screen (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="col-span-1 lg:col-span-5 flex items-center justify-center"
        >
          {/* Futuristic Drone Telemetry Viewport Frame */}
          <div className="w-full max-w-[440px] bg-slate-950/95 backdrop-blur-2xl rounded-3xl p-3 sm:p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.28)] border-2 border-slate-800 ring-1 ring-white/15 relative overflow-hidden group">
            
            {/* Top Video Header HUD */}
            <div className="flex items-center justify-between pb-2.5 px-2 border-b border-slate-800/80 mb-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-[11px] font-black text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Radio size={12} className="text-red-400" /> LIVE 4K DRONE FEED
                </span>
              </div>

              {/* Video Player Controls (Mute & Play) */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  title={isPlaying ? "Pause video" : "Play video"}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                </button>

                <button
                  type="button"
                  onClick={handleToggleMute}
                  title={isMuted ? "Unmute audio" : "Mute audio"}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                >
                  {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                </button>
              </div>
            </div>

            {/* Video Canvas Container with Smooth Aspect Ratio */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-inner">
              <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                poster="/construction-hero-poster.jpg"
                className="w-full h-full object-cover select-none"
              >
                <source src="/construction-hero.mp4" type="video/mp4" />
              </video>

              {/* Drone Camera OSD Grid / Crosshair Overlay */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40">
                {/* OSD Top Coordinates */}
                <div className="flex items-center justify-between text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest drop-shadow-sm">
                  <span>GPS: 28.4595° N, 77.0266° E</span>
                  <span>ALT: 148m • 4K 60FPS</span>
                </div>

                {/* Center Reticle */}
                <div className="self-center my-auto flex items-center justify-center opacity-40">
                  <div className="w-8 h-8 border border-white/60 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  </div>
                </div>

                {/* OSD Bottom Stream Telemetry */}
                <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-300">
                  <span className="text-amber-400">FLIGHT PATH: TOWER B PERIMETER</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    VERIFIED AUDIT
                  </span>
                </div>
              </div>
            </div>

            {/* In-App Live Milestone Progress Pill */}
            <div className="mt-2.5 bg-slate-900/90 rounded-2xl p-3 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    TOWER B • UNIT 1402 (14TH FLOOR)
                  </div>
                  <div className="text-sm font-black text-white">Sriizan Grand Residency</div>
                </div>
                <span className="text-[10px] font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-700/60 font-mono">
                  68% DONE
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[68%] rounded-full"></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Structure & Brickwork: 85%</span>
                  <span>Possession: Dec 2026</span>
                </div>
              </div>

              {/* Quick Action Footer inside Card */}
              <div className="pt-1 flex items-center justify-between border-t border-slate-800/80">
                <div className="text-[10.5px] font-bold text-emerald-400 flex items-center gap-1">
                  <TrendingUp size={12} className="stroke-[2.5]" /> Market Value: ₹1.60 Cr (+28%)
                </div>

                <button
                  type="button"
                  onClick={onTrackClick}
                  className="text-[10.5px] font-black text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition"
                >
                  <Eye size={12} />
                  <span>Inspect Flat →</span>
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
