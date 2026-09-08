import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// Set test environment
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'promohomex_test_jwt_secret_key_123';
process.env.RAZORPAY_KEY_SECRET = 'test_razorpay_secret_key_456';

// Mock DB models before importing app
vi.mock('../../server/models/User.js', () => {
  const mockUserInstance = function (data) {
    Object.assign(this, data);
    this._id = 'mock_user_id_123';
    this.save = vi.fn().mockResolvedValue(this);
    this.toObject = vi.fn().mockReturnValue({ ...this });
  };
  mockUserInstance.findOne = vi.fn();
  mockUserInstance.find = vi.fn();
  mockUserInstance.countDocuments = vi.fn().mockResolvedValue(0);
  mockUserInstance.insertMany = vi.fn().mockResolvedValue([]);
  return { User: mockUserInstance };
});

vi.mock('../../server/models/Property.js', () => {
  const mockPropertyInstance = function (data) {
    Object.assign(this, data);
    this._id = 'mock_prop_id_123';
    this.save = vi.fn().mockResolvedValue(this);
    this.toObject = vi.fn().mockReturnValue({ ...this });
  };
  mockPropertyInstance.findOne = vi.fn();
  mockPropertyInstance.find = vi.fn();
  mockPropertyInstance.findOneAndUpdate = vi.fn();
  mockPropertyInstance.countDocuments = vi.fn().mockResolvedValue(5);
  mockPropertyInstance.insertMany = vi.fn().mockResolvedValue([]);
  return { Property: mockPropertyInstance };
});

vi.mock('../../server/db.js', () => ({
  connectDB: vi.fn().mockResolvedValue(true)
}));

import { app, sanitizeUser } from '../../server/server.js';
import { User } from '../../server/models/User.js';
import { Property } from '../../server/models/Property.js';
import { generateToken } from '../../server/middleware/auth.js';

