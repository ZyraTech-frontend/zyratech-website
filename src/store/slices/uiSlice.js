/**
 * UI Redux Slice
 * Handles modals, notifications, loading states
 */

import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSidebarOpen: true,
    isConfirmDialogOpen: false,
    confirmDialog: {
      title: '',
      message: '',
      onConfirm: null,
      confirmText: 'Confirm',
      isDangerous: false
    },
    notifications: [],
    isLoading: false
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openConfirmDialog: (state, action) => {
      state.isConfirmDialogOpen = true;
      state.confirmDialog = {
        title: action.payload.title,
        message: action.payload.message,
        onConfirm: action.payload.onConfirm,
        confirmText: action.payload.confirmText || 'Confirm',
        isDangerous: action.payload.isDangerous || false
      };
    },
    closeConfirmDialog: (state) => {
      state.isConfirmDialogOpen = false;
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        type: action.payload.type || 'info',
        message: action.payload.message,
        duration: action.payload.duration || 3000
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const {
  toggleSidebar,
  openConfirmDialog,
  closeConfirmDialog,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading
} = uiSlice.actions;

export default uiSlice.reducer;
