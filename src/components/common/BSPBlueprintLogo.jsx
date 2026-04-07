import { Box } from '@mui/material';

/**
 * BSPBlueprint logo. Use variant="light" for dark backgrounds (e.g. email template logo container)
 * where wordmark must be white; default variant uses black wordmark (l.svg).
 */
export function BSPBlueprintLogo({ width, height, variant = 'default' }) {
  const logoSrc = variant === 'light' ? '/vectors/l-white.svg' : '/vectors/l.svg';
  return (
    <Box
      component="img"
      src={logoSrc}
      alt="BSPBlueprint"
      sx={{
        width: width ?? '180px',
        height: height ?? '32px',
        display: 'block',
      }}
    />
  );
}
