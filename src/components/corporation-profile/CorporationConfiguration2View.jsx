import { Box, Typography } from '@mui/material';

const securityConfig = [
  { label: 'Password Policy', value: 'Standard (8+ chars, mixed case)' },
  { label: '2FA Requirement', value: 'Required' },
  { label: 'Session Timeout (In Minutes)', value: '60 min' },
];

function ConfigItem({ label, value }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '12px',
          fontWeight: 400,
          color: 'rgba(56, 89, 102, 1)',
          mb: 0.5,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: 'rgba(47, 65, 74, 1)',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export function CorporationConfiguration2View() {
  return (
    <Box sx={{ display: 'flex', gap: 4, py: 2 }}>
      {/* Left side - Security Posture */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: 'rgba(47, 65, 74, 1)',
            mb: 3,
          }}
        >
          Default Security Posture
        </Typography>
        {securityConfig.map((config, index) => (
          <ConfigItem key={index} label={config.label} value={config.value} />
        ))}
      </Box>

      {/* Right side - Branding Logo */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: 'rgba(47, 65, 74, 1)',
            mb: 3,
          }}
        >
          Branding Logo
        </Typography>
        <Box
          sx={{
            width: 200,
            height: 80,
            border: '1px dashed rgba(221, 217, 235, 1)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 1)',
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '24px',
              fontWeight: 700,
              color: 'rgba(48, 95, 161, 1)',
            }}
          >
            Espra
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
