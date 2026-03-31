import { Box, Typography } from '@mui/material';

export function CardLayout({ title, children, titleId, ariaLabel }) {
  const regionProps = title
    ? { role: 'region', ...(titleId ? { 'aria-labelledby': titleId } : ariaLabel ? { 'aria-label': ariaLabel } : {}) }
    : {};
  return (
    <Box
      sx={{
        background: 'rgba(255, 255, 255, 1)',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
      }}
      {...regionProps}
    >
      {title && (
        <Typography
          component="h3"
          id={titleId}
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '16px',
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
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
}
