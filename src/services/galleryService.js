/**
 * Gallery Service
 * Manage image albums and gallery content
 * 
 * NOTE: Backend endpoints verified with Postman collection:
 * - POST /admin/gallery/albums ✅
 * - GET /admin/gallery/albums/:id ✅
 * - POST /admin/gallery/albums/{id}/images ✅
 * - DELETE /admin/gallery/media/{id} ✅
 * 
 * MISSING: GET /admin/gallery/albums (list all) - Need backend to create this
 */

import api from './api';

export const galleryService = {
  // Admin: Get all albums with pagination
  // NOTE: Backend needs to create GET /admin/gallery/albums endpoint
  // Currently only supports getting single albums by ID
  getAllAlbums: async (page = 1, limit = 20) => {
    try {
      console.log('[galleryService] Fetching albums from /admin/gallery/albums', { page, limit });
      const response = await api.get('/admin/gallery/albums', {
        params: { page, limit }
      });
      
      const data = response.data;
      console.log('[galleryService] Raw response data structure:', {
        hasSuccess: !!data.success,
        hasData: !!data.data,
        dataKeys: Object.keys(data),
        nestedDataKeys: Object.keys(data.data || {}),
        status: response.status
      });
      console.log('[galleryService] Full response:', data);
      
      let albums = [];
      let pagination = {};
      
      // Format 1: { success: true, data: { data: [...], pagination: {...} } }
      // This is the ACTUAL backend format - double nested
      if (data.success && data.data) {
        console.log('[galleryService] Using format 1 (success + data wrapper)');
        // Check for double-nested: data.data.data or data.data.albums
        albums = data.data.data || data.data.albums || [];
        pagination = data.data.pagination || {};
      }
      // Format 2: Fallback to direct data.data array if no pagination
      else if (Array.isArray(data.data)) {
        console.log('[galleryService] Using format 2 (direct array in data)');
        albums = data.data;
        pagination = data.pagination || {};
      }
      // Format 3: Direct response
      else {
        console.log('[galleryService] Using format 3 (direct response)');
        albums = data.albums || data || [];
      }
      
      console.log('[galleryService] Extracted albums:', { count: albums.length, sample: albums[0] });
      
      // Ensure albums is array
      if (!Array.isArray(albums)) {
        albums = [];
      }
      
      // Fetch image counts for each album to ensure accurate counts
      // This works around backend listAlbums not including imageCount
      const albumsWithCounts = await Promise.all(
        albums.map(async (album) => {
          try {
            // Try to get image count from the images endpoint
            const imagesResponse = await galleryService.getAlbumImages(album.id || album._id, 1, 1);
            const imageCount = imagesResponse.pagination?.total || 0;
            
            return {
              ...album,
              id: album.id || album._id,
              title: album.title || 'Untitled Album',
              description: album.description || '',
              cover: album.coverImageUrl || album.cover || album.coverImage || '',
              imageCount: imageCount, // Use actual count from images endpoint
              status: album.status || 'draft', // Ensure status is set
              createdAt: album.createdAt || new Date().toISOString(),
              updatedAt: album.updatedAt || album.createdAt || new Date().toISOString()
            };
          } catch (err) {
            console.warn(`[galleryService] Failed to fetch image count for album ${album.id}:`, err);
            // Fallback to original imageCount if fetch fails
            return {
              ...album,
              id: album.id || album._id,
              title: album.title || 'Untitled Album',
              description: album.description || '',
              cover: album.coverImageUrl || album.cover || album.coverImage || '',
              imageCount: album.imageCount || album.images?.length || 0,
              status: album.status || 'draft', // Ensure status is set
              createdAt: album.createdAt || new Date().toISOString(),
              updatedAt: album.updatedAt || album.createdAt || new Date().toISOString()
            };
          }
        })
      );
      
      return {
        albums: albumsWithCounts,
        pagination: {
          page: pagination.page || page,
          limit: pagination.limit || limit,
          total: pagination.total || albums.length,
          pages: pagination.pages || Math.ceil((pagination.total || albums.length) / limit)
        }
      };
    } catch (error) {
      console.error('Error fetching albums:', error);
      throw error;
    }
  },

  // Admin: Get single album by ID (uses admin endpoint)
  getAlbum: async (albumId) => {
    try {
      const response = await api.get(`/admin/gallery/albums/${albumId}`);
      
      let album = response.data.data || response.data;
      
      if (album) {
        album = {
          ...album,
          id: album.id || album._id,
          title: album.title || 'Untitled Album',
          description: album.description || '',
          cover: album.coverImageUrl || album.cover || album.coverImage || '',
          status: album.status || 'draft', // Ensure status is set
          images: album.images || [],
          createdAt: album.createdAt || new Date().toISOString(),
          updatedAt: album.updatedAt || album.createdAt || new Date().toISOString()
        };
      }
      
      return album;
    } catch (error) {
      console.error(`Error fetching album ${albumId}:`, error);
      throw error;
    }
  },

  // Admin: Get all images in album (uses admin endpoint)
  getAlbumImages: async (albumId, page = 1, limit = 50) => {
    try {
      const response = await api.get(`/admin/gallery/albums/${albumId}/images`, {
        params: { page, limit }
      });
      
      const data = response.data;
      let images = [];
      let pagination = {};
      
      // Format 1: { success: true, data: { images: [...], pagination: {...} } }
      if (data.success && data.data) {
        images = data.data.images || data.data.data || [];
        pagination = data.data.pagination || {};
      }
      // Format 2: { data: { images: [...] } }
      else if (data.data) {
        images = data.data.images || data.data.data || data.data;
        pagination = data.pagination || {};
      }
      else {
        images = data.images || data || [];
      }
      
      if (!Array.isArray(images)) {
        images = [];
      }
      
      return {
        images: images.map(img => ({
          ...img,
          id: img.id || img._id,
          url: img.url || img.imageUrl || img.image,
          caption: img.caption || '',
          category: img.category || '',
          alt: img.alt || img.caption || 'Gallery image',
          uploadedAt: img.uploadedAt || img.createdAt || new Date().toISOString()
        })),
        pagination: {
          page: pagination.page || page,
          limit: pagination.limit || limit,
          total: pagination.total || images.length,
          pages: pagination.pages || Math.ceil((pagination.total || images.length) / limit)
        }
      };
    } catch (error) {
      console.error(`Error fetching album images for ${albumId}:`, error);
      throw error;
    }
  },
  
  // Public: Get single album by ID (for public gallery)
  getPublicAlbum: async (albumId) => {
    try {
      const response = await api.get(`/gallery/albums/${albumId}`);
      
      let album = response.data.data || response.data;
      
      if (album) {
        album = {
          ...album,
          id: album.id || album._id,
          title: album.title || 'Untitled Album',
          description: album.description || '',
          cover: album.coverImageUrl || album.cover || album.coverImage || '',
          status: album.status || 'published', // Public albums should be published
          images: album.images || [],
          createdAt: album.createdAt || new Date().toISOString(),
          updatedAt: album.updatedAt || album.createdAt || new Date().toISOString()
        };
      }
      
      return album;
    } catch (error) {
      console.error(`Error fetching public album ${albumId}:`, error);
      throw error;
    }
  },

  // Public: Get all images in public album
  getPublicAlbumImages: async (albumId, page = 1, limit = 50) => {
    try {
      const response = await api.get(`/gallery/albums/${albumId}/images`, {
        params: { page, limit }
      });
      
      const data = response.data;
      let images = [];
      let pagination = {};
      
      // Format 1: { success: true, data: { images: [...], pagination: {...} } }
      if (data.success && data.data) {
        images = data.data.images || data.data.data || [];
        pagination = data.data.pagination || {};
      }
      // Format 2: { data: { images: [...] } }
      else if (data.data) {
        images = data.data.images || data.data.data || data.data;
        pagination = data.pagination || {};
      }
      else {
        images = data.images || data || [];
      }
      
      if (!Array.isArray(images)) {
        images = [];
      }
      
      return {
        images: images.map(img => ({
          ...img,
          id: img.id || img._id,
          url: img.url || img.imageUrl || img.image,
          caption: img.caption || '',
          alt: img.alt || img.caption || 'Gallery image',
          uploadedAt: img.uploadedAt || img.createdAt || new Date().toISOString()
        })),
        pagination: {
          page: pagination.page || page,
          limit: pagination.limit || limit,
          total: pagination.total || images.length,
          pages: pagination.pages || Math.ceil((pagination.total || images.length) / limit)
        }
      };
    } catch (error) {
      console.error(`Error fetching public album images for ${albumId}:`, error);
      throw error;
    }
  },

  // Public: Search gallery
  searchGallery: async (searchQuery, params = {}) => {
    try {
      const response = await api.get('/gallery/search', {
        params: { q: searchQuery, ...params }
      });
      
      const data = response.data;
      let results = [];
      
      // Format 1: { success: true, data: { results: [...] } }
      if (data.success && data.data && data.data.results) {
        results = data.data.results;
      }
      // Format 2: { data: [...] }
      else if (data.data) {
        results = Array.isArray(data.data) ? data.data : data.data.results || [];
      }
      // Format 3: Direct array
      else if (Array.isArray(data)) {
        results = data;
      }
      
      return results || [];
    } catch (error) {
      console.error('Error searching gallery:', error);
      throw error;
    }
  },

  // ===== ADMIN OPERATIONS =====

  // Admin: Create new album (FormData - accepts cover photo + metadata)
  createAlbum: async (albumData) => {
    try {
      const formData = new FormData();
      formData.append('title', albumData.title || 'New Album');
      formData.append('description', albumData.description || '');
      formData.append('category', albumData.category || 'events');
      
      // Optional: include cover photo (backend expects 'coverImage', not 'cover')
      if (albumData.coverFile) {
        formData.append('coverImage', albumData.coverFile);
      }
      
      const response = await api.post('/admin/gallery/albums', formData, {
        // DO NOT manually set Content-Type - let axios/browser handle multipart encoding
      });
      
      let album = response.data.data || response.data;
      
      if (album) {
        album = {
          ...album,
          id: album.id || album._id,
          title: album.title || 'Untitled Album',
          description: album.description || '',
          cover: album.cover || album.coverImage || '',
          category: album.category || 'events',
          status: album.status || 'draft', // New albums default to draft
          images: album.images || [],
          createdAt: album.createdAt || new Date().toISOString()
        };
      }
      
      return album;
    } catch (error) {
      console.error('Error creating album:', error);
      throw error;
    }
  },

  // Admin: Update album (FormData - accepts cover photo + metadata)
  updateAlbum: async (albumId, albumData) => {
    try {
      const formData = new FormData();
      formData.append('title', albumData.title);
      formData.append('description', albumData.description);
      formData.append('category', albumData.category || 'events');
      
      // Include status if provided (for publish/unpublish actions)
      if (albumData.status) {
        formData.append('status', albumData.status);
      }
      
      // Optional: include new cover photo (backend expects 'coverImage', not 'cover')
      if (albumData.coverFile) {
        formData.append('coverImage', albumData.coverFile);
      }
      
      const response = await api.put(`/admin/gallery/albums/${albumId}`, formData, {
        // DO NOT manually set Content-Type - let axios/browser handle multipart encoding
      });
      
      let album = response.data.data || response.data;
      
      if (album) {
        album = {
          ...album,
          id: album.id || album._id,
          title: album.title || 'Untitled Album',
          description: album.description || '',
          cover: album.cover || album.coverImage || '',
          category: album.category || 'events',
          status: album.status || 'draft', // Ensure status is mapped
          images: album.images || [],
          updatedAt: album.updatedAt || new Date().toISOString()
        };
      }
      
      return album;
    } catch (error) {
      console.error(`Error updating album ${albumId}:`, error);
      throw error;
    }
  },

  // Admin: Delete album
  deleteAlbum: async (albumId) => {
    try {
      const response = await api.delete(`/admin/gallery/albums/${albumId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting album ${albumId}:`, error);
      throw error;
    }
  },

  // Admin: Upload image to album with caption and category
  uploadImageToAlbum: async (albumId, imageFile, caption = '', category = '', onProgress = null) => {
    try {
      const formData = new FormData();
      
      // Backend expects 'image' field - REQUIRED
      console.log('[galleryService] imageFile type:', typeof imageFile, 'isFile:', imageFile instanceof File);
      formData.append('image', imageFile);
      
      // Optional fields according to backend spec
      formData.append('title', caption || ''); // Use caption as title
      formData.append('category', category || '');
      formData.append('type', 'image'); // Default type
      
      // Debug logging
      console.log('[galleryService] FormData entries before send:', Array.from(formData.entries()).map(([k, v]) => ({
        field: k,
        value: v instanceof File ? `File: ${v.name} (${v.size} bytes)` : v,
        type: v instanceof File ? 'File' : typeof v
      })));
      
      const response = await api.post(
        `/admin/gallery/albums/${albumId}/images`,
        formData,
        {
          // DO NOT manually set Content-Type header - let axios/browser handle it automatically
          // The api.js interceptor will remove it for FormData
          onUploadProgress: (progressEvent) => {
            if (onProgress) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onProgress(percentCompleted);
            }
          }
        }
      );
      
      let image = response.data.data || response.data;
      
      if (image) {
        image = {
          ...image,
          id: image.id || image._id,
          url: image.url || image.imageUrl || image.image,
          caption: image.caption || '',
          category: image.category || '',
          alt: image.alt || image.caption || 'Gallery image',
          uploadedAt: image.uploadedAt || image.createdAt || new Date().toISOString()
        };
      }
      
      return image;
    } catch (error) {
      console.error(`Error uploading image to album ${albumId}:`, error);
      throw error;
    }
  },

  // Admin: Upload multiple images to album with category
  uploadMultipleImagesToAlbum: async (albumId, imageFiles, onProgress = null, category = '') => {
    try {
      const uploadedImages = [];
      const totalFiles = imageFiles.length;
      
      for (let i = 0; i < totalFiles; i++) {
        try {
          const file = imageFiles[i];
          const image = await galleryService.uploadImageToAlbum(
            albumId,
            file,
            file.name || `Image ${i + 1}`,
            category, // Pass category to each image
            (percent) => {
              // Calculate overall progress
              const overallProgress = Math.round(
                ((i + percent / 100) / totalFiles) * 100
              );
              if (onProgress) {
                onProgress(overallProgress);
              }
            }
          );
          uploadedImages.push(image);
        } catch (err) {
          console.error(`Error uploading file ${i + 1}:`, err);
          // Continue with other files
        }
      }
      
      return uploadedImages;
    } catch (error) {
      console.error(`Error uploading multiple images to album ${albumId}:`, error);
      throw error;
    }
  },

  // Admin: Delete image from album
  deleteImage: async (imageId) => {
    try {
      const response = await api.delete(`/admin/gallery/media/${imageId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting image ${imageId}:`, error);
      throw error;
    }
  },

  // Admin: Bulk delete images
  deleteImages: async (imageIds) => {
    try {
      const deletePromises = imageIds.map(imageId => 
        galleryService.deleteImage(imageId)
      );
      
      const results = await Promise.all(deletePromises);
      return results;
    } catch (error) {
      console.error('Error bulk deleting images:', error);
      throw error;
    }
  }
};

export default galleryService;
