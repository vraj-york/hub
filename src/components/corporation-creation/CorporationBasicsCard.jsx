import { Box } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { FormGroupLabel } from '../company-creation/FormGroupLabel';
import { TextInput } from '../company-creation/TextInput';
import { CustomSelect } from '../company-creation/CustomSelect';
import { mockRegions } from '../../data/mockRegions';
import { mockIndustries } from '../../data/mockIndustries';

export function CorporationBasicsCard({ formData, onFieldChange, errors = {} }) {
  return (
    <FormCard title="Corporation Basics">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextInput
          label="Corporation Legal Name"
          placeholder="e.g., Acme Corporation"
          value={formData.corporationLegalName ?? ''}
          onChange={(e) => onFieldChange('corporationLegalName', e.target.value)}
          isRequired
          errorMessage={errors.corporationLegalName}
          id="corporation-legal-name"
          aria-label="Corporation legal name"
        />
        <TextInput
          label="DBA Name"
          placeholder="e.g., Acme Inc."
          value={formData.dbaName ?? ''}
          onChange={(e) => onFieldChange('dbaName', e.target.value)}
          id="dba-name"
          aria-label="DBA name"
        />
        <TextInput
          label="Website URL"
          placeholder="e.g., https://www.acme.com"
          value={formData.websiteUrl ?? ''}
          onChange={(e) => onFieldChange('websiteUrl', e.target.value)}
          isRequired
          errorMessage={errors.websiteUrl}
          id="website-url"
          aria-label="Website URL"
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <CustomSelect
              label="Region (Data Residency)"
              placeholder="Select operating region"
              options={mockRegions}
              value={formData.regionDataResidency ?? ''}
              onChange={(v) => onFieldChange('regionDataResidency', v)}
              isRequired
              errorMessage={errors.regionDataResidency}
              id="region-data-residency"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <CustomSelect
              label="Industry"
              placeholder="Select industry"
              options={mockIndustries}
              value={formData.industry ?? ''}
              onChange={(v) => onFieldChange('industry', v)}
              isRequired
              errorMessage={errors.industry}
              id="industry"
            />
          </Box>
        </Box>
        <TextInput
          label="Corporate Phone No."
          placeholder="e.g., +1 555 123 4567"
          value={formData.corporatePhoneNo ?? ''}
          onChange={(e) => onFieldChange('corporatePhoneNo', e.target.value)}
          isRequired
          inputMode="numeric"
          errorMessage={errors.corporatePhoneNo}
          id="corporate-phone-no"
          aria-label="Corporate phone number"
        />
      </Box>
    </FormCard>
  );
}
