import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BSPBlueprintLogo } from '../components/common/BSPBlueprintLogo';
import { AuthPageFooter } from '../components/layout/AuthPageFooter';
import { TwoFactorAuthDialog } from '../components/auth/TwoFactorAuthDialog';
import {
  selectCountdownRemaining,
  selectIsVerifying,
  selectIsResending,
  selectVerificationError,
  selectOtpValidationError,
  selectMaskedEmailToDisplay,
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
} from '../store/slices/authSlice';

const DEFAULT_MASKED_EMAIL = 'ad***@pcsglobal.com';
const INITIAL_COUNTDOWN = 27;

export function TwoFactorAuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const maskedEmailToDisplay = useSelector(selectMaskedEmailToDisplay) || DEFAULT_MASKED_EMAIL;
  const countdownRemaining = useSelector(selectCountdownRemaining);
  const isVerifying = useSelector(selectIsVerifying);
  const isResending = useSelector(selectIsResending);
  const verificationError = useSelector(selectVerificationError);
  const otpValidationError = useSelector(selectOtpValidationError);
  const countdownStarted = useRef(false);

  useEffect(() => {
    if (countdownRemaining === 0 && !countdownStarted.current) {
      dispatch(setVerificationEmail(DEFAULT_MASKED_EMAIL));
      dispatch(setMaskedEmailToDisplay(DEFAULT_MASKED_EMAIL));
      dispatch(setCountdown(INITIAL_COUNTDOWN));
      countdownStarted.current = true;
    }
  }, [dispatch, countdownRemaining]);

  useEffect(() => {
    if (countdownRemaining <= 0) return;
    const interval = setInterval(() => {
      dispatch(decrementCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, countdownRemaining]);


  const handleVerify = async (code) => {
    dispatch(verifyCodeRequest());
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (code === '123456') {
        dispatch(verifyCodeSuccess());
        // Navigate to reset password page after successful verification
        navigate('/reset-password/verified', { replace: true });
      } else {
        dispatch(verifyCodeFailure('The verification code is invalid.'));
      }
    } catch (err) {
      dispatch(verifyCodeFailure(err?.message ?? 'Verification failed'));
    }
  };

  const handleResend = async () => {
    if (countdownRemaining > 0) return;
    dispatch(resendCodeRequest());
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      dispatch(resendCodeSuccess(INITIAL_COUNTDOWN));
    } catch (err) {
      dispatch(resendCodeFailure(err?.message ?? 'Failed to resend code'));
    }
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
        <TwoFactorAuthDialog
          maskedEmail={maskedEmailToDisplay}
          countdownRemaining={countdownRemaining}
          isVerifying={isVerifying}
          isResending={isResending}
          verificationError={verificationError}
          otpErrorMessage={otpValidationError}
          onVerify={handleVerify}
          onResend={handleResend}
          onBackToLogin={() => navigate('/login')}
        />
      </Box>

      <AuthPageFooter version="Version 1.0" privacyPolicyUrl="#" termsOfUseUrl="#" />
    </Box>
  );
}
