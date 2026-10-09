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
   * @param {string} email - Email address to subscribe
   * @param {string} source - Optional source page for tracking
   * @returns {Promise<Object>} Subscription response
   */
  subscribe: async (email, source = 'Website') => {
    try {
      const response = await api.post('/newsletter/subscribe', {
        email,
        source
      });
      return response.data;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
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
