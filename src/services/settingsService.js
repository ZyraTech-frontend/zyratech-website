/**
 * Settings Service
 * Manage site-wide configuration
 */

import api from './api';

export const settingsService = {
  // Get all settings (public)
  getAllSettings: async () => {
    const response = await api.get('/settings');
    return response.data.data;
  },

  // Get settings by category (public)
  getSettingsByCategory: async (category) => {
    const response = await api.get(`/settings/category/${category}`);
    return response.data.data;
  },

  // Get all settings with metadata (admin)
  getAllSettingsAdmin: async () => {
    const response = await api.get('/admin/settings');
    return response.data.data;
  },

  // Update single setting (admin)
  updateSetting: async (key, value) => {
    const response = await api.patch(`/admin/settings/${key}`, { value });
    return response.data.data;
  },

  // Bulk update settings (admin)
  updateSettingsBulk: async (settings) => {
    const response = await api.patch('/admin/settings/bulk', { settings });
    return response.data.data;
  },

  // Upload asset (admin)
  uploadAsset: async (settingKey, file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(
      `/admin/settings/upload-asset/${settingKey}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );
    return response.data.data;
  },

  // Get audit logs (admin)
  getAuditLogs: async (filters = {}) => {
    const response = await api.get('/admin/settings/audit-logs', {
      params: filters
    });
    return response.data.data;
  }
};

export default settingsService;
