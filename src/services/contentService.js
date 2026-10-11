/**
 * Content Service - Real API Integration
 * All mock data removed. All requests go directly to the ZyraTech backend API.
 * Token refresh is handled automatically by api.js interceptors.
 */

import api from './api';

const contentService = {
  // ===== SERVICES (5 endpoints) =====
  
  getAllServices: async () => {
    const response = await api.get('/content/services');
    return response.data?.data || response.data;
  },

  createService: async (data) => {
    const response = await api.post('/content/services', data);
    return response.data?.data || response.data;
  },

  getService: async (id) => {
    const response = await api.get(`/content/services/${id}`);
    return response.data?.data || response.data;
  },

  updateService: async (id, data) => {
    const response = await api.put(`/content/services/${id}`, data);
    return response.data?.data || response.data;
  },

  deleteService: async (id) => {
    const response = await api.delete(`/content/services/${id}`);
    return response.data;
  },

  // ===== BENEFITS (5 endpoints) =====
  
  getAllBenefits: async () => {
    const response = await api.get('/content/benefits');
    return response.data?.data || response.data;
  },

  createBenefit: async (data) => {
    const response = await api.post('/content/benefits', data);
    return response.data?.data || response.data;
  },

  getBenefit: async (id) => {
    const response = await api.get(`/content/benefits/${id}`);
    return response.data?.data || response.data;
  },

  updateBenefit: async (id, data) => {
    const response = await api.put(`/content/benefits/${id}`, data);
    return response.data?.data || response.data;
  },

  deleteBenefit: async (id) => {
    const response = await api.delete(`/content/benefits/${id}`);
    return response.data;
  },

  // ===== ABOUT PAGE (16 endpoints) =====

  // About Hero
  getAboutHero: async () => {
    const response = await api.get('/content/about/hero');
    return response.data?.data || response.data;
  },

  updateAboutHero: async (data) => {
    const response = await api.put('/content/about/hero', data);
    return response.data?.data || response.data;
  },

  // About Quote
  getAboutQuote: async () => {
    const response = await api.get('/content/about/quote');
    return response.data?.data || response.data;
  },

  updateAboutQuote: async (data) => {
    const response = await api.put('/content/about/quote', data);
    return response.data?.data || response.data;
  },

  // Mission
  getMission: async () => {
    const response = await api.get('/content/about/mission');
    return response.data?.data || response.data;
  },

  updateMission: async (data) => {
    const response = await api.put('/content/about/mission', data);
    return response.data?.data || response.data;
  },

  // Why Ghana
  getWhyGhana: async () => {
    const response = await api.get('/content/about/why-ghana');
    return response.data?.data || response.data;
  },

  updateWhyGhana: async (data) => {
    const response = await api.put('/content/about/why-ghana', data);
    return response.data?.data || response.data;
  },

  // Milestones
  getMilestones: async () => {
    const response = await api.get('/content/about/milestones');
    return response.data?.data || response.data;
  },

  getMilestone: async (id) => {
    const response = await api.get(`/content/about/milestones/${id}`);
    return response.data?.data || response.data;
  },

  createMilestone: async (data) => {
    const response = await api.post('/content/about/milestones', data);
    return response.data?.data || response.data;
  },

  updateMilestone: async (id, data) => {
    const response = await api.put(`/content/about/milestones/${id}`, data);
    return response.data?.data || response.data;
  },

  deleteMilestone: async (id) => {
    const response = await api.delete(`/content/about/milestones/${id}`);
    return response.data;
  },

  // Timeline
  getTimeline: async () => {
    const response = await api.get('/content/about/timeline');
    return response.data?.data || response.data;
  },

  getTimelineItem: async (id) => {
    const response = await api.get(`/content/about/timeline/${id}`);
    return response.data?.data || response.data;
  },

  createTimelineItem: async (data) => {
    const response = await api.post('/content/about/timeline', data);
    return response.data?.data || response.data;
  },

  updateTimelineItem: async (id, data) => {
    const response = await api.put(`/content/about/timeline/${id}`, data);
    return response.data?.data || response.data;
  },

  deleteTimelineItem: async (id) => {
    const response = await api.delete(`/content/about/timeline/${id}`);
    return response.data;
  },

  // ===== PARTNERSHIP PAGE (10 endpoints) =====

  // Partnership Hero
  getPartnershipHero: async () => {
    const response = await api.get('/content/partnership/hero');
    return response.data?.data || response.data;
  },

  updatePartnershipHero: async (data) => {
    const response = await api.put('/content/partnership/hero', data);
    return response.data?.data || response.data;
  },

  // Impact Stats
  getImpactStats: async () => {
    const response = await api.get('/content/partnership/stats');
    return response.data?.data || response.data;
  },

  updateImpactStat: async (id, data) => {
    const response = await api.put(`/content/partnership/stats/${id}`, data);
    return response.data?.data || response.data;
  },

  // Why Partner
  getWhyPartner: async () => {
    const response = await api.get('/content/partnership/why');
    return response.data?.data || response.data;
  },

  updateWhyPartner: async (data) => {
    const response = await api.put('/content/partnership/why', data);
    return response.data?.data || response.data;
  },

  // Partnership Stories
  getPartnershipStories: async () => {
    const response = await api.get('/content/partnership/stories');
    return response.data?.data || response.data;
  },

  getPartnershipStory: async (id) => {
    const response = await api.get(`/content/partnership/stories/${id}`);
    return response.data?.data || response.data;
  },

  createPartnershipStory: async (data) => {
    const response = await api.post('/content/partnership/stories', data);
    return response.data?.data || response.data;
  },

  updatePartnershipStory: async (id, data) => {
    const response = await api.put(`/content/partnership/stories/${id}`, data);
    return response.data?.data || response.data;
  },

  deletePartnershipStory: async (id) => {
    const response = await api.delete(`/content/partnership/stories/${id}`);
    return response.data;
  },

  // Recognition
  getRecognition: async () => {
    const response = await api.get('/content/partnership/recognition');
    return response.data?.data || response.data;
  },

  createRecognition: async (data) => {
    const response = await api.post('/content/partnership/recognition', data);
    return response.data?.data || response.data;
  },

  deleteRecognition: async (id) => {
    const response = await api.delete(`/content/partnership/recognition/${id}`);
    return response.data;
  },

  // ===== IMPACT PAGE (8 endpoints) =====

  // Impact Metrics
  getImpactMetrics: async () => {
    const response = await api.get('/content/impact/metrics');
    return response.data?.data || response.data;
  },

  createImpactMetric: async (data) => {
    const response = await api.post('/content/impact/metrics', data);
    return response.data?.data || response.data;
  },

  updateImpactMetric: async (id, data) => {
    const response = await api.put(`/content/impact/metrics/${id}`, data);
    return response.data?.data || response.data;
  },

  deleteImpactMetric: async (id) => {
    const response = await api.delete(`/content/impact/metrics/${id}`);
    return response.data;
  },

  // Impact Stories (Success Stories)
  getImpactStories: async () => {
    const response = await api.get('/content/impact/stories');
    return response.data?.data || response.data;
  },

  createImpactStory: async (data) => {
    const response = await api.post('/content/impact/stories', data);
    return response.data?.data || response.data;
  },

  updateImpactStory: async (id, data) => {
    const response = await api.put(`/content/impact/stories/${id}`, data);
    return response.data?.data || response.data;
  },

  deleteImpactStory: async (id) => {
    const response = await api.delete(`/content/impact/stories/${id}`);
    return response.data;
  },

  // ===== HERO SLIDES (4 endpoints) =====

  getAllHeroSlides: async () => {
    const response = await api.get('/content/hero');
    return response.data?.data || response.data;
  },

  createHeroSlide: async (data) => {
    const response = await api.post('/content/hero', data);
    return response.data?.data || response.data;
  },

  updateHeroSlide: async (id, data) => {
    const response = await api.put(`/content/hero/${id}`, data);
    return response.data?.data || response.data;
  },

  deleteHeroSlide: async (id) => {
    const response = await api.delete(`/content/hero/${id}`);
    return response.data;
  },

  // ===== WORK WITH US PAGE (2 endpoints) =====

  // Get entire Work With Us section
  getWorkWithUs: async () => {
    const response = await api.get('/content/work-with-us');
    return response.data?.data || response.data;
  },

  // Update specific section within Work With Us
  // section: 'hero', 'setup', 'projectSteps', 'collaboration', 'hiring'
  updateWorkWithUs: async (section, data) => {
    const response = await api.put(`/content/work-with-us/${section}`, data);
    return response.data?.data || response.data;
  },

  // ===== QUALITY ASSURANCE PAGE (2 endpoints) =====

  // Get entire Quality Assurance section
  getQA: async () => {
    const response = await api.get('/content/quality-assurance');
    return response.data?.data || response.data;
  },

  // Update specific section within Quality Assurance
  // section: 'hero', 'intro', 'tools', 'features', 'faq'
  updateQA: async (section, data) => {
    const response = await api.put(`/content/quality-assurance/${section}`, data);
    return response.data?.data || response.data;
  }
};

export default contentService;
