/**
 * Settings Redux Slice
 * Handles site-wide configuration
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const MOCK_SETTINGS = {
  // Branding
  siteName: 'ZyraTech Hub',
  siteDescription: 'Empowering Youth Through Technology',
  tagline: 'Empowering Ghana\'s Future Through Technology and Innovation',
  primaryColor: '#004fa2',
  secondaryColor: '#ff6b35',
  logoLight: null,
  logoDark: null,
  favicon: null,
  
  // Contact Information
  contactEmail: 'info@zyratechhub.com',
  contactPhone: '+233 50 958 2497',
  contactWhatsApp: '233509582497',
  contactAddress: 'Koforidua, Eastern Region, Ghana',
  
  // HR Contact
  hrName: 'Magdalene',
  hrEmail: 'magdalene@zyratech.com',
  hrTitle: 'HR Coordinator',
  
  // Social Media Links
  socialLinkedIn: 'https://www.linkedin.com/company/zyra-tech-hub',
  socialTwitter: 'https://x.com/zyratechhub',
  socialInstagram: 'https://www.instagram.com/zyratechhub',
  socialFacebook: 'https://www.facebook.com/zyratechhub',
  socialYouTube: '',
  
  // Payment Settings
  paystackPublicKey: '',
  paystackSecretKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  currency: 'GHS',
  
  // Email/SMTP Settings
  smtpHost: '',
  smtpPort: '587',
  smtpUser: '',
  smtpPassword: '',
  fromEmail: 'noreply@zyratechhub.com',
  fromName: 'ZyraTech Hub',
  supportEmail: 'support@zyratechhub.com',
  
  // SEO Settings
  seoTitle: 'ZyraTech Hub | Empowering Youth Through Technology',
  seoDescription: 'Ghana\'s premier technology education and innovation center providing digital skills training, internships, IT services, and community development programs.',
  seoKeywords: 'tech training Ghana, digital skills, software development, Koforidua, tech hub',
  siteUrl: 'https://zyratechhub.com',
  
  // Analytics Settings
  googleAnalyticsId: '',
  metaPixelId: '',
  enableVisitorTracking: true,
  
  // General Settings
  maintenanceMode: false,
  allowRegistration: true,
  timezone: 'Africa/Accra',
  
  // Business Hours
  businessHoursWeekday: '8:00 AM - 5:00 PM',
  businessHoursWeekend: 'Closed',
  
  // Copyright
  copyrightYear: new Date().getFullYear(),
  copyrightText: '© {year} Zyra Tech Hub. All rights reserved.'
};

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_SETTINGS;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

export const updateSetting = createAsyncThunk(
  'settings/updateSetting',
  async ({ key, value }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { key, value };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    values: {},
    loading: false,
    error: null,
    lastUpdated: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.values = action.payload;
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateSetting.fulfilled, (state, action) => {
        state.values[action.payload.key] = action.payload.value;
      });
  }
});

export default settingsSlice.reducer;
