import { Box, IconButton } from '@mui/material';

/**
 * Displays the company's currently configured logo.
 * @param {string} logoUrl - URL for the logo image (or placeholder)
 * @param {string} companyName - Used for alt text
 */
export function CompanyLogoPreview({ logoUrl, companyName = 'Company' }) {
  const src = logoUrl || '/images/Logo 1-c24ca4a3.png';
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        component="span"
        disableRipple
        sx={{
          p: 0,
          borderRadius: 2,
          overflow: 'hidden',
          '&:hover': { background: 'transparent' },
        }}
        aria-label={`${companyName} logo preview`}
      >
        <Box
          component="img"
          src={src}
          alt={`${companyName} logo`}
          sx={{
            display: 'block',
            width: 80,
            height: 80,
            objectFit: 'contain',
          }}
        />
      </IconButton>
    </Box>
  );
}
