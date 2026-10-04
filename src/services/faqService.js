/**
 * FAQ Service
 * Frequently Asked Questions management
 * 
 * Backend Endpoints:
 * - GET /faq - List FAQs with pagination and category filtering
 * - GET /faq/:id - Get single FAQ
 * - GET /faq/search - Search FAQs
 * - GET /faq/categories - Get all categories
 * - POST /admin/faq - Create FAQ (admin only)
 * - PUT /admin/faq/:id - Update FAQ (admin only)
 * - DELETE /admin/faq/:id - Delete FAQ (admin only)
 * - PUT /admin/faq/reorder - Reorder FAQ items (admin only)
 */

import api from './api';

// Category configuration
export const FAQ_CATEGORIES = {
    'Internship Program': {
        label: 'Internship Program',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        bgGradient: 'from-blue-500 to-indigo-600',
        iconName: 'Users'
    },
    'Services & Support': {
        label: 'Services & Support',
        color: 'bg-green-100 text-green-700 border-green-200',
        bgGradient: 'from-green-500 to-emerald-600',
        iconName: 'Settings'
    },
    'Partnerships': {
        label: 'Partnerships',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        bgGradient: 'from-purple-500 to-violet-600',
        iconName: 'MessageCircle'
    },
    'Donations & Support': {
        label: 'Donations & Support',
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        bgGradient: 'from-amber-500 to-orange-600',
        iconName: 'Mail'
    },
    'Training': {
        label: 'Training',
        color: 'bg-cyan-100 text-cyan-700 border-cyan-200',
        bgGradient: 'from-cyan-500 to-blue-600',
        iconName: 'Sparkles'
    },
    'General': {
        label: 'General',
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        bgGradient: 'from-gray-500 to-slate-600',
        iconName: 'HelpCircle'
    }
};

export const faqService = {
  // ─── PUBLIC ENDPOINTS ──────────────────────────────────────────────────────

  /**
   * List all FAQs with pagination and category filtering
   * GET /faq?page=1&limit=50&category=courses
   */
  getAllFaqs: async (params = {}) => {
    const response = await api.get('/faq', { params });
    console.log('[faqService.getAllFaqs] Response:', response.data);
    const payload = response.data?.data;
    
    // Handle nested pagination response
    const items = Array.isArray(payload) ? payload : (payload?.data || []);
    console.log('[faqService.getAllFaqs] Extracted items:', items);
    const pagination = payload?.pagination || {
      page: params.page || 1,
      limit: params.limit || 50,
      total: items.length,
      totalPages: Math.ceil(items.length / (params.limit || 50))
    };

    return {
      data: items,
      pagination
    };
  },

  /**
   * Get published FAQs (for public site)
   */
  getPublishedFaqs: async (params = {}) => {
    const response = await api.get('/faq', { 
      params: { ...params, status: 'published' }
    });
    const payload = response.data?.data;
    const items = Array.isArray(payload) ? payload : (payload?.data || []);
    
    return {
      data: items.sort((a, b) => (a.order || 999) - (b.order || 999)),
      pagination: payload?.pagination || {}
    };
  },

  /**
   * Get single FAQ by ID
   * GET /faq/:id
   */
  getFaqById: async (id) => {
    const response = await api.get(`/faq/${id}`);
    return response.data?.data || response.data;
  },

  /**
   * Search FAQs by question and answer content
   * GET /faq/search?q=payment
   */
  searchFaqs: async (query) => {
    const response = await api.get('/faq/search', { 
      params: { q: query }
    });
    const payload = response.data?.data;
    return Array.isArray(payload) ? payload : (payload?.data || []);
  },

  /**
   * Get all FAQ categories
   * GET /faq/categories
   */
  getCategories: async () => {
    const response = await api.get('/faq/categories');
    return response.data?.data || response.data;
  },

  // ─── ADMIN ENDPOINTS ───────────────────────────────────────────────────────

  /**
   * Get all FAQs (admin view - includes drafts)
   * GET /admin/faq?page=1&limit=50&status=draft
   */
  getAdminFaqs: async (params = {}) => {
    const response = await api.get('/admin/faq', { params });
    console.log('[faqService.getAdminFaqs] Response:', response.data);
    const payload = response.data?.data;
    
    const items = Array.isArray(payload) ? payload : (payload?.data || []);
    console.log('[faqService.getAdminFaqs] Extracted items:', items);
    const pagination = payload?.pagination || {
      page: params.page || 1,
      limit: params.limit || 50,
      total: items.length,
      totalPages: Math.ceil(items.length / (params.limit || 50))
    };

    return {
      data: items,
      pagination
    };
  },

  /**
   * Create new FAQ
   * POST /admin/faq
   */
  createFaq: async (data) => {
    const response = await api.post('/admin/faq', data);
    return response.data?.data || response.data;
  },

  /**
   * Update FAQ
   * PUT /admin/faq/:id
   */
  updateFaq: async (id, data) => {
    const response = await api.put(`/admin/faq/${id}`, data);
    return response.data?.data || response.data;
  },

  /**
   * Delete FAQ
   * DELETE /admin/faq/:id
   */
  deleteFaq: async (id) => {
    const response = await api.delete(`/admin/faq/${id}`);
    return response.data;
  },

  /**
   * Reorder FAQ items
   * PUT /admin/faq/reorder
   */
  reorderFaqs: async (faqIds) => {
    const response = await api.put('/admin/faq/reorder', { faqIds });
    return response.data?.data || response.data;
  },

  /**
   * Increment view count for FAQ
   * PATCH /faq/:id/views
   */
  incrementViews: async (id) => {
    const response = await api.patch(`/faq/${id}/views`);
    return response.data;
  },

  /**
   * Mark FAQ as helpful
   * PATCH /faq/:id/helpful
   */
  markHelpful: async (id) => {
    const response = await api.patch(`/faq/${id}/helpful`);
    return response.data;
  }
};

export default faqService;
