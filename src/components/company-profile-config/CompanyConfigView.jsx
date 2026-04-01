import { Box } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { ConfigDisplayRow } from './ConfigDisplayRow';
import { ViewLogoPreview } from './ViewLogoPreview';
import { mockAuthMethods } from '../../data/mockAuthMethods';
import { mockPasswordPolicies } from '../../data/mockPasswordPolicies';
import { mockTFARequirements } from '../../data/mockTFARequirements';
import { mockDashboardOptions } from '../../data/mockDashboardOptions';

function getLabel(options, value) {
  const opt = options.find((o) => o.value === value);
  return opt?.label ?? value ?? '—';
}

export function CompanyConfigView({ configurationData, companyName }) {
  const c = configurationData || {};
  const authLabel = getLabel(mockAuthMethods, c.authenticationMethod);
  const passwordLabel = getLabel(mockPasswordPolicies, c.passwordPolicy);
  const tfaLabel = getLabel(mockTFARequirements, c.tfaRequirement);
  const dashboardLabel = c.defaultDashboard ?? getLabel(mockDashboardOptions, c.defaultDashboard) ?? '—';
  const sessionDisplay = c.sessionTimeout != null ? `${c.sessionTimeout} min` : '—';
  const dataExportDisplay = c.dataExportPermission ? 'On' : 'Off';
  const anonymizationDisplay = c.userDataAnonymization ? 'On' : 'Off';
  const logoUrl = c.logoUrl ?? null;
  const altText = companyName ? `${companyName} logo` : 'Company logo';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <FormCard title="Security Settings">
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <ConfigDisplayRow label="Authentication Method" value={authLabel} />
              <ConfigDisplayRow label="Password Policy" value={passwordLabel} />
              <ConfigDisplayRow label="Session Timeout (In minutes)" value={sessionDisplay} />
              <ConfigDisplayRow label="2FA Requirement (Inherited)" value={tfaLabel} />
            </Box>
          </FormCard>
        </Box>

        <Box sx={{ flex: 1 }}>
          <FormCard title="Branding & Experience">
            <ViewLogoPreview logoUrl={logoUrl} altText={altText} />
          </FormCard>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <FormCard title="Reporting Preferences">
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <ConfigDisplayRow label="Default Dashboard" value={dashboardLabel} />
              <ConfigDisplayRow label="Data Export Permission" value={dataExportDisplay} />
              <ConfigDisplayRow label="User Data Anonymization" value={anonymizationDisplay} />
            </Box>
          </FormCard>
        </Box>
        <Box sx={{ flex: 1 }} />
      </Box>
    </Box>
  );
}
