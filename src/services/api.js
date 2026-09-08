import axios from 'axios';

// Ensure clean production API URL: strip any trailing parenthesis, accidental staging references, or whitespace
const rawBaseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.zyratechhub.com/api';
const baseURL = (rawBaseURL || '')
  .replace(/\)+$/, '')
  .replace('staging-api.zyratechhub.com', 'api.zyratechhub.com')
  .trim() || 'https://api.zyratechhub.com/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to get active access token
export const getStoredToken = () => {
  return localStorage.getItem('adminToken') || localStorage.getItem('token') || null;
};

// Helper to get refresh token
export const getStoredRefreshToken = () => {
  return localStorage.getItem('refreshToken') || null;
};

// Helper to store tokens consistently
export const storeAuthTokens = (token, refreshToken = null) => {
  if (token) {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('token', token);
  }
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
};

// Helper to clear all authentication data
export const clearAuthStorage = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// Request interceptor to attach bearer token
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Let the browser set multipart/form-data boundary automatically for FormData
    if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh and error extraction
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Attach human-readable error message from backend
    const serverMessage =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message;
    error.userMessage = serverMessage;

    // Handle 401 Unauthorized (token expired or invalid)
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      const refreshToken = getStoredRefreshToken();

      // If we don't have a refresh token or this is already the refresh/login call, clear & reject
      if (!refreshToken || originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh')) {
        if (!originalRequest.url?.includes('/auth/login')) {
          clearAuthStorage();
          if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/admin/login')) {
            window.location.href = '/admin/login';
          }
        }
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Create an isolated axios instance to avoid circular interceptor calls
        const refreshResponse = await axios.post(`${baseURL}/auth/refresh`, {
          refreshToken,
        });

        const newToken = refreshResponse.data?.data?.token || refreshResponse.data?.token;
        const newRefreshToken = refreshResponse.data?.data?.refreshToken || refreshResponse.data?.refreshToken;

        if (newToken) {
          storeAuthTokens(newToken, newRefreshToken || refreshToken);
          processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          throw new Error('No token returned from refresh');
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        clearAuthStorage();
        if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/admin/login')) {
          window.location.href = '/admin/login';
        }
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
