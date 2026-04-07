import { Box, Paper, Typography, Button } from '@mui/material';
import { FormGroupLabel } from '../company-creation/FormGroupLabel';
import { TextInput } from '../company-creation/TextInput';
import { PasswordInput } from '../common/PasswordInput';
import { RememberMeSwitchGroup } from '../common/RememberMeSwitchGroup';
import { LinkButton } from '../common/LinkButton';

export function LoginCard({
  email,
  password,
  rememberMe,
  showPassword,
  emailError,
  passwordError,
  isLoggingIn,
  onEmailChange,
  onEmailBlur,
  onPasswordChange,
  onPasswordBlur,
  onRememberMeChange,
  onTogglePasswordVisibility,
  onSubmit,
  onForgotPasswordClick,
  onContactUsClick,
}) {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email ?? '').trim());
  const hasPassword = Boolean((password ?? '').trim());
  const canSubmit = isEmailValid && hasPassword && !emailError && !passwordError && !isLoggingIn;

  return (
    <Paper
      component="section"
      role="region"
      aria-labelledby="login-page-title"
      aria-label="Login form"
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
        id="login-page-title"
        component="h1"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '20px',
          fontWeight: 600,
          color: 'rgba(47, 65, 74, 1)',
          mb: 1,
          textAlign: 'center',
        }}
      >
        Welcome back!
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          color: 'rgba(56, 89, 102, 1)',
          mb: 2.5,
          textAlign: 'center',
        }}
      >
        Enter your email and password to sign in.
      </Typography>

      <Box component="form" onSubmit={onSubmit} noValidate>
        <FormGroupLabel label="Email" id="login-email-label" htmlFor="login-email" isRequired />
        <Box sx={{ mb: 2 }}>
          <TextInput
            id="login-email"
            value={email}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            placeholder="Enter email"
            type="email"
            inputMode="email"
            autoComplete="email"
            error={Boolean(emailError)}
            helperText={emailError || ''}
            errorMessage={emailError}
            inputBackground="rgba(255, 255, 255, 1)"
            valueTextColor="rgba(47, 65, 74, 1)"
            aria-labelledby="login-email-label"
            aria-required="true"
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? 'login-email-error' : undefined}
          />
        </Box>

        <FormGroupLabel label="Password" id="login-password-label" htmlFor="login-password" isRequired />
        <Box sx={{ mb: 2 }}>
          <PasswordInput
            id="login-password"
            value={password}
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
            placeholder="Enter password"
            error={Boolean(passwordError)}
            helperText={passwordError || ''}
            errorMessage={passwordError}
            inputBackground="rgba(255, 255, 255, 1)"
            valueTextColor="rgba(47, 65, 74, 1)"
            isPasswordVisible={showPassword}
            onToggleVisibility={onTogglePasswordVisibility}
            aria-labelledby="login-password-label"
            aria-required="true"
            aria-invalid={Boolean(passwordError)}
            aria-describedby={passwordError ? 'login-password-error' : undefined}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
          <RememberMeSwitchGroup
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => onRememberMeChange(e.target.checked)}
            id="login-remember-me"
          />
          <LinkButton
            label="Forgot Password?"
            onClick={onForgotPasswordClick}
            fontWeight={500}
            aria-label="Forgot password? Navigate to account recovery page"
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
          aria-busy={isLoggingIn}
          sx={{
            backgroundColor: 'rgba(48, 95, 161, 1)',
            color: 'rgba(255, 255, 255, 1)',
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: 2,
            py: 1.5,
            mb: 2,
            '&:hover': { backgroundColor: 'rgba(38, 75, 131, 1)' },
            '&.Mui-disabled': { color: 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(48, 95, 161, 0.5)' },
          }}
        >
          {isLoggingIn ? 'Logging In...' : 'Login'}
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography
            component="p"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(56, 89, 102, 1)',
            }}
          >
            Need help?
          </Typography>
          <LinkButton
            label="Contact Us"
            onClick={onContactUsClick}
            fontWeight={600}
            aria-label="Contact support for assistance"
          />
        </Box>
      </Box>
    </Paper>
  );
}
