import { Box } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { FormGroupLabel } from '../company-creation/FormGroupLabel';
import { TextInput } from '../company-creation/TextInput';
import { CustomSelect } from '../company-creation/CustomSelect';
import { mockCompanyTypes } from '../../data/mockCompanyTypes';
import { mockOfficeTypes } from '../../data/mockOfficeTypes';
import { mockRegions } from '../../data/mockRegions';
import { mockIndustries } from '../../data/mockIndustries';
import { mockStates } from '../../data/mockStates';
import { mockCities } from '../../data/mockCities';

export function QuickCompanyInfoStep({ formData, onFieldChange, errors = {} }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <FormCard title="Company Details" titleId="company-details-card-title" ariaLabel="Company Details" role="group">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} role="group" aria-labelledby="company-details-card-title">
          <TextInput
            label="Company Legal Name"
            placeholder="e.g., Acme India Pvt Ltd"
            value={formData.companyLegalName ?? ''}
            onChange={(e) => onFieldChange('companyLegalName', e.target.value)}
            isRequired
            errorMessage={errors.companyLegalName}
            id="quick-company-legal-name"
            aria-label="Company legal name"
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Company Type"
                placeholder="Operating Company"
                options={mockCompanyTypes}
                value={formData.companyType ?? ''}
                onChange={(v) => onFieldChange('companyType', v)}
                isRequired
                errorMessage={errors.companyType}
                id="quick-company-type"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Office Type"
                placeholder="Regional"
                options={mockOfficeTypes}
                value={formData.officeType ?? ''}
                onChange={(v) => onFieldChange('officeType', v)}
                isRequired
                errorMessage={errors.officeType}
                id="quick-office-type"
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Region (Data Residency)"
                placeholder="North America"
                options={mockRegions}
                value={formData.region ?? ''}
                onChange={(v) => onFieldChange('region', v)}
                id="quick-company-region"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Industry"
                placeholder="Technology/ SaaS"
                options={mockIndustries}
                value={formData.industry ?? ''}
                onChange={(v) => onFieldChange('industry', v)}
                id="quick-company-industry"
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="State/ Province"
                placeholder="CA"
                options={mockStates}
                value={formData.stateProvince ?? ''}
                onChange={(v) => onFieldChange('stateProvince', v)}
                isRequired
                errorMessage={errors.stateProvince}
                id="quick-company-state"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="City"
                placeholder="San Francisco"
                options={mockCities}
                value={formData.city ?? ''}
                onChange={(v) => onFieldChange('city', v)}
                isRequired
                errorMessage={errors.city}
                id="quick-company-city"
              />
            </Box>
          </Box>
          <TextInput
            label="ZIP/ Postal Code"
            placeholder="100202"
            value={formData.zipPostalCode ?? ''}
            onChange={(e) => onFieldChange('zipPostalCode', e.target.value)}
            isRequired
            inputMode="numeric"
            errorMessage={errors.zipPostalCode}
            id="quick-company-zip"
            aria-label="ZIP or postal code"
          />
        </Box>
      </FormCard>
      <FormCard title="Access Setup" titleId="access-setup-card-title" ariaLabel="Access Setup" role="group">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} role="group" aria-labelledby="access-setup-card-title">
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <TextInput
                label="Admin Name"
                placeholder="e.g., Martin Morgan"
                value={formData.adminName ?? ''}
                onChange={(e) => onFieldChange('adminName', e.target.value)}
                isRequired
                errorMessage={errors.adminName}
                id="quick-admin-name"
                aria-label="Admin name"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextInput
                label="Company Admin Email"
                placeholder="e.g., admin@acmcare.com"
                value={formData.companyAdminEmail ?? ''}
                onChange={(e) => onFieldChange('companyAdminEmail', e.target.value)}
                isRequired
                inputMode="email"
                errorMessage={errors.companyAdminEmail}
                id="quick-admin-email"
                aria-label="Company admin email"
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <TextInput
                label="No. of Employees"
                placeholder="e.g., 25, 50, etc."
                value={formData.numberOfEmployees ?? ''}
                onChange={(e) => onFieldChange('numberOfEmployees', e.target.value)}
                isRequired
                inputMode="numeric"
                errorMessage={errors.numberOfEmployees}
                id="quick-number-employees"
                aria-label="Number of employees"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextInput
                label="Security Posture"
                placeholder="Standard"
                value={formData.securityPosture ?? 'Standard'}
                readOnly
                id="quick-security-posture"
                aria-label="Security posture"
                aria-readonly="true"
              />
            </Box>
          </Box>
        </Box>
      </FormCard>
    </Box>
  );
}
