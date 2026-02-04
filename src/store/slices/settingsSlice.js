/**
 * Settings Redux Slice
 * Handles site-wide configuration
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/settings');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

export const updateSetting = createAsyncThunk(
  'settings/updateSetting',
  async ({ key, value }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/settings/${key}`, { value });
      return response.data.data;
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
