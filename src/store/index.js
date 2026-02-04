/**
 * Redux Store Configuration
 * Centralized state management for the application
 */

import { configureStore } from '@reduxjs/toolkit';

// Import all slices
import authReducer from './slices/authSlice';
import settingsReducer from './slices/settingsSlice';
import coursesReducer from './slices/coursesSlice';
import paymentsReducer from './slices/paymentsSlice';
import usersReducer from './slices/usersSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    courses: coursesReducer,
    payments: paymentsReducer,
    users: usersReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export default store;
