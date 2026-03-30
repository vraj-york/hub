import { Box, Typography } from '@mui/material';

const STRENGTH_CONFIG = {
  initial: {
    value: 0,
    label: 'Initial',
    progressColor: 'transparent',
    textColor: 'rgba(73, 130, 145, 1)',
  },
  weak: {
    value: 33,
    label: 'Poor',
    progressColor: 'rgba(196, 71, 85, 1)',
    textColor: 'rgba(196, 71, 85, 1)',
  },
  average: {
    value: 66,
    label: 'Average',
    progressColor: 'rgba(224, 184, 74, 1)',
    textColor: 'rgba(203, 145, 39, 1)',
  },
  strong: {
    value: 100,
    label: 'Strong',
    progressColor: 'rgba(47, 143, 107, 1)',
    textColor: 'rgba(47, 143, 107, 1)',
  },
};

const TRACK_COLOR = 'rgba(241, 240, 247, 1)';

export function PasswordStrengthIndicator({ strength = 'initial' }) {
  const config = STRENGTH_CONFIG[strength] ?? STRENGTH_CONFIG.initial;
  const { value, label, progressColor, textColor } = config;
  const valuetext = `Password strength: ${label}`;

  return (
    <Box sx={{ width: '100%', mb: 2 }} role="status" aria-live="polite">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography
          component="span"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: textColor,
          }}
        >
          {label}
        </Typography>
      </Box>
      <Box
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={valuetext}
        aria-label={valuetext}
        sx={{
          height: 8,
          borderRadius: 1,
          background: TRACK_COLOR,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${value}%`,
            background: progressColor,
            borderRadius: 1,
            transition: 'width 0.3s ease',
          }}
        />
      </Box>
    </Box>
  );
}
