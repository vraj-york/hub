import { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { FormGroupLabel } from '../company-creation/FormGroupLabel';
import { PasswordInput } from '../common/PasswordInput';
import { PasswordStrengthIndicator } from '../common/PasswordStrengthIndicator';

const MIN_LENGTH = 8;

function getPasswordStrength(password) {
  if (!password?.length) return 'initial';
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const lengthOk = password.length >= MIN_LENGTH;
  if (!lengthOk || !hasLower || !hasUpper) return 'weak';
  if (!hasNumber && !hasSymbol) return 'weak';
  if (hasLower && hasUpper && (hasNumber || hasSymbol) && lengthOk) {
    return hasNumber && hasSymbol ? 'strong' : 'average';
  }
  return 'weak';
}

function validatePassword(password) {
  const errors = [];
  if (!password?.trim()) return errors;
  if (password.length < MIN_LENGTH) {
    errors.push('Password must be at least 8 characters.');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain a lowercase letter.');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain an uppercase letter.');
  }
  if (!/\d/.test(password) && !/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain a number or a symbol.');
  }
  return errors;
}

export function SetNewPasswordDialog({
  password,
  confirmPassword,
  passwordStrength,
  passwordValidationErrors = [],
  confirmPasswordValidationError = '',
  isSubmitting = false,
  onPasswordChange,
  onConfirmPasswordChange,
  onPasswordStrengthChange,
  onSubmit,
  onBackToLogin,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const derivedStrength = useMemo(() => getPasswordStrength(password), [password]);

  useEffect(() => {
    onPasswordStrengthChange?.(derivedStrength);
  }, [derivedStrength, onPasswordStrengthChange]);

  const confirmError = useMemo(() => {
    if (!confirmPassword?.length) return '';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return confirmPasswordValidationError || '';
  }, [password, confirmPassword, confirmPasswordValidationError]);

  const passwordErrors = passwordValidationErrors?.length ? passwordValidationErrors : [];
  const passwordErrorText = passwordErrors[0] ?? '';
  const isFormValid =
    password?.trim() &&
    confirmPassword?.trim() &&
    passwordErrors.length === 0 &&
    !confirmError &&
    password === confirmPassword &&
    derivedStrength !== 'weak' &&
    derivedStrength !== 'initial';

  useEffect(() => {
    const el = document.getElementById('new-password');
    if (el) el.focus();
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      if (!isFormValid || isSubmitting) return;
      onSubmit();
    },
    [isFormValid, isSubmitting, onSubmit]
  );

  return (
    <Paper
      component="section"
      role="region"
      aria-labelledby="set-new-password-title"
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
        id="set-new-password-title"
        component="h2"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '20px',
          fontWeight: 600,
          color: 'rgba(47, 65, 74, 1)',
          mb: 1.5,
        }}
      >
        Set New Password
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
        Must be at least 8 characters, with upper &amp; lowercase, a symbol or a number.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormGroupLabel label="Password" id="new-password-label" htmlFor="new-password" isRequired />
        <Box sx={{ mb: 2 }}>
          <PasswordInput
            id="new-password"
            value={password}
            onChange={(e) => onPasswordChange?.(e.target.value ?? '')}
            placeholder="Enter password"
            autoComplete="new-password"
            aria-labelledby="new-password-label"
            aria-required="true"
            errorMessage={passwordErrorText}
            inputBackground="rgba(255, 255, 255, 1)"
            valueTextColor="rgba(73, 130, 145, 1)"
            isPasswordVisible={showPassword}
            onToggleVisibility={() => setShowPassword((v) => !v)}
          />
        </Box>

        <FormGroupLabel label="Confirm Password" id="confirm-password-label" htmlFor="confirm-password" isRequired />
        <Box sx={{ mb: 2 }}>
          <PasswordInput
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange?.(e.target.value ?? '')}
            placeholder="Confirm password"
            autoComplete="new-password"
            aria-label="Confirm Password"
            aria-labelledby="confirm-password-label"
            aria-required="true"
            errorMessage={confirmError}
            inputBackground="rgba(255, 255, 255, 1)"
            valueTextColor="rgba(73, 130, 145, 1)"
            isPasswordVisible={showConfirmPassword}
            onToggleVisibility={() => setShowConfirmPassword((v) => !v)}
          />
        </Box>

        <PasswordStrengthIndicator strength={passwordStrength} />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!isFormValid || isSubmitting}
          aria-label="Reset password"
          aria-disabled={!isFormValid || isSubmitting}
          aria-busy={isSubmitting}
          sx={{
            backgroundColor: 'rgba(99, 146, 205, 1)',
            color: 'rgba(255, 255, 255, 1)',
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: 2,
            py: 1.5,
            mb: 1.5,
            '&:hover': { backgroundColor: 'rgba(79, 126, 185, 1)' },
            '&.Mui-disabled': { color: 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(99, 146, 205, 0.5)' },
          }}
        >
          {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
        </Button>

        <Button
          type="button"
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
            '&:hover': {
              backgroundColor: 'rgba(248, 247, 251, 1)',
              borderColor: 'rgba(47, 65, 74, 0.3)',
            },
          }}
        >
          Back to Login
        </Button>
      </Box>
    </Paper>
  );
}

export { getPasswordStrength, validatePassword };
