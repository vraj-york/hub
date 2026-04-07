import { useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { FormGroupLabel } from '../company-creation/FormGroupLabel';
import { CustomSelect } from '../company-creation/CustomSelect';
import { TextInput } from '../company-creation/TextInput';
import { InfoAlertCard } from '../company-creation/InfoAlertCard';
import { FileUploadInput } from '../company-creation/FileUploadInput';
import { RichCheckboxGroup } from '../company-creation/RichCheckboxGroup';
import { TrialPeriodSwitchGroup } from '../company-creation/TrialPeriodSwitchGroup';
import { ActionButtonsGroup } from '../company-creation/ActionButtonsGroup';
import { CompanyLogoPreview } from './CompanyLogoPreview';
import { mockAuthMethods } from '../../data/mockAuthMethods';
import { mockPasswordPolicies } from '../../data/mockPasswordPolicies';
import { mockTFARequirements } from '../../data/mockTFARequirements';
import { mockDashboardOptions } from '../../data/mockDashboardOptions';

const SECONDARY_TEXT_COLOR_CONFIG = 'rgba(56, 89, 102, 1)';

export function CompanyConfigForm({
  config,
  companyName,
  onSave,
  onCancel,
  isSaving = false,
  onFieldChange,
  onLogoFileChange,
  logoPreviewUrl,
}) {
  const c = config || {};
  const [logoUploadError, setLogoUploadError] = useState('');

  const handleLogoFileChange = useCallback(
    (file) => {
      if (!file) {
        onLogoFileChange?.(null);
        setLogoUploadError('');
        return;
      }
      setLogoUploadError('');
      const allowed = /\.(svg|png|jpg|jpeg)$/i.test(file.name);
      const maxBytes = 10 * 1024 * 1024;
      if (!allowed) {
        setLogoUploadError('Invalid file type. Use SVG, PNG or JPG.');
        return;
      }
      if (file.size > maxBytes) {
        setLogoUploadError('File too large. Max 10MB.');
        return;
      }
      onLogoFileChange?.(file);
    },
    [onLogoFileChange]
  );

  const logoFile = c.logoFile ? { name: c.logoFile.name } : null;
  const displayLogoUrl = logoPreviewUrl ?? c.logoUrl ?? null;

  const hasChanges = false; // Could be derived from comparing to initial config if needed
  const canSave = true; // Validation - for now allow save when form is valid

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
          Configuration
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(73, 130, 145, 1)',
          }}
        >
          General settings for security, branding, reports & license.
        </Typography>
      </Box>

      <FormCard title="Security Settings">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Authentication Method"
                placeholder="Email & Password"
                options={mockAuthMethods}
                value={c.authenticationMethod ?? ''}
                onChange={(v) => onFieldChange?.('authenticationMethod', v)}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Password Policy"
                placeholder="Standard (8+ Characters & Mixed case)"
                options={mockPasswordPolicies}
                value={c.passwordPolicy ?? ''}
                onChange={(v) => onFieldChange?.('passwordPolicy', v)}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <TextInput
                label="Session Timeout (In minutes)"
                value={String(c.sessionTimeout ?? 60)}
                onChange={(e) => onFieldChange?.('sessionTimeout', parseInt(e.target.value, 10) || 60)}
                type="number"
                placeholder="60 min"
                inputBackground="rgba(248, 247, 251, 1)"
                aria-label="Session timeout in minutes"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="2FA Requirement (Inherited)"
                placeholder="Off"
                options={mockTFARequirements}
                value={c.tfaRequirement ?? 'off'}
                onChange={(v) => onFieldChange?.('tfaRequirement', v)}
              />
            </Box>
          </Box>
        </Box>
      </FormCard>

      <FormCard title="Branding & Experience">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <InfoAlertCard
            title="Branding Note"
            description="Display settings remain consistent with BSP Branding & overall experience."
          />
          <FileUploadInput
            label="Upload Logo"
            instructionText="Click to upload or drag-&-drop file"
            supportedFormatsText="Supported file formats are SVG, PNG & JPG up to 10MB"
            allowedFormats="SVG, PNG, JPG"
            maxSize="10MB"
            accept=".svg,.png,.jpg,.jpeg"
            maxFileSizeMB={10}
            onFileChange={handleLogoFileChange}
            currentFile={logoFile}
            errorMessage={logoUploadError}
            isRequired={false}
            ariaLabel="Upload company logo file"
          />
          <Box>
            <FormGroupLabel label="Logo Preview" />
            <CompanyLogoPreview logoUrl={displayLogoUrl} companyName={companyName} />
          </Box>
        </Box>
      </FormCard>

      <FormCard title="Reporting Preferences">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <RichCheckboxGroup
            label="Default Dashboard"
            options={mockDashboardOptions}
            selectedValue={c.defaultDashboard ?? 'Standard'}
            onChange={(v) => onFieldChange?.('defaultDashboard', v)}
            aria-label="Default dashboard option"
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <TrialPeriodSwitchGroup
                label="Data Export Permission"
                secondaryText="Default: Off"
                secondaryTextColor={SECONDARY_TEXT_COLOR_CONFIG}
                checked={Boolean(c.dataExportPermission)}
                onChange={(e) => onFieldChange?.('dataExportPermission', e.target.checked)}
                aria-label="Data export permission"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TrialPeriodSwitchGroup
                label="User Data Anonymization"
                secondaryText="Default: Off"
                secondaryTextColor={SECONDARY_TEXT_COLOR_CONFIG}
                checked={Boolean(c.userDataAnonymization)}
                onChange={(e) => onFieldChange?.('userDataAnonymization', e.target.checked)}
                aria-label="User data anonymization"
              />
            </Box>
          </Box>
        </Box>
      </FormCard>

      <ActionButtonsGroup
        onCancel={onCancel}
        onNext={onSave}
        nextLabel="Save & Update"
        cancelLabel="Cancel"
        isNextDisabled={!canSave || isSaving}
        isNextLoading={isSaving}
      />
    </Box>
  );
}
