import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, default: '+91 98000 00000' },
  password: { type: String, required: true, default: 'buyer123' },
  role: { type: String, enum: ['buyer', 'admin'], default: 'buyer' },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
