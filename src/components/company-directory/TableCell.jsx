import { Box, Typography } from '@mui/material';

export function TableCell({ value, children }) {
  const content = children ?? (value != null ? String(value) : null);
  if (content == null) return null;

  return (
    <Box
      component="td"
      sx={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(221, 217, 235, 1)',
        verticalAlign: 'middle',
      }}
    >
      {typeof content === 'string' ? (
        <Typography
          component="span"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: 14,
            color: 'rgba(47, 65, 74, 1)',
          }}
        >
          {content}
        </Typography>
      ) : (
        content
      )}
    </Box>
  );
}
