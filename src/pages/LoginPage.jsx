import { useState, useEffect, useCallback } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BSPBlueprintLogo } from '../components/common/BSPBlueprintLogo';
import { AuthPageFooter } from '../components/layout/AuthPageFooter';
import { LoginCard } from '../components/auth/LoginCard';
import {
  loginRequest,
  setToastMessage,
  clearLoginError,
  selectIsLoggingIn,
  selectLoginError,
  selectRememberMe,
} from '../store/slices/authSlice';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  if (!email?.trim()) return false;
  return EMAIL_REGEX.test(email.trim());
}

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isLoggingIn = useSelector(selectIsLoggingIn);
  const loginError = useSelector(selectLoginError);
  const persistedRememberMe = useSelector(selectRememberMe);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(persistedRememberMe ?? false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const el = document.getElementById('login-email');
    if (el) el.focus();
  }, []);

  useEffect(() => {
    if (loginError) {
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Login failed',
          body: loginError,
          severity: 'error',
        })
      );
      dispatch(clearLoginError());
    }
  }, [loginError, dispatch]);

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      const trimmedEmail = email?.trim() ?? '';
      const trimmedPassword = password?.trim() ?? '';

      let hasError = false;
      if (!validateEmail(trimmedEmail)) {
        setEmailError('Your email address is invalid.');
        hasError = true;
      } else {
        setEmailError('');
      }
      if (!trimmedPassword) {
        setPasswordError('Please enter your password.');
        hasError = true;
      } else {
        setPasswordError('');
      }
      if (hasError) return;

      dispatch(
        loginRequest({
          email: trimmedEmail,
          password: trimmedPassword,
          rememberMe,
        })
      ).then((result) => {
        if (result?.payload?.success) {
          navigate('/dashboard', { replace: true });
        }
      });
    },
    [email, password, rememberMe, dispatch, navigate]
  );

  const handleForgotPassword = useCallback(() => {
    navigate('/forgot-password');
  }, [navigate]);

  const handleContactUs = useCallback(() => {
    // Placeholder: action to be clarified per design (e.g. mailto, external URL, or modal)
    window.open('mailto:support@example.com', '_blank', 'noopener,noreferrer');
  }, []);

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value ?? '');
    setEmailError('');
  }, []);

  const handleEmailBlur = useCallback(() => {
    const trimmed = (email ?? '').trim();
    if (trimmed && !validateEmail(trimmed)) {
      setEmailError('Your email address is invalid.');
    }
  }, [email]);

  const handlePasswordBlur = useCallback(() => {
    if (!(password ?? '').trim()) {
      setPasswordError('Please enter your password.');
    }
  }, [password]);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value ?? '');
    setPasswordError('');
  }, []);

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'rgba(248, 247, 251, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        py: 3,
        px: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <BSPBlueprintLogo width="360px" height="72px" />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          px: isMobile ? 2 : 0,
        }}
      >
        <LoginCard
          email={email}
          password={password}
          rememberMe={rememberMe}
          showPassword={showPassword}
          emailError={emailError}
          passwordError={passwordError}
          isLoggingIn={isLoggingIn}
          onEmailChange={handleEmailChange}
          onEmailBlur={handleEmailBlur}
          onPasswordChange={handlePasswordChange}
          onPasswordBlur={handlePasswordBlur}
          onRememberMeChange={setRememberMe}
          onTogglePasswordVisibility={() => setShowPassword((prev) => !prev)}
          onSubmit={handleSubmit}
          onForgotPasswordClick={handleForgotPassword}
          onContactUsClick={handleContactUs}
        />
      </Box>

      <AuthPageFooter version="Version 1.0" privacyPolicyUrl="#" termsOfUseUrl="#" />
    </Box>
  );
}
