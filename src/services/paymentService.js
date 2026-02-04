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

  // Admin: Get all transactions
  getTransactions: async (params = {}) => {
    const response = await api.get('/admin/transactions', { params });
    return response.data.data;
  },

  // Admin: Get single transaction
  getTransaction: async (id) => {
    const response = await api.get(`/admin/transactions/${id}`);
    return response.data.data;
  },

  // Super Admin: Refund payment
  refundPayment: async (transactionId, data) => {
    const response = await api.post(`/admin/transactions/${transactionId}/refund`, data);
    return response.data.data;
  },

  // Admin: Get invoices
  getInvoices: async (params = {}) => {
    const response = await api.get('/admin/invoices', { params });
    return response.data.data;
  },

  // Admin: Download invoice
  downloadInvoice: async (invoiceId) => {
    const response = await api.get(`/admin/invoices/${invoiceId}/download`, {
      responseType: 'blob'
    });
    return response.data;
  },

  // Super Admin: Get revenue stats
  getRevenueStats: async (period = 'month') => {
    const response = await api.get('/admin/revenue-stats', {
      params: { period }
    });
    return response.data.data;
  }
};

export default paymentService;
