import { Box, Typography } from '@mui/material';

export function IconHoverCard({
  label,
  value,
  dotColor,
  label2,
  value2,
  dotColor2,
}) {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        background: 'rgba(255, 255, 255, 1)',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
        p: 1.5,
        border: '1px solid rgba(221, 217, 235, 1)',
        minWidth: 80,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: label2 ? 0.5 : 0 }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: dotColor ?? 'rgba(48, 95, 161, 1)',
          }}
          aria-hidden
        />
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            color: 'rgba(56, 89, 102, 1)',
          }}
        >
          {label}
        </Typography>
        <Typography
          component="span"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            color: 'rgba(47, 65, 74, 1)',
          }}
        >
          {value}
        </Typography>
      </Box>
      {label2 != null && value2 != null && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: dotColor2 ?? 'rgba(224, 184, 74, 1)',
            }}
            aria-hidden
          />
          <Typography
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              color: 'rgba(56, 89, 102, 1)',
            }}
          >
            {label2}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: 'rgba(47, 65, 74, 1)',
            }}
          >
            {value2}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
