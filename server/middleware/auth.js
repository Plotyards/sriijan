import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'promohomex_super_secret_jwt_key_2026_!@#';

/**
 * Middleware to verify JWT token in Authorization header
 * Header format: Authorization: Bearer <token>
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Access denied. No authentication token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired authentication token.' });
  }
};

/**
 * Middleware to verify admin role from decoded JWT user payload
 */
export const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Access forbidden. Admin privileges required.' });
  }
  next();
};

/**
 * Helper to generate JWT token for user/admin
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};
