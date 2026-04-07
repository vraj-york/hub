import { Box, Typography } from '@mui/material';
import { ParentCorporationCard } from '../company-profile/ParentCorporationCard';
import { CompanyBasicInfoCard } from '../company-profile/CompanyBasicInfoCard';
import { CompanyAddressCard } from '../company-profile/CompanyAddressCard';
import { ActionButtonsGroup } from '../company-creation/ActionButtonsGroup';

export function CompanyBasicInfoForm({
  formData = {},
  validationErrors = {},
  onFieldChange,
  onSave,
  onCancel,
  isSaving = false,
  isFormValid = true,
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
          Basic Info.
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(73, 130, 145, 1)',
          }}
        >
          Enter the core details for the new company.
        </Typography>
      </Box>
      <ParentCorporationCard
        mode="edit"
        data={formData}
        onFieldChange={onFieldChange}
        validationErrors={validationErrors}
      />
      <CompanyBasicInfoCard
        mode="edit"
        data={formData}
        onFieldChange={onFieldChange}
        validationErrors={validationErrors}
      />
      <CompanyAddressCard
        mode="edit"
        data={formData}
        onFieldChange={onFieldChange}
        validationErrors={validationErrors}
      />
      <ActionButtonsGroup
        onCancel={onCancel}
        onNext={onSave}
        nextLabel="Save & Update"
        isNextDisabled={!isFormValid || isSaving}
        isNextLoading={isSaving}
        loadingLabel="Saving..."
      />
    </Box>
  );
}
