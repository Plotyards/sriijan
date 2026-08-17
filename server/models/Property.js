import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  builder: { type: String, default: 'Promohomex Builders' },
  builderRating: { type: Number, default: 4.7 },
  location: { type: String, default: 'Sector 84, Gurugram' },
  tower: { type: String, required: true },
  unitNo: { type: String, required: true },
  type: { type: String, default: '3 BHK Luxury' },
  carpetArea: { type: String, default: '1650 Sq. Ft.' },
  bookingDate: { type: String, default: () => new Date().toLocaleDateString('en-GB') },
  expectedPossession: { type: String, default: 'Dec 2027' },
  verificationStatus: { type: String, default: 'Pending Verification' },
  owner: {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '+91 98705 34978' }
  },
  progress: {
    overallPercentage: { type: Number, default: 15 },
    lastUpdated: { type: String, default: () => new Date().toLocaleDateString('en-GB') },
    stages: [{
      key: String,
      name: String,
      percentage: Number,
      status: String,
      date: String
    }]
  },
  media: {
    droneVideo: {
      title: String,
      url: String,
      thumbnail: String,
      duration: String,
      date: String
    },
    photos: [{
      id: String,
      month: String,
      title: String,
      url: String,
      category: String
    }]
  },
  financials: {
    bookedPrice: Number,
    builderCurrentPrice: Number,
    resaleMarketPrice: Number,
    estimatedAppreciation: Number,
    appreciationPercentage: Number,
    estimatedRentalYield: Number,
    rentalYieldPercentage: Number,
    paidAmount: Number,
    pendingDemand: Number,
    priceHistory: [{
      month: String,
      builderPrice: Number,
      resalePrice: Number
    }]
  },
  documents: [{
    id: String,
    title: String,
    category: String,
    fileType: String,
    fileSize: String,
    date: String,
    url: String,
    status: String
  }],
  createdAt: { type: Date, default: Date.now }
});

export const Property = mongoose.model('Property', propertySchema);
