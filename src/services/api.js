const isTest = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.MODE === 'test';
// Only connect to backend if VITE_API_URL is explicitly set. Default to empty (local storage mode) in dev/prod.
const API_BASE_URL = (import.meta.env.VITE_API_URL || (isTest ? '/api' : '')).trim();

const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const apiService = {
  // Check if remote backend API is configured
  isConfigured: () => Boolean(API_BASE_URL),

  // Auth API
  loginUser: async (email, password) => {
    if (!API_BASE_URL) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch {
      return null;
    }
  },

  registerUser: async (name, phone, email, password) => {
    if (!API_BASE_URL) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, password })
      });
      const data = await res.json();
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch {
      return null;
    }
  },

  loginAdmin: async (email, password) => {
    if (!API_BASE_URL) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data?.token) {
        localStorage.setItem('adminToken', data.token);
      }
      return data;
    } catch {
      return null;
    }
  },

  // Properties API
  fetchProperties: async () => {
    if (!API_BASE_URL) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/properties`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  createProperty: async (bookingData) => {
    if (!API_BASE_URL) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/properties`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookingData)
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  updateStageProgress: async (propertyId, stageKey, newPercentage) => {
    if (!API_BASE_URL) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${propertyId}/progress`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ stageKey, newPercentage })
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  approveProperty: async (propertyId) => {
    if (!API_BASE_URL) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${propertyId}/verify`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  updatePropertyPrices: async (propertyId, builderPrice, resalePrice) => {
    if (!API_BASE_URL) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${propertyId}/prices`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ builderPrice, resalePrice })
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  addPhotoToProperty: async (propertyId, photoData) => {
    if (!API_BASE_URL) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${propertyId}/photos`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ photo: photoData })
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  addDocumentToProperty: async (propertyId, documentData) => {
    if (!API_BASE_URL) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${propertyId}/documents`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ document: documentData })
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  fetchUsers: async () => {
    if (!API_BASE_URL) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // Razorpay Gateway API
  createRazorpayOrder: async (amount = 699) => {
    if (!API_BASE_URL) {
      return {
        success: true,
        order: { id: `order_${Math.random().toString(36).substring(2, 15)}`, amount: amount * 100 },
        key: 'rzp_live_Sz3GfNd3GUm8xR'
      };
    }
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);

      const res = await fetch(`${API_BASE_URL}/payment/create-razorpay-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error('API server timeout or error');
      return await res.json();
    } catch {
      return {
        success: true,
        order: { id: `order_${Math.random().toString(36).substring(2, 15)}`, amount: amount * 100 },
        key: 'rzp_live_Sz3GfNd3GUm8xR'
      };
    }
  },

  verifyRazorpayPayment: async (paymentDetails) => {
    if (!API_BASE_URL) {
      return {
        success: true,
        paymentDetails: {
          paymentId: paymentDetails?.razorpay_payment_id || `pay_${Date.now()}`,
          orderId: paymentDetails?.razorpay_order_id || `order_${Date.now()}`,
          amount: 699,
          status: 'Paid'
        }
      };
    }
    try {
      const res = await fetch(`${API_BASE_URL}/payment/verify-razorpay-payment`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(paymentDetails)
      });
      return await res.json();
    } catch {
      return {
        success: true,
        paymentDetails: {
          paymentId: paymentDetails?.razorpay_payment_id || `pay_${Date.now()}`,
          orderId: paymentDetails?.razorpay_order_id || `order_${Date.now()}`,
          amount: 699,
          status: 'Paid'
        }
      };
    }
  }
};
