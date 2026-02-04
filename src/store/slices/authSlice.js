/**
 * Authentication Redux Slice
 * Handles login, logout, user session
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock users for testing (no backend needed)
const MOCK_USERS = {
  'superadmin@zyratech.com': {
    email: 'superadmin@zyratech.com',
    password: 'Super@123',
    name: 'Super Admin',
    role: 'super_admin',
    id: 1
  },
  'admin@zyratech.com': {
    email: 'admin@zyratech.com',
    password: 'Admin@123',
    name: 'Admin User',
    role: 'admin',
    id: 2
  },
  'editor@zyratech.com': {
    email: 'editor@zyratech.com',
    password: 'Editor@123',
    name: 'Editor User',
    role: 'editor',
    id: 3
  }
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = MOCK_USERS[email];
      
      if (!user || user.password !== password) {
        return rejectWithValue('Invalid email or password');
      }
      
      // Create mock token
      const token = 'mock_token_' + Date.now();
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };
      
      localStorage.setItem('adminToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { token, user: userData };
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('user');
      return null;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('adminToken') || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('adminToken')
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default authSlice.reducer;
