/**
 * Authentication Redux Slice
 * Handles login, logout, user session, password change, and KYC checks
 * 
 * LOGIN FLOW (mirrors Super Admin user management):
 * 1. Super Admin creates admin account → temp password + mustChangePassword=true
 * 2. Admin logs in with temp password
 * 3. If mustChangePassword → force password change screen
 * 4. After password change → check KYC status
 * 5. If KYC not verified → show KYC submission requirement
 * 6. Only after all checks pass → redirect to dashboard
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import activityLogService from '../../services/activityLogService';

// Mock users for testing — synced with usersSlice mock data
// In production, this would be validated server-side
const MOCK_USERS = {
  'superadmin@zyratech.com': {
    email: 'superadmin@zyratech.com',
    password: 'Super@123',
    name: 'Mihael Afedi',
    role: 'super_admin',
    id: 'u-1001',
    department: 'Executive',
    avatar: null,
    accountStatus: 'active',
    kycStatus: 'verified',
    mustChangePassword: false
  },
  'admin@zyratech.com': {
    email: 'admin@zyratech.com',
    password: 'Admin@123',
    name: 'Admin User',
    role: 'admin',
    id: 'u-1002',
    department: 'Blog Articles',
    avatar: null,
    accountStatus: 'active',
    kycStatus: 'verified',
    mustChangePassword: false
  },
  'editor@zyratech.com': {
    email: 'editor@zyratech.com',
    password: 'Editor@123',
    name: 'Editor User',
    role: 'editor',
    id: 'u-1003',
    department: 'Content',
    avatar: null,
    accountStatus: 'active',
    kycStatus: 'verified',
    mustChangePassword: false
  },
  // Example: newly created admin with temp password, pending KYC
  'kwame.asante@zyratech.com': {
    email: 'kwame.asante@zyratech.com',
    password: 'TempPass@2025',
    name: 'Kwame Asante',
    role: 'admin',
    id: 'u-1003',
    department: 'Partnerships',
    avatar: null,
    accountStatus: 'pending_password',
    kycStatus: 'not_submitted',
    mustChangePassword: true
  },
  // Example: deactivated admin
  'john.mensah@zyratech.com': {
    email: 'john.mensah@zyratech.com',
    password: 'John@123',
    name: 'John Mensah',
    role: 'admin',
    id: 'u-1004',
    department: 'Payments',
    avatar: null,
    accountStatus: 'deactivated',
    kycStatus: 'verified',
    mustChangePassword: false
  }
};

// ─── Login ───────────────────────────────────────────────────
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const user = MOCK_USERS[email?.toLowerCase()];

      if (!user || user.password !== password) {
        // Log failed login attempt
        activityLogService.logAction({
          user: { id: 'UNKNOWN', name: email || 'Unknown', email: email || '', role: 'Unknown' },
          type: 'login_failed',
          severity: 'warning',
          description: `Failed login attempt for ${email} — Invalid credentials`,
          details: { reason: 'Invalid password', attemptedEmail: email }
        });
        return rejectWithValue('Invalid email or password. Please check your credentials and try again.');
      }

      // Check if account is deactivated
      if (user.accountStatus === 'deactivated') {
        // Log failed login attempt (deactivated)
        activityLogService.logAction({
          user: { id: 'UNKNOWN', name: email, email, role: 'Unknown' },
          type: 'login_failed',
          severity: 'warning',
          description: `Login attempt by deactivated account: ${email}`,
          details: { reason: 'Account deactivated', attemptedEmail: email }
        });
        return rejectWithValue('This account has been deactivated. Please contact the Super Admin for assistance.');
      }

      // Create mock token
      const token = 'mock_token_' + Date.now();
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        avatar: user.avatar,
        accountStatus: user.accountStatus,
        kycStatus: user.kycStatus,
        mustChangePassword: user.mustChangePassword,
        lastLogin: new Date().toISOString()
      };

      localStorage.setItem('adminToken', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Log the login action
      activityLogService.logAction({
        user: userData,
        type: 'login',
        severity: 'success',
        description: `${userData.name} logged in to the admin panel`,
        details: { loginMethod: 'email' }
      });

      return { token, user: userData };
    } catch (error) {
      if (error.message) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred. Please try again.');
    }
  }
);

// ─── Change Password (for first-time / forced change) ────────
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ currentPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const { auth } = getState();
      const userEmail = auth.user?.email?.toLowerCase();
      const user = MOCK_USERS[userEmail];

      if (!user || user.password !== currentPassword) {
        return rejectWithValue('Current password is incorrect.');
      }

      // In production, this would call an API. For mock, update in memory.
      MOCK_USERS[userEmail].password = newPassword;
      MOCK_USERS[userEmail].mustChangePassword = false;
      MOCK_USERS[userEmail].accountStatus = 'active';

      // Update stored user data
      const updatedUser = {
        ...auth.user,
        mustChangePassword: false,
        accountStatus: 'active'
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Log password change
      activityLogService.logAction({
        user: updatedUser,
        type: 'settings_changed',
        severity: 'info',
        description: `${updatedUser.name} changed their password`,
        details: { settingCategory: 'Password', changedFields: ['password'] }
      });

      return { user: updatedUser };
    } catch (error) {
      return rejectWithValue('Failed to change password. Please try again.');
    }
  }
);

// ─── Submit KYC ──────────────────────────────────────────────
export const submitKyc = createAsyncThunk(
  'auth/submitKyc',
  async ({ documents }, { getState, rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      const { auth } = getState();
      const userEmail = auth.user?.email?.toLowerCase();

      if (MOCK_USERS[userEmail]) {
        MOCK_USERS[userEmail].kycStatus = 'pending';
      }

      const updatedUser = {
        ...auth.user,
        kycStatus: 'pending'
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Log KYC submission
      activityLogService.logAction({
        user: updatedUser,
        type: 'user_updated',
        severity: 'info',
        description: `${updatedUser.name} submitted KYC documents for verification`,
        details: { kycStatus: 'pending' }
      });

      return { user: updatedUser };
    } catch (error) {
      return rejectWithValue('Failed to submit KYC documents. Please try again.');
    }
  }
);

// ─── Logout ──────────────────────────────────────────────────
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      // Log logout before clearing data
      if (auth.user) {
        activityLogService.logAction({
          user: auth.user,
          type: 'logout',
          severity: 'info',
          description: `${auth.user.name} logged out of the admin panel`
        });
      }
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
    isAuthenticated: !!localStorage.getItem('adminToken'),
    passwordChangeLoading: false,
    passwordChangeError: null,
    kycLoading: false,
    kycError: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.passwordChangeError = null;
      state.kycError = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    }
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
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.passwordChangeLoading = true;
        state.passwordChangeError = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.passwordChangeLoading = false;
        state.user = action.payload.user;
        state.passwordChangeError = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.passwordChangeLoading = false;
        state.passwordChangeError = action.payload;
      })

      // Submit KYC
      .addCase(submitKyc.pending, (state) => {
        state.kycLoading = true;
        state.kycError = null;
      })
      .addCase(submitKyc.fulfilled, (state, action) => {
        state.kycLoading = false;
        state.user = action.payload.user;
        state.kycError = null;
      })
      .addCase(submitKyc.rejected, (state, action) => {
        state.kycLoading = false;
        state.kycError = action.payload;
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
        state.passwordChangeError = null;
        state.kycError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
