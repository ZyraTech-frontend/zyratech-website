/**
 * Statistics Service
 * Fetches real-time counts from database for impact metrics
 */

import api from './api';

const statisticsService = {
    /**
     * Get partnership page statistics (real counts from database)
     * Returns active partners, students trained, and projects completed
     */
    getPartnershipStats: async () => {
        try {
            const response = await api.get('/statistics/partnership');
            return response.data?.data || response.data;
        } catch (error) {
            console.error('Error fetching partnership statistics:', error);
            throw error;
        }
    },

    /**
     * Get general platform statistics
     * Returns all platform-wide metrics
     */
    getPlatformStats: async () => {
        try {
            const response = await api.get('/statistics/platform');
            return response.data?.data || response.data;
        } catch (error) {
            console.error('Error fetching platform statistics:', error);
            throw error;
        }
    }
};

export default statisticsService;
