/**
 * Partners Service
 * Partnership management and sponsorship tracking
 * 
 * Backend Endpoints (from Postman collection):
 * - GET /partners - Get public list of partners
 * - GET /partners/:id - Get single partner details
 * - POST /admin/partners - Create partnership (admin)
 * - PUT /admin/partners/:id - Update partnership (admin)
 * - POST /partner/apply - Submit partnership application (public)
 */

import api from './api';

const partnersService = {
    /**
     * Get all partnerships (public list)
     * GET /partners?page=1&limit=20
     * @param {Object} params - Query parameters
     * @param {number} params.page - Page number
     * @param {number} params.limit - Items per page
     * @returns {Promise} List of partnerships
     */
    getAllPartnerships: async (params = {}) => {
        const response = await api.get('/partners', { params });
        const payload = response.data?.data;

        const items = Array.isArray(payload) ? payload : (payload?.data || []);
        const pagination = payload?.pagination || {
            page: params.page || 1,
            limit: params.limit || 20,
            total: items.length,
            totalPages: Math.ceil(items.length / (params.limit || 20))
        };

        return {
            data: items,
            pagination
        };
    },

    /**
     * Get single partnership details
     * GET /partners/:id
     * @param {string} id - Partnership ID
     * @returns {Promise} Partnership details
     */
    getPartnershipById: async (id) => {
        const response = await api.get(`/partners/${id}`);
        return response.data?.data || response.data;
    },

    /**
     * Submit partnership application (public)
     * POST /partner/apply
     * @param {Object} data - Partnership application data
     * @returns {Promise} Application submission response
     */
    submitPartnershipApplication: async (data) => {
        const response = await api.post('/partner/apply', {
            organizationName: data.organizationName,
            organizationType: data.organizationType,
            website: data.website || '',
            country: data.country,
            contactName: data.contactName,
            position: data.position,
            email: data.email,
            phone: data.phone,
            partnershipType: data.partnershipType,
            interests: data.interests || [],
            timeline: data.timeline || '',
            message: data.message,
            submittedAt: new Date().toISOString()
        });
        return response.data?.data || response.data;
    },

    /**
     * Create new partnership (admin)
     * POST /admin/partners
     * @param {Object} data - Partnership data
     * @returns {Promise} Created partnership response
     */
    createPartnership: async (data) => {
        const response = await api.post('/admin/partners', {
            name: data.organizationName,
            description: data.description || '',
            website: data.website || '',
            logo: data.logo || '',
            contact: data.email,
            partnershipType: data.type || 'sponsor'
        });
        return response.data?.data || response.data;
    },

    /**
     * Update existing partnership (admin)
     * PUT /admin/partners/:id
     * @param {string} id - Partnership ID
     * @param {Object} data - Updated partnership data
     * @returns {Promise} Updated partnership response
     */
    updatePartnership: async (id, data) => {
        const response = await api.put(`/admin/partners/${id}`, {
            name: data.organizationName,
            description: data.description || '',
            website: data.website || '',
            logo: data.logo || '',
            contact: data.email,
            partnershipType: data.type || 'sponsor',
            status: data.status
        });
        return response.data?.data || response.data;
    }
};

export default partnersService;
