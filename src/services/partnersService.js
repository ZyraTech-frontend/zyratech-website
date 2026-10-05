/**
 * Partners Service
 * Partnership management and sponsorship tracking
 * 
 * Backend Endpoints:
 * PUBLIC (No Auth):
 * - POST /api/partnerships - Submit partnership application
 * - GET /api/partnerships?page=1&limit=20 - List all active partnerships
 * - GET /api/partnerships/:id - Get single partnership details
 * 
 * ADMIN (Auth Required):
 * - POST /api/admin/partnerships - Create partnership for public display
 * - PUT /api/admin/partnerships/:id - Update partnership
 * - GET /api/admin/partnerships - List partnership applications
 * - PATCH /api/admin/partnerships/:id/status - Update application status
 * - DELETE /api/admin/partnerships/:id - Delete application
 */

import api from './api';

const partnersService = {
    // ============ PUBLIC ENDPOINTS ============

    /**
     * Submit partnership application (public)
     * POST /api/partnerships
     * @param {Object} data - Partnership application data
     * @returns {Promise} Application submission response
     */
    submitPartnershipApplication: async (data) => {
        const response = await api.post('/partnerships', {
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
            agreedToTerms: data.agreedToTerms === true
        });
        return response.data?.data || response.data;
    },

    /**
     * Get all active partnerships (public list)
     * GET /api/partnerships?page=1&limit=20
     * @param {Object} params - Query parameters
     * @param {number} params.page - Page number
     * @param {number} params.limit - Items per page
     * @returns {Promise} List of partnerships
     */
    getAllPartnerships: async (params = {}) => {
        const response = await api.get('/partnerships', { params });
        const payload = response.data?.data;

        const items = Array.isArray(payload) ? payload : (payload?.data || []);
        const pagination = response.data?.pagination || {
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
     * Get single partnership details (public)
     * GET /api/partnerships/:id
     * @param {string} id - Partnership ID
     * @returns {Promise} Partnership details
     */
    getPartnershipById: async (id) => {
        const response = await api.get(`/partnerships/${id}`);
        return response.data?.data || response.data;
    },

    // ============ ADMIN ENDPOINTS ============

    /**
     * Create new partnership for public display (admin only)
     * POST /api/admin/partnerships
     * @param {Object} data - Partnership data
     * @returns {Promise} Created partnership response
     */
    createPartnership: async (data) => {
        const response = await api.post('/admin/partnerships', {
            name: data.name || data.organizationName,
            description: data.description || '',
            website: data.website || '',
            logo: data.logo || '',
            contact: data.contact || data.email,
            partnershipType: data.partnershipType || data.type,
            status: data.status || 'active'
        });
        return response.data?.data || response.data;
    },

    /**
     * Update existing partnership (admin only)
     * PUT /api/admin/partnerships/:id
     * @param {string} id - Partnership ID
     * @param {Object} data - Updated partnership data (all fields optional)
     * @returns {Promise} Updated partnership response
     */
    updatePartnership: async (id, data) => {
        const response = await api.put(`/admin/partnerships/${id}`, {
            name: data.name || data.organizationName,
            description: data.description,
            website: data.website,
            logo: data.logo,
            contact: data.contact || data.email,
            partnershipType: data.partnershipType || data.type,
            status: data.status
        });
        return response.data?.data || response.data;
    },

    /**
     * Get all partnership applications (admin only)
     * GET /api/admin/partnerships
     * @param {Object} params - Query parameters
     * @returns {Promise} List of partnership applications
     */
    getAdminPartnerships: async (params = {}) => {
        const response = await api.get('/admin/partnerships', { params });
        const payload = response.data?.data;

        const items = Array.isArray(payload) ? payload : (payload?.data || []);
        const pagination = response.data?.pagination || {
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
     * Update partnership application status (admin only)
     * PATCH /api/admin/partnerships/:id/status
     * @param {string} id - Partnership ID
     * @param {string} status - New status (PENDING, APPROVED, REJECTED)
     * @returns {Promise} Updated partnership response
     */
    updatePartnershipStatus: async (id, status) => {
        // Map frontend status values to backend ApplicationStatus enum
        const statusMap = {
            'pending': 'PENDING',
            'approved': 'APPROVED',
            'rejected': 'REJECTED',
            'active': 'APPROVED',      // Map 'active' to APPROVED
            'inactive': 'REJECTED'      // Map 'inactive' to REJECTED
        };
        
        const mappedStatus = statusMap[status?.toLowerCase()] || status;
        
        const response = await api.patch(`/admin/partnerships/${id}/status`, {
            status: mappedStatus
        });
        return response.data?.data || response.data;
    },

    /**
     * Delete partnership application (admin only)
     * DELETE /api/admin/partnerships/:id
     * @param {string} id - Partnership ID
     * @returns {Promise} Deletion response
     */
    deletePartnership: async (id) => {
        const response = await api.delete(`/admin/partnerships/${id}`);
        return response.data?.data || response.data;
    }
};

export default partnersService;
