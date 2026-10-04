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

// Mock FAQ data (fallback for development)
let mockFaqData = [
    {
        id: 1,
        category: 'Internship Program',
        question: 'Who can apply for Zyra Tech Hub\'s internship program?',
        answer: 'University students, graduates, and anyone eager to gain real-world tech experience.',
        status: 'published',
        order: 1,
        views: 245,
        helpful: 89,
        createdAt: '2024-12-01'
    },
    {
        id: 2,
        category: 'Internship Program',
        question: 'How much does the internship cost?',
        answer: 'GHS 350, covering mentorship, training, and certification.',
        status: 'published',
        order: 2,
        views: 312,
        helpful: 156,
        createdAt: '2024-12-01'
    },
    {
        id: 3,
        category: 'Internship Program',
        question: 'Do you partner with schools outside Koforidua?',
        answer: 'Currently we focus on Koforidua but will expand regionally and internationally.',
        status: 'published',
        order: 3,
        views: 178,
        helpful: 67,
        createdAt: '2024-12-02'
    },
    {
        id: 4,
        category: 'Internship Program',
        question: 'Can institutions request IT or web services?',
        answer: 'Yes, we provide professional IT, web, and networking services for schools and organizations.',
        status: 'published',
        order: 4,
        views: 134,
        helpful: 45,
        createdAt: '2024-12-02'
    },
    {
        id: 5,
        category: 'Internship Program',
        question: 'How can individuals or companies support your programs?',
        answer: 'Through sponsorships, partnerships, or donations of funds and equipment.',
        status: 'published',
        order: 5,
        views: 98,
        helpful: 34,
        createdAt: '2024-12-03'
    },
    {
        id: 6,
        category: 'Services & Support',
        question: 'What IT and digital services do you offer?',
        answer: 'We provide Education Technology (EdTech), IT & Networking, Web & Software Development, and Consulting & Support services for schools and businesses.',
        status: 'published',
        order: 1,
        views: 267,
        helpful: 112,
        createdAt: '2024-12-05'
    },
    {
        id: 7,
        category: 'Services & Support',
        question: 'What specific IT services are available?',
        answer: 'LAN/WAN installation, WiFi setup, server deployment, school websites, management systems, and IT consulting.',
        status: 'published',
        order: 2,
        views: 189,
        helpful: 78,
        createdAt: '2024-12-05'
    },
    {
        id: 8,
        category: 'Services & Support',
        question: 'Do you offer long-term support contracts?',
        answer: 'Yes, we provide long-term maintenance contracts and ongoing system support for schools and businesses.',
        status: 'published',
        order: 3,
        views: 145,
        helpful: 56,
        createdAt: '2024-12-06'
    },
    {
        id: 9,
        category: 'Services & Support',
        question: 'How can I request a quote for services?',
        answer: 'Contact us directly through our website or email info@zyratechhub.com with your project details.',
        status: 'published',
        order: 4,
        views: 203,
        helpful: 89,
        createdAt: '2024-12-06'
    },
    {
        id: 10,
        category: 'Partnerships',
        question: 'What types of partnerships do you offer?',
        answer: 'We offer technology partnerships, educational collaborations, sponsorships, and joint venture opportunities.',
        status: 'published',
        order: 1,
        views: 156,
        helpful: 67,
        createdAt: '2024-12-07'
    },
    {
        id: 11,
        category: 'Partnerships',
        question: 'How can our organization partner with Zyra Tech Hub?',
        answer: 'Contact us through our partnership page or email info@zyratechhub.com to discuss collaboration opportunities.',
        status: 'published',
        order: 2,
        views: 189,
        helpful: 78,
        createdAt: '2024-12-07'
    }
];

