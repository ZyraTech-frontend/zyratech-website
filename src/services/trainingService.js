/**
 * Training Service
 * Manage training courses
 */

import api from './api';

export const trainingService = {
  // Public: Get all courses
  getAllCourses: async (params = {}) => {
    const response = await api.get('/training-courses', { params });
    return response.data.data;
  },

  // Public: Get single course
  getCourse: async (slug) => {
    const response = await api.get(`/training-courses/${slug}`);
    return response.data.data;
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

  // Admin: Publish course
  publishCourse: async (id) => {
    const response = await api.patch(`/admin/training-courses/${id}/publish`);
    return response.data.data;
  },

  // Admin: Get course enrollments
  getCourseEnrollments: async (courseId, params = {}) => {
    const response = await api.get(`/admin/training-courses/${courseId}/enrollments`, {
      params
    });
    return response.data.data;
  }
};

export default trainingService;
