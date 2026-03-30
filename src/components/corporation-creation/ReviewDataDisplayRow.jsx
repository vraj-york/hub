import { Box, Typography } from '@mui/material';

/**
 * Read-only label-value pair for confirmation/review display.
 * Uses semantic grouping and accessible styling per spec.
 */
export function ReviewDataDisplayRow({ label, value }) {
  const displayValue = value != null && value !== '' ? String(value) : 'N/A';
  const ariaLabel = `${label}: ${displayValue}`;

  return (
    <Box
      component="dl"
      role="group"
      aria-label={ariaLabel}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.25,
        m: 0,
        py: 0.5,
      }}
    >
      <Typography
        component="dt"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          color: 'rgba(56, 89, 102, 1)',
        }}
      >
        {label}
      </Typography>
      <Typography
        component="dd"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: 'rgba(47, 65, 74, 1)',
        }}
      >
        {displayValue}
      </Typography>
    </Box>
  );
}
