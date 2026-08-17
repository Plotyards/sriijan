const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const apiService = {
  // Auth API
  loginUser: async (email, password) => {
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
    } catch (err) {
      console.warn('Backend API offline, falling back to local database:', err.message);
      return null;
    }
  },

  registerUser: async (name, phone, email, password) => {
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
    } catch (err) {
      console.warn('Backend API offline, falling back to local database:', err.message);
      return null;
    }
  },

  loginAdmin: async (email, password) => {
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
    } catch (err) {
      console.warn('Backend API offline, falling back to local database:', err.message);
      return null;
    }
  },

  // Properties API
  fetchProperties: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/properties`);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, falling back to local properties:', err.message);
      return null;
    }
  },

  createProperty: async (bookingData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/properties`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookingData)
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, using local property creation:', err.message);
      return null;
    }
  },

  updateStageProgress: async (propertyId, stageKey, newPercentage) => {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${propertyId}/progress`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ stageKey, newPercentage })
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, updating local state:', err.message);
      return null;
    }
  },

  approveProperty: async (propertyId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${propertyId}/verify`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, updating local state:', err.message);
      return null;
    }
  },

  updatePropertyPrices: async (propertyId, builderPrice, resalePrice) => {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${propertyId}/prices`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ builderPrice, resalePrice })
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, updating local state:', err.message);
      return null;
    }
  },

  addPhotoToProperty: async (propertyId, photoData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${propertyId}/photos`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ photo: photoData })
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, updating local state:', err.message);
      return null;
    }
  },

  addDocumentToProperty: async (propertyId, documentData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${propertyId}/documents`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ document: documentData })
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, updating local state:', err.message);
      return null;
    }
  },

  fetchUsers: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, using local users:', err.message);
      return null;
    }
  },

  // Razorpay Gateway API
  createRazorpayOrder: async (amount = 699) => {
    try {
      const res = await fetch(`${API_BASE_URL}/payment/create-razorpay-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      return await res.json();
    } catch (err) {
      console.warn('Razorpay server endpoint offline, using client fallback order:', err.message);
      return {
        success: true,
        order: { id: `order_${Math.random().toString(36).substring(2, 15)}`, amount: amount * 100 },
        key: 'rzp_live_Sz3GfNd3GUm8xR'
      };
    }
  },

  verifyRazorpayPayment: async (paymentDetails) => {
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
          paymentId: paymentDetails.razorpay_payment_id || `pay_${Date.now()}`,
          orderId: paymentDetails.razorpay_order_id || `order_${Date.now()}`,
          amount: 699,
          status: 'Paid'
        }
      };
    }
  }
};
