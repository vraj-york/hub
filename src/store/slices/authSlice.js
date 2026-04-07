import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  emailToVerify: null,
  maskedEmailToDisplay: '',
  countdownRemaining: 0,
  isVerifying: false,
  isResending: false,
  verificationError: null,
  otpValidationError: null,
  isAuthenticated: false,
  toastMessage: { id: null, title: null, body: null, severity: 'info' },
  isLoggingIn: false,
  loginError: null,
  rememberMe: false,
  emailValidationError: null,
  passwordValidationError: null,
  currentPersonaType: null,
  activeThemePreference: 'light',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setVerificationEmail(state, action) {
      state.emailToVerify = action.payload;
    },
    setMaskedEmailToDisplay(state, action) {
      state.maskedEmailToDisplay = action.payload ?? '';
    },
    setCountdown(state, action) {
      state.countdownRemaining = action.payload;
    },
    decrementCountdown(state) {
      if (state.countdownRemaining > 0) {
        state.countdownRemaining -= 1;
      }
    },
    verifyCodeRequest(state) {
      state.isVerifying = true;
      state.verificationError = null;
      state.otpValidationError = null;
    },
    verifyCodeSuccess(state) {
      state.isVerifying = false;
      state.verificationError = null;
      state.otpValidationError = null;
      state.isAuthenticated = true;
    },
    verifyCodeFailure(state, action) {
      state.isVerifying = false;
      state.verificationError = action.payload ?? 'The verification code is invalid.';
      state.otpValidationError = 'The verification code is invalid.';
      state.toastMessage = {
        id: `toast-${Date.now()}`,
        title: 'We couldn\'t verify your credentials.',
        body: 'Kindly get a new code & try again.',
        severity: 'error',
      };
    },
    setOtpValidationError(state, action) {
      state.otpValidationError = action.payload ?? null;
    },
    clearOtpValidationError(state) {
      state.otpValidationError = null;
    },
    resendCodeRequest(state) {
      state.isResending = true;
      state.verificationError = null;
    },
    resendCodeSuccess(state, action) {
      state.isResending = false;
      state.countdownRemaining = action.payload ?? 27;
    },
    resendCodeFailure(state, action) {
      state.isResending = false;
      state.verificationError = action.payload ?? 'Failed to resend code';
    },
    reset2FAState(state) {
      state.emailToVerify = null;
      state.maskedEmailToDisplay = '';
      state.countdownRemaining = 0;
      state.isVerifying = false;
      state.isResending = false;
      state.verificationError = null;
      state.otpValidationError = null;
      state.isAuthenticated = false;
      state.toastMessage = { id: null, title: null, body: null, severity: 'info' };
    },
    setToastMessage(state, action) {
      state.toastMessage = action.payload;
    },
    clearToastMessage(state) {
      state.toastMessage = { id: null, title: null, body: null, severity: 'info' };
    },
    setIsLoggingIn(state, action) {
      state.isLoggingIn = action.payload;
    },
    setLoginError(state, action) {
      state.loginError = action.payload ?? null;
    },
    setRememberMe(state, action) {
      state.rememberMe = action.payload ?? false;
    },
    clearLoginError(state) {
      state.loginError = null;
    },
    setEmailValidationError(state, action) {
      state.emailValidationError = action.payload ?? null;
    },
    clearEmailValidationError(state) {
      state.emailValidationError = null;
    },
    setPasswordValidationError(state, action) {
      state.passwordValidationError = action.payload ?? null;
    },
    clearPasswordValidationError(state) {
      state.passwordValidationError = null;
    },
    loginSuccess(state) {
      state.isLoggingIn = false;
      state.loginError = null;
      state.emailValidationError = null;
      state.passwordValidationError = null;
      state.isAuthenticated = true;
      if (state.currentPersonaType == null) {
        state.currentPersonaType = 'Super Admin Persona';
      }
      if (state.activeThemePreference == null) {
        state.activeThemePreference = 'light';
      }
    },
    loginFailure(state, action) {
      state.isLoggingIn = false;
      state.loginError = action.payload ?? 'Invalid credentials. Please try again.';
    },
    setCurrentPersonaType(state, action) {
      state.currentPersonaType = action.payload ?? null;
    },
    setActiveThemePreference(state, action) {
      const preference = action.payload;
      if (preference === 'light' || preference === 'dark') {
        state.activeThemePreference = preference;
      }
    },
  },
});

export const loginRequest = createAsyncThunk(
  'auth/loginRequest',
  async ({ email, password, rememberMe }, { dispatch, getState }) => {
    dispatch(authSlice.actions.setIsLoggingIn(true));
    dispatch(authSlice.actions.setLoginError(null));
    dispatch(authSlice.actions.clearEmailValidationError());
    dispatch(authSlice.actions.clearPasswordValidationError());
    try {
      // Simulated API: fail for fail@test.com, succeed otherwise
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (email === 'fail@test.com' || !password?.trim()) {
        dispatch(authSlice.actions.setRememberMe(rememberMe));
        dispatch(authSlice.actions.loginFailure('Invalid email or password.'));
        return { success: false };
      }
      dispatch(authSlice.actions.setRememberMe(rememberMe));
      dispatch(authSlice.actions.loginSuccess());
      return { success: true };
    } catch (err) {
      dispatch(authSlice.actions.loginFailure(err?.message ?? 'Login failed.'));
      return { success: false };
    }
  }
);

export const {
  setVerificationEmail,
  setMaskedEmailToDisplay,
  setCountdown,
  decrementCountdown,
  verifyCodeRequest,
  verifyCodeSuccess,
  verifyCodeFailure,
  resendCodeRequest,
  resendCodeSuccess,
  resendCodeFailure,
  reset2FAState,
  setToastMessage,
  clearToastMessage,
  setIsLoggingIn,
  setLoginError,
  setRememberMe,
  clearLoginError,
  setEmailValidationError,
  clearEmailValidationError,
  setPasswordValidationError,
  clearPasswordValidationError,
  setOtpValidationError,
  clearOtpValidationError,
  setCurrentPersonaType,
  setActiveThemePreference,
} = authSlice.actions;

export const selectEmailToVerify = (state) => state.auth.emailToVerify;
export const selectMaskedEmailToDisplay = (state) => state.auth.maskedEmailToDisplay;
export const selectCountdownRemaining = (state) => state.auth.countdownRemaining;
export const selectIsVerifying = (state) => state.auth.isVerifying;
export const selectIsResending = (state) => state.auth.isResending;
export const selectVerificationError = (state) => state.auth.verificationError;
export const selectOtpValidationError = (state) => state.auth.otpValidationError;
export const selectHasVerificationError = (state) => state.auth.verificationError != null;
export const selectResendEnabled = (state) =>
  state.auth.countdownRemaining === 0 && !state.auth.isResending;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectToastMessage = (state) => state.auth.toastMessage;
export const selectIsLoggingIn = (state) => state.auth.isLoggingIn;
export const selectLoginError = (state) => state.auth.loginError;
export const selectRememberMe = (state) => state.auth.rememberMe;
export const selectEmailValidationError = (state) => state.auth.emailValidationError;
export const selectPasswordValidationError = (state) => state.auth.passwordValidationError;
export const selectCurrentPersonaType = (state) => state.auth.currentPersonaType;
export const selectActiveThemePreference = (state) => state.auth.activeThemePreference;

export default authSlice.reducer;
