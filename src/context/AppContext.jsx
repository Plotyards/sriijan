import { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROPERTIES, INITIAL_NOTIFICATIONS } from '../data/mockData';
import { INITIAL_SERVICE_PROVIDERS } from '../data/serviceProvidersData';
import { apiService } from '../services/api';
import { sanitizeNotificationText } from '../utils/privacy';
import { webrtcSync } from '../services/webrtcSync';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('sriizan_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('sriizan_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Service Providers database (Editor, Videographer, Digital Marketing, Graphic Designer)
  const [serviceProviders, setServiceProviders] = useState(() => {
    try {
      const saved = localStorage.getItem('sriizan_service_providers_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some(p => p.id === 'SZ-ED-1001')) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not parse saved service providers:", e);
    }
    return INITIAL_SERVICE_PROVIDERS;
  });

  const [activeProviderId, setActiveProviderId] = useState(() => {
    return localStorage.getItem('sriizan_active_provider_id') || "SZ-ED-1001";
  });

  // Real Registered Users Database persisted in localStorage & MongoDB Atlas
  const [usersDB, setUsersDB] = useState(() => {
    const saved = localStorage.getItem('sriizan_users_db');
    return saved ? JSON.parse(saved) : [];
  });

  const [activePropertyId, setActivePropertyId] = useState(() => {
    return localStorage.getItem('sriizan_active_property_id') || "PH-101";
  });
  const [userRole, setUserRole] = useState('buyer'); // 'buyer' | 'admin'

  // Logged-in User Profile state
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('sriizan_user');
    return savedUser ? JSON.parse(savedUser) : {
      name: "",
      email: "",
      phone: "",
      isLoggedIn: false
    };
  });

  // Native Mobile / Browser Push Notification helper (Sanitized so phone numbers never leak)
  const triggerSystemNotification = (title, body) => {
    const safeTitle = sanitizeNotificationText(title);
    const safeBody = sanitizeNotificationText(body);

    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        try {
          new Notification(safeTitle, {
            body: safeBody,
            icon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=200&auto=format&fit=crop'
          });
        } catch (e) {
          console.warn('System notification error:', e);
        }
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            try {
              new Notification(safeTitle, {
                body: safeBody,
                icon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=200&auto=format&fit=crop'
              });
            } catch {
              // Notification permission denied or not supported
            }
          }
        });
      }
    }
  };

  // Admin explicit authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('sriizan_admin_auth') === 'true';
  });

  // Fetch live properties & users from MongoDB Atlas database on mount
  useEffect(() => {
    const syncMongoData = async () => {
      const mongoProps = await apiService.fetchProperties();
      if (mongoProps && Array.isArray(mongoProps) && mongoProps.length > 0) {
        setProperties(mongoProps);
        const savedActive = localStorage.getItem('sriizan_active_property_id');
        if (savedActive && mongoProps.some(p => p.id === savedActive)) {
          setActivePropertyId(savedActive);
        }
      }
      if (isAdminAuthenticated) {
        const mongoUsers = await apiService.fetchUsers();
        if (mongoUsers && Array.isArray(mongoUsers) && mongoUsers.length > 0) {
          setUsersDB(mongoUsers);
        }
      }
    };
    syncMongoData();
  }, [isAdminAuthenticated]);

  // WebRTC Live Peer Connection status
  const [liveSyncStatus, setLiveSyncStatus] = useState({ 
    isConnected: true, 
    transport: 'webrtc-ready', 
    activePeers: 0 
  });

  // WebRTC Reactive Listener across tabs/devices
  useEffect(() => {
    const unsubStatus = webrtcSync.onStatusChange((status) => {
      setLiveSyncStatus(status);
    });

    const unsubMessages = webrtcSync.subscribe((msg) => {
      const { type, payload } = msg || {};
      if (!type) return;

      if (type === 'STAGE_PROGRESS_UPDATED') {
        const { propertyId, stageKey, newPercentage } = payload;
        setProperties(prevProps => prevProps.map(prop => {
          if (prop.id !== propertyId) return prop;
          const updatedStages = prop.progress.stages.map(stg => {
            if (stg.key === stageKey) {
              const pct = Math.min(100, Math.max(0, Number(newPercentage)));
              let status = pct === 100 ? "Completed" : (pct > 0 ? "In Progress" : "Upcoming");
              return { ...stg, percentage: pct, status };
            }
            return stg;
          });
          const totalPct = updatedStages.reduce((acc, curr) => acc + curr.percentage, 0);
          const overallPercentage = Math.round(totalPct / updatedStages.length);
          return {
            ...prop,
            progress: {
              ...prop.progress,
              overallPercentage,
              lastUpdated: "Just Now (WebRTC Live)",
              stages: updatedStages
            }
          };
        }));
      } else if (type === 'PRICE_UPDATED') {
        const { propertyId, newBuilderPriceRupees, newResalePriceRupees } = payload;
        setProperties(prevProps => prevProps.map(prop => {
          if (prop.id !== propertyId) return prop;
          const bPrice = Number(newBuilderPriceRupees);
          const rPrice = Number(newResalePriceRupees);
          const appreciation = rPrice - prop.financials.bookedPrice;
          const appPct = Number(((appreciation / prop.financials.bookedPrice) * 100).toFixed(1));
          return {
            ...prop,
            financials: {
              ...prop.financials,
              builderCurrentPrice: bPrice,
              resaleMarketPrice: rPrice,
              estimatedAppreciation: appreciation,
              appreciationPercentage: appPct
            }
          };
        }));
      } else if (type === 'NOTIFICATION_ADDED') {
        setNotifications(prev => [payload, ...prev]);
      } else if (type === 'PROPERTY_BOOKED') {
        setProperties(prev => [payload, ...prev]);
      } else if (type === 'PROVIDER_UPDATED') {
        const { providerId, updatedFields } = payload;
        setServiceProviders(prev => prev.map(p => p.id === providerId ? { ...p, ...updatedFields } : p));
      } else if (type === 'PORTFOLIO_ITEM_ADDED') {
        const { providerId, item } = payload;
        setServiceProviders(prev => prev.map(p => {
          if (p.id === providerId) {
            return { ...p, portfolioItems: [item, ...(p.portfolioItems || [])] };
          }
          return p;
        }));
      }
    });

    return () => {
      unsubStatus();
      unsubMessages();
    };
  }, []);

  useEffect(() => {
    if (activePropertyId) {
      localStorage.setItem('sriizan_active_property_id', activePropertyId);
    }
  }, [activePropertyId]);

  useEffect(() => {
    localStorage.setItem('sriizan_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('sriizan_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('sriizan_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sriizan_users_db', JSON.stringify(usersDB));
  }, [usersDB]);

  useEffect(() => {
    localStorage.setItem('sriizan_admin_auth', isAdminAuthenticated.toString());
  }, [isAdminAuthenticated]);

  const activeProperty = properties.find(p => p.id === activePropertyId) || properties[0];

  // User & Freelancer Auth Methods (Real DB Validation)
  const loginUser = (emailOrId, password, name = "", phone = "") => {
    if (!emailOrId) return { success: false, error: "Please enter your registered email address or Partner ID." };

    const cleanInput = emailOrId.trim();
    const lowerInput = cleanInput.toLowerCase();

    // 1) Check if logging in as an existing service provider / freelancer (by Partner ID or name/phone)
    const matchedProvider = serviceProviders.find(p => 
      (p.id && p.id.toLowerCase() === lowerInput) ||
      (p.partnerId && p.partnerId.toLowerCase() === lowerInput) ||
      (p.phone && p.phone.replace(/\D/g, '') === cleanInput.replace(/\D/g, '')) ||
      (p.email && p.email.toLowerCase() === lowerInput) ||
      (p.name && p.name.toLowerCase() === lowerInput)
    );

    const foundUser = usersDB.find(u => u.email.toLowerCase() === lowerInput);

    // If freelancer account found
    if (matchedProvider || (foundUser && foundUser.accountType === 'freelancer')) {
      const providerObj = matchedProvider || serviceProviders.find(p => p.id === foundUser.providerId) || serviceProviders[0];
      const userName = foundUser?.name || providerObj.name;
      const userPhone = foundUser?.phone || providerObj.phone;
      const userEmail = foundUser?.email || `${providerObj.id.toLowerCase()}@sriizan.com`;

      const freelancerSession = {
        name: userName,
        email: userEmail,
        phone: userPhone,
        role: 'freelancer',
        providerId: providerObj.id,
        isLoggedIn: true
      };

      setCurrentUser(freelancerSession);
      setUserRole('freelancer');
      setActiveProviderId(providerObj.id);

      triggerSystemNotification(
        "Freelancer Portal Login",
        `Welcome back ${userName}! Your verified dashboard and client inquiries are open.`
      );

      return { success: true, user: freelancerSession, role: 'freelancer' };
    }

    // Validate standard buyer/user password if user exists in database
    if (foundUser) {
      if (password && foundUser.password && password !== foundUser.password) {
        return { success: false, error: "Incorrect password! Please enter your registered account password." };
      }
    } else {
      return { success: false, error: "No account found with this email or Partner ID. Please Sign Up first." };
    }

    // Match property for this email
    const matchedProp = properties.find(p => p.owner && p.owner.email.toLowerCase() === lowerInput);
    const userName = name || foundUser.name || lowerInput.split('@')[0];
    const userPhone = phone || foundUser.phone || "+91 98000 00000";

    const userSession = { 
      name: userName, 
      email: lowerInput, 
      phone: userPhone, 
      role: foundUser.accountType || 'buyer',
      isLoggedIn: true 
    };
    setCurrentUser(userSession);
    setUserRole(foundUser.accountType || 'buyer');

    if (matchedProp) {
      setActivePropertyId(matchedProp.id);
    }

    // Send Push Notification to Mobile/Browser
    triggerSystemNotification(
      "Sriizan Account Login",
      `Welcome back ${userName}! Live construction tracking & document vault are active.`
    );

    return { success: true, user: userSession, role: userSession.role };
  };

  const loginFreelancer = (identifier, password) => {
    return loginUser(identifier, password);
  };

  const registerUser = async (name, phone, email, password, accountType = 'buyer', extraData = {}) => {
    if (!email || !name) return { success: false, error: "Full Name and Email are required for registration." };

    const lowerEmail = email.toLowerCase().trim();
    const existingUser = usersDB.find(u => u.email.toLowerCase() === lowerEmail);

    // Strict One Email ID = One Account rule
    if (existingUser) {
      return { success: false, error: "An account with this email address already exists. Please Log In instead." };
    }

    // Persist to MongoDB Atlas backend
    try {
      await apiService.registerUser(name, phone, lowerEmail, password);
    } catch {
      // Offline / dev fallback
    }

    let providerId = null;

    // If signing up as a Freelancer, create their public provider card
    if (accountType === 'freelancer') {
      const category = extraData.category || 'Editor';
      const prefixMap = {
        'Editor': 'SZ-ED',
        'Videographer': 'SZ-VG',
        'Digital Marketing': 'SZ-DM',
        'Graphic Designer': 'SZ-GD'
      };
      const prefix = prefixMap[category] || 'SZ-FR';
      const randomIdNum = Math.floor(1000 + Math.random() * 9000);
      const generatedPartnerId = `${prefix}-${randomIdNum}`;

      const newProvider = {
        id: generatedPartnerId,
        partnerId: generatedPartnerId,
        name: name.trim(),
        role: extraData.role || `${category} Specialist`,
        category: category,
        subcategory: extraData.subcategory || `${category} & Content Services`,
        city: extraData.city || 'Delhi NCR & Remote',
        rating: 5.0,
        reviewsCount: 1,
        verified: true,
        badge: 'Sriizan Verified Freelancer',
        experience: extraData.experience || '2+ Years',
        yearsExp: extraData.experience || '2+',
        projectsCompleted: '10+',
        happyClients: '5+',
        startingPrice: extraData.startingPrice || '₹799',
        priceUnit: 'per project',
        phone: phone || '+91 85273 16865',
        whatsapp: phone || '+91 85273 16865',
        email: lowerEmail,
        avatar: extraData.avatar || `https://images.unsplash.com/photo-${1507003211169 + Math.floor(Math.random()*1000)}?q=80&w=600&auto=format&fit=crop`,
        bannerImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
        bio: extraData.bio || `Verified freelance ${category} specialist on Sriizan marketplace. Delivering high-impact visual & marketing assets.`,
        skills: extraData.skills && Array.isArray(extraData.skills) ? extraData.skills : (extraData.skills ? extraData.skills.split(',').map(s => s.trim()) : ['Verified Freelancer', category]),
        servicesPricing: [
          { name: extraData.role || `${category} Deliverable`, price: extraData.startingPrice || '₹799' }
        ],
        createdAt: new Date().toISOString()
      };

      setServiceProviders(prev => {
        const updated = [newProvider, ...prev];
        localStorage.setItem('sriizan_service_providers_v3', JSON.stringify(updated));
        return updated;
      });

      providerId = newProvider.id;
      setActiveProviderId(newProvider.id);
    }

    const newUserObj = { 
      name, 
      phone: phone || "+91 98000 00000", 
      email: lowerEmail, 
      password: password || "",
      accountType: accountType,
      providerId: providerId
    };
    setUsersDB(prev => [...prev, newUserObj]);

    const userSession = { 
      name, 
      phone: newUserObj.phone, 
      email: lowerEmail, 
      role: accountType,
      providerId: providerId,
      isLoggedIn: true 
    };
    setCurrentUser(userSession);
    setUserRole(accountType);

    // Send Push Notification to Mobile/Browser
    triggerSystemNotification(
      accountType === 'freelancer' ? "Sriizan Freelancer Account Activated" : "Sriizan Access Pass",
      `Congratulations ${name}! Your account is activated.`
    );

    return { success: true, isNew: true, user: userSession, providerId };
  };

  const logoutUser = () => {
    setCurrentUser({ name: "", email: "", phone: "", role: "buyer", providerId: null, isLoggedIn: false });
    localStorage.removeItem('sriizan_user');
  };

  // Admin Auth Methods
  const loginAdmin = async (email, password) => {
    const res = await apiService.loginAdmin(email, password);
    if (res && res.success) {
      setIsAdminAuthenticated(true);
      setUserRole('admin');
      localStorage.setItem('sriizan_admin_auth', 'true');
      return { success: true };
    }
    return { success: false, error: res?.error || "Invalid Admin Credentials! Please check your ID and Password." };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setUserRole('buyer');
    localStorage.removeItem('sriizan_admin_auth');
  };

  // Helper to add a notification (Privacy Sanitized: Phone numbers are never exposed)
  const addNotification = (notif) => {
    const safeTitle = sanitizeNotificationText(notif.title);
    const safeMessage = sanitizeNotificationText(notif.message);

    const newNotif = {
      id: `notif-${Date.now()}`,
      propertyId: notif.propertyId || activePropertyId,
      title: safeTitle,
      message: safeMessage,
      category: notif.category || 'Milestone',
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      read: false,
      icon: notif.icon || 'Bell'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Update Construction Stage percentage & overall progress calculation
  const updateStageProgress = async (propertyId, stageKey, newPercentage) => {
    setProperties(prevProps => prevProps.map(prop => {
      if (prop.id !== propertyId) return prop;

      const updatedStages = prop.progress.stages.map(stg => {
        if (stg.key === stageKey) {
          const pct = Math.min(100, Math.max(0, Number(newPercentage)));
          let status = "Upcoming";
          if (pct === 100) status = "Completed";
          else if (pct > 0) status = "In Progress";

          return { ...stg, percentage: pct, status };
        }
        return stg;
      });

      const totalPct = updatedStages.reduce((acc, curr) => acc + curr.percentage, 0);
      const overallPercentage = Math.round(totalPct / updatedStages.length);

      return {
        ...prop,
        progress: {
          ...prop.progress,
          overallPercentage,
          lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          stages: updatedStages
        }
      };
    }));

    // Persist to MongoDB
    await apiService.updateStageProgress(propertyId, stageKey, newPercentage);

    // Broadcast live change across WebRTC DataChannels
    webrtcSync.broadcast('STAGE_PROGRESS_UPDATED', { propertyId, stageKey, newPercentage });

    const stageObj = activeProperty?.progress?.stages?.find(s => s.key === stageKey);
    addNotification({
      propertyId,
      title: `Stage Progress Update: ${stageObj ? stageObj.name : stageKey}`,
      message: `${stageObj ? stageObj.name : 'Stage'} progress has been updated to ${newPercentage}%.`,
      category: 'Milestone',
      icon: 'Building2'
    });
  };

  // Update Prices (Builder Price & Resale Price)
  const updatePropertyPrices = async (propertyId, newBuilderPriceRupees, newResalePriceRupees) => {
    setProperties(prevProps => prevProps.map(prop => {
      if (prop.id !== propertyId) return prop;

      const bPrice = Number(newBuilderPriceRupees);
      const rPrice = Number(newResalePriceRupees);
      const appreciation = rPrice - prop.financials.bookedPrice;
      const appPct = Number(((appreciation / prop.financials.bookedPrice) * 100).toFixed(1));

      const monthLabel = new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
      const newHistory = [
        ...prop.financials.priceHistory,
        {
          month: `${monthLabel} (Updated)`,
          builderPrice: Number((bPrice / 10000000).toFixed(2)),
          resalePrice: Number((rPrice / 10000000).toFixed(2))
        }
      ];

      return {
        ...prop,
        financials: {
          ...prop.financials,
          builderCurrentPrice: bPrice,
          resaleMarketPrice: rPrice,
          estimatedAppreciation: appreciation,
          appreciationPercentage: appPct,
          priceHistory: newHistory
        }
      };
    }));

    // Persist to MongoDB
    await apiService.updatePropertyPrices(propertyId, newBuilderPriceRupees, newResalePriceRupees);

    // Broadcast live change across WebRTC DataChannels
    webrtcSync.broadcast('PRICE_UPDATED', { propertyId, newBuilderPriceRupees, newResalePriceRupees });

    addNotification({
      propertyId,
      title: `Price Appreciation Alert`,
      message: `Builder current price: ₹${(newBuilderPriceRupees / 10000000).toFixed(2)} Cr | Resale market price: ₹${(newResalePriceRupees / 10000000).toFixed(2)} Cr.`,
      category: 'Price Update',
      icon: 'TrendingUp'
    });
  };

  // Add Document
  const addDocumentToProperty = async (propertyId, doc) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      title: doc.title,
      category: doc.category || 'Document',
      fileType: doc.fileType || 'PDF',
      fileSize: doc.fileSize || '1.5 MB',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      url: doc.url || '#',
      status: doc.status || 'Verified'
    };

    setProperties(prev => prev.map(p => {
      if (p.id !== propertyId) return p;
      return { ...p, documents: [newDoc, ...p.documents] };
    }));

    // Persist to MongoDB
    await apiService.addDocumentToProperty(propertyId, doc);

    addNotification({
      propertyId,
      title: `New Document Issued`,
      message: `Document "${doc.title}" has been uploaded to your document vault.`,
      category: 'Document',
      icon: 'FileText'
    });
  };

  // Add Photo / Update Video
  const addPhotoToProperty = async (propertyId, photo) => {
    const newPhoto = {
      id: Date.now(),
      month: photo.month || new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
      title: photo.title || 'Construction Update Photo',
      url: photo.url,
      category: photo.category || 'Site'
    };

    setProperties(prev => prev.map(p => {
      if (p.id !== propertyId) return p;
      return {
        ...p,
        media: {
          ...p.media,
          photos: [newPhoto, ...p.media.photos]
        }
      };
    }));

    // Persist to MongoDB
    await apiService.addPhotoToProperty(propertyId, photo);

    addNotification({
      propertyId,
      title: `New Site Photo Uploaded`,
      message: photo.title || 'New site progress photo is now available in your media gallery.',
      category: 'Media',
      icon: 'Image'
    });
  };

  // Register New Property Booking from Landing Page
  const addNewPropertyBooking = async (bookingData) => {
    const newId = `PH-${100 + properties.length + 1}`;
    
    // Save directly to MongoDB Atlas backend
    await apiService.createProperty(bookingData);

    const newProp = {
      id: newId,
      name: `${bookingData.projectName || 'Sriizan Residency'}`,
      builder: bookingData.builderName || "Sriizan Builders",
      builderRating: 4.7,
      location: bookingData.location || "Sector 84, Gurugram",
      tower: bookingData.tower || "Tower A",
      unitNo: bookingData.unitNo || "101",
      type: bookingData.bhkType || "3 BHK Luxury",
      carpetArea: "1650 Sq. Ft.",
      bookingDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      expectedPossession: "Dec 2027",
      verificationStatus: "Pending Verification",
      owner: {
        name: bookingData.fullName || currentUser.name || "Valued Buyer",
        email: bookingData.email || currentUser.email || "buyer@example.com",
        phone: bookingData.phone || currentUser.phone || "+91 98000 00000"
      },
      progress: {
        overallPercentage: 15,
        lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        stages: [
          { key: "foundation", name: "Foundation & Excavation", percentage: 90, status: "In Progress", date: "Present" },
          { key: "structure", name: "RCC Superstructure", percentage: 0, status: "Upcoming", date: "Est 2026" },
          { key: "brickwork", name: "Brickwork & Plastering", percentage: 0, status: "Upcoming", date: "Est 2026" },
          { key: "plumbing", name: "Electrical & Plumbing", percentage: 0, status: "Upcoming", date: "Est 2027" },
          { key: "finishing", name: "Flooring & Fixtures", percentage: 0, status: "Upcoming", date: "Est 2027" },
          { key: "possession", name: "OC & Possession", percentage: 0, status: "Upcoming", date: "Dec 2027" }
        ]
      },
      media: {
        droneVideo: {
          title: "Site Overview Drone Video",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          thumbnail: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop",
          duration: "2:30",
          date: "Recent"
        },
        photos: [
          {
            id: Date.now(),
            month: "Current",
            title: "Foundation Site View",
            url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
            category: "Foundation"
          }
        ]
      },
      financials: {
        bookedPrice: Number(bookingData.bookedPrice || 11000000),
        builderCurrentPrice: Number(bookingData.bookedPrice || 11000000),
        resaleMarketPrice: Number(bookingData.bookedPrice || 11000000),
        estimatedAppreciation: 0,
        appreciationPercentage: 0,
        estimatedRentalYield: 38000,
        rentalYieldPercentage: 3.5,
        paidAmount: Number((bookingData.bookedPrice || 11000000) * 0.1),
        pendingDemand: Number((bookingData.bookedPrice || 11000000) * 0.9),
        priceHistory: [
          {
            month: "Booking Month",
            builderPrice: Number(((bookingData.bookedPrice || 11000000) / 10000000).toFixed(2)),
            resalePrice: Number(((bookingData.bookedPrice || 11000000) / 10000000).toFixed(2))
          }
        ]
      },
      documents: [
        {
          id: `doc-${Date.now()}-699`,
          title: `₹699 Tax Invoice & Registration Receipt (${bookingData.transactionId || 'TXN-699-PAID'})`,
          category: "Payment Receipt",
          fileType: "PDF",
          fileSize: "450 KB",
          date: bookingData.paymentDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          url: "#",
          status: "Paid - Verified (₹699)"
        },
        {
          id: `doc-${Date.now()}`,
          title: "Property Registration & Booking Form",
          category: "Booking",
          fileType: "PDF",
          fileSize: "1.8 MB",
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          url: "#",
          status: "Submitted - Verified"
        }
      ],
      marketInsights: {
        sectorTrend: "+12.5% YoY Area Growth",
        avgSquareFootPrice: "₹8,200 / sq.ft.",
        nearbyInfra: [],
        newLaunches: []
      },
      aiPredictions: {
        predictedPossessionPrice: Number((bookingData.bookedPrice || 11000000) * 1.35),
        predictedROI: 35.0,
        delayRiskScore: "Low Risk (90% On-Time Index)",
        delayDaysEstimate: 20,
        builderScore: { quality: 4.8, timeliness: 4.6, legalCompliance: 4.9, overall: 4.76 }
      }
    };

    setProperties(prev => [newProp, ...prev]);
    setActivePropertyId(newId);

    // Auto update logged in user details if missing
    if (!currentUser.name && bookingData.fullName) {
      setCurrentUser({
        name: bookingData.fullName,
        email: bookingData.email || "buyer@example.com",
        phone: bookingData.phone || "+91 85273 16865",
        isLoggedIn: true
      });
    }

    addNotification({
      propertyId: newId,
      title: "Property Registration Received",
      message: `Your booking for ${newProp.name} (Unit ${newProp.unitNo}) is submitted and pending builder verification.`,
      category: 'Registration',
      icon: 'CheckCircle'
    });

    return newId;
  };

  const approveBuyerProperty = async (propertyId) => {
    setProperties(prev => prev.map(p => {
      if (p.id !== propertyId) return p;
      return { ...p, verificationStatus: "Verified" };
    }));

    // Persist to MongoDB Atlas
    await apiService.approveProperty(propertyId);

    addNotification({
      propertyId,
      title: "Property Status Verified!",
      message: "Congratulations! Your property booking has been officially verified by the builder admin.",
      category: 'Milestone',
      icon: 'ShieldCheck'
    });
  };

  const addNewServiceProvider = (providerData) => {
    const newProvider = {
      id: "PRO-" + Date.now().toString().slice(-4),
      name: providerData.name || "Real Estate Professional",
      role: providerData.role || "Specialist",
      category: providerData.category || "Video Editors",
      subcategory: providerData.subcategory || providerData.skills?.[0] || "Professional Service",
      city: providerData.city || "Delhi NCR",
      rating: 5.0,
      reviewsCount: 1,
      verified: true,
      badge: "Verified ₹699 Lifetime Pass",
      experience: providerData.experience || "3+ Years",
      startingPrice: providerData.startingPrice || "₹1,499",
      priceUnit: providerData.priceUnit || "per project",
      phone: providerData.phone || "+91 85273 16865",
      whatsapp: providerData.whatsapp || providerData.phone || "+91 85273 16865",
      avatar: providerData.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      bio: providerData.bio || "Verified professional listed on Sriizan Real Estate Marketplace.",
      skills: Array.isArray(providerData.skills) ? providerData.skills : (providerData.skills ? providerData.skills.split(',').map(s => s.trim()) : ["Verified Pro"]),
      portfolioItems: providerData.portfolioItems || [
        {
          title: "Verified Portfolio Work",
          type: "Recent Project",
          metrics: "100% Client Satisfaction",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
        }
      ],
      servicesOffered: providerData.servicesOffered || [
        { name: "Standard Project Consultation & Execution", price: providerData.startingPrice || "₹1,499" }
      ],
      createdAt: new Date().toISOString()
    };

    setServiceProviders(prev => {
      const updated = [newProvider, ...prev];
      localStorage.setItem('sriizan_service_providers_v3', JSON.stringify(updated));
      return updated;
    });

    triggerSystemNotification(
      "Profile Listed on Sriizan!",
      `${newProvider.name} is now live with ₹699 Lifetime Membership.`
    );

    return newProvider;
  };

  const updateServiceProvider = (providerId, updatedFields) => {
    setServiceProviders(prev => {
      const updated = prev.map(p => p.id === providerId ? { ...p, ...updatedFields } : p);
      localStorage.setItem('sriizan_service_providers_v3', JSON.stringify(updated));
      return updated;
    });

    // Broadcast across WebRTC peers
    webrtcSync.broadcast('PROVIDER_UPDATED', {
      providerId,
      updatedFields
    });
  };

  const addProviderPortfolioItem = (providerId, item) => {
    setServiceProviders(prev => {
      const updated = prev.map(p => {
        if (p.id === providerId) {
          const items = p.portfolioItems || [];
          return {
            ...p,
            portfolioItems: [item, ...items]
          };
        }
        return p;
      });
      localStorage.setItem('sriizan_service_providers_v3', JSON.stringify(updated));
      return updated;
    });

    // Broadcast across WebRTC peers
    webrtcSync.broadcast('PORTFOLIO_ITEM_ADDED', {
      providerId,
      item
    });
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        liveSyncStatus,
        serviceProviders,
        activeProviderId,
        setActiveProviderId,
        addNewServiceProvider,
        updateServiceProvider,
        addProviderPortfolioItem,
        usersDB,
        activePropertyId,
        setActivePropertyId,
        activeProperty,
        userRole,
        setUserRole,
        currentUser,
        setCurrentUser,
        loginUser,
        loginFreelancer,
        registerUser,
        logoutUser,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        notifications,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        updateStageProgress,
        updatePropertyPrices,
        addDocumentToProperty,
        addPhotoToProperty,
        addNewPropertyBooking,
        approveBuyerProperty
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);
