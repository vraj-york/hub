import { useCallback, useMemo } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { FormGroupLabel } from '../company-creation/FormGroupLabel';
import { TextInput } from '../company-creation/TextInput';
import { CustomSelect } from '../company-creation/CustomSelect';
import { RadioGroupField } from '../company-creation/RadioGroupField';
import { TrialPeriodSwitchGroup } from '../company-creation/TrialPeriodSwitchGroup';
import { ActionButtonsGroup } from '../company-creation/ActionButtonsGroup';
import { mockPilotLengths } from '../../data/mockPilotLengths';
import { mockPilotSeats } from '../../data/mockPilotSeats';
import { mockPlans } from '../../data/mockPlans';
import { mockBillingCycles } from '../../data/mockBillingCycles';
import { mockPaymentTypes } from '../../data/mockPaymentTypes';
import { mockBillingCurrencies } from '../../data/mockBillingCurrencies';
import { mockAccountTypes } from '../../data/mockAccountTypes';
import { mockPaymentDirections } from '../../data/mockPaymentDirections';

const PLAN_TYPE_OPTIONS = [
  { value: 'trial', label: 'Trial' },
  { value: 'pilot', label: 'Pilot' },
];

const PLAN_INPUT_BG = 'rgba(248, 247, 251, 1)';
const PLAN_VALUE_COLOR = 'rgba(73, 130, 145, 1)';
const ACH_INPUT_BG = 'rgba(255, 255, 255, 1)';
const ACH_VALUE_COLOR = 'rgba(47, 65, 74, 1)';

