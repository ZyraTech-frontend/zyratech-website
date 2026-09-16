/**
 * Training Service
 * Manage training courses
 */

import api from './api';

export const trainingService = {
  // Public: Get all courses
  getAllCourses: async (params = {}) => {
    const response = await api.get('/training-courses', { params });
    // Backend response: { success: true, data: { data: [...], pagination: {...} } }
    return response.data.data?.data || response.data.data || [];
  },

  // Public: Get single course
  getCourse: async (slug) => {
    const response = await api.get(`/training-courses/${slug}`);
    // Handle both nested and flat response formats
    return response.data.data?.data || response.data.data || response.data;
  },

  // Admin: Get all courses
  getAllCoursesAdmin: async (params = {}) => {
    const response = await api.get('/admin/training-courses', { params });
    return response.data.data;
  },

  // Admin: Create course
  createCourse: async (courseData) => {
    const response = await api.post('/admin/training-courses', courseData);
    return response.data.data;
  },

  // Admin: Update course
  updateCourse: async (id, courseData) => {
    const response = await api.put(`/admin/training-courses/${id}`, courseData);
    return response.data.data;
  },

  // Admin: Delete course
  deleteCourse: async (id) => {
    const response = await api.delete(`/admin/training-courses/${id}`);
    return response.data;
  },

  // Admin: Publish / Unpublish course
  publishCourse: async (id, status = 'published') => {
    const response = await api.patch(`/admin/training-courses/${id}/publish`, { status });
    return response.data?.data || response.data;
  },

  // Admin: Get course enrollments
  getCourseEnrollments: async (courseId, params = {}) => {
    const response = await api.get(`/admin/training-courses/${courseId}/enrollments`, {
      params
    });
    return response.data?.data || response.data;
  },

  // Admin: Get all enrollments
  getAllEnrollments: async (params = {}) => {
    const response = await api.get('/admin/enrollments', { params });
    return response.data?.data || response.data;
  },

  // Admin: Get single enrollment
  getEnrollment: async (id) => {
    const response = await api.get(`/admin/enrollments/${id}`);
    return response.data?.data || response.data;
  },

  // Admin: Update enrollment status
  updateEnrollmentStatus: async (id, status, notes = '') => {
    const response = await api.patch(`/admin/enrollments/${id}`, { status, notes });
    return response.data?.data || response.data;
  },

  // Admin: Delete enrollment
  deleteEnrollment: async (id) => {
    const response = await api.delete(`/admin/enrollments/${id}`);
    return response.data?.data || response.data;
  }
};

export default trainingService;
