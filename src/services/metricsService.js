/**
 * Metrics Service
 * Handles fetching platform impact metrics from the API
 */

import api from './api';

const metricsService = {
  /**
   * Get impact metrics summary for homepage display
   * GET /api/impact/summary
   * 
   * @returns {Promise<Object>} Metrics data with projects, success rate, etc.
   */
  getImpactSummary: async () => {
    try {
      const response = await api.get('/impact/summary');
      return response.data;
    } catch (error) {
      console.error('Error fetching impact metrics:', error);
      throw error;
    }
  },
};

export default metricsService;
