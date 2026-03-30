import { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { FormGroupLabel } from '../company-creation/FormGroupLabel';
import { CustomSelect } from '../company-creation/CustomSelect';
import { TextInput } from '../company-creation/TextInput';
import { ActionButtonsGroup } from '../company-creation/ActionButtonsGroup';
import { mockPasswordPolicies } from '../../data/mockPasswordPolicies';
import { mockTFARequirements } from '../../data/mockTFARequirements';

const PASSWORD_POLICY_LABEL_ID = 'password-policy-label';
const TFA_REQUIREMENT_LABEL_ID = '2fa-requirement-label';
const SESSION_TIMEOUT_LABEL_ID = 'session-timeout-label';
const PASSWORD_POLICY_SELECT_ID = 'password-policy-select';
const TFA_REQUIREMENT_SELECT_ID = '2fa-requirement-select';
const SESSION_TIMEOUT_INPUT_ID = 'session-timeout-input';
const DEFAULT_SECURITY_POSTURE_TITLE_ID = 'default-security-posture-card-title';

function getDefaultFormData(initialData) {
  return {
    passwordPolicy: initialData?.passwordPolicy ?? '',
    tfaRequirement: initialData?.tfaRequirement ?? '',
    sessionTimeout:
      initialData?.sessionTimeout != null ? String(initialData.sessionTimeout) : '',
  };
}

function validateForm(formData) {
  const errors = {};
  if (!formData.passwordPolicy?.trim()) {
    errors.passwordPolicy = 'Password Policy is required';
  }
  if (!formData.tfaRequirement?.trim()) {
    errors.tfaRequirement = '2FA Requirement is required';
  }
  const sessionNum = parseInt(formData.sessionTimeout, 10);
  if (formData.sessionTimeout !== '' && (Number.isNaN(sessionNum) || sessionNum < 1 || sessionNum > 9999)) {
    errors.sessionTimeout = 'Session timeout must be between 1 and 9999';
  }
  return errors;
}

export function CorporationSecurityConfigForm({
  initialData,
  onSave,
  onCancel,
  isSaving,
  saveError,
}) {
  const [formData, setFormData] = useState(() => getDefaultFormData(initialData));
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setFormData(getDefaultFormData(initialData));
    setValidationErrors({});
  }, [initialData]);

  const errors = Object.keys(validationErrors).length ? validationErrors : validateForm(formData);
  const isFormValid =
    Boolean(formData.passwordPolicy?.trim()) &&
    Boolean(formData.tfaRequirement?.trim()) &&
    (formData.sessionTimeout === '' ||
      (parseInt(formData.sessionTimeout, 10) >= 1 && parseInt(formData.sessionTimeout, 10) <= 9999));

  const handleFieldChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    const nextErrors = validateForm(formData);
    setValidationErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const sessionTimeout =
      formData.sessionTimeout === ''
        ? 60
        : parseInt(formData.sessionTimeout, 10);
    onSave?.({
      passwordPolicy: formData.passwordPolicy,
      tfaRequirement: formData.tfaRequirement,
      sessionTimeout: Number.isNaN(sessionTimeout) ? 60 : sessionTimeout,
    });
  }, [formData, onSave]);

  return (
    <Box
      component="form"
      role="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Box>
        <Typography
          component="h2"
          id="configuration-section-heading"
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
          Edit security posture & related settings
        </Typography>
      </Box>

      <FormCard
        title="Default Security Posture"
        titleId={DEFAULT_SECURITY_POSTURE_TITLE_ID}
        role="region"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <FormGroupLabel
              id={PASSWORD_POLICY_LABEL_ID}
              label="Password Policy"
              isRequired
              htmlFor={PASSWORD_POLICY_SELECT_ID}
            />
            <CustomSelect
              id={PASSWORD_POLICY_SELECT_ID}
              aria-labelledby={PASSWORD_POLICY_LABEL_ID}
              aria-required="true"
              aria-invalid={Boolean(errors.passwordPolicy)}
              aria-describedby={errors.passwordPolicy ? `${PASSWORD_POLICY_SELECT_ID}-error` : undefined}
              label={null}
              placeholder="Select a policy"
              options={mockPasswordPolicies}
              value={formData.passwordPolicy}
              onChange={(value) => handleFieldChange('passwordPolicy', value)}
              errorMessage={errors.passwordPolicy}
              isRequired
              inputBackground="rgba(255, 255, 255, 1)"
              selectedValueTextColor="rgba(47, 65, 74, 1)"
            />
          </Box>
          <Box>
            <FormGroupLabel
              id={TFA_REQUIREMENT_LABEL_ID}
              label="2FA Requirement"
              isRequired
              htmlFor={TFA_REQUIREMENT_SELECT_ID}
            />
            <CustomSelect
              id={TFA_REQUIREMENT_SELECT_ID}
              aria-labelledby={TFA_REQUIREMENT_LABEL_ID}
              aria-required="true"
              aria-invalid={Boolean(errors.tfaRequirement)}
              aria-describedby={errors.tfaRequirement ? `${TFA_REQUIREMENT_SELECT_ID}-error` : undefined}
              label={null}
              placeholder="Select a requirement"
              options={mockTFARequirements}
              value={formData.tfaRequirement}
              onChange={(value) => handleFieldChange('tfaRequirement', value)}
              errorMessage={errors.tfaRequirement}
              isRequired
              inputBackground="rgba(255, 255, 255, 1)"
              selectedValueTextColor="rgba(47, 65, 74, 1)"
            />
          </Box>
          <Box>
            <FormGroupLabel
              id={SESSION_TIMEOUT_LABEL_ID}
              label="Session Timeout (In Minutes)"
              htmlFor={SESSION_TIMEOUT_INPUT_ID}
            />
            <TextInput
              id={SESSION_TIMEOUT_INPUT_ID}
              aria-labelledby={SESSION_TIMEOUT_LABEL_ID}
              aria-invalid={Boolean(errors.sessionTimeout)}
              aria-describedby={errors.sessionTimeout ? `${SESSION_TIMEOUT_INPUT_ID}-error` : undefined}
              inputMode="numeric"
              value={formData.sessionTimeout}
              onChange={(e) => handleFieldChange('sessionTimeout', e.target.value)}
              placeholder="e.g. 60"
              errorMessage={errors.sessionTimeout}
              inputBackground="rgba(248, 247, 251, 1)"
              valueTextColor="rgba(73, 130, 145, 1)"
            />
          </Box>
        </Box>
      </FormCard>

      {saveError && (
        <Typography
          role="alert"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'var(--color-error)',
          }}
        >
          {saveError}
        </Typography>
      )}

      <ActionButtonsGroup
        onCancel={onCancel}
        cancelLabel="Cancel"
        cancelAriaLabel="Cancel corporation security configuration changes"
        onNext={handleSubmit}
        nextLabel={isSaving ? 'Saving Configuration...' : 'Save & Update'}
        nextAriaLabel={isSaving ? 'Saving configuration' : 'Save and update corporation security configuration'}
        isNextDisabled={!isFormValid || isSaving}
        isNextLoading={isSaving}
        loadingLabel="Saving Configuration..."
        isPreviousDisabled
        previousLabel="Previous"
        onPrevious={undefined}
      />
    </Box>
  );
}
