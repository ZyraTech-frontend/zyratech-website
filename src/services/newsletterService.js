/**
 * Newsletter Service
 * Handles newsletter subscription and management
 */

import api from './api';

const newsletterService = {
  /**
   * Subscribe email to newsletter
   * POST /api/newsletter/subscribe
   * 
   * @param {string} email - Email address to subscribe (required)
   * @param {string} name - Optional name of subscriber
   * @returns {Promise<Object>} Subscription response
   */
  subscribe: async (email, name = '') => {
    try {
      const response = await api.post('/newsletter/subscribe', {
        email,
        ...(name && { name })
      });
      return response.data;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  },

  /**
   * Get all newsletter subscribers (admin only)
   * GET /api/admin/newsletter/?page=1&limit=10
   * 
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Items per page (default: 10)
   * @param {string} status - Filter by status: "subscribed" or "unsubscribed" (optional)
   * @param {string} search - Search by email or name (optional)
   * @returns {Promise<Object>} Subscribers data with pagination
   */
  getSubscribers: async (page = 1, limit = 10, status = null, search = null) => {
    try {
      console.log('[Newsletter] Fetching subscribers:', { page, limit, status, search });
      
      const params = { page, limit };
      if (status) params.status = status;
      if (search) params.search = search;
      
      const response = await api.get('/admin/newsletter/', { params });
      console.log('[Newsletter] Subscribers response:', response.data);
      
      // Backend returns data in response.data structure
      return response.data;
    } catch (error) {
      console.error('[Newsletter] Error fetching subscribers:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data
      });
      throw error;
    }
  },

  /**
   * Unsubscribe email from newsletter
   * POST /api/newsletter/unsubscribe
   * 
   * @param {string} email - Email address to unsubscribe
   * @returns {Promise<Object>} Unsubscribe response
   */
  unsubscribe: async (email) => {
    try {
      const response = await api.post('/newsletter/unsubscribe', {
        email
      });
      return response.data;
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      throw error;
    }
  },
};

export default newsletterService;
