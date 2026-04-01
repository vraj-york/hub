import { useState, useCallback, useRef, useEffect } from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BSPBlueprintLogo } from '../components/common/BSPBlueprintLogo';
import { AuthPageFooter } from '../components/layout/AuthPageFooter';
import { setToastMessage } from '../store/slices/authSlice';

const CODE_LENGTH = 6;

export function EmailVerificationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  const maskedEmail = 'ad***@pcsglobal.com';

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = useCallback((index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [code]);

  const handleKeyDown = useCallback((index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [code]);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);
    if (pastedData) {
      const newCode = [...code];
      pastedData.split('').forEach((char, i) => {
        if (i < CODE_LENGTH) newCode[i] = char;
      });
      setCode(newCode);
      const nextIndex = Math.min(pastedData.length, CODE_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  }, [code]);

  const handleVerify = useCallback(() => {
    const fullCode = code.join('');
    if (fullCode.length !== CODE_LENGTH) {
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: "We couldn't verify your credentials.",
          body: 'Kindly get a new code & try again.',
          severity: 'error',
        })
      );
      return;
    }

    setIsVerifying(true);
    
    setTimeout(() => {
      setIsVerifying(false);
      if (fullCode === '123456') {
        dispatch(
          setToastMessage({
            id: `toast-${Date.now()}`,
            title: 'Email verified successfully',
            body: 'Your email has been verified.',
            severity: 'success',
          })
        );
        navigate('/corporations');
      } else {
        dispatch(
          setToastMessage({
            id: `toast-${Date.now()}`,
            title: "We couldn't verify your credentials.",
            body: 'Kindly get a new code & try again.',
            severity: 'error',
          })
        );
      }
    }, 1000);
  }, [code, dispatch, navigate]);

  const handleResendCode = useCallback(() => {
    dispatch(
      setToastMessage({
        id: `toast-${Date.now()}`,
        title: 'Code sent',
        body: 'A new verification code has been sent to your email.',
        severity: 'info',
      })
    );
  }, [dispatch]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: 'rgba(248, 247, 251, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        p: 2,
      }}
    >
      {/* Logo */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <BSPBlueprintLogo width="240px" height="48px" />
      </Box>

      {/* Verification Card */}
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 1)',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          p: 4,
          width: '100%',
          maxWidth: 440,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '20px',
              fontWeight: 600,
              color: 'rgba(47, 65, 74, 1)',
              mb: 1,
            }}
          >
            Enter Verification Code
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(56, 89, 102, 1)',
            }}
          >
            We've sent a 6-digit code to your email
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(48, 95, 161, 1)',
            }}
          >
            {maskedEmail}
          </Typography>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Typography
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(47, 65, 74, 1)',
              mb: 1,
            }}
          >
            Enter code
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'center',
            }}
            onPaste={handlePaste}
          >
            {code.map((digit, index) => (
              <Box
                key={index}
                component="input"
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                aria-label={`Digit ${index + 1} of verification code`}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '8px',
                  border: '1px solid rgba(221, 217, 235, 1)',
                  background: 'rgba(255, 255, 255, 1)',
                  textAlign: 'center',
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'rgba(47, 65, 74, 1)',
                  outline: 'none',
                  '&:focus': {
                    borderColor: 'rgba(48, 95, 161, 1)',
                    boxShadow: '0 0 0 2px rgba(48, 95, 161, 0.1)',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={handleVerify}
          disabled={isVerifying}
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '8px',
            py: 1.5,
            background: 'rgba(48, 95, 161, 1)',
            color: 'rgba(255, 255, 255, 1)',
            '&:hover': {
              background: 'rgba(38, 75, 131, 1)',
            },
            '&.Mui-disabled': {
              background: 'rgba(48, 95, 161, 0.5)',
              color: 'rgba(255, 255, 255, 0.7)',
            },
          }}
        >
          {isVerifying ? 'Verifying...' : 'Verify Account'}
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(56, 89, 102, 1)',
            }}
          >
            Didn't receive a code?
          </Typography>
          <Link
            component="button"
            onClick={handleResendCode}
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: 'rgba(48, 95, 161, 1)',
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Resend Code
          </Link>
        </Box>
      </Box>

      {/* Footer */}
      <AuthPageFooter />
    </Box>
  );
}
