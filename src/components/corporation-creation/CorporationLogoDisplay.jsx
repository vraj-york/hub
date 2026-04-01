import { Box } from '@mui/material';

/**
 * Displays the uploaded corporation logo or a placeholder.
 * Accepts logoSrc or logoUrl for compatibility. img must include descriptive alt for accessibility.
 */
export function CorporationLogoDisplay({
  logoSrc,
  logoUrl,
  altText = 'Uploaded corporation logo',
  width = 100,
  height = 100,
}) {
  const src = logoSrc ?? logoUrl;
  if (!src) {
    return (
      <Box
        sx={{
          width: typeof width === 'number' ? width : 80,
          height: typeof height === 'number' ? height : 80,
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 1)',
          border: '1px dashed rgba(221, 217, 235, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="No logo uploaded"
      >
        <Box
          component="span"
          sx={{
            fontSize: '12px',
            color: 'rgba(73, 130, 145, 1)',
          }}
        >
          No logo
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={altText}
      sx={{
        width: typeof width === 'number' ? width : 'auto',
        height: typeof height === 'number' ? height : 'auto',
        maxWidth: 120,
        maxHeight: 80,
        objectFit: 'contain',
        borderRadius: '8px',
        border: '1px solid rgba(221, 217, 235, 1)',
        background: 'rgba(255, 255, 255, 1)',
      }}
    />
  );
}
