import { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROPERTIES, INITIAL_NOTIFICATIONS } from '../data/mockData';
import { apiService } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('promohomex_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('promohomex_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Real Registered Users Database persisted in localStorage & MongoDB Atlas
  const [usersDB, setUsersDB] = useState(() => {
    const saved = localStorage.getItem('promohomex_users_db');
    return saved ? JSON.parse(saved) : [];
  });

  const [activePropertyId, setActivePropertyId] = useState(() => {
    return localStorage.getItem('promohomex_active_property_id') || "PH-101";
  });
  const [userRole, setUserRole] = useState('buyer'); // 'buyer' | 'admin'

  // Logged-in User Profile state
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('promohomex_user');
    return savedUser ? JSON.parse(savedUser) : {
      name: "",
      email: "",
      phone: "",
      isLoggedIn: false
    };
  });

  // Native Mobile / Browser Push Notification helper
  const triggerSystemNotification = (title, body) => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        try {
          new Notification(title, {
            body,
            icon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=200&auto=format&fit=crop'
          });
        } catch (e) {
          console.warn('System notification error:', e);
        }
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            try {
              new Notification(title, {
                body,
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
    return localStorage.getItem('promohomex_admin_auth') === 'true';
  });

  // Fetch live properties & users from MongoDB Atlas database on mount
  useEffect(() => {
    const syncMongoData = async () => {
      const mongoProps = await apiService.fetchProperties();
      if (mongoProps && Array.isArray(mongoProps) && mongoProps.length > 0) {
        setProperties(mongoProps);
        const savedActive = localStorage.getItem('promohomex_active_property_id');
        if (savedActive && mongoProps.some(p => p.id === savedActive)) {
          setActivePropertyId(savedActive);
        }
      }
      const mongoUsers = await apiService.fetchUsers();
      if (mongoUsers && Array.isArray(mongoUsers) && mongoUsers.length > 0) {
        setUsersDB(mongoUsers);
      }
    };
    syncMongoData();
  }, []);

  useEffect(() => {
    if (activePropertyId) {
      localStorage.setItem('promohomex_active_property_id', activePropertyId);
    }
  }, [activePropertyId]);

  useEffect(() => {
    localStorage.setItem('promohomex_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('promohomex_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('promohomex_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('promohomex_users_db', JSON.stringify(usersDB));
  }, [usersDB]);

  useEffect(() => {
    localStorage.setItem('promohomex_admin_auth', isAdminAuthenticated.toString());
  }, [isAdminAuthenticated]);

  const activeProperty = properties.find(p => p.id === activePropertyId) || properties[0];

  // User Auth Methods (Real DB Validation)
  const loginUser = (email, password, name = "", phone = "") => {
    if (!email) return { success: false, error: "Please enter your registered email address." };

    const lowerEmail = email.toLowerCase().trim();
    const foundUser = usersDB.find(u => u.email.toLowerCase() === lowerEmail);

    // Validate password if user exists in database
    if (foundUser) {
      if (password && foundUser.password && password !== foundUser.password) {
        return { success: false, error: "Incorrect password! Please enter your registered account password." };
      }
    } else {
      return { success: false, error: "No account found with this email. Please Sign Up first." };
    }

    // Match property for this email
    const matchedProp = properties.find(p => p.owner && p.owner.email.toLowerCase() === lowerEmail);
    const userName = name || foundUser.name || lowerEmail.split('@')[0];
    const userPhone = phone || foundUser.phone || "+91 98000 00000";

    const userSession = { name: userName, email: lowerEmail, phone: userPhone, isLoggedIn: true };
    setCurrentUser(userSession);
    setUserRole('buyer');

    if (matchedProp) {
      setActivePropertyId(matchedProp.id);
    }

    // Send Push Notification to Mobile/Browser
    triggerSystemNotification(
      "Promohomex Account Login",
      `Welcome back ${userName}! Live construction tracking & document vault are active.`
    );

    return { success: true, user: userSession };
  };

  const registerUser = async (name, phone, email, password) => {
    if (!email || !name) return { success: false, error: "Full Name and Email are required for registration." };

    const lowerEmail = email.toLowerCase().trim();
    const existingUser = usersDB.find(u => u.email.toLowerCase() === lowerEmail);

    // Strict One Email ID = One Account rule
    if (existingUser) {
      return { success: false, error: "An account with this email address already exists. Please Log In instead." };
    }

    // Persist to MongoDB Atlas backend
    await apiService.registerUser(name, phone, lowerEmail, password);

    const newUserObj = { name, phone: phone || "+91 98000 00000", email: lowerEmail, password: password || "" };
    setUsersDB(prev => [...prev, newUserObj]);

    const userSession = { name, phone: newUserObj.phone, email: lowerEmail, isLoggedIn: true };
    setCurrentUser(userSession);
    setUserRole('buyer');

    // Send Push Notification to Mobile/Browser
    triggerSystemNotification(
      "Promohomex Property Access Pass",
      `Congratulations ${name}! Your ₹699 lifetime property tracking pass & account are activated.`
    );

    return { success: true, isNew: true, user: userSession };
  };

  const logoutUser = () => {
    setCurrentUser({ name: "", email: "", phone: "", isLoggedIn: false });
    localStorage.removeItem('promohomex_user');
  };

  // Admin Auth Methods
  const loginAdmin = async (email, password) => {
    const res = await apiService.loginAdmin(email, password);
    if (res && res.success) {
      setIsAdminAuthenticated(true);
      setUserRole('admin');
      localStorage.setItem('promohomex_admin_auth', 'true');
      return { success: true };
    }
    return { success: false, error: res?.error || "Invalid Admin Credentials! Please check your ID and Password." };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setUserRole('buyer');
    localStorage.removeItem('promohomex_admin_auth');
  };

  // Helper to add a notification
  const addNotification = (notif) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      propertyId: notif.propertyId || activePropertyId,
      title: notif.title,
      message: notif.message,
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
      name: `${bookingData.projectName || 'Promohomex Residency'}`,
      builder: bookingData.builderName || "Promohomex Builders",
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
        phone: bookingData.phone || "+91 98705 34978",
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

  const resetToDemoData = () => {
    localStorage.removeItem('promohomex_properties');
    localStorage.removeItem('promohomex_notifications');
    setProperties(INITIAL_PROPERTIES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActivePropertyId("PH-101");
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        usersDB,
        activePropertyId,
        setActivePropertyId,
        activeProperty,
        userRole,
        setUserRole,
        currentUser,
        setCurrentUser,
        loginUser,
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
        approveBuyerProperty,
        resetToDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);
