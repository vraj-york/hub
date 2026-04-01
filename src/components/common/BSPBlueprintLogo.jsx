import { Box } from '@mui/material';
import bspBlueprintLogoDefault from '../../assets/images/client-link-48-88409125.jpg';

/**
 * BSPBlueprint logo. Use variant="light" for dark backgrounds (e.g. email template logo container)
 * where wordmark must be white; default variant uses the raster brand mark under src/assets.
 */
export function BSPBlueprintLogo({ width, height, variant = 'default' }) {
  const logoSrc = variant === 'light' ? '/vectors/l-white.svg' : bspBlueprintLogoDefault;
  return (
    <Box
      component="img"
      src={logoSrc}
      alt="BSPBlueprint"
      sx={{
        width: width ?? '180px',
        height: height ?? '32px',
        display: 'block',
        objectFit: 'contain',
      }}
    />
  );
}
