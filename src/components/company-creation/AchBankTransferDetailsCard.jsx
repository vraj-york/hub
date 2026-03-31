import { Box } from '@mui/material';
import { FormCard } from './FormCard';
import { FormGroupLabel } from './FormGroupLabel';
import { TextInput } from './TextInput';
import { CustomSelect } from './CustomSelect';

export function AchBankTransferDetailsCard({
  formData = {},
  onFieldChange,
  errors = {},
  mockAccountTypes = [],
  mockPaymentDirections = [],
}) {
  const ach = formData;

  return (
    <FormCard title="ACH (Bank Transfer) Details">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextInput
          label="Account Holder Name"
          placeholder="e.g., Jacob Samuel Teach"
          value={ach.accountHolderName ?? ''}
          onChange={(e) => onFieldChange('achDetails.accountHolderName', e.target.value)}
          isRequired
          aria-label="Account holder name"
          aria-required="true"
          aria-invalid={Boolean(errors.accountHolderName)}
          aria-describedby={errors.accountHolderName ? 'ach-accountHolderName-error' : undefined}
        />
        <TextInput
          label="Bank Name"
          placeholder="e.g., U.S. BANK N.A."
          value={ach.bankName ?? ''}
          onChange={(e) => onFieldChange('achDetails.bankName', e.target.value)}
          isRequired
          aria-label="Bank name"
          aria-required="true"
          aria-invalid={Boolean(errors.bankName)}
          aria-describedby={errors.bankName ? 'ach-bankName-error' : undefined}
        />
        <TextInput
          label="Account No."
          placeholder="e.g., 987654321"
          value={ach.accountNo ?? ''}
          onChange={(e) => onFieldChange('achDetails.accountNo', e.target.value)}
          isRequired
          inputMode="numeric"
          aria-label="Account number"
          aria-required="true"
          aria-invalid={Boolean(errors.accountNo)}
          aria-describedby={errors.accountNo ? 'ach-accountNo-error' : undefined}
        />
        <CustomSelect
          label="Account Type"
          placeholder="Saving Account"
          options={mockAccountTypes}
          value={ach.accountType ?? ''}
          onChange={(v) => onFieldChange('achDetails.accountType', v)}
          isRequired
          aria-label="Account type"
          aria-required="true"
          errorMessage={errors.accountType}
        />
        <CustomSelect
          label="Payment Direction"
          placeholder="ACH Credit (CCD/ PPD)"
          options={mockPaymentDirections}
          value={ach.paymentDirection ?? ''}
          onChange={(v) => onFieldChange('achDetails.paymentDirection', v)}
          isRequired
          aria-label="Payment direction"
          aria-required="true"
          errorMessage={errors.paymentDirection}
        />
        <TextInput
          label="Routing No."
          placeholder="e.g., 021000322"
          value={ach.routingNo ?? ''}
          onChange={(e) => onFieldChange('achDetails.routingNo', e.target.value)}
          isRequired
          inputMode="numeric"
          aria-label="Routing number"
          aria-required="true"
          aria-invalid={Boolean(errors.routingNo)}
          aria-describedby={errors.routingNo ? 'ach-routingNo-error' : undefined}
        />
      </Box>
    </FormCard>
  );
}
