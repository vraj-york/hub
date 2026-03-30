import { Box, Typography } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { ConfigDisplayRow } from '../company-profile-config/ConfigDisplayRow';

function formatAddress(address) {
  if (!address || typeof address !== 'object') return '—';
  const parts = [
    address.street,
    address.city,
    address.state,
    address.zip,
    address.country,
  ].filter(Boolean);
  return parts.length ? parts.join(', ') : '—';
}

function formatCreatedOn(isoString) {
  if (!isoString) return '—';
  try {
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return isoString;
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  } catch {
    return isoString;
  }
}

export function CorporationBasicInfoView({ corporationProfile, isLoading }) {
  if (isLoading || !corporationProfile) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography sx={{ color: 'rgba(56, 89, 102, 1)' }}>Loading...</Typography>
      </Box>
    );
  }

  const {
    legalName = '',
    dbaName = '',
    corporatePhoneNo = '',
    regionDataResidency = '',
    industry = '',
    websiteUrl = '',
    address,
    timeZone = '',
    createdOn = '',
    executiveSponsor = {},
    keyContacts = {},
  } = corporationProfile;

  const sponsor = executiveSponsor || {};
  const contacts = keyContacts || {};
  const addressStr = formatAddress(address);
  const createdOnStr = formatCreatedOn(createdOn);

  return (
    <Box
      component="section"
      role="tabpanel"
      id="basic-info-tabpanel"
      aria-labelledby="basic-info-tab"
      sx={{ background: 'rgba(248, 247, 251, 1)', minHeight: 200 }}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, p: 0 }}>
        <FormCard
          title="Corporation Basics"
          titleId="corporation-basics-card"
          ariaLabel="Corporation Basics"
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <ConfigDisplayRow label="Corporation Legal Name" value={legalName || '—'} />
            <ConfigDisplayRow label="DBA Name" value={dbaName || '—'} />
            <ConfigDisplayRow label="Corporate Phone No." value={corporatePhoneNo || '—'} />
            <ConfigDisplayRow
              label="Region (Data Residency)"
              value={regionDataResidency || '—'}
            />
            <ConfigDisplayRow label="Industry" value={industry || '—'} />
            <ConfigDisplayRow label="Website URL" value={websiteUrl || '—'} />
            <ConfigDisplayRow label="Address" value={addressStr} />
            <ConfigDisplayRow label="Time Zone" value={timeZone || '—'} />
            <ConfigDisplayRow label="Created On" value={createdOnStr} />
          </Box>
        </FormCard>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormCard
            title="Executive Sponsor"
            titleId="executive-sponsor-card"
            ariaLabel="Executive Sponsor"
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <ConfigDisplayRow label="Name" value={sponsor.name || '—'} />
              <ConfigDisplayRow label="Role" value={sponsor.role || '—'} />
              <ConfigDisplayRow label="Email" value={sponsor.email || '—'} />
              <ConfigDisplayRow label="Work Phone No." value={sponsor.workPhoneNo || '—'} />
              <ConfigDisplayRow label="Cell Phone No." value={sponsor.cellPhoneNo ?? '—'} />
            </Box>
          </FormCard>

          <FormCard
            title="Key Contacts"
            titleId="key-contacts-card"
            ariaLabel="Key Contacts"
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <ConfigDisplayRow
                label="Primary Corporate Admin"
                value={
                  contacts.primaryCorporateAdmin && typeof contacts.primaryCorporateAdmin === 'object'
                    ? contacts.primaryCorporateAdmin.name
                    : (contacts.primaryCorporateAdmin || '—')
                }
              />
              <ConfigDisplayRow
                label="Billing/ Finance Contact"
                value={contacts.billingFinanceContact || '—'}
              />
              <ConfigDisplayRow
                label="Legal/ Compliance Contact"
                value={contacts.legalComplianceContact || '—'}
              />
            </Box>
          </FormCard>
        </Box>
      </Box>
    </Box>
  );
}
