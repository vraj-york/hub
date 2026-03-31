import { useEffect, useCallback } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectToastMessage, clearToastMessage } from '../../store/slices/authSlice';

const AUTO_HIDE_DURATION = 6000;
const TOAST_BG_ERROR = 'rgba(196, 71, 85, 1)'; // #C44755
const TOAST_TEXT = '#FFFFFF';

export function GlobalToast() {
  const dispatch = useDispatch();
  const toast = useSelector(selectToastMessage);
  const open = Boolean(toast?.id && (toast?.title || toast?.body));

  const handleClose = useCallback(() => {
    dispatch(clearToastMessage());
  }, [dispatch]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(handleClose, AUTO_HIDE_DURATION);
    return () => clearTimeout(timer);
  }, [open, toast?.id, handleClose]);

  if (!open) return null;

  const isError = toast?.severity === 'error';
  const backgroundColor = isError ? TOAST_BG_ERROR : TOAST_BG_ERROR;

  return (
    <Box
      role="alert"
      aria-live="assertive"
      sx={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1400,
        minWidth: 320,
        maxWidth: '90vw',
        backgroundColor,
        color: TOAST_TEXT,
        borderRadius: 1,
        boxShadow: 3,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        padding: 1.5,
        animation: 'toastSlideIn 0.3s ease-out',
        '@keyframes toastSlideIn': {
          from: { opacity: 0, transform: 'translateX(-50%) translateY(16px)' },
          to: { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
        },
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {toast?.title && (
          <Typography
            component="span"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: TOAST_TEXT,
              display: 'block',
            }}
          >
            {toast.title}
          </Typography>
        )}
        {toast?.body && (
          <Typography
            component="span"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: TOAST_TEXT,
              display: 'block',
              mt: toast?.title ? 0.25 : 0,
            }}
          >
            {toast.body}
          </Typography>
        )}
      </Box>
      <IconButton
        size="small"
        onClick={handleClose}
        aria-label="Dismiss error message"
        sx={{
          color: TOAST_TEXT,
          padding: 0.5,
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' },
        }}
      >
        <img src="/vectors/icon-x.svg" alt="" width={16} height={16} aria-hidden />
      </IconButton>
    </Box>
  );
}
