/**
 * Gallery Service
 * Manage image albums and gallery content
 */

import api from './api';

export const galleryService = {
  // Public: Get all albums with pagination
  getAllAlbums: async (page = 1, limit = 20) => {
    try {
      const response = await api.get('/gallery/albums', {
        params: { page, limit }
      });
      
      // Handle multiple possible response formats
      const data = response.data;
      let albums = [];
      let pagination = {};
      
      // Format 1: { success: true, data: { albums: [...], pagination: {...} } }
      if (data.success && data.data) {
        albums = data.data.albums || data.data.data || [];
        pagination = data.data.pagination || {};
      }
      // Format 2: { data: { albums: [...] } }
      else if (data.data) {
        albums = data.data.albums || data.data.data || data.data;
        pagination = data.pagination || {};
      }
      // Format 3: Direct response
      else {
        albums = data.albums || data || [];
      }
      
      // Ensure albums is array
      if (!Array.isArray(albums)) {
        albums = [];
      }
      
      return {
        albums: albums.map(album => ({
          ...album,
          id: album.id || album._id,
          title: album.title || 'Untitled Album',
          description: album.description || '',
          cover: album.cover || album.coverImage || '',
          imageCount: album.imageCount || album.images?.length || 0,
          createdAt: album.createdAt || new Date().toISOString(),
          updatedAt: album.updatedAt || album.createdAt || new Date().toISOString()
        })),
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

  // Public: Get single album by ID
  getAlbum: async (albumId) => {
    try {
      const response = await api.get(`/gallery/albums/${albumId}`);
      
      let album = response.data.data || response.data;
      
      if (album) {
        album = {
          ...album,
          id: album.id || album._id,
          title: album.title || 'Untitled Album',
          description: album.description || '',
          cover: album.cover || album.coverImage || '',
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

  // Public: Get all images in album
  getAlbumImages: async (albumId, page = 1, limit = 50) => {
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
      console.error(`Error fetching album images for ${albumId}:`, error);
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

  // Admin: Create new album
  createAlbum: async (albumData) => {
    try {
      const payload = {
        title: albumData.title || 'New Album',
        description: albumData.description || '',
        cover: albumData.cover || ''
      };
      
      const response = await api.post('/admin/gallery/albums', payload);
      
      let album = response.data.data || response.data;
      
      if (album) {
        album = {
          ...album,
          id: album.id || album._id,
          title: album.title || 'Untitled Album',
          description: album.description || '',
          cover: album.cover || '',
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

  // Admin: Update album
  updateAlbum: async (albumId, albumData) => {
    try {
      const payload = {
        title: albumData.title,
        description: albumData.description,
        cover: albumData.cover
      };
      
      const response = await api.put(`/admin/gallery/albums/${albumId}`, payload);
      
      let album = response.data.data || response.data;
      
      if (album) {
        album = {
          ...album,
          id: album.id || album._id,
          title: album.title || 'Untitled Album',
          description: album.description || '',
          cover: album.cover || '',
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

  // Admin: Upload image to album
  uploadImageToAlbum: async (albumId, imageFile, caption = '', onProgress = null) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('caption', caption);
      
      const response = await api.post(
        `/admin/gallery/albums/${albumId}/images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
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

  // Admin: Upload multiple images to album
  uploadMultipleImagesToAlbum: async (albumId, imageFiles, onProgress = null) => {
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
      const response = await api.delete(`/admin/gallery/images/${imageId}`);
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
