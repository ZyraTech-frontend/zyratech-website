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
  // ===== IMAGE UPLOAD (REQUIRED FOR ALL SECTIONS) =====
  uploadImage: async (file) => {
    // Validate file before upload
    if (!file) throw new Error('No file provided');
    if (file.size > 5 * 1024 * 1024) throw new Error('File must be less than 5MB');
    
    const formData = new FormData();
    formData.append('file', file);
    
    // DO NOT set Content-Type header - axios will set it automatically with boundary
    // ✅ CORRECT ENDPOINT: /api/admin/content/upload (NOT /api/admin/upload)
    const response = await api.post('/admin/content/upload', formData);
    
    // Backend returns { success: true, data: { url, size, mimeType }, message }
    const imageUrl = response.data?.data?.url || response.data?.imageUrl;
    
    // Validate URL was returned
    if (!imageUrl || typeof imageUrl !== 'string') {
      throw new Error('Server did not return a valid image URL');
    }
    
    // Validate URL is an actual URL (starts with http or /)
    if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
      throw new Error('Server returned an invalid image URL format');
    }
    
    return imageUrl;
  },

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

  getPartnershipHero: async () => {
    const response = await api.get('/admin/content/items/section/partnership-hero');
    return { data: response.data?.data?.[0] || response.data };
  },

  updatePartnershipHero: async (data) => {
    try {
      // Try to get existing partnership-hero
      const existing = await api.get('/admin/content/items/section/partnership-hero');
      let items = existing.data?.data || existing.data || [];
      
      if (Array.isArray(items) && items.length > 0) {
        // Update existing
        const response = await api.put(`/admin/content/items/${items[0].id}`, {
          ...data,
          section: 'partnership-hero'
        });
        return response.data;
      } else {
        // Create new
        const response = await api.post('/admin/content/items', {
          ...data,
          section: 'partnership-hero'
        });
        return response.data;
      }
    } catch (err) {
      console.error('Error updating partnership hero:', err);
      throw err;
    }
  },

  getImpactStats: async () => {
    const response = await api.get('/admin/content/items/section/impact-stats');
    return { data: response.data?.data || [] };
  },

  updateImpactStat: async (id, data) => {
    const response = await api.put(`/admin/content/items/${id}`, {
      ...data,
      section: 'impact-stats'
    });
    return response.data;
  },

  getWhyPartner: async () => {
    const response = await api.get('/admin/content/items/section/why-partner');
    // Return array of all items wrapped in data object (consistent with other methods)
    return { data: response.data?.data || [] };
  },

  updateWhyPartner: async (id, data) => {
    const payload = {
      title: data.title,
      description: data.description,
      section: 'why-partner'
    };
    const response = await api.put(`/admin/content/items/${id}`, payload);
    return response.data?.data || response.data;
  },

  createWhyPartner: async (data) => {
    const payload = {
      title: data.title,
      description: data.description,
      section: 'why-partner'
    };
    const response = await api.post('/admin/content/items', payload);
    return response.data?.data || response.data;
  },

  deleteWhyPartner: async (id) => {
    const response = await api.delete(`/admin/content/items/${id}`);
    return response.data;
  },

  getRecognition: async () => {
    const response = await api.get('/admin/content/items/section/recognition');
    return { data: response.data?.data || [] };
  },

  getPartnershipStories: async () => {
    const response = await api.get('/admin/content/items/section/partnerships');
    // Return array wrapped in data object (consistent with other methods)
    return { data: response.data?.data || [] };
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

  // PUBLIC: Get published hero slides (no authentication)
  getPublicHeroSlides: async () => {
    const response = await api.get('/content/items/hero');
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
    try {
      // Get existing work-with-us items
      const existing = await api.get('/admin/content/items/section/work-with-us');
      let items = existing.data?.data || existing.data || [];
      
      // Handle both array and single object responses
      if (!Array.isArray(items)) {
        items = items ? [items] : [];
      }
      
      const item = items.length > 0 ? items[0] : null;
      
      if (item && item.id) {
        // Update existing item
        const response = await api.put(`/admin/content/items/${item.id}`, {
          ...data,
          section: 'work-with-us'
        });
        return response.data?.data || response.data;
      } else {
        // Create new item
        const response = await api.post('/admin/content/items', {
          ...data,
          section: 'work-with-us'
        });
        return response.data?.data || response.data;
      }
    } catch (err) {
      console.error('Error in updateWorkWithUs:', err);
      // Fallback: try to create
      const response = await api.post('/admin/content/items', {
        ...data,
        section: 'work-with-us'
      });
      return response.data?.data || response.data;
    }
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
    // About quote is a single-item section stored in the database
    try {
      // Try to get existing about-quote
      const existing = await api.get('/admin/content/items/section/about-quote');
      let items = existing.data?.data || existing.data || [];
      
      // Handle both array and single object responses
      if (!Array.isArray(items)) {
        items = items ? [items] : [];
      }
      
      const item = items.length > 0 ? items[0] : null;
      
      if (item && item.id) {
        // Update existing
        const response = await api.put(`/admin/content/items/${item.id}`, {
          ...data,
          section: 'about-quote'
        });
        return response.data?.data || response.data;
      } else {
        // Create new if doesn't exist
        const response = await api.post('/admin/content/items', {
          ...data,
          section: 'about-quote'
        });
        return response.data?.data || response.data;
      }
    } catch (err) {
      console.error('Error in updateAboutQuote:', err);
      // Fallback: try to create
      const response = await api.post('/admin/content/items', {
        ...data,
        section: 'about-quote'
      });
      return response.data?.data || response.data;
    }
  },

  // ===== PUBLIC ENDPOINTS (No authentication required) =====

  // PUBLIC: Get published milestones
  getPublicMilestones: async () => {
    const response = await api.get('/content/items/milestones');
    return response.data?.data || response.data;
  },

  // PUBLIC: Get published timeline
  getPublicTimeline: async () => {
    const response = await api.get('/content/items/timeline');
    return response.data?.data || response.data;
  },

  // PUBLIC: Get published partnerships
  getPublicPartnerships: async () => {
    const response = await api.get('/content/items/partnerships');
    return response.data?.data || response.data;
  },

  // PUBLIC: Get published about quote
  getPublicAboutQuote: async () => {
    const response = await api.get('/content/items/about-quote');
    return { data: response.data?.data || response.data };
  },

  // PUBLIC: Get published partnership hero
  getPublicPartnershipHero: async () => {
    const response = await api.get('/content/items/partnership-hero');
    return { data: response.data?.data?.[0] || response.data };
  },

  // PUBLIC: Get published impact stats
  getPublicImpactStats: async () => {
    const response = await api.get('/content/items/impact-stats');
    return { data: response.data?.data || [] };
  },

  // PUBLIC: Get published why partner (all items for list display)
  getPublicWhyPartner: async () => {
    const response = await api.get('/content/items/why-partner');
    // Return array of all items wrapped in data object (consistent with other methods)
    return { data: response.data?.data || [] };
  },

  // PUBLIC: Get published partner recognition
  getPublicRecognition: async () => {
    const response = await api.get('/content/items/recognition');
    return { data: response.data?.data || [] };
  },

  // PUBLIC: Get published QA page
  getPublicQA: async () => {
    const response = await api.get('/content/items/qa');
    return response.data?.data || response.data;
  },

  // PUBLIC: Get published work with us
  getPublicWorkWithUs: async () => {
    const response = await api.get('/content/items/work-with-us');
    return response.data?.data || response.data;
  },

  // PUBLIC: Get published impact
  getPublicImpact: async () => {
    const response = await api.get('/content/items/impact');
    return response.data?.data || response.data;
  },
};

export default contentService;
