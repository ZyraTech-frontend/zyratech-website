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
   * GET /api/admin/newsletter/subscribers?page=1&limit=50
   * 
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Items per page (default: 50)
   * @returns {Promise<Array>} List of subscribers
   */
  getSubscribers: async (page = 1, limit = 50) => {
    try {
      console.log('[Newsletter] Fetching subscribers:', { page, limit });
      const response = await api.get('/admin/newsletter/subscribers', {
        params: { page, limit }
      });
      console.log('[Newsletter] Subscribers response:', response.data);
      
      // Handle different response structures
      const data = response.data?.data || response.data?.subscribers || response.data || [];
      return Array.isArray(data) ? data : [];
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
