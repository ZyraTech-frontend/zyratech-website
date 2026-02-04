/**
 * User Service
 * Manage users and roles
 */

import api from './api';

export const userService = {
  // Get all users (super admin)
  getAllUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data.data;
  },

  // Get single user
  getUser: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data.data;
  },

  // Create user (super admin)
  createUser: async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data.data;
  },

  // Update user (super admin)
  updateUser: async (id, userData) => {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data.data;
  },

  // Change user role (super admin)
  changeUserRole: async (id, role) => {
    const response = await api.patch(`/admin/users/${id}/role`, { role });
    return response.data.data;
  },

  // Suspend user (super admin)
  suspendUser: async (id) => {
    const response = await api.patch(`/admin/users/${id}/suspend`);
    return response.data.data;
  },

  // Delete user (super admin)
  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  // Get activity logs (super admin)
  getActivityLogs: async (params = {}) => {
    const response = await api.get('/admin/activity-logs', { params });
    return response.data.data;
  }
};

export default userService;
