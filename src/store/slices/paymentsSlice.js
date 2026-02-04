/**
 * Payments Redux Slice
 * Handles transactions and revenue
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchTransactions = createAsyncThunk(
  'payments/fetchTransactions',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/transactions', { params });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

export const refundPayment = createAsyncThunk(
  'payments/refundPayment',
  async ({ transactionId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/admin/transactions/${transactionId}/refund`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message);
    }
  }
);

const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    transactions: [],
    selectedTransaction: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    },
    stats: {
      totalRevenue: 0,
      totalTransactions: 0,
      successRate: 0,
      refundRate: 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload.data || [];
        state.pagination = action.payload.pagination || state.pagination;
        state.stats = action.payload.stats || state.stats;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(refundPayment.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      });
  }
});

export default paymentsSlice.reducer;
