// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for handling 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Automatically logout if 401 Unauthorized response from API
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authService = {
  login: (credentials) => api.post('/auth/signin', credentials),
  register: (userData) => api.post('/auth/signup', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

// User APIs
export const userService = {
  getAllUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// Membership Plan APIs
export const planService = {
  getAllPlans: () => api.get('/plans'),
  getActivePlans: () => api.get('/plans/active'),
  getPlan: (id) => api.get(`/plans/${id}`),
  createPlan: (planData) => api.post('/plans', planData),
  updatePlan: (id, planData) => api.put(`/plans/${id}`, planData),
  deletePlan: (id) => api.delete(`/plans/${id}`),
  // Public endpoints (no authentication required)
  getPublicActivePlans: () => axios.get(`${API_URL}/plans/public/active`),
};

// Subscription APIs
export const subscriptionService = {
  getAllSubscriptions: () => api.get('/subscriptions'),
  getUserSubscriptions: (userId) => api.get(`/subscriptions/user/${userId}`),
  getMySubscriptions: () => api.get('/subscriptions/my'),
  getSubscription: (id) => api.get(`/subscriptions/${id}`),
  createSubscription: (subscriptionData) => api.post('/subscriptions', subscriptionData),
  updateSubscription: (id, subscriptionData) => api.put(`/subscriptions/${id}`, subscriptionData),
  cancelSubscription: (id) => api.post(`/subscriptions/cancel/${id}`),
  createCheckoutSession: (planId) => api.post(`/subscriptions/checkout/${planId}`),
};

// Payment APIs
export const paymentService = {
  getAllPayments: () => api.get('/payments'),
  getPayment: (id) => api.get(`/payments/${id}`),
  getPaymentsBySubscription: (subscriptionId) => api.get(`/payments/subscription/${subscriptionId}`),
};

export default api;