export function CompanyPlanAndSeatsForm({
  formData,
  achDetails,
  validationErrors = {},
  onUpdateField,
  onUpdateAchDetailsField,
  onSave,
  onCancel,
  isSaving = false,
  isFormValid,
}) {
  const isTrial = formData?.planType === 'trial';
  const isAch = formData?.paymentType === 'ach';

  const handleFieldChange = useCallback(
    (field, value) => {
      onUpdateField?.({ field, value });
    },
    [onUpdateField]
  );

  const handleAchFieldChange = useCallback(
    (field, value) => {
      onUpdateAchDetailsField?.({ field, value });
    },
    [onUpdateAchDetailsField]
  );

  const canSave = useMemo(
    () => Boolean(isFormValid && !isSaving),
    [isFormValid, isSaving]
  );

  return (
    <Box
      id="plan-and-seats-tabpanel"
      role="tabpanel"
      aria-labelledby="plan-and-seats-tab"
      aria-busy={isSaving}
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Box>
        <Typography
          component="h2"
          id="plan-and-seats-section-title"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '20px',
            fontWeight: 600,
            color: 'rgba(47, 65, 74, 1)',
            mb: 0.5,
          }}
        >
          Plan & Seats
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(73, 130, 145, 1)',
          }}
        >
          Manage your plan allocations and seats assignments.
        </Typography>
      </Box>

      <FormCard title="Plan Allocation & Seats Management">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <RadioGroupField
            name="planType"
            label="Select Plan Type"
            options={PLAN_TYPE_OPTIONS}
            value={formData?.planType ?? 'trial'}
            onChange={(value) => handleFieldChange('planType', value)}
            aria-label="Plan type"
          />

          {isTrial && (
            <Box
              sx={{
                border: '1px solid rgba(221, 217, 235, 1)',
                borderRadius: '8px',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography
                component="h4"
                sx={{
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(47, 65, 74, 1)',
                }}
              >
                Trial Configuration
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    label="Trial Length"
                    placeholder="14 days"
                    options={mockPilotLengths}
                    value={formData?.trialLength ?? ''}
                    onChange={(v) => handleFieldChange('trialLength', v)}
                    isRequired
                    inputBackground={PLAN_INPUT_BG}
                    selectedValueTextColor={PLAN_VALUE_COLOR}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextInput
                    id="plan-trial-end-date"
                    label="Trial End Date"
                    value={formData?.trialEndDate ?? ''}
                    onChange={(e) => handleFieldChange('trialEndDate', e.target.value)}
                    placeholder="01-20-2026"
                    readOnly
                    inputBackground={PLAN_INPUT_BG}
                    valueTextColor={PLAN_VALUE_COLOR}
                    aria-label="Trial end date"
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    label="Trial Seats"
                    placeholder="25"
                    options={mockPilotSeats}
                    value={formData?.trialSeats ?? ''}
                    onChange={(v) => handleFieldChange('trialSeats', v)}
                    inputBackground={PLAN_INPUT_BG}
                    selectedValueTextColor={PLAN_VALUE_COLOR}
                  />
                </Box>
              </Box>
              <TrialPeriodSwitchGroup
                label="Auto-expire Trial"
                secondaryText="Automatically suspend access when trial period ends"
                checked={Boolean(formData?.autoExpireTrial)}
                onChange={(e) => handleFieldChange('autoExpireTrial', e.target.checked)}
                aria-label="Auto-expire Trial"
              />
            </Box>
          )}

          <Divider sx={{ borderColor: 'rgba(221, 217, 235, 1)', my: 1 }} />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Plan"
                placeholder="50-100 employees"
                options={mockPlans}
                value={formData?.planId ?? ''}
                onChange={(v) => handleFieldChange('planId', v)}
                isRequired
                inputBackground={PLAN_INPUT_BG}
                selectedValueTextColor={PLAN_VALUE_COLOR}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextInput
                id="plan-total-seats"
                label="Total Seats"
                placeholder="100"
                value={formData?.totalSeats ?? ''}
                onChange={(e) => handleFieldChange('totalSeats', e.target.value)}
                inputBackground={PLAN_INPUT_BG}
                valueTextColor={PLAN_VALUE_COLOR}
                aria-label="Total seats"
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Billing Cycle"
                placeholder="Monthly"
                options={mockBillingCycles}
                value={formData?.billingCycleId ?? ''}
                onChange={(v) => handleFieldChange('billingCycleId', v)}
                isRequired
                inputBackground={PLAN_INPUT_BG}
                selectedValueTextColor={PLAN_VALUE_COLOR}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Payment Type"
                placeholder="ACH (Bank Transfer)"
                options={mockPaymentTypes}
                value={formData?.paymentType ?? 'ach'}
                onChange={(v) => handleFieldChange('paymentType', v)}
                isRequired
                inputBackground={PLAN_INPUT_BG}
                selectedValueTextColor={PLAN_VALUE_COLOR}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Billing Currency"
                placeholder="USD ($)"
                options={mockBillingCurrencies}
                value={formData?.billingCurrencyId ?? ''}
                onChange={(v) => handleFieldChange('billingCurrencyId', v)}
                inputBackground={PLAN_INPUT_BG}
                selectedValueTextColor={PLAN_VALUE_COLOR}
              />
            </Box>
            <Box sx={{ flex: 1 }} />
          </Box>
        </Box>
      </FormCard>

      {isAch && (
        <Box role="region" aria-label="ACH (Bank Transfer) Details">
          <FormCard title="ACH (Bank Transfer) Details">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <TextInput
                    id="ach-account-holder-name"
                    label="Account Holder Name"
                    placeholder="e.g., Jacob Samuel Teach"
                    value={achDetails?.accountHolderName ?? ''}
                    onChange={(e) => handleAchFieldChange('accountHolderName', e.target.value)}
                    isRequired
                    inputBackground={ACH_INPUT_BG}
                    valueTextColor={ACH_VALUE_COLOR}
                    aria-label="Account holder name"
                    aria-required="true"
                    errorMessage={validationErrors.accountHolderName}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextInput
                    id="ach-bank-name"
                    label="Bank Name"
                    placeholder="e.g., U.S. BANK N.A."
                    value={achDetails?.bankName ?? ''}
                    onChange={(e) => handleAchFieldChange('bankName', e.target.value)}
                    isRequired
                    inputBackground={ACH_INPUT_BG}
                    valueTextColor={ACH_VALUE_COLOR}
                    aria-label="Bank name"
                    aria-required="true"
                    errorMessage={validationErrors.bankName}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <TextInput
                    id="ach-account-number"
                    label="Account No."
                    placeholder="e.g., 987654321"
                    value={achDetails?.accountNumber ?? ''}
                    onChange={(e) => handleAchFieldChange('accountNumber', e.target.value)}
                    isRequired
                    inputMode="numeric"
                    inputBackground={ACH_INPUT_BG}
                    valueTextColor={ACH_VALUE_COLOR}
                    aria-label="Account number"
                    aria-required="true"
                    errorMessage={validationErrors.accountNumber}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    id="ach-account-type"
                    label="Account Type"
                    placeholder="Saving Account"
                    options={mockAccountTypes}
                    value={achDetails?.accountType ?? ''}
                    onChange={(v) => handleAchFieldChange('accountType', v)}
                    isRequired
                    inputBackground={ACH_INPUT_BG}
                    selectedValueTextColor={ACH_VALUE_COLOR}
                    errorMessage={validationErrors.accountType}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    id="ach-payment-direction"
                    label="Payment Direction"
                    placeholder="ACH Credit (CCD/ PPD)"
                    options={mockPaymentDirections}
                    value={achDetails?.paymentDirection ?? ''}
                    onChange={(v) => handleAchFieldChange('paymentDirection', v)}
                    isRequired
                    inputBackground={ACH_INPUT_BG}
                    selectedValueTextColor={ACH_VALUE_COLOR}
                    errorMessage={validationErrors.paymentDirection}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextInput
                    id="ach-routing-number"
                    label="Routing No."
                    placeholder="e.g., 021000322"
                    value={achDetails?.routingNumber ?? ''}
                    onChange={(e) => handleAchFieldChange('routingNumber', e.target.value)}
                    isRequired
                    inputMode="numeric"
                    inputBackground={ACH_INPUT_BG}
                    valueTextColor={ACH_VALUE_COLOR}
                    aria-label="Routing number"
                    aria-required="true"
                    errorMessage={validationErrors.routingNumber}
                  />
                </Box>
              </Box>
            </Box>
          </FormCard>
        </Box>
      )}

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
