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

  // Admin: Get single transaction details by reference
  getTransactionDetails: async (reference) => {
    const response = await api.get(`/admin/transactions/${reference}`);
    return response.data;
  },

  // Admin: Get single transaction by reference (search)
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
  },

  // Admin: Export transactions as CSV
  exportTransactionsCSV: async (params = {}) => {
    const response = await api.get('/admin/transactions/export/csv', {
      params,
      responseType: 'blob'
    });
    
    // Check if response is actually CSV or an error JSON
    const contentType = response.headers['content-type'];
    if (contentType && contentType.includes('application/json')) {
      // Backend returned JSON error, parse it
      const text = await response.data.text();
      const error = JSON.parse(text);
      throw new Error(error.message || 'Failed to export CSV');
    }
    
    // Create blob and trigger download
    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  // Admin: Download receipt PDF
  downloadReceipt: async (reference) => {
    const response = await api.get(`/admin/transactions/${reference}/receipt`, {
      responseType: 'blob'
    });
    
    // Check if response is actually PDF or an error
    const contentType = response.headers['content-type'];
    console.log('Receipt response content-type:', contentType);
    console.log('Receipt response size:', response.data.size);
    
    if (contentType && contentType.includes('application/json')) {
      // Backend returned JSON error, parse it
      const text = await response.data.text();
      const error = JSON.parse(text);
      throw new Error(error.message || 'Failed to download receipt');
    }
    
    if (!contentType || !contentType.includes('application/pdf')) {
      // Not a PDF - might be HTML error page
      const text = await response.data.text();
      console.error('Receipt response is not PDF:', text.substring(0, 200));
      throw new Error('Backend did not return a PDF. Please check if the endpoint is working correctly.');
    }
    
    // Create blob and trigger download
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${reference}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
};

export default paymentService;
