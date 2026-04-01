import { useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BSPBlueprintLogo } from '../components/common/BSPBlueprintLogo';
import { AuthPageFooter } from '../components/layout/AuthPageFooter';
import { SetNewPasswordDialog, validatePassword } from '../components/auth/SetNewPasswordDialog';
import {
  setPassword,
  setConfirmPassword,
  setPasswordStrength,
  setPasswordValidationErrors,
  setConfirmPasswordValidationError,
  resetPasswordRequest,
  resetPasswordState,
  selectPassword,
  selectConfirmPassword,
  selectPasswordStrength,
  selectPasswordValidationErrors,
  selectConfirmPasswordValidationError,
  selectResetPasswordStatus,
  selectResetPasswordError,
} from '../store/slices/resetPasswordSlice';
import { setToastMessage } from '../store/slices/authSlice';

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const password = useSelector(selectPassword);
  const confirmPassword = useSelector(selectConfirmPassword);
  const passwordStrength = useSelector(selectPasswordStrength);
  const passwordValidationErrors = useSelector(selectPasswordValidationErrors);
  const confirmPasswordValidationError = useSelector(selectConfirmPasswordValidationError);
  const status = useSelector(selectResetPasswordStatus);
  const error = useSelector(selectResetPasswordError);
  const isSubmitting = status === 'pending';

  useEffect(() => {
    return () => {
      dispatch(resetPasswordState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (status === 'success') {
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Password reset successfully',
          body: 'Your password has been reset successfully.',
          severity: 'success',
        })
      );
      dispatch(resetPasswordState());
      navigate('/login', { replace: true });
    }
  }, [status, dispatch, navigate]);

  useEffect(() => {
    if (status === 'error' && error) {
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Failed to reset password',
          body: error,
          severity: 'error',
        })
      );
    }
  }, [status, error, dispatch]);

  const handlePasswordChange = useCallback(
    (value) => {
      dispatch(setPassword(value));
      dispatch(setPasswordValidationErrors(validatePassword(value)));
      dispatch(
        setConfirmPasswordValidationError(
          confirmPassword && value !== confirmPassword ? 'Passwords do not match.' : ''
        )
      );
    },
    [dispatch, confirmPassword]
  );

  const handleConfirmPasswordChange = useCallback(
    (value) => {
      dispatch(setConfirmPassword(value));
      dispatch(
        setConfirmPasswordValidationError(
          password !== value && value?.length ? 'Passwords do not match.' : ''
        )
      );
    },
    [dispatch, password]
  );

  const handlePasswordStrengthChange = useCallback(
    (strength) => {
      dispatch(setPasswordStrength(strength));
    },
    [dispatch]
  );

  const handleSubmit = useCallback(() => {
    if (!token) return;
    dispatch(resetPasswordRequest({ token, password }));
  }, [dispatch, token, password]);

  const handleBackToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <Box
      component="main"
      role="main"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'rgba(248, 247, 251, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 3,
        px: 2,
      }}
    >
      <Box sx={{ alignSelf: 'flex-start', pl: 2 }}>
        <BSPBlueprintLogo />
      </Box>

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <SetNewPasswordDialog
          password={password}
          confirmPassword={confirmPassword}
          passwordStrength={passwordStrength}
          passwordValidationErrors={passwordValidationErrors}
          confirmPasswordValidationError={confirmPasswordValidationError}
          isSubmitting={isSubmitting}
          onPasswordChange={handlePasswordChange}
          onConfirmPasswordChange={handleConfirmPasswordChange}
          onPasswordStrengthChange={handlePasswordStrengthChange}
          onSubmit={handleSubmit}
          onBackToLogin={handleBackToLogin}
        />
      </Box>

      <AuthPageFooter version="Version 1.0" privacyPolicyUrl="#" termsOfUseUrl="#" />
    </Box>
  );
}
