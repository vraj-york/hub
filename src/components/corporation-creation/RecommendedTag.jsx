import { Box, Typography } from '@mui/material';
import { Sparkles } from 'lucide-react';

export function RecommendedTag({ label = 'Recommended' }) {
  return (
    <Box
      component="span"
      aria-label="Recommended"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.25,
        py: 0.5,
        borderRadius: 1,
        background: 'rgba(58, 111, 216, 1)',
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontWeight: 600,
        fontSize: '14px',
      }}
    >
      <Sparkles size={14} strokeWidth={2} style={{ color: 'rgba(255, 255, 255, 1)' }} aria-hidden />
      {label}
    </Box>
  );
}
