import { Box, Typography, Link } from '@mui/material';

export function AuthPageFooter({ version = 'Version 1.0', privacyPolicyUrl = '#', termsOfUseUrl = '#' }) {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: 440,
        margin: '0 auto',
        px: 1,
        color: 'rgba(73, 130, 145, 1)',
      }}
    >
      <Typography
        component="span"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '14px',
        }}
      >
        {version}
      </Typography>
      <Box component="span" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Link
          href={privacyPolicyUrl}
          underline="hover"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '14px',
            color: 'rgba(73, 130, 145, 1)',
          }}
        >
          Privacy Policy
        </Link>
        <Typography component="span" sx={{ color: 'rgba(73, 130, 145, 1)', lineHeight: '14px' }}>|</Typography>
        <Link
          href={termsOfUseUrl}
          underline="hover"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '14px',
            color: 'rgba(73, 130, 145, 1)',
          }}
        >
          Terms of Use
        </Link>
      </Box>
    </Box>
  );
}
