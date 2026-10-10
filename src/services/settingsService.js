/**
 * Settings Service
 * Handles site-wide settings and configuration management
 * 
 * Backend Endpoints:
 * PUBLIC:
 * - GET /api/settings - Get public site settings
 * 
 * ADMIN:
 * - PUT /api/admin/settings - Update site settings (admin only)
 * - POST /api/admin/settings/bulk - Bulk update multiple settings (admin only)
 * 
 * USER:
 * - GET /api/users/settings - Get user account settings
 * - PUT /api/users/settings - Update user preferences
 * - GET /api/users/settings/privacy - Get privacy settings
 * - PUT /api/users/settings/privacy - Update privacy settings
 */

import api from './api';

const settingsService = {
  // ============ PUBLIC ENDPOINTS ============

  /**
   * Get public site settings
   * GET /api/settings
   * @returns {Promise} Site settings object
   */
  getSettings: async () => {
    try {
      const response = await api.get('/settings');
      console.log('[SettingsService] Fetched public settings:', response.data);
      
      // Backend returns: { success, data: {...settings} }
      return response.data?.data || response.data || {};
    } catch (error) {
      console.error('[SettingsService] Error fetching settings:', error);
      
      // Return minimal defaults on error
      return {
        siteName: 'ZyraTech Hub',
        siteDescription: 'Empowering Youth Through Technology',
        tagline: 'Empowering Ghana\'s Future Through Technology and Innovation',
        primaryColor: '#004fa2',
        secondaryColor: '#ff6b35',
        contactEmail: 'info@zyratechhub.com',
        contactPhone: '+233 55 955 4261',
        timezone: 'Africa/Accra',
        copyrightYear: new Date().getFullYear(),
        copyrightText: `© ${new Date().getFullYear()} Zyra Tech Hub. All rights reserved.`
      };
    }
  },

  // ============ ADMIN ENDPOINTS ============

  /**
   * Update a single setting (Admin only)
   * PUT /api/admin/settings
   * @param {string} key - Setting key
   * @param {any} value - Setting value
   * @returns {Promise} Updated setting
   */
  updateSetting: async (key, value) => {
    try {
      const response = await api.put('/admin/settings', { [key]: value });
      console.log(`[SettingsService] Updated setting ${key}:`, response.data);
      return response.data?.data || response.data || { key, value };
    } catch (error) {
      console.error(`[SettingsService] Error updating setting ${key}:`, error);
      throw error;
    }
  },

  /**
   * Bulk update multiple settings at once (Admin only)
   * POST /api/admin/settings/bulk
   * @param {Object} settings - Object with multiple key-value pairs
   * @returns {Promise} Updated settings object
   */
  updateSettingsBulk: async (settings) => {
    try {
      const response = await api.post('/admin/settings/bulk', { settings });
      console.log('[SettingsService] Bulk updated settings:', response.data);
      return response.data?.data || response.data || settings;
    } catch (error) {
      console.error('[SettingsService] Error bulk updating settings:', error);
      throw error;
    }
  },

  /**
   * Update all settings (Admin only) - Alternative to bulk
   * PUT /api/admin/settings
   * @param {Object} settings - Complete settings object
   * @returns {Promise} Updated settings
   */
  updateAllSettings: async (settings) => {
    try {
      const response = await api.put('/admin/settings', settings);
      console.log('[SettingsService] Updated all settings:', response.data);
      return response.data?.data || response.data || settings;
    } catch (error) {
      console.error('[SettingsService] Error updating all settings:', error);
      throw error;
    }
  },

  // ============ USER SETTINGS ENDPOINTS ============

  /**
   * Get current user's account settings
   * GET /api/users/settings
   * @returns {Promise} User settings object
   */
  getUserSettings: async () => {
    try {
      const response = await api.get('/users/settings');
      console.log('[SettingsService] Fetched user settings:', response.data);
      return response.data?.data || response.data || {};
    } catch (error) {
      console.error('[SettingsService] Error fetching user settings:', error);
      throw error;
    }
  },

  /**
   * Update current user's account settings
   * PUT /api/users/settings
   * @param {Object} settings - User preference settings
   * @returns {Promise} Updated user settings
   */
  updateUserSettings: async (settings) => {
    try {
      const response = await api.put('/users/settings', settings);
      console.log('[SettingsService] Updated user settings:', response.data);
      return response.data?.data || response.data || settings;
    } catch (error) {
      console.error('[SettingsService] Error updating user settings:', error);
      throw error;
    }
  },

  /**
   * Get current user's privacy settings
   * GET /api/users/settings/privacy
   * @returns {Promise} Privacy settings object
   */
  getPrivacySettings: async () => {
    try {
      const response = await api.get('/users/settings/privacy');
      console.log('[SettingsService] Fetched privacy settings:', response.data);
      return response.data?.data || response.data || {};
    } catch (error) {
      console.error('[SettingsService] Error fetching privacy settings:', error);
      throw error;
    }
  },

  /**
   * Update current user's privacy settings
   * PUT /api/users/settings/privacy
   * @param {Object} privacySettings - Privacy preference settings
   * @returns {Promise} Updated privacy settings
   */
  updatePrivacySettings: async (privacySettings) => {
    try {
      const response = await api.put('/users/settings/privacy', privacySettings);
      console.log('[SettingsService] Updated privacy settings:', response.data);
      return response.data?.data || response.data || privacySettings;
    } catch (error) {
      console.error('[SettingsService] Error updating privacy settings:', error);
      throw error;
    }
  }
};

export default settingsService;
