/**
 * Contact Inquiry Service
 * Contact form submissions and inquiry management
 * 
 * Backend Endpoints:
 * - POST /contact - Submit contact inquiry
 * - GET /admin/contact-inquiries - Get all inquiries (admin)
 * - GET /admin/contact-inquiries/:id - Get single inquiry (admin)
 * - POST /admin/contact/:id/reply - Send reply and update status (admin)
 * - DELETE /admin/contact-inquiries/:id - Delete inquiry (admin)
 */

import api from './api';

export const INQUIRY_STATUS = {
  'new': 'New',
  'read': 'Read',
  'replied': 'Replied'
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
    const response = await api.get('/admin/contact-inquiries/' + id);
    return response.data?.data || response.data;
  },

  /**
   * Reply to inquiry - sends response email and updates status to replied (admin)
   * POST /admin/contact-inquiries/:id/reply
   * Automatically handles:
   * - Status update to replied
   * - Email notification to customer
   * 
   * @param {string} id - Inquiry ID
   * @param {string} replyMessage - Admin response message
   * @returns {Promise} Updated inquiry with reply info
   */
  replyToInquiry: async (id, replyMessage) => {
    const response = await api.post('/admin/contact-inquiries/' + id + '/reply', {
      message: replyMessage
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
    const response = await api.delete('/admin/contact-inquiries/' + id);
    return response.data;
  }
};

export default contactInquiryService;