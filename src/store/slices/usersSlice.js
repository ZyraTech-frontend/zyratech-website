/**
 * Users Redux Slice
 * Handles user management — calls real API via userService
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/userService';

/**
 * Normalize a user object from the backend into the shape the UI expects.
 * The backend may use _id, firstName/lastName, isActive, etc.
 */
const normalizeUser = (u) => {
  if (!u) return u;
  return {
    ...u,
    id: u.id || u._id,
    name: u.name || [u.firstName, u.lastName].filter(Boolean).join(' ') || u.email,
    accountStatus:
      u.accountStatus ||
      (u.isDeactivated || u.status === 'inactive' ? 'deactivated' :
       u.mustChangePassword ? 'pending_password' : 'active'),
    status: u.status || (u.isDeactivated ? 'inactive' : 'active'),
    kycStatus: u.kycStatus || 'not_submitted',
    permissions: Array.isArray(u.permissions) ? u.permissions : [],
  };
};

// ─── ASYNC THUNKS ─────────────────────────────────────────────────────────────

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params, { rejectWithValue }) => {
    try {
      const result = await userService.getAllUsers(params);

      const rawUsers = Array.isArray(result) ? result : (result?.users || result?.data || []);
      const users = rawUsers.map(normalizeUser);

      const pagination = result?.pagination || {
        page: params?.page || 1,
        limit: params?.limit || 20,
        total: users.length,
        totalPages: Math.ceil(users.length / (params?.limit || 20))
      };

      return { data: users, pagination };
    } catch (error) {
      return rejectWithValue(error.userMessage || error.message || 'Failed to fetch users');
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const created = await userService.createUser(userData);
      return normalizeUser(created);
    } catch (error) {
      const details = error.response?.data?.error?.details;
      const detailMsg = details ? Object.values(details).filter(Boolean).join(', ') : null;
      const msg = detailMsg ||
                  error.response?.data?.error?.message ||
                  error.response?.data?.message ||
                  error.userMessage ||
                  error.message ||
                  'Failed to create user';
      return rejectWithValue(msg);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const updated = await userService.updateUser(id, data);
      return normalizeUser(updated);
    } catch (error) {
      const details = error.response?.data?.error?.details;
      const detailMsg = details ? Object.values(details).filter(Boolean).join(', ') : null;
      const msg = detailMsg ||
                  error.response?.data?.error?.message ||
                  error.response?.data?.message ||
                  error.userMessage ||
                  error.message ||
                  'Failed to update user';
      return rejectWithValue(msg);
    }
  }
);

export const changeUserRole = createAsyncThunk(
  'users/changeUserRole',
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const updated = await userService.changeUserRole(id, role);
      return normalizeUser(updated);
    } catch (error) {
      return rejectWithValue(error.userMessage || error.message || 'Failed to change user role');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await userService.deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.userMessage || error.message || 'Failed to delete user');
    }
  }
);

export const deactivateUser = createAsyncThunk(
  'users/deactivateUser',
  async (arg, { rejectWithValue }) => {
    try {
      const id = typeof arg === 'string' ? arg : arg?.id;
      const reason = typeof arg === 'object' ? arg?.reason : undefined;
      const result = await userService.deactivateUser(id, reason);
      return {
        id,
        accountStatus: 'deactivated',
        status: 'inactive',
        deactivatedAt: result?.deactivatedAt || new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.userMessage || error.message || 'Failed to deactivate user');
    }
  }
);

export const reactivateUser = createAsyncThunk(
  'users/reactivateUser',
  async (id, { rejectWithValue }) => {
    try {
      const result = await userService.activateUser(id);
      return {
        id,
        accountStatus: 'active',
        status: 'active',
        deactivatedAt: null,
        ...(result || {})
      };
    } catch (error) {
      return rejectWithValue(error.userMessage || error.message || 'Failed to reactivate user');
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
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = {
            ...state.selectedUser,
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
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = {
            ...state.selectedUser,
            accountStatus: 'active',
            status: 'active',
            deactivatedAt: null
          };
        }
      });
  }
});

export default usersSlice.reducer;
