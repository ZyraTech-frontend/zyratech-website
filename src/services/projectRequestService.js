/**
 * Project Request Service
 * Handles user requests for custom projects
 * 
 * Backend Endpoints:
 * POST /api/project-requests - Submit new project request (public)
 * GET /api/admin/project-requests - List all requests (admin only)
 * GET /api/admin/project-requests/:id - Get specific request (admin only)
 * PATCH /api/admin/project-requests/:id/status - Update status (admin only)
 * DELETE /api/admin/project-requests/:id - Delete request (admin only)
 */

import api from './api';

const projectRequestService = {
    /**
     * Submit a project request (Public - No Auth Required)
     * POST /api/project-requests
     * @param {Object} requestData - Project request data
     * @param {string} requestData.fullName - Full name (required)
     * @param {string} requestData.email - Email address (required)
     * @param {string} requestData.phone - Phone number (required)
     * @param {string} requestData.projectTitle - Project title (required)
     * @param {string} requestData.description - Project description (required)
     * @param {string} requestData.projectType - Project type: web|mobile|desktop|ai|other (required)
     * @param {string} requestData.packageType - Package type: student-projects|business-projects|enterprise (required)
     * @param {string} requestData.company - Company name (optional)
     * @param {string} requestData.budget - Budget range, e.g. "$5,000 - $10,000" (optional)
     * @param {string} requestData.timeline - Timeline, e.g. "3-6 months" (optional)
     * @param {Array<string>} requestData.technologies - Technologies needed (optional)
     * @param {string} requestData.additionalNotes - Additional notes (optional)
     * @returns {Promise} Submission response with created request object
     */
    submitProjectRequest: async (requestData) => {
        try {
            // Validate required fields
            if (!requestData.fullName?.trim() || !requestData.email?.trim() || !requestData.phone?.trim()) {
                throw new Error('Name, email, and phone are required');
            }
            if (!requestData.projectTitle?.trim() || !requestData.description?.trim()) {
                throw new Error('Project title and description are required');
            }
            if (!requestData.projectType) {
                throw new Error('Project type is required');
            }
            if (!requestData.packageType) {
                throw new Error('Package type is required');
            }

            // Format the request data to match backend schema
            const payload = {
                fullName: requestData.fullName.trim(),
                email: requestData.email.trim(),
                phone: requestData.phone.trim(),
                projectTitle: requestData.projectTitle.trim(),
                description: requestData.description.trim(),
                projectType: requestData.projectType,
                packageType: requestData.packageType, // REQUIRED: backend needs this to categorize the request
                company: requestData.company?.trim() || null,
                budget: requestData.budget || null,
                timeline: requestData.timeline || null,
                technologies: Array.isArray(requestData.technologies) ? requestData.technologies : [],
                additionalNotes: requestData.additionalNotes?.trim() || null
            };

            const response = await api.post('/project-requests', payload);
            return response.data?.data || response.data;
        } catch (error) {
            console.error('Error submitting project request:', error);
            throw error;
        }
    },

    /**
     * Get all project requests (Admin Only)
     * GET /api/admin/project-requests
     * @param {Object} params - Query parameters
     * @param {number} params.page - Page number (default: 1)
     * @param {number} params.limit - Items per page (default: 20, max: 100)
     * @param {string} params.status - Filter by status: pending|approved|rejected
     * @param {string} params.packageType - Filter by package: student-projects|business-projects|enterprise
     * @param {string} params.search - Search by fullName, email, projectTitle, company
     * @returns {Promise} List of project requests with pagination
     */
    getAdminProjectRequests: async (params = {}) => {
        try {
            const response = await api.get('/admin/project-requests', { params });
            console.log('[projectRequestService.getAdminProjectRequests] Full Response:', response.data);
            
            // Backend returns: { success: true, data: { data: [...], pagination: {...} }, message: "..." }
            // Note: Backend has NESTED data structure
            const responseData = response.data;
            
            // Extract the nested data and pagination
            const nestedData = responseData?.data || {};
            const requests = Array.isArray(nestedData?.data) ? nestedData.data : [];
            const pagination = nestedData?.pagination || {};
            
            console.log('[projectRequestService] Extracted requests:', requests);
            console.log('[projectRequestService] Pagination:', pagination);
            
            return {
                requests: requests || [],
                total: pagination.total || 0,
                page: pagination.page || 1,
                limit: pagination.limit || 20,
                pages: pagination.totalPages || 1,
                message: responseData?.message
            };
        } catch (error) {
            console.error('Error fetching project requests:', error);
            throw error;
        }
    },

    /**
     * Get specific project request (Admin Only)
     * GET /api/admin/project-requests/:id
     * @param {string} id - Request ID
     * @returns {Promise} Project request object
     */
    getProjectRequestById: async (id) => {
        try {
            const response = await api.get(`/admin/project-requests/${id}`);
            return response.data?.data || response.data;
        } catch (error) {
            console.error(`Error fetching project request ${id}:`, error);
            throw error;
        }
    },

    /**
     * Update project request status (Admin Only)
     * PATCH /api/admin/project-requests/:id/status
     * @param {string} id - Request ID
     * @param {Object} updateData - Status update data
     * @param {string} updateData.status - New status: approved|rejected
     * @param {string} updateData.reviewNotes - Review notes (optional)
     * @returns {Promise} Updated request object
     */
    updateProjectRequestStatus: async (id, updateData) => {
        try {
            const payload = {
                status: updateData.status,
                reviewNotes: updateData.reviewNotes || null
            };
            const response = await api.patch(`/admin/project-requests/${id}/status`, payload);
            return response.data?.data || response.data;
        } catch (error) {
            console.error(`Error updating project request ${id}:`, error);
            throw error;
        }
    },

    /**
     * Delete project request (Admin Only)
     * DELETE /api/admin/project-requests/:id
     * @param {string} id - Request ID
     * @returns {Promise} Deletion response
     */
    deleteProjectRequest: async (id) => {
        try {
            const response = await api.delete(`/admin/project-requests/${id}`);
            return response.data?.data || response.data;
        } catch (error) {
            console.error(`Error deleting project request ${id}:`, error);
            throw error;
        }
    }
};

export default projectRequestService;
