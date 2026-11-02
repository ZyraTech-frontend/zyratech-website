/**
 * Payments Service
 * Manage transactions and revenue
 */

import api from './api';

export const paymentService = {
  // Customer: Initialize payment
  initializePayment: async (data) => {
    const response = await api.post('/payments/initialize', data);
    return response.data.data;
  },

  // Customer: Verify payment
  verifyPayment: async (reference) => {
    const response = await api.get(`/payments/verify/${reference}`);
    return response.data.data;
  },

  // Admin: Get all transactions with pagination and filters
  getTransactions: async (params = {}) => {
    const response = await api.get('/admin/transactions', { params });
    return response.data; // Returns { success, message, data: [...], pagination: {...} }
  },

  // Admin: Get single transaction by reference
  getTransactionByReference: async (reference) => {
    const response = await api.get('/admin/transactions', {
      params: { search: reference }
    });
    return response.data;
  },

  // Admin: Refund payment
  refundPayment: async (reference, data) => {
    const response = await api.post(`/admin/transactions/${reference}/refund`, data);
    return response.data;
  }
};

export default paymentService;