export const faqService = {
  // ─── PUBLIC ENDPOINTS ──────────────────────────────────────────────────────

  /**
   * List all FAQs with pagination and category filtering
   * GET /faq?page=1&limit=50&category=courses
   */
  getAllFaqs: async (params = {}) => {
    try {
      console.log('[faqService] Fetching all FAQs from backend', params);
      const response = await api.get('/faq', { params });
      const payload = response.data?.data;
      
      // Handle nested pagination response
      const items = Array.isArray(payload) ? payload : (payload?.data || []);
      const pagination = payload?.pagination || {
        page: params.page || 1,
        limit: params.limit || 50,
        total: items.length,
        totalPages: Math.ceil(items.length / (params.limit || 50))
      };

      console.log('[faqService] Successfully fetched FAQs:', { count: items.length });
      return {
        data: items,
        pagination
      };
    } catch (error) {
      console.error('[faqService] Error fetching FAQs from backend:', error.message);
      // Fallback to mock data for development
      console.log('[faqService] Using fallback mock data');
      return {
        data: mockFaqData.filter(f => f.status === 'published'),
        pagination: {
          page: params.page || 1,
          limit: params.limit || 50,
          total: mockFaqData.length,
          totalPages: 1
        }
      };
    }
  },

  /**
   * Get published FAQs (for public site)
   */
  getPublishedFaqs: async (params = {}) => {
    try {
      console.log('[faqService] Fetching published FAQs');
      const response = await api.get('/faq', { 
        params: { ...params, status: 'published' }
      });
      const payload = response.data?.data;
      const items = Array.isArray(payload) ? payload : (payload?.data || []);
      
      return {
        data: items.sort((a, b) => (a.order || 999) - (b.order || 999)),
        pagination: payload?.pagination || {}
      };
    } catch (error) {
      console.error('[faqService] Error fetching published FAQs:', error.message);
      // Fallback to mock data
      return {
        data: mockFaqData
          .filter(faq => faq.status === 'published')
          .sort((a, b) => a.order - b.order)
      };
    }
  },

  /**
   * Get single FAQ by ID
   * GET /faq/:id
   */
  getFaqById: async (id) => {
    try {
      console.log('[faqService] Fetching FAQ by ID:', id);
      const response = await api.get(`/faq/${id}`);
      return response.data?.data || response.data;
    } catch (error) {
      console.error(`[faqService] Error fetching FAQ ${id}:`, error.message);
      // Fallback to mock data
      return mockFaqData.find(f => f.id === parseInt(id));
    }
  },

  /**
   * Search FAQs by question and answer content
   * GET /faq/search?q=payment
   */
  searchFaqs: async (query) => {
    try {
      console.log('[faqService] Searching FAQs for:', query);
      const response = await api.get('/faq/search', { 
        params: { q: query }
      });
      const payload = response.data?.data;
      return Array.isArray(payload) ? payload : (payload?.data || []);
    } catch (error) {
      console.error('[faqService] Error searching FAQs:', error.message);
      // Fallback to mock search
      const q = query.toLowerCase();
      return mockFaqData.filter(faq =>
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q)
      );
    }
  },

  /**
   * Get all FAQ categories
   * GET /faq/categories
   */
  getCategories: async () => {
    try {
      console.log('[faqService] Fetching FAQ categories');
      const response = await api.get('/faq/categories');
      return response.data?.data || response.data;
    } catch (error) {
      console.error('[faqService] Error fetching FAQ categories:', error.message);
      // Fallback: extract unique categories from mock data
      const categories = [...new Set(mockFaqData.map(f => f.category))];
      return categories;
    }
  },

  // ─── ADMIN ENDPOINTS ───────────────────────────────────────────────────────

  /**
   * Get all FAQs (admin view - includes drafts)
   * GET /admin/faq?page=1&limit=50&status=draft
   */
  getAdminFaqs: async (params = {}) => {
    try {
      console.log('[faqService] Fetching admin FAQs', params);
      const response = await api.get('/admin/faq', { params });
      const payload = response.data?.data;
      
      const items = Array.isArray(payload) ? payload : (payload?.data || []);
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
    } catch (error) {
      console.error('[faqService] Error fetching admin FAQs:', error.message);
      return {
        data: mockFaqData,
        pagination: { page: 1, limit: 50, total: mockFaqData.length, totalPages: 1 }
      };
    }
  },

  /**
   * Create new FAQ
   * POST /admin/faq
   */
  createFaq: async (data) => {
    try {
      console.log('[faqService] Creating FAQ:', data);
      const response = await api.post('/admin/faq', data);
      console.log('[faqService] FAQ created successfully');
      return response.data?.data || response.data;
    } catch (error) {
      console.error('[faqService] Error creating FAQ:', error.message);
      throw error;
    }
  },

  /**
   * Update FAQ
   * PUT /admin/faq/:id
   */
  updateFaq: async (id, data) => {
    try {
      console.log('[faqService] Updating FAQ:', id, data);
      const response = await api.put(`/admin/faq/${id}`, data);
      console.log('[faqService] FAQ updated successfully');
      return response.data?.data || response.data;
    } catch (error) {
      console.error(`[faqService] Error updating FAQ ${id}:`, error.message);
      throw error;
    }
  },

  /**
   * Delete FAQ
   * DELETE /admin/faq/:id
   */
  deleteFaq: async (id) => {
    try {
      console.log('[faqService] Deleting FAQ:', id);
      const response = await api.delete(`/admin/faq/${id}`);
      console.log('[faqService] FAQ deleted successfully');
      return response.data;
    } catch (error) {
      console.error(`[faqService] Error deleting FAQ ${id}:`, error.message);
      throw error;
    }
  },

  /**
   * Increment view count for FAQ
   */
  incrementViews: async (id) => {
    try {
      // Try backend endpoint if it exists
      await api.patch(`/faq/${id}/views`);
      return { success: true };
    } catch (error) {
      console.warn('[faqService] Backend views endpoint not available, using fallback');
      // Fallback: increment mock data
      const index = mockFaqData.findIndex(f => f.id === parseInt(id));
      if (index !== -1) {
        mockFaqData[index].views = (mockFaqData[index].views || 0) + 1;
        return { success: true };
      }
      return { success: false };
    }
  },

  /**
   * Mark FAQ as helpful
   */
  markHelpful: async (id) => {
    try {
      // Try backend endpoint if it exists
      const response = await api.patch(`/faq/${id}/helpful`);
      return response.data;
    } catch (error) {
      console.warn('[faqService] Backend helpful endpoint not available, using fallback');
      // Fallback: update mock data
      const index = mockFaqData.findIndex(f => f.id === parseInt(id));
      if (index !== -1) {
        mockFaqData[index].helpful = (mockFaqData[index].helpful || 0) + 1;
        return { success: true };
      }
      return { success: false };
    }
  }
};

export default faqService;
