import { Box, Typography } from '@mui/material';
import { Info } from 'lucide-react';

export function FormGroupLabel({ label, isRequired, htmlFor, showInfoIcon, infoIconAriaLabel, id: idProp }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        mb: 1,
      }}
    >
      <Typography
        component="label"
        id={idProp}
        htmlFor={htmlFor}
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          color: 'rgba(47, 65, 74, 1)',
          display: 'inline',
        }}
      >
        {isRequired && (
          <Typography component="span" sx={{ color: 'rgba(196, 71, 85, 1)', mr: 0.25 }} aria-hidden>
            *
          </Typography>
        )}
        {label}
      </Typography>
      {showInfoIcon && (
        <Box
          component="span"
          role="img"
          aria-label={infoIconAriaLabel ?? `Information about ${label}`}
          sx={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <Info size={16} color="rgba(58, 111, 216, 1)" style={{ flexShrink: 0 }} aria-hidden />
        </Box>
      )}
    </Box>
  );
}
