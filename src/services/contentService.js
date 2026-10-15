/**
 * Content Service - Real API Integration
 * Separate endpoints for admin (authenticated) and public (unauthenticated)
 * Token refresh is handled automatically by api.js interceptors.
 * 
 * ADMIN ENDPOINTS (Authenticated):
 * GET /api/admin/content/items/section/{section} - Get items by section
 * POST /api/admin/content/items - Create item with section in body
 * PUT /api/admin/content/items/{id} - Update item
 * DELETE /api/admin/content/items/{id} - Delete item
 * 
 * PUBLIC ENDPOINTS (No authentication):
 * GET /api/content/items/{section} - Get published items by section
 */

import api from './api';

const contentService = {
  // ===== SERVICES (5 endpoints) =====
  
  // ADMIN: Get all services (authenticated)
  getAllServices: async () => {
    const response = await api.get('/admin/content/items/section/services');
    return response.data?.data || response.data;
  },

  // ADMIN: Create new service (authenticated)
  createService: async (data) => {
    const response = await api.post('/admin/content/items', {
      ...data,
      section: 'services'
    });
    return response.data?.data || response.data;
  },

  // ADMIN: Get single service (authenticated)
  getService: async (id) => {
    const response = await api.get(`/admin/content/items/${id}`);
    return response.data?.data || response.data;
  },

  // ADMIN: Update service (authenticated)
  updateService: async (id, data) => {
    const response = await api.put(`/admin/content/items/${id}`, {
      ...data,
      section: 'services'
    });
    return response.data?.data || response.data;
  },

  // ADMIN: Delete service (authenticated)
  deleteService: async (id) => {
    const response = await api.delete(`/admin/content/items/${id}`);
    return response.data;
  },

  // PUBLIC: Get published services (no authentication)
  getPublicServices: async () => {
    const response = await api.get('/content/items/services');
    return response.data?.data || response.data;
  },

  // ===== BENEFITS (5 endpoints) =====
  
  // ADMIN: Get all benefits (authenticated)
  getAllBenefits: async () => {
    const response = await api.get('/admin/content/items/section/benefits');
    return response.data?.data || response.data;
  },

  // ADMIN: Create new benefit (authenticated)
  createBenefit: async (data) => {
    const response = await api.post('/admin/content/items', {
      ...data,
      section: 'benefits'
    });
    return response.data?.data || response.data;
  },

  // ADMIN: Get single benefit (authenticated)
  getBenefit: async (id) => {
    const response = await api.get(`/admin/content/items/${id}`);
    return response.data?.data || response.data;
  },

  // ADMIN: Update benefit (authenticated)
  updateBenefit: async (id, data) => {
    const response = await api.put(`/admin/content/items/${id}`, {
      ...data,
      section: 'benefits'
    });
    return response.data?.data || response.data;
  },

  // ADMIN: Delete benefit (authenticated)
  deleteBenefit: async (id) => {
    const response = await api.delete(`/admin/content/items/${id}`);
    return response.data;
  },

  // PUBLIC: Get published benefits (no authentication)
  getPublicBenefits: async () => {
    const response = await api.get('/content/items/benefits');
    return response.data?.data || response.data;
  },

  // ===== ABOUT PAGE (10 endpoints) =====
  
  // MILESTONES
  getMilestones: async () => {
    const response = await api.get('/admin/content/items/section/milestones');
    return response.data?.data || response.data;
  },

  getMilestone: async (id) => {
    const response = await api.get(`/admin/content/items/${id}`);
    return response.data?.data || response.data;
  },

  createMilestone: async (data) => {
    const response = await api.post('/admin/content/items', {
      ...data,
      section: 'milestones'
    });
    return response.data?.data || response.data;
  },

  updateMilestone: async (id, data) => {
    const response = await api.put(`/admin/content/items/${id}`, {
      ...data,
      section: 'milestones'
    });
    return response.data?.data || response.data;
  },

  deleteMilestone: async (id) => {
    const response = await api.delete(`/admin/content/items/${id}`);
    return response.data;
  },

  // TIMELINE
  getTimeline: async () => {
    const response = await api.get('/admin/content/items/section/timeline');
    return response.data?.data || response.data;
  },

  getTimelineItem: async (id) => {
    const response = await api.get(`/admin/content/items/${id}`);
    return response.data?.data || response.data;
  },

  createTimelineItem: async (data) => {
    const response = await api.post('/admin/content/items', {
      ...data,
      section: 'timeline'
    });
    return response.data?.data || response.data;
  },

  updateTimelineItem: async (id, data) => {
    const response = await api.put(`/admin/content/items/${id}`, {
      ...data,
      section: 'timeline'
    });
    return response.data?.data || response.data;
  },

  deleteTimelineItem: async (id) => {
    const response = await api.delete(`/admin/content/items/${id}`);
    return response.data;
  },

  // ===== PARTNERSHIP PAGE (5 endpoints) =====

  getPartnershipStories: async () => {
    const response = await api.get('/admin/content/items/section/partnerships');
    return response.data?.data || response.data;
  },

  getPartnershipStory: async (id) => {
    const response = await api.get(`/admin/content/items/${id}`);
    return response.data?.data || response.data;
  },

  createPartnershipStory: async (data) => {
    const response = await api.post('/admin/content/items', {
      ...data,
      section: 'partnerships'
    });
    return response.data?.data || response.data;
  },

  updatePartnershipStory: async (id, data) => {
    const response = await api.put(`/admin/content/items/${id}`, {
      ...data,
      section: 'partnerships'
    });
    return response.data?.data || response.data;
  },

  deletePartnershipStory: async (id) => {
    const response = await api.delete(`/admin/content/items/${id}`);
    return response.data;
  },

  // ===== HERO SLIDES (4 endpoints) =====

  getAllHeroSlides: async () => {
    const response = await api.get('/admin/content/items/section/hero');
    return response.data?.data || response.data;
  },

  createHeroSlide: async (data) => {
    const response = await api.post('/admin/content/items', {
      ...data,
      section: 'hero'
    });
    return response.data?.data || response.data;
  },

  updateHeroSlide: async (id, data) => {
    const response = await api.put(`/admin/content/items/${id}`, {
      ...data,
      section: 'hero'
    });
    return response.data?.data || response.data;
  },

  deleteHeroSlide: async (id) => {
    const response = await api.delete(`/admin/content/items/${id}`);
    return response.data;
  },

  getHeroSlide: async (id) => {
    const response = await api.get(`/admin/content/items/${id}`);
    return response.data?.data || response.data;
  },

  // ===== WORK WITH US PAGE (4 endpoints) =====

  getWorkWithUsHero: async () => {
    const response = await api.get('/admin/content/items/section/work-with-us-hero');
    return response.data?.data || response.data;
  },

  getAllWorkWithUsItems: async () => {
    const response = await api.get('/admin/content/items/section/work-with-us');
    return response.data?.data || response.data;
  },

  createWorkWithUsItem: async (data) => {
    const response = await api.post('/admin/content/items', {
      ...data,
      section: 'work-with-us'
    });
    return response.data?.data || response.data;
  },

  updateWorkWithUsItem: async (id, data) => {
    const response = await api.put(`/admin/content/items/${id}`, {
      ...data,
      section: 'work-with-us'
    });
    return response.data?.data || response.data;
  },

  // ===== QUALITY ASSURANCE PAGE (4 endpoints) =====

  getQAHero: async () => {
    const response = await api.get('/admin/content/items/section/qa-hero');
    return response.data?.data || response.data;
  },

  getAllQAItems: async () => {
    const response = await api.get('/admin/content/items/section/qa');
    return response.data?.data || response.data;
  },

  createQAItem: async (data) => {
    const response = await api.post('/admin/content/items', {
      ...data,
      section: 'qa'
    });
    return response.data?.data || response.data;
  },

  updateQAItem: async (id, data) => {
    const response = await api.put(`/admin/content/items/${id}`, {
      ...data,
      section: 'qa'
    });
    return response.data?.data || response.data;
  },

  // Backward compatible methods for pages using old names
  getWorkWithUs: async () => {
    const response = await api.get('/admin/content/items/section/work-with-us');
    return response.data?.data || response.data;
  },

  updateWorkWithUs: async (section, data) => {
    const response = await api.put(`/admin/content/items`, {
      ...data,
      section: 'work-with-us'
    });
    return response.data?.data || response.data;
  },

  getQA: async () => {
    const response = await api.get('/admin/content/items/section/qa');
    return response.data?.data || response.data;
  },

  updateQA: async (section, data) => {
    const response = await api.put(`/admin/content/items`, {
      ...data,
      section: 'qa'
    });
    return response.data?.data || response.data;
  },

  // ===== ABOUT QUOTE (MISSION + STATISTICS) =====
  getAboutQuote: async () => {
    const response = await api.get('/admin/content/items/section/about-quote');
    return { data: response.data?.data || response.data };
  },

  updateAboutQuote: async (data) => {
    const response = await api.put('/admin/content/items', {
      ...data,
      section: 'about-quote'
    });
    return response.data?.data || response.data;
  }
};

export default contentService;
