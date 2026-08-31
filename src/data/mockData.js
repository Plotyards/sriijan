export const INITIAL_PROPERTIES = [
  {
    id: "PH-101",
    name: "Sriizan Grand Residency",
    builder: "Sriizan Infrastructure & Construction",
    builderRating: 4.8,
    location: "Sector 84, Gurugram (Dwarka Expressway)",
    tower: "Tower B",
    unitNo: "1402 (14th Floor)",
    type: "3 BHK Premium + Servant",
    carpetArea: "1850 Sq. Ft.",
    bookingDate: "15 Jan 2024",
    expectedPossession: "Dec 2026",
    verificationStatus: "Verified", // Verified, Pending, Rejected
    owner: {
      name: "Nikhil Jangra",
      email: "nikhil.jangra@example.com",
      phone: "+91 98705 34978"
    },
    progress: {
      overallPercentage: 68,
      lastUpdated: "05 Aug 2026",
      stages: [
        { key: "foundation", name: "Foundation & Excavation", percentage: 100, status: "Completed", date: "Mar 2024" },
        { key: "structure", name: "RCC Superstructure (18 Floors)", percentage: 100, status: "Completed", date: "Feb 2025" },
        { key: "brickwork", name: "Brickwork & Plastering", percentage: 85, status: "In Progress", date: "Jun 2025" },
        { key: "plumbing", name: "Electrical & Plumbing Piping", percentage: 60, status: "In Progress", date: "Sep 2025" },
        { key: "finishing", name: "Flooring, Paint & Fixtures", percentage: 20, status: "In Progress", date: "Mar 2026" },
        { key: "possession", name: "Final Fit-outs & OC Possession", percentage: 0, status: "Upcoming", date: "Dec 2026" }
      ]
    },
    media: {
      droneVideo: {
        title: "Site Drone Survey - August 2026",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Embed preview
        thumbnail: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop",
        duration: "3:45",
        date: "01 Aug 2026"
      },
      photos: [
        {
          id: 1,
          month: "August 2026",
          title: "Tower B External Brickwork & Glass Glazing",
          url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
          category: "External"
        },
        {
          id: 2,
          month: "August 2026",
          title: "Internal Plumbing & Electrical Piping Unit 1402",
          url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop",
          category: "Internal"
        },
        {
          id: 3,
          month: "July 2026",
          title: "Podium Clubhouse & Swimming Pool Deck Base",
          url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1000&auto=format&fit=crop",
          category: "Amenities"
        },
        {
          id: 4,
          month: "June 2026",
          title: "Elevator Shaft Installation & Lift Lobby Plaster",
          url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1000&auto=format&fit=crop",
          category: "Common Area"
        }
      ]
    },
    financials: {
      bookedPrice: 12500000, // 1.25 Cr
      builderCurrentPrice: 15200000, // 1.52 Cr
      resaleMarketPrice: 16000000, // 1.60 Cr
      estimatedAppreciation: 3500000, // 35 Lakhs
      appreciationPercentage: 28.0,
      estimatedRentalYield: 45000, // per month
      rentalYieldPercentage: 3.6,
      paidAmount: 9375000, // 75% paid
      pendingDemand: 3125000,
      priceHistory: [
        { month: "Jan 2024 (Booking)", builderPrice: 12.5, resalePrice: 12.5 },
        { month: "Jul 2024", builderPrice: 13.1, resalePrice: 13.4 },
        { month: "Jan 2025", builderPrice: 13.8, resalePrice: 14.2 },
        { month: "Jul 2025", builderPrice: 14.5, resalePrice: 15.0 },
        { month: "Jan 2026", builderPrice: 14.9, resalePrice: 15.5 },
        { month: "Aug 2026 (Current)", builderPrice: 15.2, resalePrice: 16.0 }
      ]
    },
    documents: [
      {
        id: "doc-1",
        title: "Property Booking Application Form",
        category: "Booking",
        fileType: "PDF",
        fileSize: "2.4 MB",
        date: "15 Jan 2024",
        url: "#",
        status: "Verified"
      },
      {
        id: "doc-2",
        title: "Builder Buyer Agreement (BBA)",
        category: "Agreement",
        fileType: "PDF",
        fileSize: "8.1 MB",
        date: "02 Feb 2024",
        url: "#",
        status: "Stamped & Registered"
      },
      {
        id: "doc-3",
        title: "Allotment Letter & Unit Layout Blueprint",
        category: "Floor Plan",
        fileType: "PDF",
        fileSize: "4.2 MB",
        date: "05 Feb 2024",
        url: "#",
        status: "Verified"
      },
      {
        id: "doc-4",
        title: "Payment Receipt - Foundation Milestone (20%)",
        category: "Payment Receipt",
        fileType: "PDF",
        fileSize: "1.1 MB",
        date: "15 Mar 2024",
        url: "#",
        status: "Paid"
      },
      {
        id: "doc-5",
        title: "Payment Receipt - Superstructure 18th Floor (45%)",
        category: "Payment Receipt",
        fileType: "PDF",
        fileSize: "1.3 MB",
        date: "10 Feb 2025",
        url: "#",
        status: "Paid"
      },
      {
        id: "doc-6",
        title: "Demand Letter - Brickwork & Plaster Stage (10%)",
        category: "Demand Letter",
        fileType: "PDF",
        fileSize: "950 KB",
        date: "12 Jul 2026",
        url: "#",
        status: "Pending Payment"
      },
      {
        id: "doc-7",
        title: "Sriizan Grand Residency Official Brochure",
        category: "Brochure",
        fileType: "PDF",
        fileSize: "15.6 MB",
        date: "01 Jan 2024",
        url: "#",
        status: "Public"
      }
    ],
    marketInsights: {
      sectorTrend: "+14.2% YoY growth in Sector 84",
      avgSquareFootPrice: "₹8,650 / sq.ft.",
      nearbyInfra: [
        {
          title: "Dwarka Expressway Cloverleaf Operational",
          distance: "1.2 km away",
          impact: "High Positive",
          status: "Completed",
          description: "Seamless 15-min connectivity to IGI Airport Terminal 3."
        },
        {
          title: "Gurugram Metro Extension (Sector 84 Station)",
          distance: "800 meters away",
          impact: "Very High Positive",
          status: "Under Construction (Est. 2027)",
          description: "DMRC approved metro connectivity connecting Cyber City directly."
        },
        {
          title: "Global City 1000-acre Business Hub",
          distance: "3.5 km away",
          impact: "High Growth Potential",
          status: "Land Development Stage",
          description: "Commercial Hub expected to generate 150,000 corporate jobs."
        }
      ],
      newLaunches: [
        { name: "DLF Privana West Phase 2", price: "₹18,500 / sq.ft.", builder: "DLF" },
        { name: "M3M Crown Sector 111", price: "₹16,200 / sq.ft.", builder: "M3M" },
        { name: "Signature Global Deluxe DXP", price: "₹14,900 / sq.ft.", builder: "Signature Global" }
      ]
    },
    aiPredictions: {
      predictedPossessionPrice: 17800000, // 1.78 Cr estimated at possession
      predictedROI: 42.4, // %
      delayRiskScore: "Low Risk (92% On-Time Delivery Index)",
      delayDaysEstimate: 15,
      builderScore: {
        quality: 4.9,
        timeliness: 4.7,
        legalCompliance: 5.0,
        overall: 4.86
      }
    }
  },
  {
    id: "PH-102",
    name: "M3M Golf Hills Suite",
    builder: "M3M India",
    builderRating: 4.6,
    location: "Sector 79, Gurugram",
    tower: "Tower C",
    unitNo: "0804",
    type: "2.5 BHK Golf Facing",
    carpetArea: "1420 Sq. Ft.",
    bookingDate: "10 Aug 2024",
    expectedPossession: "Jun 2027",
    verificationStatus: "Verified",
    owner: {
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98112 33445"
    },
    progress: {
      overallPercentage: 42,
      lastUpdated: "02 Aug 2026",
      stages: [
        { key: "foundation", name: "Foundation & Excavation", percentage: 100, status: "Completed", date: "Jan 2025" },
        { key: "structure", name: "RCC Superstructure (Ground + 24)", percentage: 70, status: "In Progress", date: "Aug 2026" },
        { key: "brickwork", name: "Brickwork & Plastering", percentage: 25, status: "In Progress", date: "Est Nov 2026" },
        { key: "plumbing", name: "Electrical & Plumbing Piping", percentage: 0, status: "Upcoming", date: "Est Mar 2027" },
        { key: "finishing", name: "Flooring, Paint & Fixtures", percentage: 0, status: "Upcoming", date: "Est Dec 2027" },
        { key: "possession", name: "Final Fit-outs & OC Possession", percentage: 0, status: "Upcoming", date: "Jun 2027" }
      ]
    },
    media: {
      droneVideo: {
        title: "M3M Golf Hills Aerial Flythrough",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1200&auto=format&fit=crop",
        duration: "4:12",
        date: "28 Jul 2026"
      },
      photos: [
        {
          id: 101,
          month: "July 2026",
          title: "Tower C 14th Floor Slab Casting Complete",
          url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1000&auto=format&fit=crop",
          category: "Structure"
        }
      ]
    },
    financials: {
      bookedPrice: 9800000,
      builderCurrentPrice: 11500000,
      resaleMarketPrice: 12100000,
      estimatedAppreciation: 2300000,
      appreciationPercentage: 23.4,
      estimatedRentalYield: 35000,
      rentalYieldPercentage: 3.5,
      paidAmount: 4900000,
      pendingDemand: 4900000,
      priceHistory: [
        { month: "Aug 2024", builderPrice: 9.8, resalePrice: 9.8 },
        { month: "Jan 2025", builderPrice: 10.4, resalePrice: 10.8 },
        { month: "Aug 2026", builderPrice: 11.5, resalePrice: 12.1 }
      ]
    },
    documents: [
      {
        id: "doc-101",
        title: "Booking Form & Payment Receipt 1",
        category: "Booking",
        fileType: "PDF",
        fileSize: "3.1 MB",
        date: "10 Aug 2024",
        url: "#",
        status: "Verified"
      }
    ],
    marketInsights: {
      sectorTrend: "+11.8% YoY growth in Sector 79",
      avgSquareFootPrice: "₹7,900 / sq.ft.",
      nearbyInfra: [],
      newLaunches: []
    },
    aiPredictions: {
      predictedPossessionPrice: 14200000,
      predictedROI: 44.8,
      delayRiskScore: "Moderate (84% On-Time Index)",
      delayDaysEstimate: 45,
      builderScore: {
        quality: 4.7,
        timeliness: 4.4,
        legalCompliance: 4.8,
        overall: 4.63
      }
    }
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    propertyId: "PH-101",
    title: "Construction Stage Progress Update",
    message: "Brickwork & Plastering stage for Tower B has reached 85% completion. Monthly photos uploaded.",
    category: "Milestone",
    timestamp: "05 Aug 2026, 11:30 AM",
    read: false,
    icon: "Building2"
  },
  {
    id: "notif-2",
    propertyId: "PH-101",
    title: "Market Resale Price Appreciation Alert",
    message: "Resale market price in Sector 84 updated to ₹1.60 Cr (+₹35 Lakhs profit since booking).",
    category: "Price Update",
    timestamp: "01 Aug 2026, 04:15 PM",
    read: false,
    icon: "TrendingUp"
  },
  {
    id: "notif-3",
    propertyId: "PH-101",
    title: "New Drone Video Survey Uploaded",
    message: "Watch the latest August 2026 site drone flight footage in your media dashboard.",
    category: "Media",
    timestamp: "28 Jul 2026, 02:00 PM",
    read: true,
    icon: "Video"
  },
  {
    id: "notif-4",
    propertyId: "PH-101",
    title: "New Document Added to Vault",
    message: "Demand Letter - Brickwork & Plaster Stage (10%) has been issued by builder.",
    category: "Document",
    timestamp: "12 Jul 2026, 09:45 AM",
    read: true,
    icon: "FileText"
  }
];
