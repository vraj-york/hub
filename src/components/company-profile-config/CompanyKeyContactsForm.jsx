import { useCallback, useMemo } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { FormGroupLabel } from '../company-creation/FormGroupLabel';
import { CustomSelect } from '../company-creation/CustomSelect';
import { InfoAlertCard } from '../company-creation/InfoAlertCard';
import { FileUploadInput } from '../company-creation/FileUploadInput';
import { ActionButtonsGroup } from '../company-creation/ActionButtonsGroup';
import { mockRosters } from '../../data/mockRosters';

const CONTACT_FIELDS = [
  { key: 'primaryCompanyAdminId', label: 'Primary Company Admin', required: true },
  { key: 'secondaryCompanyAdminId', label: 'Secondary Company Admin', required: false },
  { key: 'executiveSponsorId', label: 'Executive Sponsor', required: true },
  { key: 'hrPeopleOpsContactId', label: 'HR/ People Ops Contact', required: true },
  { key: 'itSecurityContactId', label: 'IT/ Security Contact', required: true },
];

export function CompanyKeyContactsForm({
  formData,
  rosterFile,
  onFieldChange,
  onRosterFileChange,
  onSave,
  onCancel,
  isSaving = false,
}) {
  const primaryCompanyAdminId = formData?.primaryCompanyAdminId ?? '';
  const secondaryCompanyAdminId = formData?.secondaryCompanyAdminId ?? '';
  const executiveSponsorId = formData?.executiveSponsorId ?? '';
  const hrPeopleOpsContactId = formData?.hrPeopleOpsContactId ?? '';
  const itSecurityContactId = formData?.itSecurityContactId ?? '';

  const canSave = useMemo(() => {
    return Boolean(
      primaryCompanyAdminId &&
        executiveSponsorId &&
        hrPeopleOpsContactId &&
        itSecurityContactId &&
        !isSaving
    );
  }, [
    primaryCompanyAdminId,
    executiveSponsorId,
    hrPeopleOpsContactId,
    itSecurityContactId,
    isSaving,
  ]);

  const handleFieldChange = useCallback(
    (field, value) => {
      onFieldChange?.(field, value);
    },
    [onFieldChange]
  );

  const rosterFileDisplay = useMemo(() => {
    if (!rosterFile) return null;
    return rosterFile instanceof File
      ? { name: rosterFile.name, size: rosterFile.size }
      : { name: rosterFile?.name ?? 'rosters_final_file.csv', size: rosterFile?.size };
  }, [rosterFile]);

  return (
    <Box
      id="key-contacts-tabpanel"
      role="tabpanel"
      aria-labelledby="key-contacts-tab"
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Box>
        <Typography
          component="h2"
          id="key-contacts-section-title"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '20px',
            fontWeight: 600,
            color: 'rgba(47, 65, 74, 1)',
            mb: 0.5,
          }}
        >
          Key Contacts
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(73, 130, 145, 1)',
          }}
        >
          Setup the operating unit for the company.
        </Typography>
      </Box>

      <InfoAlertCard
        title="Roster Note"
        description="Upload the rosters via CSV or XLS files & later on select them for specific roles."
      />

      <FormCard title="Rosters">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FileUploadInput
            label="Upload Roster"
            instructionText="Click to upload or drag-&-drop file"
            supportedFormatsText="Supported file formats are CSV & XLS up to 20MB"
            allowedFormats="CSV, XLS"
            maxSize="20MB"
            accept=".csv,.xlsx,.xls"
            maxFileSizeMB={20}
            onFileChange={onRosterFileChange}
            currentFile={rosterFileDisplay}
            isRequired
            ariaLabel="Upload company roster file"
          />
          <Divider sx={{ borderColor: 'rgba(221, 217, 235, 1)', my: 1 }} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                id="key-contact-primaryCompanyAdminId"
                label="Primary Company Admin"
                placeholder="Select roster"
                options={mockRosters}
                value={primaryCompanyAdminId}
                onChange={(v) => handleFieldChange('primaryCompanyAdminId', v)}
                isRequired
                selectedValueTextColor="rgba(47, 65, 74, 1)"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                id="key-contact-secondaryCompanyAdminId"
                label="Secondary Company Admin"
                placeholder="Select roster"
                options={mockRosters}
                value={secondaryCompanyAdminId}
                onChange={(v) => handleFieldChange('secondaryCompanyAdminId', v)}
                selectedValueTextColor="rgba(47, 65, 74, 1)"
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                id="key-contact-executiveSponsorId"
                label="Executive Sponsor"
                placeholder="Select roster"
                options={mockRosters}
                value={executiveSponsorId}
                onChange={(v) => handleFieldChange('executiveSponsorId', v)}
                isRequired
                selectedValueTextColor="rgba(47, 65, 74, 1)"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                id="key-contact-hrPeopleOpsContactId"
                label="HR/ People Ops Contact"
                placeholder="Select roster"
                options={mockRosters}
                value={hrPeopleOpsContactId}
                onChange={(v) => handleFieldChange('hrPeopleOpsContactId', v)}
                isRequired
                selectedValueTextColor="rgba(47, 65, 74, 1)"
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                id="key-contact-itSecurityContactId"
                label="IT/ Security Contact"
                placeholder="Select roster"
                options={mockRosters}
                value={itSecurityContactId}
                onChange={(v) => handleFieldChange('itSecurityContactId', v)}
                isRequired
                selectedValueTextColor="rgba(47, 65, 74, 1)"
              />
            </Box>
            <Box sx={{ flex: 1 }} />
          </Box>
        </Box>
      </FormCard>

      <ActionButtonsGroup
        onCancel={onCancel}
        onNext={onSave}
        nextLabel="Save & Update"
        cancelLabel="Cancel"
        isNextDisabled={!canSave}
        isNextLoading={isSaving}
      />
    </Box>
  );
}
