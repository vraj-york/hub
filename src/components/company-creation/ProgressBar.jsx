import { Box, Typography } from '@mui/material';

export function ProgressBar({ progress = 0, labelText, trackBackground }) {
  const value = Math.min(100, Math.max(0, Number(progress)));
  const displayLabel = labelText ?? `${value}% Complete`;
  const trackBg = trackBackground ?? 'rgba(241, 240, 247, 1)';
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography
          component="span"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: 'rgba(47, 65, 74, 1)',
          }}
        >
          {displayLabel}
        </Typography>
      </Box>
      <Box
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={displayLabel}
        aria-label={displayLabel}
        sx={{
          height: 8,
          borderRadius: 1,
          background: trackBg,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${value}%`,
            background: 'rgba(48, 95, 161, 1)',
            borderRadius: 1,
            transition: 'width 0.3s ease',
          }}
        />
      </Box>
    </Box>
  );
}
