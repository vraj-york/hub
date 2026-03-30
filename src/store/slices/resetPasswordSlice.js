import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  password: '',
  confirmPassword: '',
  passwordStrength: 'initial', // 'initial' | 'weak' | 'average' | 'strong'
  validationErrors: {
    password: [], // array of string errors for complexity
    confirmPassword: '', // string error for mismatch
  },
  status: 'idle', // 'idle' | 'pending' | 'success' | 'error'
  error: null,
};

export const resetPasswordRequest = createAsyncThunk(
  'resetPassword/resetPasswordRequest',
  async (payload, { rejectWithValue }) => {
    const { token, password } = payload;
    try {
      // Mock API call - replace with actual endpoint when backend is ready
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // E2E: reject for invalid token to test error path
      if (token === 'invalid-token') {
        return rejectWithValue('Failed to reset password. Please try again or request a new link.');
      }
      return { success: true };
    } catch (err) {
      return rejectWithValue(err?.message ?? 'Failed to reset password. Please try again or request a new link.');
    }
  }
);

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    setPassword(state, action) {
      state.password = action.payload ?? '';
    },
    setConfirmPassword(state, action) {
      state.confirmPassword = action.payload ?? '';
    },
    setPasswordStrength(state, action) {
      state.passwordStrength = action.payload ?? 'initial';
    },
    setPasswordValidationErrors(state, action) {
      state.validationErrors.password = Array.isArray(action.payload) ? action.payload : [];
    },
    setConfirmPasswordValidationError(state, action) {
      state.validationErrors.confirmPassword = action.payload ?? '';
    },
    resetPasswordState() {
      return initialState;
    },
    setStatus(state, action) {
      state.status = action.payload ?? 'idle';
    },
    setError(state, action) {
      state.error = action.payload ?? null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordRequest.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(resetPasswordRequest.fulfilled, (state) => {
        state.status = 'success';
        state.error = null;
      })
      .addCase(resetPasswordRequest.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload ?? 'Failed to reset password. Please try again or request a new link.';
      });
  },
});

export const {
  setPassword,
  setConfirmPassword,
  setPasswordStrength,
  setPasswordValidationErrors,
  setConfirmPasswordValidationError,
  resetPasswordState,
  setStatus,
  setError,
} = resetPasswordSlice.actions;

export const selectPassword = (state) => state.resetPassword?.password ?? '';
export const selectConfirmPassword = (state) => state.resetPassword?.confirmPassword ?? '';
export const selectPasswordStrength = (state) => state.resetPassword?.passwordStrength ?? 'initial';
export const selectPasswordValidationErrors = (state) => state.resetPassword?.validationErrors?.password ?? [];
export const selectConfirmPasswordValidationError = (state) => state.resetPassword?.validationErrors?.confirmPassword ?? '';
export const selectResetPasswordStatus = (state) => state.resetPassword?.status ?? 'idle';
export const selectResetPasswordError = (state) => state.resetPassword?.error ?? null;

export const selectIsPasswordResetFormValid = (state) => {
  const password = selectPassword(state);
  const confirmPassword = selectConfirmPassword(state);
  const passwordErrors = selectPasswordValidationErrors(state);
  const confirmError = selectConfirmPasswordValidationError(state);
  if (!password?.trim() || !confirmPassword?.trim()) return false;
  if (passwordErrors.length > 0 || confirmError) return false;
  return password === confirmPassword;
};

export default resetPasswordSlice.reducer;
