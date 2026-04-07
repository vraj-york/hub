import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay; return null for empty state (or getMockDashboardData() for populated)
      await new Promise((r) => setTimeout(r, 300));
      return null; // Empty state by default; use getMockDashboardData() to show populated dashboard
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load dashboard');
    }
  }
);

const initialState = {
  dashboardData: null,
  dashboardLoading: false,
  dashboardError: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
    setDashboardLoading: (state, action) => {
      state.dashboardLoading = action.payload;
    },
    setDashboardError: (state, action) => {
      state.dashboardError = action.payload;
    },
    setIsEmptyState: (state, action) => {
      // Derived: typically not set directly; isEmptyState is derived from dashboardData
      if (action.payload === false && state.dashboardData) state.dashboardData = state.dashboardData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.dashboardLoading = true;
        state.dashboardError = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardData = action.payload;
        state.dashboardError = null;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardError = action.payload || 'Failed to load dashboard';
      });
  },
});

export const { setDashboardData, setDashboardLoading, setDashboardError, setIsEmptyState } = dashboardSlice.actions;

export const selectDashboardData = (state) => state.dashboard.dashboardData;
export const selectDashboardLoading = (state) => state.dashboard.dashboardLoading;
export const selectDashboardError = (state) => state.dashboard.dashboardError;
export const selectIsDashboardEmpty = (state) => {
  const data = state.dashboard.dashboardData;
  return data == null || (typeof data === 'object' && Object.keys(data).length === 0);
};

export default dashboardSlice.reducer;
