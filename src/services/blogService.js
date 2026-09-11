/**
 * Blog Service
 * Handles API integration for Blog Articles (Public and Admin).
 * Maps to backend:
 * - Public: /api/blog/articles, /api/blog/articles/:slug
 * - Admin:  /api/admin/blog/articles, /api/admin/blog/upload
 */

import api from './api';
import { normalizeImageUrl } from '../utils/imageUrl';

/**
 * Format date string into human readable format like "January 2026"
 */
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

/**
 * Calculate estimated reading time based on word count
 */
const calculateReadingTime = (content) => {
  if (!content) return '3 min read';
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

/**
 * Normalize an article object from API or mock to the shape expected by UI
 */
export const normalizeArticle = (article) => {
  if (!article) return null;

  const rawTags = Array.isArray(article.tags) ? article.tags : [];
  const isFeatured = rawTags.includes('featured') || Boolean(article.featured);
  // Pick the first non-'featured' tag as category, or default to 'General'
  const categoryTag = rawTags.find(t => t.toLowerCase() !== 'featured');
  const category = article.category || categoryTag || 'General';

  const authorObj = typeof article.author === 'string'
    ? { name: article.author, avatar: article.authorAvatar || '/images/image1.webp' }
    : {
        name: article.author?.name || 'ZyraTech Team',
        avatar: article.author?.avatar || article.authorAvatar || '/images/image1.webp'
      };

  const rawImage = article.coverImageUrl || article.image;
  const image = normalizeImageUrl(rawImage) || rawImage || '/images/image1.webp';

  return {
    id: article.id,
    title: article.title || '',
    slug: article.slug || '',
    content: article.content || '',
    excerpt: article.excerpt || '',
    image,
    coverImageUrl: normalizeImageUrl(rawImage) || rawImage || '',
    category,
    tags: rawTags,
    featured: isFeatured,
    status: article.status || 'draft',
    author: authorObj,
    authorName: authorObj.name,
    authorAvatar: authorObj.avatar,
    date: formatDate(article.publishedAt || article.createdAt || article.date),
    readingTime: article.readingTime || calculateReadingTime(article.content),
    publishedAt: article.publishedAt || null,
    createdAt: article.createdAt || null,
    updatedAt: article.updatedAt || null,
  };
};

export const blogService = {
  // ─── PUBLIC ENDPOINTS ──────────────────────────────────────────────────────

  /**
   * List published blog articles with pagination, search, and tag filter
   * @param {Object} params - { page, limit, tag, search }
   */
  getPublicArticles: async (params = {}) => {
    const response = await api.get('/blog/articles', { params });
    const payload = response.data?.data;
    const items = Array.isArray(payload) ? payload : (payload?.data || []);
    const pagination = payload?.pagination || {
      page: params.page || 1,
      limit: params.limit || 20,
      total: items.length,
      totalPages: Math.ceil(items.length / (params.limit || 20)),
    };

    return {
      data: items.map(normalizeArticle),
      pagination,
    };
  },

  /**
   * Get single published article by slug
   * @param {string} slug
   */
  getPublicArticleBySlug: async (slug) => {
    const response = await api.get(`/blog/articles/${slug}`);
    const article = response.data?.data;
    return normalizeArticle(article);
  },

  // ─── ADMIN ENDPOINTS ───────────────────────────────────────────────────────

  /**
   * List admin articles (published, draft, archived) with pagination & filters
   * @param {Object} params - { page, limit, status, tag, search }
   */
  getAdminArticles: async (params = {}) => {
    const response = await api.get('/admin/blog/articles', { params });
    const payload = response.data?.data;
    const items = Array.isArray(payload) ? payload : (payload?.data || []);
    const pagination = payload?.pagination || {
      page: params.page || 1,
      limit: params.limit || 20,
      total: items.length,
      totalPages: Math.ceil(items.length / (params.limit || 20)),
    };

    return {
      data: items.map(normalizeArticle),
      pagination,
    };
  },

  /**
   * Get single admin article by ID or slug
   * @param {string} id
   */
  getAdminArticleById: async (id) => {
    const response = await api.get(`/admin/blog/articles/${id}`);
    const article = response.data?.data;
    return normalizeArticle(article);
  },

  /**
   * Create new article
   * @param {Object} data - { title, slug, content, excerpt, coverImageUrl, author, tags, status }
   */
  createArticle: async (data) => {
    const response = await api.post('/admin/blog/articles', data);
    const created = response.data?.data;
    return normalizeArticle(created);
  },

  /**
   * Update existing article
   * @param {string} id
   * @param {Object} data - fields to update
   */
  updateArticle: async (id, data) => {
    const response = await api.put(`/admin/blog/articles/${id}`, data);
    const updated = response.data?.data;
    return normalizeArticle(updated);
  },

  /**
   * Delete article
   * @param {string} id
   */
  deleteArticle: async (id) => {
    const response = await api.delete(`/admin/blog/articles/${id}`);
    return response.data;
  },

  /**
   * Upload cover image file to S3
   * @param {File} file
   * @returns {Promise<string>} Image URL
   */
  uploadCoverImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/admin/blog/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const rawUrl = response.data?.data?.url || response.data?.url;
    return normalizeImageUrl(rawUrl) || rawUrl;
  },
};

export default blogService;
