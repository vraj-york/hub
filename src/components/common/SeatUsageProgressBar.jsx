import { Box, Typography } from '@mui/material';

/**
 * Displays seat usage with "used / total" text and a linear progress bar.
 * Spec: text rgba(26, 39, 46, 1) Inter 500 12px; track rgba(243, 246, 252, 1);
 * fill linear gradient rgba(48, 95, 161, 1) to rgba(122, 169, 187, 1).
 */
export function SeatUsageProgressBar({ used = 0, total = 0 }) {
  const pct = total > 0 ? Math.min(100, (used / total) * 100) : 0;
  const ariaValuetext = `Seat usage: ${used} out of ${total}`;

  return (
    <Box
      role="progressbar"
      aria-valuenow={used}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuetext={ariaValuetext}
      sx={{ display: 'inline-flex', flexDirection: 'column', gap: 0.75, minWidth: 0 }}
    >
      <Typography
        component="span"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontWeight: 500,
          fontSize: 12,
          color: 'rgba(26, 39, 46, 1)',
        }}
      >
        {used} / {total}
      </Typography>
      <Box
        sx={{
          height: 8,
          borderRadius: 1,
          background: 'rgba(243, 246, 252, 1)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, rgba(48, 95, 161, 1), rgba(122, 169, 187, 1))',
            borderRadius: 1,
            transition: 'width 0.3s ease',
          }}
        />
      </Box>
    </Box>
  );
}
