import { Box, Typography } from '@mui/material';

export function FormCard({ title, children, titleId, ariaLabel, role: roleProp }) {
  const regionProps = title
    ? { role: roleProp ?? 'region', ...(titleId ? { 'aria-labelledby': titleId } : ariaLabel ? { 'aria-label': ariaLabel } : {}) }
    : {};
  return (
    <Box
      sx={{
        background: '#fff',
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'visible',
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
