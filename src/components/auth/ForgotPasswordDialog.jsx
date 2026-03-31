import { useState, useEffect, useCallback } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { FormGroupLabel } from '../company-creation/FormGroupLabel';
import { TextInput } from '../company-creation/TextInput';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  if (!email?.trim()) return false;
  return EMAIL_REGEX.test(email.trim());
}

export function ForgotPasswordDialog({
  onSubmit,
  onBackToLogin,
  initialEmail = '',
  isLoading = false,
  error: externalError = null,
  successMessage = null,
}) {
  const [email, setEmail] = useState(initialEmail);
  const [inlineError, setInlineError] = useState(null);

  const isEmailValid = validateEmail(email);
  const isSubmitting = isLoading;
  const canSubmit = isEmailValid && !isSubmitting;

  useEffect(() => {
    const el = document.getElementById('email-input');
    if (el) el.focus();
  }, []);

  useEffect(() => {
    if (email.trim()) {
      setInlineError(isEmailValid ? null : 'Your email address is invalid.');
    } else {
      setInlineError(null);
    }
  }, [email, isEmailValid]);

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      if (!canSubmit) return;
      setInlineError(null);
      onSubmit(email.trim());
    },
    [canSubmit, email, onSubmit]
  );

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value ?? '');
  }, []);

  return (
    <Paper
      component="section"
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-password-title"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 2,
        padding: 3,
        maxWidth: 440,
        width: '100%',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Typography
        id="forgot-password-title"
        component="h2"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '20px',
          fontWeight: 600,
          color: 'rgba(47, 65, 74, 1)',
          mb: 1.5,
        }}
      >
        Forgot Password?
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          color: 'rgba(56, 89, 102, 1)',
          mb: 2,
        }}
      >
        No worries — we&apos;ll send you reset instructions.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormGroupLabel label="Email" id="email-label" htmlFor="email-input" isRequired />
        <Box sx={{ mb: 2 }}>
          <TextInput
            id="email-input"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
            type="email"
            inputMode="email"
            errorMessage={inlineError || externalError}
            inputBackground="rgba(255, 255, 255, 1)"
            aria-labelledby="email-label"
            aria-required="true"
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!canSubmit}
          aria-label="Send password reset instructions"
          aria-disabled={!canSubmit}
          aria-busy={isSubmitting}
          sx={{
            backgroundColor: 'rgba(48, 95, 161, 1)',
            color: 'rgba(255, 255, 255, 1)',
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: 2,
            py: 1.5,
            mb: 1.5,
            '&:hover': { backgroundColor: 'rgba(38, 75, 131, 1)' },
            '&.Mui-disabled': { color: 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(48, 95, 161, 0.5)' },
          }}
        >
          {isSubmitting ? 'Sending instructions...' : 'Send Instructions'}
        </Button>

        <Button
          type="button"
          variant="outlined"
          fullWidth
          onClick={onBackToLogin}
          aria-label="Navigate back to the login page"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 1)',
            color: 'rgba(47, 65, 74, 1)',
            borderColor: 'rgba(221, 217, 235, 1)',
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: 2,
            py: 1.5,
            '&:hover': {
              backgroundColor: 'rgba(248, 247, 251, 1)',
              borderColor: 'rgba(47, 65, 74, 0.3)',
            },
          }}
        >
          Back to Login
        </Button>
      </Box>

      {successMessage && (
        <Typography
          role="status"
          aria-live="polite"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(47, 143, 107, 1)',
            mt: 2,
          }}
        >
          {successMessage}
        </Typography>
      )}
    </Paper>
  );
}
