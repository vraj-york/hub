import { Box } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { ConfigDisplayRow } from './ConfigDisplayRow';
import { mockCompanyTypes } from '../../data/mockCompanyTypes';
import { mockOfficeTypes } from '../../data/mockOfficeTypes';
import { mockRegions } from '../../data/mockRegions';
import { mockIndustries } from '../../data/mockIndustries';
import { mockPrimaryLanguages } from '../../data/mockPrimaryLanguages';
import { mockOwnershipTypes } from '../../data/mockOwnershipTypes';

function getLabel(options, value) {
  if (value == null || value === '') return '—';
  const opt = options.find((o) => o.value === value);
  return opt?.label ?? value ?? '—';
}

export function CompanyBasicInfoView({ basicInfoData = {} }) {
  const {
    companyLegalName = '',
    dbaTradeName = '',
    websiteUrl = '',
    companyType = '',
    officeType = '',
    regionDataResidency = '',
    region = '',
    industry = '',
    primaryLanguage = '',
    companyPhoneNo = '',
    companyAddress = '',
    parentCorporationLegalName = '',
    parentName = '',
    ownershipType = '',
  } = basicInfoData;

  const regionVal = regionDataResidency || region;
  const parentNameDisplay = parentCorporationLegalName || parentName;

  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Box sx={{ flex: 1 }}>
        <FormCard
          title="Company Basics"
          titleId="company-basics-card"
          ariaLabel="Company Basics"
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <ConfigDisplayRow label="Company Legal Name" value={companyLegalName || '—'} />
            <ConfigDisplayRow label="DBA/ Trade Name" value={dbaTradeName || '—'} />
            <ConfigDisplayRow label="Website URL" value={websiteUrl || '—'} />
            <ConfigDisplayRow label="Company Type" value={getLabel(mockCompanyTypes, companyType)} />
            <ConfigDisplayRow label="Office Type" value={getLabel(mockOfficeTypes, officeType)} />
            <ConfigDisplayRow
              label="Region (Data Residency)"
              value={getLabel(mockRegions, regionVal)}
            />
            <ConfigDisplayRow label="Industry" value={getLabel(mockIndustries, industry)} />
            <ConfigDisplayRow
              label="Primary Language"
              value={getLabel(mockPrimaryLanguages, primaryLanguage)}
            />
            <ConfigDisplayRow label="Company Phone No." value={companyPhoneNo || '—'} />
            <ConfigDisplayRow label="Company Address" value={companyAddress || '—'} />
          </Box>
        </FormCard>
      </Box>

      <Box sx={{ flex: 1 }}>
        <FormCard
          title="Parent Corporation Info."
          titleId="parent-corporation-info-card"
          ariaLabel="Parent Corporation Info."
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <ConfigDisplayRow
              label="Parent Corporation Legal Name"
              value={parentNameDisplay || '—'}
            />
            <ConfigDisplayRow
              label="Ownership Type"
              value={getLabel(mockOwnershipTypes, ownershipType)}
            />
          </Box>
        </FormCard>
      </Box>
    </Box>
  );
}
