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
    status: 'active',
    accountStatus: 'active',
    kycStatus: 'verified',
    mustChangePassword: false,
    phone: '+233 24 000 0001',
    department: 'Training Courses',
    createdAt: '2024-01-01T00:00:00.000Z',
    lastLoginAt: '2025-06-15T09:30:00.000Z'
  },
  {
    id: 'u-1002',
    name: 'Admin User',
    email: 'admin@zyratech.com',
    role: 'admin',
    status: 'active',
    accountStatus: 'active',
    kycStatus: 'verified',
    mustChangePassword: false,
    phone: '+233 24 000 0002',
    department: 'Blog Articles',
    createdAt: '2024-03-15T10:00:00.000Z',
    lastLoginAt: '2025-06-14T14:20:00.000Z'
  },
  {
    id: 'u-1003',
    name: 'Kwame Asante',
    email: 'kwame.asante@zyratech.com',
    role: 'admin',
    status: 'active',
    accountStatus: 'pending_password',
    kycStatus: 'pending',
    mustChangePassword: true,
    phone: '+233 24 000 0003',
    department: 'Partnerships',
    createdAt: '2025-06-01T08:00:00.000Z',
    lastLoginAt: null
  },
  {
    id: 'u-1004',
    name: 'John Mensah',
    email: 'john.mensah@zyratech.com',
    role: 'admin',
    status: 'inactive',
    accountStatus: 'deactivated',
    kycStatus: 'verified',
    mustChangePassword: false,
    phone: '+233 24 000 0004',
    department: 'Payments',
    createdAt: '2024-06-20T12:00:00.000Z',
    lastLoginAt: '2025-04-10T16:45:00.000Z',
    deactivatedAt: '2025-05-01T09:00:00.000Z',
    deactivationReason: 'Left the organization'
  },
  {
    id: 'u-1005',
    name: 'Ama Serwaa',
    email: 'ama.serwaa@zyratech.com',
    role: 'admin',
    status: 'active',
    accountStatus: 'active',
    kycStatus: 'not_submitted',
    mustChangePassword: false,
    phone: '+233 24 000 0005',
    department: 'Enrollments',
    createdAt: '2025-02-10T11:00:00.000Z',
    lastLoginAt: '2025-06-13T10:15:00.000Z'
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

export const deactivateUser = createAsyncThunk(
  'users/deactivateUser',
  async (id, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { id, deactivatedAt: new Date().toISOString() };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

export const reactivateUser = createAsyncThunk(
  'users/reactivateUser',
  async (id, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { id };
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
      })
      .addCase(deactivateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            accountStatus: 'deactivated',
            status: 'inactive',
            deactivatedAt: action.payload.deactivatedAt
          };
        }
      })
      .addCase(reactivateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            accountStatus: 'active',
            status: 'active',
            deactivatedAt: null
          };
        }
      });
  }
});

export default usersSlice.reducer;
