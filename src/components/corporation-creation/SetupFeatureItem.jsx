import { Box, Stack, Typography } from '@mui/material';

const stepNumberSx = {
  width: 24,
  height: 24,
  borderRadius: '50%',
  background: 'rgba(241, 240, 247, 1)',
  color: 'rgba(73, 130, 145, 1)',
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  fontWeight: 500,
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

export function SetupFeatureItem({ stepNumber, title, subtitle }) {
  return (
    <Stack direction="row" alignItems="flex-start" gap={1.5} component="li">
      <Box sx={stepNumberSx} aria-hidden>
        {stepNumber}
      </Box>
      <Stack direction="column" flex={1} sx={{ minWidth: 0 }}>
        <Typography
          component="span"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            color: 'rgba(47, 65, 74, 1)',
            lineHeight: 1.4,
          }}
        >
          {title}
        </Typography>
        <Typography
          component="span"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            color: 'rgba(73, 130, 145, 1)',
            lineHeight: 1.4,
            mt: 0.25,
          }}
        >
          {subtitle}
        </Typography>
      </Stack>
    </Stack>
  );
}
