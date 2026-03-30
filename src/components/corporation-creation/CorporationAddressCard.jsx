import { Box } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { TextInput } from '../company-creation/TextInput';
import { CustomSelect } from '../company-creation/CustomSelect';
import { mockStates } from '../../data/mockStates';
import { mockCities } from '../../data/mockCities';
import { mockCorporationCountries } from '../../data/mockCorporationCountries';
import { mockTimeZones } from '../../data/mockTimeZones';

export function CorporationAddressCard({ formData, onFieldChange, errors = {} }) {
  return (
    <FormCard title="Corporation Address">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextInput
          label="Address Line"
          placeholder="Address line"
          value={formData.addressLine ?? ''}
          onChange={(e) => onFieldChange('addressLine', e.target.value)}
          isRequired
          errorMessage={errors.addressLine}
          id="address-line"
          aria-label="Address line"
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <CustomSelect
              label="State/ Province"
              placeholder="Select state/ province"
              options={mockStates}
              value={formData.stateProvince ?? ''}
              onChange={(v) => onFieldChange('stateProvince', v)}
              isRequired
              errorMessage={errors.stateProvince}
              id="state-province"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <CustomSelect
              label="City"
              placeholder="Select city"
              options={mockCities}
              value={formData.city ?? ''}
              onChange={(v) => onFieldChange('city', v)}
              isRequired
              errorMessage={errors.city}
              id="city"
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <CustomSelect
              label="Country"
              placeholder="Select country"
              options={mockCorporationCountries}
              value={formData.country ?? ''}
              onChange={(v) => onFieldChange('country', v)}
              isRequired
              errorMessage={errors.country}
              id="country"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextInput
              label="ZIP/ Postal Code"
              placeholder="Enter zip/ postal code"
              value={formData.zipPostalCode ?? ''}
              onChange={(e) => onFieldChange('zipPostalCode', e.target.value)}
              inputMode="numeric"
              id="zip-postal-code"
              aria-label="ZIP or postal code"
            />
          </Box>
        </Box>
        <CustomSelect
          label="Time Zone"
          placeholder="EST (Eastern Time)"
          options={mockTimeZones}
          value={formData.timeZone ?? ''}
          onChange={(v) => onFieldChange('timeZone', v)}
          isRequired
          errorMessage={errors.timeZone}
          id="time-zone"
          selectedValueTextColor="rgba(47, 65, 74, 1)"
        />
      </Box>
    </FormCard>
  );
}
