import { Box, Typography } from '@mui/material';

export function Step({ id, label, subLabel, isActive, stepNumber, onClick, ariaLabel }) {
  return (
    <Box
      component={onClick ? 'button' : 'div'}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={isActive ? 'step' : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        border: 'none',
        background: 'transparent',
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: 'inherit',
        padding: 0,
        textAlign: 'left',
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(26, 39, 46, 0.05)',
          color: isActive ? 'rgba(58, 111, 216, 1)' : 'rgba(73, 130, 145, 1)',
          fontWeight: 600,
          fontSize: '14px',
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        }}
      >
        {stepNumber}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          component="span"
          sx={{
            display: 'block',
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            color: isActive ? 'rgba(58, 111, 216, 1)' : 'rgba(73, 130, 145, 1)',
          }}
        >
          {label}
        </Typography>
        <Typography
          component="span"
          sx={{
            display: 'block',
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            color: 'rgba(56, 89, 102, 1)',
          }}
        >
          {subLabel}
        </Typography>
      </Box>
    </Box>
  );
}
