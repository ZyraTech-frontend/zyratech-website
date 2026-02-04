/**
 * Users Redux Slice
 * Handles user management
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const MOCK_USERS = [
  {
    id: 'u-1001',
    name: 'Mihael Afedi',
    email: 'superadmin@zyratech.com',
    role: 'super_admin',
    status: 'active'
  },
  {
    id: 'u-1002',
    name: 'Admin User',
    email: 'admin@zyratech.com',
    role: 'admin',
    status: 'active'
  },
  {
    id: 'u-1003',
    name: 'Editor User',
    email: 'editor@zyratech.com',
    role: 'editor',
    status: 'inactive'
  }
];

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        data: MOCK_USERS,
        pagination: {
          page: params?.page || 1,
          limit: params?.limit || 20,
          total: MOCK_USERS.length,
          totalPages: 1
        }
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 250));
      return { id: `u-${Date.now()}`, ...userData };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { id, ...data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

export const changeUserRole = createAsyncThunk(
  'users/changeUserRole',
  async ({ id, role }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { id, role };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    selectedUser: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload.data || [];
        state.pagination = action.payload.pagination || state.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter((u) => u.id !== action.payload);
      });
  }
});

export default usersSlice.reducer;
