import { Box } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { ConfigDisplayRow } from './ConfigDisplayRow';
import { mockRosters } from '../../data/mockRosters';

const CONTACT_FIELDS = [
  { key: 'primaryCompanyAdminId', label: 'Primary Company Admin' },
  { key: 'secondaryCompanyAdminId', label: 'Secondary Company Admin' },
  { key: 'executiveSponsorId', label: 'Executive Sponsor' },
  { key: 'hrPeopleOpsContactId', label: 'HR/ People Ops Contact' },
  { key: 'itSecurityContactId', label: 'IT/ Security Contact' },
];

function getRosterLabel(rosterId) {
  if (!rosterId) return '—';
  const r = mockRosters.find((o) => o.value === rosterId);
  return r?.label ?? rosterId;
}

const DEFAULT_CARD_TITLE = 'Roster Details';

export function CompanyKeyContactsView({ formData, cardTitle = DEFAULT_CARD_TITLE }) {
  const data = formData ?? {};
  const title = cardTitle ?? DEFAULT_CARD_TITLE;

  return (
    <Box
      id="key-contacts-tabpanel"
      role="tabpanel"
      aria-labelledby="key-contacts-tab"
    >
      <FormCard title={title} titleId="rooster-details-card-title" ariaLabel={title}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {CONTACT_FIELDS.map(({ key, label }) => (
            <ConfigDisplayRow
              key={key}
              label={label}
              value={getRosterLabel(data[key])}
              labelColor="rgba(56, 89, 102, 1)"
              valueColor="rgba(47, 65, 74, 1)"
              labelFontWeight={400}
              valueFontWeight={500}
            />
          ))}
        </Box>
      </FormCard>
    </Box>
  );
}