describe('Backend API Routes & Edge Cases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Security Headers & Sanitization', () => {
    it('applies Helmet security headers on responses', async () => {
      const res = await request(app).get('/api/properties');
      expect(res.headers['x-content-type-options']).toBe('nosniff');
      expect(res.headers['x-frame-options']).toBe('SAMEORIGIN');
    });

    it('sanitizeUser strips password and preserves other user properties', () => {
      const rawUser = {
        _id: '123',
        name: 'Test Buyer',
        email: 'test@example.com',
        password: '$2a$10$hashed_password_string',
        role: 'buyer'
      };
      const sanitized = sanitizeUser(rawUser);
      expect(sanitized.password).toBeUndefined();
      expect(sanitized.email).toBe('test@example.com');
      expect(sanitized.name).toBe('Test Buyer');
    });
  });

  describe('POST /api/auth/register', () => {
    it('returns 400 when name is missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'user@example.com' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Name and email are required');
    });

    it('returns 400 when email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Nikhil Jangra' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Name and email are required');
    });

    it('registers new user and returns JWT token and sanitized user without password', async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Nikhil Jangra',
          email: '  Nikhil.Jangra@Example.COM  ',
          phone: '+91 98705 34978',
          password: 'securePassword123'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.isNew).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user).toBeDefined();
      expect(res.body.user.password).toBeUndefined();
      expect(res.body.user.email).toBe('nikhil.jangra@example.com');
    });

    it('returns existing user with token if email is already registered', async () => {
      const existingUser = {
        _id: 'existing_id_99',
        name: 'Existing Buyer',
        email: 'existing@example.com',
        role: 'buyer',
        password: '$2a$10$hashed',
        toObject: () => ({ _id: 'existing_id_99', name: 'Existing Buyer', email: 'existing@example.com', role: 'buyer' })
      };
      User.findOne.mockResolvedValue(existingUser);

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Existing Buyer',
          email: 'existing@example.com'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.isNew).toBe(false);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('existing@example.com');
      expect(res.body.user.password).toBeUndefined();
    });
  });

  describe('POST /api/auth/login', () => {
    it('returns 400 when email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'password123' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Email is required');
    });

    it('logs in existing user with correct bcrypt password', async () => {
      const hashedPassword = await bcrypt.hash('buyer123', 10);
      const mockUser = {
        _id: 'user_1',
        email: 'buyer@promohomex.com',
        role: 'buyer',
        password: hashedPassword,
        toObject: () => ({ _id: 'user_1', email: 'buyer@promohomex.com', role: 'buyer' })
      };
      User.findOne.mockResolvedValue(mockUser);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'buyer@promohomex.com', password: 'buyer123' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.password).toBeUndefined();
    });

    it('returns 401 when password does not match', async () => {
      const hashedPassword = await bcrypt.hash('correctPassword', 10);
      const mockUser = {
        _id: 'user_1',
        email: 'buyer@promohomex.com',
        role: 'buyer',
        password: hashedPassword
      };
      User.findOne.mockResolvedValue(mockUser);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'buyer@promohomex.com', password: 'wrongPassword' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Incorrect password');
    });

    it('auto-creates buyer if user does not exist in database', async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'newbuyer@example.com', password: 'buyer123' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('newbuyer@example.com');
    });
  });

  describe('POST /api/auth/admin-login', () => {
    it('returns 401 for invalid admin credentials', async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/auth/admin-login')
        .send({ email: 'intruder@example.com', password: 'wrong' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Invalid Admin Credentials');
    });

    it('logs in valid admin user with correct password', async () => {
      const hashedAdminPassword = await bcrypt.hash('admin123', 10);
      const adminUser = {
        _id: 'admin_id_1',
        name: 'Builder Admin',
        email: 'admin@promohomex.com',
        role: 'admin',
        password: hashedAdminPassword,
        toObject: () => ({ _id: 'admin_id_1', name: 'Builder Admin', email: 'admin@promohomex.com', role: 'admin' })
      };
      User.findOne.mockResolvedValue(adminUser);

      const res = await request(app)
        .post('/api/auth/admin-login')
        .send({ email: 'admin@promohomex.com', password: 'admin123' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.role).toBe('admin');
      expect(res.body.token).toBeDefined();
    });
  });

  describe('Razorpay Payment Gateway Endpoints', () => {
    it('POST /api/payment/create-razorpay-order creates order with default amount 699 (69900 paise)', async () => {
      const res = await request(app)
        .post('/api/payment/create-razorpay-order')
        .send({});

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.order.amount).toBe(69900);
      expect(res.body.order.currency).toBe('INR');
      expect(res.body.order.status).toBe('created');
      expect(res.body.key).toBeDefined();
    });

    it('POST /api/payment/create-razorpay-order supports custom amount', async () => {
      const res = await request(app)
        .post('/api/payment/create-razorpay-order')
        .send({ amount: 1500, currency: 'INR' });

      expect(res.status).toBe(200);
      expect(res.body.order.amount).toBe(150000);
    });

    it('POST /api/payment/verify-razorpay-payment validates valid HMAC SHA256 signature', async () => {
      const secret = process.env.RAZORPAY_KEY_SECRET;
      const orderId = 'order_test_123';
      const paymentId = 'pay_test_456';
      const validSignature = crypto
        .createHmac('sha256', secret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      const res = await request(app)
        .post('/api/payment/verify-razorpay-payment')
        .send({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: validSignature
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.paymentDetails.paymentId).toBe(paymentId);
      expect(res.body.paymentDetails.status).toBe('Paid');
    });

    it('POST /api/payment/verify-razorpay-payment rejects forged HMAC signature with 400', async () => {
      const res = await request(app)
        .post('/api/payment/verify-razorpay-payment')
        .send({
          razorpay_order_id: 'order_fake_123',
          razorpay_payment_id: 'pay_fake_456',
          razorpay_signature: 'tampered_signature_string_hex_abc'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Invalid Razorpay Payment Signature');
    });
  });

  describe('Property Routes & Admin Permissions', () => {
    const adminToken = generateToken({ id: 'admin1', email: 'admin@promohomex.com', role: 'admin' });
    const buyerToken = generateToken({ id: 'buyer1', email: 'buyer@example.com', role: 'buyer' });

    it('POST /api/properties rejects request without token (401)', async () => {
      const res = await request(app)
        .post('/api/properties')
        .send({ projectName: 'Test Tower' });

      expect(res.status).toBe(401);
    });

    it('POST /api/properties calculates 10% paid amount and 90% pending demand', async () => {
      Property.countDocuments.mockResolvedValue(3);

      const res = await request(app)
        .post('/api/properties')
        .set('Authorization', `Bearer ${buyerToken}`)
        .send({
          projectName: 'Emerald Heights',
          bookedPrice: 10000000,
          fullName: 'Suresh Raina',
          email: 'suresh@example.com'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.property.id).toBe('PH-104');
      expect(res.body.property.financials.paidAmount).toBe(1000000);
      expect(res.body.property.financials.pendingDemand).toBe(9000000);
      expect(res.body.property.verificationStatus).toBe('Pending Verification');
    });

    it('PUT /api/properties/:id/progress returns 403 when called by buyer', async () => {
      const res = await request(app)
        .put('/api/properties/PH-101/progress')
        .set('Authorization', `Bearer ${buyerToken}`)
        .send({ stageKey: 'structure', newPercentage: 50 });

      expect(res.status).toBe(403);
      expect(res.body.error).toContain('Admin privileges required');
    });

    it('PUT /api/properties/:id/progress clamps percentage to [0, 100] and updates stage status', async () => {
      const mockProperty = {
        id: 'PH-101',
        progress: {
          stages: [
            { key: 'foundation', percentage: 100, status: 'Completed' },
            { key: 'structure', percentage: 0, status: 'Upcoming' }
          ]
        },
        save: vi.fn().mockResolvedValue(true)
      };
      Property.findOne.mockResolvedValue(mockProperty);

      // Pass 150 -> should clamp to 100 and set status 'Completed'
      const res = await request(app)
        .put('/api/properties/PH-101/progress')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ stageKey: 'structure', newPercentage: 150 });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      const structureStage = mockProperty.progress.stages.find(s => s.key === 'structure');
      expect(structureStage.percentage).toBe(100);
      expect(structureStage.status).toBe('Completed');
      expect(mockProperty.progress.overallPercentage).toBe(100);
    });

    it('PUT /api/properties/:id/progress returns 404 for unknown property ID', async () => {
      Property.findOne.mockResolvedValue(null);

      const res = await request(app)
        .put('/api/properties/PH-999/progress')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ stageKey: 'structure', newPercentage: 50 });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Property not found');
    });

    it('PUT /api/properties/:id/verify updates status to Verified', async () => {
      Property.findOneAndUpdate.mockResolvedValue({
        id: 'PH-101',
        verificationStatus: 'Verified'
      });

      const res = await request(app)
        .put('/api/properties/PH-101/verify')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.property.verificationStatus).toBe('Verified');
    });

    it('PUT /api/properties/:id/prices computes appreciation and updates price history', async () => {
      const mockProperty = {
        id: 'PH-101',
        financials: {
          bookedPrice: 10000000,
          priceHistory: []
        },
        save: vi.fn().mockResolvedValue(true)
      };
      Property.findOne.mockResolvedValue(mockProperty);

      const res = await request(app)
        .put('/api/properties/PH-101/prices')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          builderPrice: 12000000,
          resalePrice: 13000000
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockProperty.financials.estimatedAppreciation).toBe(3000000);
      expect(mockProperty.financials.appreciationPercentage).toBe(30.0);
      expect(mockProperty.financials.priceHistory).toHaveLength(1);
      expect(mockProperty.financials.priceHistory[0].resalePrice).toBe(1.3);
    });
  });
});
