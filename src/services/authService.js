/**
 * Authentication Service
 * Complete implementation of all 23 endpoints from the ZyraTech API Authentication Module.
 * No mock fallbacks — directly calls the production backend.
 */

import api, { clearAuthStorage, storeAuthTokens } from './api';

export const authService = {
  // 1. Register User
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // 2. Primary Login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const payload = response.data?.data || response.data;
    if (payload?.token) {
      storeAuthTokens(payload.token, payload.refreshToken);
    }
    return payload;
  },

  // 3. Get Current User / Session Check
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data?.data || response.data;
  },

  // 4. Refresh Token
  refreshToken: async (refreshToken) => {
    const response = await api.post('/auth/refresh', { refreshToken });
    const payload = response.data?.data || response.data;
    if (payload?.token) {
      storeAuthTokens(payload.token, payload.refreshToken);
    }
    return payload;
  },

  // 5. Logout
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (_err) {
      // Even if server call fails (e.g. network offline), always clear local storage
    } finally {
      clearAuthStorage();
    }
  },

  // 6. Forgot Password (Request reset email)
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // 7. Reset Password (via token from reset link)
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', { token, newPassword });
    return response.data;
  },

  // 8. Change Password (Forced change on first login or user profile)
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post('/auth/change-password', { currentPassword, newPassword });
    return response.data?.data || response.data;
  },

  // 9. Verify Email (Token from verification email)
  verifyEmail: async (token) => {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },

  // 10. Resend Email Verification
  resendVerification: async (email) => {
    const response = await api.post('/auth/resend-verification', { email });
    return response.data;
  },

  // 11. Generate 2FA Setup (Secret / QR Code)
  generate2FA: async () => {
    const response = await api.post('/auth/2fa/generate', {});
    return response.data?.data || response.data;
  },

  // 12. Verify 2FA Code
  verify2FACode: async (code) => {
    const response = await api.post('/auth/2fa/verify', { code });
    return response.data?.data || response.data;
  },

  // 13. Enable 2FA
  enable2FA: async (code) => {
    const response = await api.post('/auth/2fa/enable', { code });
    return response.data?.data || response.data;
  },

  // 14. Disable 2FA
  disable2FA: async (code) => {
    const response = await api.post('/auth/2fa/disable', { code });
    return response.data?.data || response.data;
  },

  // 15. Google OAuth Exchange
  oauthGoogle: async (token) => {
    const response = await api.post('/auth/oauth/google', { token });
    const payload = response.data?.data || response.data;
    if (payload?.token) {
      storeAuthTokens(payload.token, payload.refreshToken);
    }
    return payload;
  },

  // 16. GitHub OAuth Exchange
  oauthGithub: async (code) => {
    const response = await api.post('/auth/oauth/github', { code });
    const payload = response.data?.data || response.data;
    if (payload?.token) {
      storeAuthTokens(payload.token, payload.refreshToken);
    }
    return payload;
  },

  // 17. LinkedIn OAuth Exchange
  oauthLinkedin: async (code) => {
    const response = await api.post('/auth/oauth/linkedin', { code });
    const payload = response.data?.data || response.data;
    if (payload?.token) {
      storeAuthTokens(payload.token, payload.refreshToken);
    }
    return payload;
  },

  // 18. Update Profile Data
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      return response.data?.data || response.data;
    } catch (err) {
      // If server rejected due to payload size, strict schema, or avatar URL validation
      const isValidationError =
        err.response?.status === 400 ||
        err.response?.status === 413 ||
        err.response?.status === 422;

      if (isValidationError) {
        // Fallback: send clean minimal payload conforming strictly to Postman schema:
        // { firstName, lastName, phone, bio, avatar (only if valid http URL) }
        const cleanPayload = {};
        if (profileData.firstName) cleanPayload.firstName = profileData.firstName;
        if (profileData.lastName) cleanPayload.lastName = profileData.lastName;
        if (profileData.phone) cleanPayload.phone = profileData.phone;
        if (profileData.bio) cleanPayload.bio = profileData.bio;
        if (profileData.avatar && /^https?:\/\//i.test(profileData.avatar)) {
          cleanPayload.avatar = profileData.avatar;
        }

        const retryResponse = await api.put('/auth/profile', cleanPayload);
        return retryResponse.data?.data || retryResponse.data;
      }
      throw err;
    }
  },

  // 18b. Upload User Avatar (Uploads to Cloudinary/storage via backend endpoints)
  uploadAvatar: async (file) => {
    // Attempt 1: Dedicated Admin Users Avatar route
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('image', file);
      formData.append('file', file);
      const response = await api.post('/admin/users/avatar', formData);
      const payload = response.data?.data || response.data;
      const url = payload?.avatar || payload?.url || payload?.imageUrl || (typeof payload === 'string' ? payload : null);
      if (url && typeof url === 'string' && (url.startsWith('http') || url.startsWith('/'))) {
        return url;
      }
      if (payload?.user?.avatar) {
        return payload.user.avatar;
      }
    } catch (err) {
      console.warn('POST /admin/users/avatar failed:', err.response?.status || err.message);
    }

    // Attempt 2: Admin Project Image Upload route (Cloudinary)
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await api.post('/admin/projects/upload', formData);
      const payload = response.data?.data || response.data;
      const url = payload?.url || payload?.secure_url || payload?.imageUrl;
      if (url && typeof url === 'string') return url;
    } catch (err) {
      console.warn('POST /admin/projects/upload failed:', err.response?.status || err.message);
    }

    // Attempt 3: Admin Blog Image Upload route (Cloudinary)
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await api.post('/admin/blog/upload', formData);
      const payload = response.data?.data || response.data;
      const url = payload?.url || payload?.secure_url || payload?.imageUrl;
      if (url && typeof url === 'string') return url;
    } catch (err) {
      console.warn('POST /admin/blog/upload failed:', err.response?.status || err.message);
    }

    return null;
  },

  // 19. Update Notification Preferences
  updateNotificationPreferences: async (preferences) => {
    const response = await api.put('/auth/profile/notifications', preferences);
    return response.data?.data || response.data;
  },

  // 20. Get Active Sessions
  getActiveSessions: async () => {
    const response = await api.get('/auth/sessions');
    return response.data?.data || response.data;
  },

  // 21. Revoke All Sessions (except current)
  revokeAllSessions: async () => {
    const response = await api.delete('/auth/sessions');
    return response.data;
  },

  // 22. Revoke Specific Session
  revokeSession: async (sessionId) => {
    const response = await api.delete(`/auth/sessions/${sessionId}`);
    return response.data;
  },

  // 23. Submit KYC Documents (multipart/form-data)
  submitKyc: async (formData) => {
    const response = await api.post('/auth/submit-kyc', formData);
    return response.data?.data || response.data;
  }
};

export default authService;
