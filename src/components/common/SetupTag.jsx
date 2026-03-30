import { Box, Typography } from '@mui/material';
import { SlidersVertical, Zap } from 'lucide-react';

const ICON_MAP = {
  zap: Zap,
  'sliders-vertical': SlidersVertical,
};

export function SetupTag({ icon = 'zap', text = 'Quick Setup', type }) {
  const IconComponent = ICON_MAP[icon] ?? Zap;
  const ariaLabel = type ? `Corporation Setup Type: ${text}` : `Corporation setup flow: ${text}`;
  return (
    <Box
      component="span"
      role="status"
      aria-label={ariaLabel}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        py: 0.75,
        borderRadius: 2,
        background: 'rgba(248, 247, 251, 1)',
      }}
    >
      <IconComponent size={16} color="rgba(58, 111, 216, 1)" aria-hidden />
      <Typography
        component="span"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: 'rgba(52, 76, 86, 1)',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
