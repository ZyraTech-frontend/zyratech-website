/**
 * Contact Inquiry Service
 * Contact form submissions and inquiry management
 * 
 * Backend Endpoints:
 * - POST /contact - Submit contact inquiry
 * - GET /admin/contact-inquiries - Get all inquiries (admin)
 * - GET /admin/contact-inquiries/:id - Get single inquiry (admin)
 * - PATCH /admin/contact-inquiries/:id - Update inquiry status (admin)
 * - DELETE /admin/contact-inquiries/:id - Delete inquiry (admin)
 */

import api from './api';

export const INQUIRY_STATUS = {
  'new': 'New',
  'viewed': 'Viewed',
  'in_progress': 'In Progress',
  'responded': 'Responded',
  'closed': 'Closed'
};

export const contactInquiryService = {
  /**
   * Submit new contact inquiry
   * POST /contact
   * @param {Object} data - Inquiry data
   * @param {string} data.name - Full name
   * @param {string} data.email - Email address
   * @param {string} data.phone - Phone number (optional)
   * @param {string} data.subject - Inquiry subject
   * @param {string} data.message - Message content
   * @returns {Promise} Created inquiry response
   */
  submitInquiry: async (data) => {
    const response = await api.post('/contact', {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      subject: data.subject || 'General Inquiry',
      message: data.message,
      submittedAt: new Date().toISOString(),
      status: 'new'
    });
    return response.data?.data || response.data;
  },

  /**
   * Get all contact inquiries (admin)
   * GET /admin/contact-inquiries?page=1&limit=20&status=new
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.status - Filter by status
   * @returns {Promise} List of inquiries with pagination
   */
  getInquiries: async (params = {}) => {
    const response = await api.get('/admin/contact-inquiries', { params });
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
   * Get single inquiry (admin)
   * GET /admin/contact-inquiries/:id
   * @param {string} id - Inquiry ID
   * @returns {Promise} Inquiry details
   */
  getInquiryById: async (id) => {
    const response = await api.get(`/admin/contact-inquiries/${id}`);
    return response.data?.data || response.data;
  },

  /**
   * Update inquiry status and add response (admin)
   * PATCH /admin/contact-inquiries/:id
   * @param {string} id - Inquiry ID
   * @param {Object} data - Update data
   * @param {string} data.status - New status
   * @param {string} data.response - Response message to send to inquirer
   * @returns {Promise} Updated inquiry
   */
  updateInquiry: async (id, data) => {
    const response = await api.patch(`/admin/contact-inquiries/${id}`, {
      status: data.status,
      response: data.response || '',
      updatedAt: new Date().toISOString()
    });
    return response.data?.data || response.data;
  },

  /**
   * Delete inquiry (admin)
   * DELETE /admin/contact-inquiries/:id
   * @param {string} id - Inquiry ID
   * @returns {Promise} Deletion response
   */
  deleteInquiry: async (id) => {
    const response = await api.delete(`/admin/contact-inquiries/${id}`);
    return response.data;
  }
};

export default contactInquiryService;
