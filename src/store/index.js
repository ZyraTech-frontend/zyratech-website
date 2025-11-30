/**
 * Redux Store Configuration
 *
 * This file sets up the Redux store for state management across the application.
 * Redux helps manage complex state that's shared between components.
 *
 * For Beginners:
 * - Redux is like a central storage for your app's data
 * - "Slices" are like different sections of your storage
 * - Actions are like requests to change the data
 * - Reducers are like the rules for how data changes
 */

import { configureStore, createSlice } from '@reduxjs/toolkit'

// Dummy reducer to prevent Redux store errors
const dummySlice = createSlice({
  name: 'dummy',
  initialState: { value: null },
  reducers: {}
})

// Configure the Redux store
export const store = configureStore({
  reducer: {
    dummy: dummySlice.reducer,
  },
  // Middleware for handling async actions and API calls
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for Redux state
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

// Export types for TypeScript (if using TypeScript)
// NOTE:
// This project uses plain JavaScript, so we avoid TypeScript-specific
// `export type` declarations here. If you later migrate to TypeScript,
// rename this file to index.ts and re-add those types.

// Export the store as default
export default store
