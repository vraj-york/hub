import { Box, Typography } from '@mui/material';

/**
 * Read-only label-value pair for confirmation/summary display.
 * Uses semantic grouping (dl/dt/dd) and accessible styling per spec.
 */
export function DataDisplayRow({ label, value, flexDirection = 'row' }) {
  const displayValue = value != null && value !== '' ? String(value) : 'N/A';
  const ariaLabel = `${label}: ${displayValue}`;

  return (
    <Box
      component="dl"
      role="group"
      aria-label={ariaLabel}
      sx={{
        display: 'flex',
        flexDirection,
        justifyContent: flexDirection === 'row' ? 'space-between' : 'flex-start',
        alignItems: flexDirection === 'row' ? 'center' : 'flex-start',
        gap: flexDirection === 'row' ? 1 : 0.25,
        m: 0,
        py: 0.75,
        ...(flexDirection === 'column' && { gap: 0.25 }),
      }}
    >
      <Typography
        component="dt"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          color: 'rgba(56, 89, 102, 1)',
          flexShrink: 0,
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
          m: 0,
          textAlign: flexDirection === 'row' ? 'right' : 'left',
          wordBreak: 'break-word',
        }}
      >
        {displayValue}
      </Typography>
    </Box>
  );
}
