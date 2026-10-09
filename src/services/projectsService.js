/**
 * Projects Service
 * Handles all API calls for portfolio projects management
 * 
 * Backend Endpoints:
 * PUBLIC (No Auth):
 * - GET /api/projects - List all projects with pagination and filtering
 * - GET /api/projects/:id - Get single project details
 * - GET /api/projects/featured?limit=6 - Get featured projects
 * 
 * ADMIN (Auth Required):
 * - POST /api/admin/projects - Create new project
 * - PUT /api/admin/projects/:id - Update project
 * - DELETE /api/admin/projects/:id - Delete project
 */

import api from './api';

const projectsService = {
    // ============ PUBLIC ENDPOINTS ============

    /**
     * Get all projects with pagination and filtering
     * GET /api/projects?page=1&limit=20&category=web
     * @param {Object} params - Query parameters
     * @param {number} params.page - Page number (default: 1)
     * @param {number} params.limit - Items per page (default: 20)
     * @param {string} params.category - Filter by category (optional)
     * @param {string} params.status - Filter by status (optional)
     * @param {string} params.search - Search by title or description (optional)
     * @returns {Promise} Object with projects array and pagination info
     */
    getAllProjects: async (params = {}) => {
        try {
            const response = await api.get('/projects', { params });
            const payload = response.data?.data;

            const items = Array.isArray(payload) ? payload : (payload?.data || payload || []);
            const pagination = response.data?.pagination || {
                page: params.page || 1,
                limit: params.limit || 20,
                total: items.length,
                totalPages: Math.ceil(items.length / (params.limit || 20))
            };

            return {
                projects: items,
                pagination
            };
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    },

    /**
     * Get single project details - uses public list endpoint and searches by ID
     * GET /api/projects (public - no auth needed)
     * @param {string|number} id - Project ID
     * @returns {Promise} Project details
     */
    getProjectById: async (id) => {
        try {
            // Fetch all public projects (no authentication needed)
            const response = await api.get(`/projects`, { params: { limit: 1000 } });
            
            // Handle different response formats
            const projects = response.data?.data || response.data || [];
            const projectsList = Array.isArray(projects) ? projects : (projects.projects || projects.data || []);
            
            // Find project by ID
            const found = projectsList.find(p => 
                String(p.id) === String(id) || String(p.slug) === String(id)
            );
            
            if (found) {
                console.log('Found project by ID:', found);
                return found;
            }
            
            // If not found, throw error
            throw new Error(`Project with ID ${id} not found in public list`);
        } catch (error) {
            console.error(`Error fetching project ${id}:`, error);
            throw error;
        }
    },

    /**
     * Get featured projects
     * GET /api/projects/featured?limit=6
     * @param {Object} params - Query parameters
     * @param {number} params.limit - Number of featured projects to fetch (default: 6)
     * @returns {Promise} Object with projects array and pagination
     */
    getFeaturedProjects: async (params = { limit: 6 }) => {
        try {
            const response = await api.get('/projects/featured', { params });
            const payload = response.data?.data;

            // Handle both array and nested object responses
            const items = Array.isArray(payload) ? payload : (payload?.data || payload || []);
            
            return {
                projects: items,
                pagination: response.data?.pagination || { limit: params.limit || 6, total: items.length }
            };
        } catch (error) {
            console.error('Error fetching featured projects:', error);
            throw error;
        }
    },

    // ============ ADMIN ENDPOINTS ============

    /**
     * Create new project (Admin only)
     * POST /api/admin/projects
     * @param {Object} projectData - Project data to create
     * @param {string} projectData.title - Project title (required)
     * @param {string} projectData.description - Project description (required)
     * @param {string} projectData.category - Project category (required)
     * @param {Array} projectData.technologies - Array of technologies used
     * @param {string} projectData.link - Project link/URL
     * @param {string} projectData.image - Project image URL
     * @param {boolean} projectData.featured - Mark as featured (optional)
     * @param {string} projectData.status - Project status (Active, In Progress, Completed, etc.)
     * @param {number} projectData.progress - Progress percentage (0-100)
     * @param {number} projectData.team - Team size
     * @param {string} projectData.startDate - Project start date
     * @returns {Promise} Created project
     */
    createProject: async (projectData) => {
        try {
            const response = await api.post('/admin/projects', projectData);
            return response.data?.data || response.data;
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    },

    /**
     * Update existing project (Admin only)
     * PUT /api/admin/projects/:id
     * @param {string|number} id - Project ID
     * @param {Object} updateData - Data to update (partial)
     * @returns {Promise} Updated project
     */
    updateProject: async (id, updateData) => {
        try {
            const response = await api.put(`/admin/projects/${id}`, updateData);
            return response.data?.data || response.data;
        } catch (error) {
            console.error(`Error updating project ${id}:`, error);
            throw error;
        }
    },

    /**
     * Delete project (Admin only)
     * DELETE /api/admin/projects/:id
     * @param {string|number} id - Project ID
     * @returns {Promise} Deletion response
     */
    deleteProject: async (id) => {
        try {
            const response = await api.delete(`/admin/projects/${id}`);
            return response.data?.data || response.data;
        } catch (error) {
            console.error(`Error deleting project ${id}:`, error);
            throw error;
        }
    },

    /**
     * Get all projects for admin (with all statuses including draft)
     * GET /api/admin/projects
     * @param {Object} params - Query parameters
     * @returns {Promise} Object with projects array and pagination
     */
    getAdminProjects: async (params = {}) => {
        try {
            const response = await api.get('/admin/projects', { params });
            const payload = response.data?.data;

            const items = Array.isArray(payload) ? payload : (payload?.data || payload || []);
            const pagination = response.data?.pagination || {
                page: params.page || 1,
                limit: params.limit || 20,
                total: items.length,
                totalPages: Math.ceil(items.length / (params.limit || 20))
            };

            return {
                projects: items,
                pagination
            };
        } catch (error) {
            console.error('Error fetching admin projects:', error);
            throw error;
        }
    }
};

export default projectsService;
