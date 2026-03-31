import { Box, Typography } from '@mui/material';

export function TwoLineTableCell({ primaryValue, secondaryValue }) {
  return (
    <Box
      component="td"
      sx={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(221, 217, 235, 1)',
        verticalAlign: 'middle',
      }}
    >
      <Typography
        component="div"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontWeight: 400,
          fontSize: 14,
          color: 'rgba(47, 65, 74, 1)',
        }}
      >
        {primaryValue}
      </Typography>
      {secondaryValue != null && secondaryValue !== '' && (
        <Typography
          component="div"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            fontSize: 12,
            color: 'rgba(73, 130, 145, 1)',
            mt: 0.25,
          }}
        >
          {secondaryValue}
        </Typography>
      )}
    </Box>
  );
}
