/**
 * Testimonials Service
 * API Integration for Testimonials (Public + Admin)
 * 
 * Endpoints:
 * - GET /api/testimonials - Public testimonials (no auth required)
 * - GET /api/admin/testimonials - Admin list (requires auth + content permission)
 * - GET /api/admin/testimonials/:id - Admin get single (requires auth)
 * - POST /api/admin/testimonials - Admin create (requires auth)
 * - PUT /api/admin/testimonials/:id - Admin update (requires auth)
 * - DELETE /api/admin/testimonials/:id - Admin delete (requires auth)
 * - POST /api/admin/testimonials/upload - Upload avatar image (requires auth)
 */

import api from './api';

const testimonialsService = {
    // ========== PUBLIC ENDPOINTS ==========
    
    /**
     * Get published testimonials (public - no auth required)
     * @param {number} page - Page number (default: 1)
     * @param {number} limit - Items per page (default: 20)
     * @param {boolean} isFeatured - Filter by featured status (optional)
     * @returns {Promise} - { data: { data: [], pagination: {} } }
     */
    getPublicTestimonials: async (page = 1, limit = 20, isFeatured = null) => {
        let url = `/testimonials?page=${page}&limit=${limit}`;
        if (isFeatured !== null) {
            url += `&isFeatured=${isFeatured}`;
        }
        return api.get(url);
    },

    // ========== ADMIN ENDPOINTS ==========

    /**
     * Get all testimonials including drafts (admin only)
     * @param {number} page - Page number (default: 1)
     * @param {number} limit - Items per page (default: 20)
     * @param {string} status - Filter by status: "draft" | "published" | "archived" (optional)
     * @param {boolean} isFeatured - Filter by featured status (optional)
     * @returns {Promise} - { data: { data: [], pagination: {} } }
     */
    getAdminTestimonials: async (page = 1, limit = 20, status = null, isFeatured = null) => {
        let url = `/admin/testimonials?page=${page}&limit=${limit}`;
        if (status) {
            url += `&status=${status}`;
        }
        if (isFeatured !== null) {
            url += `&isFeatured=${isFeatured}`;
        }
        return api.get(url);
    },

    /**
     * Get single testimonial details (admin)
     * @param {string} id - Testimonial ID
     * @returns {Promise} - { data: { id, name, role, organization, content, ... } }
     */
    getAdminTestimonialById: async (id) => {
        return api.get(`/admin/testimonials/${id}`);
    },

    /**
     * Create new testimonial (admin)
     * @param {object} data - Testimonial data:
     *   - name (required): string
     *   - role (optional): string
     *   - organization (optional): string
     *   - content (required): string
     *   - avatarUrl (optional): string
     *   - rating (optional): number (1-5)
     *   - isFeatured (optional): boolean (default: false)
     *   - status (optional): "draft" | "published" | "archived" (default: "draft")
     * @returns {Promise} - { data: { id, name, ... } }
     */
    createAdminTestimonial: async (data) => {
        return api.post('/admin/testimonials', data);
    },

    /**
     * Update testimonial (admin)
     * @param {string} id - Testimonial ID
     * @param {object} data - Fields to update (all optional)
     * @returns {Promise} - { data: { id, ... } }
     */
    updateAdminTestimonial: async (id, data) => {
        return api.put(`/admin/testimonials/${id}`, data);
    },

    /**
     * Delete testimonial (admin)
     * @param {string} id - Testimonial ID
     * @returns {Promise} - { success: true }
     */
    deleteAdminTestimonial: async (id) => {
        return api.delete(`/admin/testimonials/${id}`);
    },

    /**
     * Upload avatar image (admin)
     * @param {File} file - Image file (JPEG, PNG, GIF, WebP)
     * @returns {Promise} - { data: { url: "https://..." } }
     */
    uploadAvatar: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/admin/testimonials/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};

export default testimonialsService;
