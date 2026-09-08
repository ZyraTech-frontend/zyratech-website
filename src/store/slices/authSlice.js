/**
 * Authentication Redux Slice
 * Production-ready authentication state management.
 * Zero mock data — fully driven by the live ZyraTech API.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { clearAuthStorage, storeAuthTokens, getStoredToken } from '../../services/api';
import activityLogService from '../../services/activityLogService';

// ─── Login ───────────────────────────────────────────────────
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authService.login(email, password);
      const user = data.user;
      const token = data.token;
      const refreshToken = data.refreshToken;

      if (token) {
        storeAuthTokens(token, refreshToken);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      // Log successful login
      if (user) {
        activityLogService.logAction({
          user,
          type: 'login',
          severity: 'success',
          description: `${user.name || user.email} logged in to the admin panel`,
          details: { loginMethod: 'email' }
        });
      }

      return {
        token,
        user,
        requires2FA: !!data.requires2FA
      };
    } catch (err) {
      const message =
        err.userMessage ||
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        'Invalid email or password. Please check your credentials and try again.';

      activityLogService.logAction({
        user: { id: 'UNKNOWN', name: email || 'Unknown', email: email || '', role: 'Unknown' },
        type: 'login_failed',
        severity: 'warning',
        description: `Failed login attempt for ${email} — ${message}`,
        details: { reason: message, attemptedEmail: email }
      });

      return rejectWithValue(message);
    }
  }
);

// ─── Verify Active Session (GET /auth/me) ─────────────────────
export const verifySession = createAsyncThunk(
  'auth/verifySession',
  async (_, { rejectWithValue }) => {
    try {
      const token = getStoredToken();
      if (!token) {
        return rejectWithValue('No token found');
      }
      const data = await authService.getCurrentUser();
      const user = data.user || data;

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return { user };
    } catch (err) {
      clearAuthStorage();
      return rejectWithValue(err.userMessage || 'Session expired. Please log in again.');
    }
  }
);

// ─── Change Password ─────────────────────────────────────────
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ currentPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      const result = await authService.changePassword(currentPassword, newPassword);
      const { auth } = getState();

      const updatedUser = {
        ...auth.user,
        mustChangePassword: false,
        accountStatus: 'active',
        ...(result?.user || {})
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      activityLogService.logAction({
        user: updatedUser,
        type: 'settings_changed',
        severity: 'info',
        description: `${updatedUser.name || updatedUser.email} changed their password`,
        details: { settingCategory: 'Password' }
      });

      return { user: updatedUser };
    } catch (err) {
      return rejectWithValue(err.userMessage || err.message || 'Failed to change password. Please check your current password.');
    }
  }
);

// ─── Submit KYC Documents ─────────────────────────────────────
export const submitKyc = createAsyncThunk(
  'auth/submitKyc',
  async (formData, { getState, rejectWithValue }) => {
    try {
      const result = await authService.submitKyc(formData);
      const { auth } = getState();

      const updatedUser = {
        ...auth.user,
        kycStatus: result?.kycStatus || 'pending'
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      activityLogService.logAction({
        user: updatedUser,
        type: 'user_updated',
        severity: 'info',
        description: `${updatedUser.name || updatedUser.email} submitted KYC documents for verification`,
        details: { kycStatus: updatedUser.kycStatus }
      });

      return { user: updatedUser };
    } catch (err) {
      return rejectWithValue(err.userMessage || err.message || 'Failed to submit KYC documents. Please try again.');
    }
  }
);

// ─── 2FA Verification ────────────────────────────────────────
export const verify2FACode = createAsyncThunk(
  'auth/verify2FACode',
  async ({ code }, { rejectWithValue }) => {
    try {
      const data = await authService.verify2FACode(code);
      const user = data.user;
      const token = data.token;
      if (token) {
        storeAuthTokens(token, data.refreshToken);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return { user, token };
    } catch (err) {
      return rejectWithValue(err.userMessage || err.message || 'Invalid 2FA code. Please try again.');
    }
  }
);

// ─── Update Profile ──────────────────────────────────────────
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const result = await authService.updateProfile(profileData);
      const { auth } = getState();
      const updatedUser = {
        ...auth.user,
        ...(result?.user || result || {})
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { user: updatedUser };
    } catch (err) {
      return rejectWithValue(err.userMessage || err.message || 'Failed to update profile');
    }
  }
);

// ─── Active Sessions Management ──────────────────────────────
export const fetchActiveSessions = createAsyncThunk(
  'auth/fetchActiveSessions',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.getActiveSessions();
      return data?.sessions || data || [];
    } catch (err) {
      return rejectWithValue(err.userMessage || err.message || 'Failed to fetch active sessions');
    }
  }
);

export const revokeSession = createAsyncThunk(
  'auth/revokeSession',
  async (sessionId, { rejectWithValue }) => {
    try {
      await authService.revokeSession(sessionId);
      return sessionId;
    } catch (err) {
      return rejectWithValue(err.userMessage || err.message || 'Failed to revoke session');
    }
  }
);

export const revokeAllSessions = createAsyncThunk(
  'auth/revokeAllSessions',
  async (_, { rejectWithValue }) => {
    try {
      await authService.revokeAllSessions();
      return null;
    } catch (err) {
      return rejectWithValue(err.userMessage || err.message || 'Failed to revoke all sessions');
    }
  }
);

// ─── Logout ──────────────────────────────────────────────────
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { getState }) => {
    const { auth } = getState();
    if (auth.user) {
      activityLogService.logAction({
        user: auth.user,
        type: 'logout',
        severity: 'info',
        description: `${auth.user.name || auth.user.email} logged out of the admin panel`
      });
    }
    await authService.logout();
    return null;
  }
);

// Helper to safely parse stored user JSON
const getInitialUser = () => {
  try {
    const item = localStorage.getItem('user');
    return item ? JSON.parse(item) : null;
  } catch (_e) {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getInitialUser(),
    token: getStoredToken(),
    loading: false,
    error: null,
    isAuthenticated: !!getStoredToken(),
    requires2FA: false,
    passwordChangeLoading: false,
    passwordChangeError: null,
    kycLoading: false,
    kycError: null,
    sessions: [],
    sessionsLoading: false,
    sessionsError: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.passwordChangeError = null;
      state.kycError = null;
      state.sessionsError = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
      state.requires2FA = false;
      clearAuthStorage();
    },
    setRequires2FA: (state, action) => {
      state.requires2FA = action.payload;
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
        if (action.payload.requires2FA) {
          state.requires2FA = true;
        } else {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.requires2FA = false;
        }
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Verify Active Session
      .addCase(verifySession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(verifySession.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })

      // 2FA Verification
      .addCase(verify2FACode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verify2FACode.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.requires2FA = false;
        state.error = null;
      })
      .addCase(verify2FACode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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

      // Update Profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      // Active Sessions
      .addCase(fetchActiveSessions.pending, (state) => {
        state.sessionsLoading = true;
        state.sessionsError = null;
      })
      .addCase(fetchActiveSessions.fulfilled, (state, action) => {
        state.sessionsLoading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchActiveSessions.rejected, (state, action) => {
        state.sessionsLoading = false;
        state.sessionsError = action.payload;
      })
      .addCase(revokeSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter((s) => s.id !== action.payload);
      })
      .addCase(revokeAllSessions.fulfilled, (state) => {
        state.sessions = [];
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.passwordChangeError = null;
        state.kycError = null;
        state.requires2FA = false;
        state.sessions = [];
      });
  }
});

export const { clearError, clearAuth, setRequires2FA } = authSlice.actions;
export default authSlice.reducer;
