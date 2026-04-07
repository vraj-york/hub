import { useState, useCallback } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { OtpInputGroup } from './OtpInputGroup';
import { LinkButton } from '../common/LinkButton';
import { CountdownTimer } from '../common/CountdownTimer';

export function TwoFactorAuthDialog({
  maskedEmail,
  countdownRemaining,
  isVerifying,
  isResending,
  verificationError,
  otpErrorMessage,
  onVerify,
  onResend,
  /** Navigate back to login (e.g. /login). When provided, "Back to Login" button is shown. */
  onBackToLogin,
  /** When true (default), "Enter code" label and CountdownTimer are on the same line (mobile layout). When false, stacked. */
  inlineFormLayout = true,
}) {
  const [otp, setOtp] = useState('');
  const isVerifyEnabled = otp.length === 6 && !isVerifying;
  const resendEnabled = countdownRemaining === 0 && !isResending;
  const errorStateActive = Boolean(verificationError || otpErrorMessage);

  const handleVerify = useCallback(() => {
    if (otp.length === 6) {
      onVerify(otp);
    }
  }, [otp, onVerify]);

  const handleResend = useCallback(() => {
    if (resendEnabled) {
      onResend();
    }
  }, [resendEnabled, onResend]);

  return (
    <Paper
      component="section"
      role="dialog"
      aria-modal="true"
      aria-labelledby="2fa-dialog-title"
      aria-describedby="twofa-dialog-desc"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: '8px',
        padding: 3,
        maxWidth: 440,
        width: '100%',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Typography
        id="2fa-dialog-title"
        component="h1"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '20px',
          fontWeight: 600,
          color: 'rgba(47, 65, 74, 1)',
          mb: 1.5,
        }}
      >
        Password Reset
      </Typography>
      <Typography
        id="twofa-dialog-desc"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          color: 'rgba(56, 89, 102, 1)',
          mb: 2,
        }}
      >
        We&apos;ve sent a 6-digit code to your email {maskedEmail || 'ad***@pcsglobal.com'}
      </Typography>

      <Box sx={{ mb: 1.5 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: inlineFormLayout ? 'row' : 'column',
            alignItems: inlineFormLayout ? 'center' : 'stretch',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
            mb: 1,
          }}
        >
          <Typography
            id="otp-input-label"
            component="span"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(47, 65, 74, 1)',
            }}
          >
            Enter code
          </Typography>
          {!errorStateActive && <CountdownTimer seconds={countdownRemaining} />}
        </Box>
        <OtpInputGroup
          value={otp}
          onChange={setOtp}
          hasError={Boolean(verificationError || otpErrorMessage)}
          errorMessage={otpErrorMessage || (verificationError ? 'The verification code is invalid.' : undefined)}
          isDisabled={isVerifying}
        />
      </Box>

      <Button
        variant="contained"
        fullWidth
        disabled={!isVerifyEnabled}
        onClick={handleVerify}
        aria-label="Verify Account"
        aria-busy={isVerifying}
        sx={{
          backgroundColor: 'rgba(48, 95, 161, 1)',
          color: 'rgba(255, 255, 255, 1)',
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          borderRadius: 2,
          py: 1.5,
          mb: onBackToLogin ? 1.5 : 2,
          '&:hover': { backgroundColor: '#264a7a' },
        }}
      >
        {isVerifying ? 'Verifying...' : 'Verify Account'}
      </Button>

      {onBackToLogin && (
        <Button
          variant="outlined"
          fullWidth
          onClick={onBackToLogin}
          aria-label="Back to login page"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 1)',
            color: 'rgba(47, 65, 74, 1)',
            borderColor: 'rgba(221, 217, 235, 1)',
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: 2,
            py: 1.5,
            mb: 2,
            '&:hover': {
              backgroundColor: 'rgba(248, 247, 251, 1)',
              borderColor: 'rgba(221, 217, 235, 1)',
            },
          }}
        >
          Back to Login
        </Button>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(56, 89, 102, 1)',
          }}
        >
          Didn&apos;t receive a code?
        </Typography>
        <LinkButton
          label="Resend Code"
          onClick={handleResend}
          isDisabled={!resendEnabled}
          aria-label="Resend verification code"
        />
      </Box>
    </Paper>
  );
}
