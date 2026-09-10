/**
 * Courses Redux Slice
 * Handles training courses state
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/training-courses', { params });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await api.post('/admin/training-courses', courseData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/training-courses/${id}`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/training-courses/${id}`);
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.userMessage || error.response?.data?.error?.message || error.message);
    }
  }
);

export const togglePublishCourse = createAsyncThunk(
  'courses/togglePublishCourse',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/training-courses/${id}/publish`, { status });
      const payload = response.data?.data || response.data;
      return { id, status, ...(typeof payload === 'object' ? payload : {}) };
    } catch (error) {
      return rejectWithValue(error.userMessage || error.response?.data?.error?.message || error.message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/training-courses/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.userMessage || error.response?.data?.error?.message || error.message);
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [],
    selectedCourse: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    }
  },
  reducers: {
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        const raw = action.payload;
        const items = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
          ? raw.data
          : Array.isArray(raw?.courses)
          ? raw.courses
          : [];

        state.items = items;
        if (raw?.pagination) {
          state.pagination = raw.pagination;
        } else if (raw?.total !== undefined) {
          state.pagination = {
            page: raw.page || 1,
            limit: raw.limit || 10,
            total: raw.total,
            totalPages: raw.totalPages || Math.ceil(raw.total / (raw.limit || 10))
          };
        } else {
          state.pagination = {
            page: 1,
            limit: items.length || 10,
            total: items.length,
            totalPages: 1
          };
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Fetch course by id
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.selectedCourse = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Create course
      .addCase(createCourse.fulfilled, (state, action) => {
        const newCourse = action.payload?.course || action.payload?.data || action.payload;
        if (newCourse && typeof newCourse === 'object') {
          state.items.unshift(newCourse);
        }
      })

      // Update course
      .addCase(updateCourse.fulfilled, (state, action) => {
        const updated = action.payload?.course || action.payload?.data || action.payload;
        if (updated && updated.id) {
          const index = state.items.findIndex((c) => c.id === updated.id);
          if (index !== -1) {
            state.items[index] = { ...state.items[index], ...updated };
          }
        }
      })

      // Toggle Publish
      .addCase(togglePublishCourse.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload,
            status: action.payload.status
          };
        }
      })

      // Delete course
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      });
  }
});

export const { clearSelectedCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
