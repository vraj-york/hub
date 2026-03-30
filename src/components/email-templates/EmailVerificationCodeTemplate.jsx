import { Box, Typography } from '@mui/material';
import { BSPBlueprintLogo } from '../common/BSPBlueprintLogo';

/**
 * Email Template - Verification Code. Renders the structure of the 2FA verification
 * email: logo container (dark bg, white wordmark), content container (white),
 * frame background rgba(248, 247, 251, 1). Used for preview or server-side HTML generation.
 * BSPBlueprint logo uses white wordmark (l-white.svg) per email template spec.
 */
export function EmailVerificationCodeTemplate({
  verificationCode = '000000',
  maskedEmail = 'ad***@example.com',
  expiryMinutes = 10,
}) {
  const frameBg = 'rgba(248, 247, 251, 1)'; // #F8F7FB
  const contentBg = 'rgba(255, 255, 255, 1)';
  const logoContainerBg = 'rgba(26, 39, 46, 1)'; // #1A272E

  return (
    <Box
      component="article"
      role="document"
      aria-label="Verification code email"
      sx={{
        backgroundColor: frameBg,
        minHeight: 320,
        padding: 3,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Logo Container: dark background for white wordmark contrast */}
      <Box
        sx={{
          backgroundColor: logoContainerBg,
          padding: 2,
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: 1,
          mb: 2,
        }}
      >
        <BSPBlueprintLogo variant="light" width="160px" height="28px" />
      </Box>

      {/* Content Container */}
      <Box
        sx={{
          backgroundColor: contentBg,
          borderRadius: 2,
          padding: 3,
          maxWidth: 480,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        {/* Separator (separator.svg color #DDD9EB - horizontal rule for email layout) */}
        <Box
          sx={{
            height: 1,
            backgroundColor: '#DDD9EB',
            my: 1.5,
            maxWidth: 120,
          }}
          aria-hidden
        />

        <Typography variant="h2" sx={{ fontSize: 20, fontWeight: 600, color: 'rgba(47, 65, 74, 1)', mb: 1 }}>
          Your verification code
        </Typography>
        <Typography sx={{ fontSize: 14, color: 'rgba(56, 89, 102, 1)', mb: 2 }}>
          We sent a 6-digit code to {maskedEmail}. Enter it in the app to verify your account.
        </Typography>
        <Box
          component="p"
          sx={{
            fontFamily: 'monospace',
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 4,
            color: 'rgba(47, 65, 74, 1)',
            backgroundColor: 'rgba(248, 247, 251, 1)',
            padding: 2,
            borderRadius: 1,
            my: 2,
          }}
        >
          {verificationCode}
        </Box>
        <Typography sx={{ fontSize: 12, color: 'rgba(73, 130, 145, 1)' }}>
          This code expires in {expiryMinutes} minutes. If you didn&apos;t request it, you can ignore this email.
        </Typography>
      </Box>
    </Box>
  );
}
