import { Box, Paper, Typography } from '@mui/material';

/**
 * Display card for read-only summary sections (e.g. Step 5 Confirmation).
 * Uses semantic heading for the title. Styling per spec: bg #fff, radius 8px.
 */
export function SummaryCard({ title, children, titleId }) {
  return (
    <Paper
      component="section"
      variant="outlined"
      aria-labelledby={titleId}
      sx={{
        background: 'rgba(255, 255, 255, 1)',
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
      }}
    >
      {title && (
        <Typography
          component="h3"
          id={titleId}
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: 'rgba(56, 89, 102, 1)',
            px: 2,
            py: 1.5,
            borderBottom: '1px solid rgba(221, 217, 235, 1)',
          }}
        >
          {title}
        </Typography>
      )}
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {children}
      </Box>
    </Paper>
  );
}
