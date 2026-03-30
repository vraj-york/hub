import { Box } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { ConfigDisplayRow } from '../company-profile-config/ConfigDisplayRow';
import { TextInput } from '../company-creation/TextInput';
import { CustomSelect } from '../company-creation/CustomSelect';
import { mockCompanyTypes } from '../../data/mockCompanyTypes';
import { mockOfficeTypes } from '../../data/mockOfficeTypes';
import { mockRegions } from '../../data/mockRegions';
import { mockIndustries } from '../../data/mockIndustries';
import { mockPrimaryLanguages } from '../../data/mockPrimaryLanguages';

function getLabel(options, value) {
  const opt = options.find((o) => o.value === value);
  return opt?.label ?? value ?? '—';
}

export function CompanyBasicInfoCard({ mode = 'view', data = {}, onFieldChange, validationErrors = {} }) {
  const {
    companyLegalName = '',
    dbaTradeName = '',
    websiteUrl = '',
    companyType = '',
    officeType = '',
    region = '',
    industry = '',
    companyPhoneNo = '',
    primaryLanguage = '',
  } = data;

  if (mode === 'view') {
    return (
      <FormCard title="Company Info." titleId="company-info-card" ariaLabel="Company Info">
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <ConfigDisplayRow label="Company Legal Name" value={companyLegalName || '—'} />
          <ConfigDisplayRow label="DBA/ Trade Name" value={dbaTradeName || '—'} />
          <ConfigDisplayRow label="Website URL" value={websiteUrl || '—'} />
          <ConfigDisplayRow label="Company Type" value={getLabel(mockCompanyTypes, companyType)} />
          <ConfigDisplayRow label="Office Type" value={getLabel(mockOfficeTypes, officeType)} />
          <ConfigDisplayRow label="Region (Data Residency)" value={getLabel(mockRegions, region)} />
          <ConfigDisplayRow label="Industry" value={getLabel(mockIndustries, industry)} />
          <ConfigDisplayRow label="Company Phone No." value={companyPhoneNo || '—'} />
          <ConfigDisplayRow label="Primary Language" value={getLabel(mockPrimaryLanguages, primaryLanguage)} />
        </Box>
      </FormCard>
    );
  }

  return (
    <FormCard title="Company Info." titleId="company-info-card" ariaLabel="Company Info">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <TextInput
              label="Company Legal Name"
              placeholder="e.g., Acme Inc."
              value={companyLegalName}
              onChange={(e) => onFieldChange?.('companyLegalName', e.target.value)}
              isRequired
              errorMessage={validationErrors.companyLegalName}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextInput
              label="DBA/ Trade Name"
              placeholder="e.g., Acme Co."
              value={dbaTradeName}
              onChange={(e) => onFieldChange?.('dbaTradeName', e.target.value)}
              isRequired
              errorMessage={validationErrors.dbaTradeName}
            />
          </Box>
        </Box>
        <TextInput
          label="Website URL"
          placeholder="e.g., www.acmecompany.com"
          value={websiteUrl}
          onChange={(e) => onFieldChange?.('websiteUrl', e.target.value)}
          isRequired
          errorMessage={validationErrors.websiteUrl}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <CustomSelect
              label="Company Type"
              placeholder="Select company type"
              options={mockCompanyTypes}
              value={companyType}
              onChange={(v) => onFieldChange?.('companyType', v)}
              isRequired
              errorMessage={validationErrors.companyType}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <CustomSelect
              label="Office Type"
              placeholder="Select office type"
              options={mockOfficeTypes}
              value={officeType}
              onChange={(v) => onFieldChange?.('officeType', v)}
              isRequired
              errorMessage={validationErrors.officeType}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <CustomSelect
              label="Region (Data Residency)"
              placeholder="Select region"
              options={mockRegions}
              value={region}
              onChange={(v) => onFieldChange?.('region', v)}
              isRequired
              errorMessage={validationErrors.region}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <CustomSelect
              label="Industry"
              placeholder="Select industry"
              options={mockIndustries}
              value={industry}
              onChange={(v) => onFieldChange?.('industry', v)}
              isRequired
              errorMessage={validationErrors.industry}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <TextInput
              label="Company Phone No."
              placeholder="e.g., +1 (555) 449-4567"
              value={companyPhoneNo}
              onChange={(e) => onFieldChange?.('companyPhoneNo', e.target.value)}
              isRequired
              inputMode="numeric"
              errorMessage={validationErrors.companyPhoneNo}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <CustomSelect
              label="Primary Language"
              placeholder="English (US)"
              options={mockPrimaryLanguages}
              value={primaryLanguage}
              onChange={(v) => onFieldChange?.('primaryLanguage', v)}
              errorMessage={validationErrors.primaryLanguage}
            />
          </Box>
        </Box>
      </Box>
    </FormCard>
  );
}
