import { describe, it, expect, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import { verifyToken, verifyAdmin, generateToken } from '../../server/middleware/auth.js';

const JWT_SECRET = process.env.JWT_SECRET || 'promohomex_super_secret_jwt_key_2026_!@#';

const createMockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('Auth Middleware & JWT Edge Cases', () => {
  describe('verifyToken', () => {
    it('returns 401 if Authorization header is missing', () => {
      const req = { headers: {} };
      const res = createMockRes();
      const next = vi.fn();

      verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Access denied. No authentication token provided.'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('returns 401 if Authorization header does not start with Bearer', () => {
      const req = { headers: { authorization: 'Basic dXNlcjpwYXNz' } };
      const res = createMockRes();
      const next = vi.fn();

      verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Access denied. No authentication token provided.'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('returns 401 if token is malformed or invalid signature', () => {
      const req = { headers: { authorization: 'Bearer invalid.token.payload' } };
      const res = createMockRes();
      const next = vi.fn();

      verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Invalid or expired authentication token.'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('returns 401 if token is expired', () => {
      // Create an expired token (-1s)
      const expiredToken = jwt.sign({ id: 'user123', email: 'test@example.com' }, JWT_SECRET, { expiresIn: '-1s' });
      const req = { headers: { authorization: `Bearer ${expiredToken}` } };
      const res = createMockRes();
      const next = vi.fn();

      verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Invalid or expired authentication token.'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('attaches user payload to req.user and calls next() on valid token', () => {
      const payload = { id: 'u101', email: 'buyer@promohomex.com', role: 'buyer' };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
      const req = { headers: { authorization: `Bearer ${token}` } };
      const res = createMockRes();
      const next = vi.fn();

      verifyToken(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(req.user).toBeDefined();
      expect(req.user.id).toBe('u101');
      expect(req.user.email).toBe('buyer@promohomex.com');
      expect(req.user.role).toBe('buyer');
    });
  });

  describe('verifyAdmin', () => {
    it('returns 403 if req.user is undefined', () => {
      const req = {};
      const res = createMockRes();
      const next = vi.fn();

      verifyAdmin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Access forbidden. Admin privileges required.'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('returns 403 if user role is not admin', () => {
      const req = { user: { id: 'u101', role: 'buyer' } };
      const res = createMockRes();
      const next = vi.fn();

      verifyAdmin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Access forbidden. Admin privileges required.'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('calls next() if user role is admin', () => {
      const req = { user: { id: 'admin1', role: 'admin' } };
      const res = createMockRes();
      const next = vi.fn();

      verifyAdmin(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('generateToken', () => {
    it('generates a valid JWT token that can be decoded using JWT_SECRET', () => {
      const payload = { id: 'admin_test', email: 'admin@promohomex.com', role: 'admin' };
      const token = generateToken(payload);

      expect(typeof token).toBe('string');
      const decoded = jwt.verify(token, JWT_SECRET);
      expect(decoded.id).toBe('admin_test');
      expect(decoded.email).toBe('admin@promohomex.com');
      expect(decoded.role).toBe('admin');
    });
  });
});
