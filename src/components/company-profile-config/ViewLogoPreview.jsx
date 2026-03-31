import { Box } from '@mui/material';

export function ViewLogoPreview({ logoUrl, altText }) {
  if (!logoUrl) {
    return (
      <Box
        sx={{
          width: 120,
          height: 80,
          background: 'rgba(241, 240, 247, 1)',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box component="span" sx={{ fontSize: '12px', color: 'rgba(73, 130, 145, 1)' }}>
          No logo
        </Box>
      </Box>
    );
  }
  return (
    <Box
      component="img"
      src={logoUrl}
      alt={altText}
      sx={{
        maxWidth: '100%',
        maxHeight: 120,
        objectFit: 'contain',
        borderRadius: 1,
      }}
    />
  );
}
