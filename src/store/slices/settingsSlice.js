/**
 * Settings Redux Slice
 * Handles site-wide configuration
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const MOCK_SETTINGS = {
  siteName: 'ZyraTech',
  supportEmail: 'support@zyratech.com',
  primaryColor: '#5b4b8a',
  secondaryColor: '#6b5b9a',
  maintenanceMode: false,
  timezone: 'Africa/Accra'
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
