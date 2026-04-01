import { Box, Typography } from '@mui/material';

export function ProgressBar({ percentage = 0, label }) {
  const value = Math.min(100, Math.max(0, Number(percentage)));
  const displayLabel = label ?? `${value}% Complete`;
  return (
    <Box sx={{ width: '100%', mb: 2 }}>
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
        sx={{
          height: 8,
          borderRadius: 1,
          background: 'rgba(241, 240, 247, 1)',
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
