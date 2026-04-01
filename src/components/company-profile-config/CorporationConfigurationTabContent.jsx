import { Box, Typography } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { ConfigDisplayRow } from './ConfigDisplayRow';
import { ViewLogoPreview } from './ViewLogoPreview';

export function CorporationConfigurationTabContent({ corporationConfigData, corporationName }) {
  const security = corporationConfigData?.securityConfig ?? {};
  const passwordPolicy = security.passwordPolicy ?? '—';
  const tfaRequirement = security.tfaRequirement ?? '—';
  const sessionTimeoutMinutes =
    security.sessionTimeoutMinutes != null ? `${security.sessionTimeoutMinutes} min` : '—';
  const logoUrl = corporationConfigData?.logoUrl ?? null;
  const altText = corporationName ? `${corporationName} logo` : 'Corporation logo';

  return (
    <Box
      role="tabpanel"
      id="configuration-tabpanel"
      aria-labelledby="configuration-tab"
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Box>
        <Typography
          component="h2"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '20px',
            fontWeight: 600,
            color: 'rgba(47, 65, 74, 1)',
            mb: 0.5,
          }}
        >
          Configuration
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(73, 130, 145, 1)',
          }}
        >
          General settings for security, branding, reports & license.
        </Typography>
      </Box>

      <FormCard title="Default Security Posture">
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <ConfigDisplayRow
            label="Password Policy"
            value={passwordPolicy}
            valueFontWeight={600}
          />
          <ConfigDisplayRow
            label="2FA Requirement"
            value={tfaRequirement}
            valueFontWeight={600}
          />
          <ConfigDisplayRow
            label="Session Timeout (In Minutes)"
            value={sessionTimeoutMinutes}
            valueFontWeight={600}
          />
        </Box>
      </FormCard>

      <FormCard title="Branding Logo">
        <ViewLogoPreview logoUrl={logoUrl} altText={altText} />
      </FormCard>
    </Box>
  );
}
