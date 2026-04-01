import { Box } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { ConfigDisplayRow } from '../company-profile-config/ConfigDisplayRow';
import { TextInput } from '../company-creation/TextInput';
import { CustomSelect } from '../company-creation/CustomSelect';
import { mockStates } from '../../data/mockStates';
import { mockCities } from '../../data/mockCities';
import { mockCountries } from '../../data/mockCountries';

function getLabel(options, value) {
  const opt = options.find((o) => o.value === value);
  return opt?.label ?? value ?? '—';
}

export function CompanyAddressCard({ mode = 'view', data = {}, onFieldChange, validationErrors = {} }) {
  const {
    addressLine = '',
    stateProvince = '',
    city = '',
    country = '',
    zipPostalCode = '',
  } = data;

  if (mode === 'view') {
    return (
      <FormCard title="Company Address" titleId="company-address-card" ariaLabel="Company Address">
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <ConfigDisplayRow label="Address Line" value={addressLine || '—'} />
          <ConfigDisplayRow label="State/ Province" value={getLabel(mockStates, stateProvince)} />
          <ConfigDisplayRow label="City" value={getLabel(mockCities, city)} />
          <ConfigDisplayRow label="Country" value={getLabel(mockCountries, country)} />
          <ConfigDisplayRow label="ZIP/ Postal Code" value={zipPostalCode || '—'} />
        </Box>
      </FormCard>
    );
  }

  return (
    <FormCard title="Company Address" titleId="company-address-card" ariaLabel="Company Address">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <TextInput
              label="Address Line"
              placeholder="e.g., 123 Maple Street"
              value={addressLine}
              onChange={(e) => onFieldChange?.('addressLine', e.target.value)}
              isRequired
              errorMessage={validationErrors.addressLine}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <CustomSelect
              label="State/ Province"
              placeholder="Select state/ province"
              options={mockStates}
              value={stateProvince}
              onChange={(v) => onFieldChange?.('stateProvince', v)}
              isRequired
              errorMessage={validationErrors.stateProvince}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <CustomSelect
              label="City"
              placeholder="Select city"
              options={mockCities}
              value={city}
              onChange={(v) => onFieldChange?.('city', v)}
              isRequired
              errorMessage={validationErrors.city}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <CustomSelect
              label="Country"
              placeholder="Select country"
              options={mockCountries}
              value={country}
              onChange={(v) => onFieldChange?.('country', v)}
              isRequired
              errorMessage={validationErrors.country}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <TextInput
              label="ZIP/ Postal Code"
              placeholder="e.g., 62704"
              value={zipPostalCode}
              onChange={(e) => onFieldChange?.('zipPostalCode', e.target.value)}
              inputMode="numeric"
              errorMessage={validationErrors.zipPostalCode}
            />
          </Box>
          <Box sx={{ flex: 1 }} />
        </Box>
      </Box>
    </FormCard>
  );
}
