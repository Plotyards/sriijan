import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { apiService } from '../../src/services/api.js';

// Setup mock localStorage for Node environment
const mockStorage = {};
const localStorageMock = {
  getItem: vi.fn((key) => mockStorage[key] || null),
  setItem: vi.fn((key, value) => { mockStorage[key] = String(value); }),
  removeItem: vi.fn((key) => { delete mockStorage[key]; }),
  clear: vi.fn(() => {
    for (const key in mockStorage) delete mockStorage[key];
  })
};

global.localStorage = localStorageMock;

describe('Frontend apiService & Resilience Tests', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe('Auth API service', () => {
    it('loginUser stores token in localStorage on success', async () => {
      const mockData = { success: true, token: 'mock-jwt-token-123', user: { name: 'Nikhil' } };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData
      });

      const response = await apiService.loginUser('nikhil@example.com', 'password123');

      expect(response).toEqual(mockData);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'mock-jwt-token-123');
    });

    it('loginUser handles network error gracefully by returning null', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network connection refused'));

      const response = await apiService.loginUser('offline@example.com', 'pass');
      expect(response).toBeNull();
    });

    it('registerUser stores token in localStorage on success', async () => {
      const mockData = { success: true, token: 'registered-token-456', user: { name: 'Priya' } };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData
      });

      const response = await apiService.registerUser('Priya', '+91 9812345678', 'priya@example.com', 'pass123');

      expect(response).toEqual(mockData);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'registered-token-456');
    });

    it('loginAdmin stores adminToken in localStorage on success', async () => {
      const mockData = { success: true, token: 'admin-token-789', role: 'admin' };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData
      });

      const response = await apiService.loginAdmin('admin@promohomex.com', 'admin123');

      expect(response).toEqual(mockData);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('adminToken', 'admin-token-789');
    });
  });

  describe('Properties API service & Authorization Headers', () => {
    it('fetchProperties returns property list when ok', async () => {
      const mockProps = [{ id: 'PH-101', name: 'Promohomex Residency' }];
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockProps
      });

      const result = await apiService.fetchProperties();
      expect(result).toEqual(mockProps);
    });

    it('fetchProperties returns null when server returns non-ok response', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500
      });

      const result = await apiService.fetchProperties();
      expect(result).toBeNull();
    });

    it('createProperty attaches Authorization header when token is in localStorage', async () => {
      mockStorage['token'] = 'my-auth-token';
      const bookingData = { projectName: 'Skyline Heights', bookedPrice: 15000000 };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, id: 'PH-105' })
      });

      await apiService.createProperty(bookingData);

      expect(global.fetch).toHaveBeenCalled();
      const callArgs = global.fetch.mock.calls[0];
      const headers = callArgs[1].headers;
      expect(headers['Authorization']).toBe('Bearer my-auth-token');
      expect(headers['Content-Type']).toBe('application/json');
    });

    it('createProperty handles network error by returning null', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Server unreachable'));

      const result = await apiService.createProperty({ projectName: 'Test' });
      expect(result).toBeNull();
    });
  });

  describe('Razorpay Gateway API resilience & fallbacks', () => {
    it('createRazorpayOrder returns backend order response when server is online', async () => {
      const mockOrderResponse = {
        success: true,
        order: { id: 'order_123456', amount: 69900 },
        key: 'rzp_live_Sz3GfNd3GUm8xR'
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockOrderResponse
      });

      const result = await apiService.createRazorpayOrder(699);
      expect(result).toEqual(mockOrderResponse);
    });

    it('createRazorpayOrder falls back to instant client order if API fails or aborts', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Gateway timeout'));

      const result = await apiService.createRazorpayOrder(699);

      expect(result.success).toBe(true);
      expect(result.order.id).toMatch(/^order_/);
      expect(result.order.amount).toBe(69900);
      expect(result.key).toBe('rzp_live_Sz3GfNd3GUm8xR');
    });

    it('verifyRazorpayPayment returns fallback paymentDetails if backend is unreachable', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Connection dropped'));

      const paymentInput = {
        razorpay_payment_id: 'pay_test_999',
        razorpay_order_id: 'order_test_999'
      };

      const result = await apiService.verifyRazorpayPayment(paymentInput);

      expect(result.success).toBe(true);
      expect(result.paymentDetails.paymentId).toBe('pay_test_999');
      expect(result.paymentDetails.orderId).toBe('order_test_999');
      expect(result.paymentDetails.status).toBe('Paid');
      expect(result.paymentDetails.amount).toBe(699);
    });
  });
});
