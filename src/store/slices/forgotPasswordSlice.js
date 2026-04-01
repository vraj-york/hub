import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle', // 'idle' | 'pending' | 'success' | 'error'
  error: null,
};

export const sendPasswordResetInstructions = createAsyncThunk(
  'forgotPassword/sendPasswordResetInstructions',
  async (email, { rejectWithValue }) => {
    try {
      // Mock API call - replace with actual endpoint when backend is ready
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // E2E: reject for this email to test error path
      if (email === 'fail@test.com') {
        return rejectWithValue('Failed to send reset instructions. Please try again.');
      }
      return { email };
    } catch (err) {
      return rejectWithValue(err?.message ?? 'Failed to send reset instructions.');
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    resetForgotPasswordState: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPasswordResetInstructions.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(sendPasswordResetInstructions.fulfilled, (state) => {
        state.status = 'success';
        state.error = null;
      })
      .addCase(sendPasswordResetInstructions.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload ?? 'Failed to send reset instructions. Please try again.';
      });
  },
});

export const { resetForgotPasswordState } = forgotPasswordSlice.actions;

export const selectForgotPasswordStatus = (state) => state.forgotPassword?.status ?? 'idle';
export const selectForgotPasswordError = (state) => state.forgotPassword?.error ?? null;

export default forgotPasswordSlice.reducer;
