/**
 * Content Service - Real API Integration
 * All requests use the unified /api/admin/content/items endpoint
 * Token refresh is handled automatically by api.js interceptors.
 * 
 * Backend endpoint structure:
 * POST /api/admin/content/items - Create item with section parameter
 * GET /api/admin/content/items?section=services - Get items by section
 * PUT /api/admin/content/items/:id - Update item
 * DELETE /api/admin/content/items/:id - Delete item
 */

import api from './api';

const contentService = {
  // ===== SERVICES (5 endpoints) =====
  
  getAllServices: async () => {
    const response = await api.get('/admin/content/items?section=services');
    return response.data?.data || response.data;
  },

  createService: async (data) => {
    const response = await api.post('/admin/content/items', {
      ...data,
      section: 'services'
    });
    return response.data?.data || response.data;
  },

  getService: async (id) => {
    const response = await api.get(`/admin/content/items/${id}`);
    return response.data?.data || response.data;
  },

  updateService: async (id, data) => {
    const response = await api.put(`/admin/content/items/${id}`, {
      ...data,
      section: 'services'
    });
    return response.data?.data || response.data;
  },

  deleteService: async (id) => {
    const response = await api.delete(`/admin/content/items/${id}`);
    return response.data;
  },

  // ===== BENEFITS (5 endpoints) =====
  
  getAllBenefits: async () => {
    const response = await api.get('/admin/content/items?section=benefits');
    return response.data?.data || response.data;
  },

  createBenefit: async (data) => {
    const response = await api.post('/admin/content/items', {
      ...data,
      section: 'benefits'
    });
    return response.data?.data || response.data;
  },

  getBenefit: async (id) => {
    const response = await api.get(`/admin/content/items/${id}`);
    return response.data?.data || response.data;
  },

  updateBenefit: async (id, data) => {
    const response = await api.put(`/admin/content/items/${id}`, {
      ...data,
      section: 'benefits'
    });
    return response.data?.data || response.data;
  },

  deleteBenefit: async (id) => {
    const response = await api.delete(`/admin/content/items/${id}`);
    return response.data;
  },

  // ===== ABOUT PAGE (10 endpoints) =====
  
  // Milestones
  getMilestones: async () => {
    const response = await api.get('/admin/content/items?section=milestones');
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

  // Timeline
  getTimeline: async () => {
    const response = await api.get('/admin/content/items?section=timeline');
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

  // Partnership Stories
  getPartnershipStories: async () => {
    const response = await api.get('/admin/content/items?section=partnerships');
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
    const response = await api.get('/admin/content/items?section=hero');
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

  // ===== WORK WITH US PAGE (4 endpoints) =====

  getWorkWithUsHero: async () => {
    const response = await api.get('/admin/content/items?section=work-with-us-hero');
    return response.data?.data || response.data;
  },

  getAllWorkWithUsItems: async () => {
    const response = await api.get('/admin/content/items?section=work-with-us');
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
    const response = await api.get('/admin/content/items?section=qa-hero');
    return response.data?.data || response.data;
  },

  getAllQAItems: async () => {
    const response = await api.get('/admin/content/items?section=qa');
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
  }
};

export default contentService;
