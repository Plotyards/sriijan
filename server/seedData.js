export const SEED_PROPERTIES = [
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
    verificationStatus: "Verified",
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
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop",
        duration: "3:45",
        date: "01 Aug 2026"
      },
      photos: [
        {
          id: "1",
          month: "August 2026",
          title: "Tower B External Brickwork & Glass Glazing",
          url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
          category: "External"
        },
        {
          id: "2",
          month: "August 2026",
          title: "Internal Plumbing & Electrical Piping Unit 1402",
          url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop",
          category: "Internal"
        }
      ]
    },
    financials: {
      bookedPrice: 12500000,
      builderCurrentPrice: 15200000,
      resaleMarketPrice: 16800000,
      estimatedAppreciation: 4300000,
      appreciationPercentage: 34.4,
      estimatedRentalYield: 45000,
      rentalYieldPercentage: 3.6,
      paidAmount: 8750000,
      pendingDemand: 3750000,
      priceHistory: [
        { month: "Jan 2024", builderPrice: 1.25, resalePrice: 1.25 },
        { month: "Aug 2026", builderPrice: 1.52, resalePrice: 1.68 }
      ]
    },
    documents: [
      {
        id: "doc-101",
        title: "Builder Buyer Agreement (BBA) - Unit 1402",
        category: "BBA",
        fileType: "PDF",
        fileSize: "4.2 MB",
        date: "20 Jan 2024",
        url: "#",
        status: "Executed & Verified"
      }
    ]
  },
  {
    id: "PH-102",
    name: "M3M Golf Hills Suite",
    builder: "M3M India Development Group",
    builderRating: 4.6,
    location: "Sector 79, Golf Course Ext. Road, Gurugram",
    tower: "Tower C",
    unitNo: "0804 (8th Floor)",
    type: "2.5 BHK Golf View Apartment",
    carpetArea: "1420 Sq. Ft.",
    bookingDate: "10 Nov 2023",
    expectedPossession: "June 2026",
    verificationStatus: "Verified",
    owner: {
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98123 45678"
    },
    progress: {
      overallPercentage: 82,
      lastUpdated: "08 Aug 2026",
      stages: [
        { key: "foundation", name: "Foundation & Excavation", percentage: 100, status: "Completed", date: "Dec 2023" },
        { key: "structure", name: "RCC Superstructure", percentage: 100, status: "Completed", date: "Nov 2024" },
        { key: "brickwork", name: "Brickwork & Plastering", percentage: 100, status: "Completed", date: "Apr 2025" },
        { key: "plumbing", name: "Electrical & Plumbing Piping", percentage: 90, status: "In Progress", date: "Aug 2025" },
        { key: "finishing", name: "Flooring, Paint & Fixtures", percentage: 65, status: "In Progress", date: "Jan 2026" },
        { key: "possession", name: "Final Fit-outs & OC Possession", percentage: 0, status: "Upcoming", date: "Jun 2026" }
      ]
    },
    media: {
      droneVideo: {
        title: "Golf Course Elevation Drone Clip",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
        duration: "2:15",
        date: "05 Aug 2026"
      },
      photos: []
    },
    financials: {
      bookedPrice: 11000000,
      builderCurrentPrice: 13800000,
      resaleMarketPrice: 14900000,
      estimatedAppreciation: 3900000,
      appreciationPercentage: 35.45,
      estimatedRentalYield: 38000,
      rentalYieldPercentage: 3.5,
      paidAmount: 7700000,
      pendingDemand: 3300000,
      priceHistory: []
    },
    documents: []
  }
];
