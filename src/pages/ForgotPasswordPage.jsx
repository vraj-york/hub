import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BSPBlueprintLogo } from '../components/common/BSPBlueprintLogo';
import { AuthPageFooter } from '../components/layout/AuthPageFooter';
import { ForgotPasswordDialog } from '../components/auth/ForgotPasswordDialog';
import {
  sendPasswordResetInstructions,
  resetForgotPasswordState,
  selectForgotPasswordStatus,
  selectForgotPasswordError,
} from '../store/slices/forgotPasswordSlice';
import { setToastMessage } from '../store/slices/authSlice';

function maskEmail(email) {
  if (!email || !email.includes('@')) return email ?? '';
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local.slice(0, 2)}***@${domain}`;
}

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectForgotPasswordStatus);
  const error = useSelector(selectForgotPasswordError);
  const isSubmitting = status === 'pending';
  const lastSubmittedEmailRef = useRef(null);

  useEffect(() => {
    return () => {
      dispatch(resetForgotPasswordState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (status === 'success') {
      const masked = maskEmail(lastSubmittedEmailRef.current ?? 'your email');
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Password reset instructions sent',
          body: `Password reset instructions sent to ${masked}.`,
          severity: 'success',
        })
      );
      dispatch(resetForgotPasswordState());
      navigate('/2fa/verify', { replace: true });
    }
  }, [status, dispatch, navigate]);

  useEffect(() => {
    if (status === 'error' && error) {
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Failed to send reset instructions',
          body: error,
          severity: 'error',
        })
      );
    }
  }, [status, error, dispatch]);

  const handleSubmit = (email) => {
    lastSubmittedEmailRef.current = email;
    dispatch(sendPasswordResetInstructions(email));
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <Box
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
        <ForgotPasswordDialog
          onSubmit={handleSubmit}
          onBackToLogin={handleBackToLogin}
          isLoading={isSubmitting}
          error={null}
        />
      </Box>

      <AuthPageFooter version="Version 1.0" privacyPolicyUrl="#" termsOfUseUrl="#" />
    </Box>
  );
}
