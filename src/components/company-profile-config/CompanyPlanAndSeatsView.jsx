import { Box } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { ConfigDisplayRow } from './ConfigDisplayRow';
import { Badge } from '../common/Badge';
import { mockPilotLengths } from '../../data/mockPilotLengths';
import { mockPilotSeats } from '../../data/mockPilotSeats';
import { mockPlans } from '../../data/mockPlans';
import { mockBillingCycles } from '../../data/mockBillingCycles';
import { mockPaymentTypes } from '../../data/mockPaymentTypes';
import { mockBillingCurrencies } from '../../data/mockBillingCurrencies';
import { mockAccountTypes } from '../../data/mockAccountTypes';
import { mockPaymentDirections } from '../../data/mockPaymentDirections';

function getLabel(options, value) {
  const opt = options.find((o) => o.value === value);
  return opt?.label ?? value ?? '—';
}

export function CompanyPlanAndSeatsView({ formData, achDetails }) {
  const data = formData ?? {};
  const ach = achDetails ?? {};
  const isTrial = data.planType === 'trial';
  const isAch = data.paymentType === 'ach';

  const planLabel = getLabel(mockPlans, data.planId);
  const billingCycleLabel = getLabel(mockBillingCycles, data.billingCycleId);
  const paymentTypeLabel = getLabel(mockPaymentTypes, data.paymentType);
  const billingCurrencyLabel = getLabel(mockBillingCurrencies, data.billingCurrencyId);
  const accountTypeLabel = getLabel(mockAccountTypes, ach.accountType);
  const paymentDirectionLabel = getLabel(mockPaymentDirections, ach.paymentDirection);

  const trialLengthBase = getLabel(mockPilotLengths, data.trialLength);
  const trialLengthFormatted =
    trialLengthBase && data.autoExpireTrial
      ? `${trialLengthBase} (Auto-expire)`
      : trialLengthBase || '—';
  const trialSeatsLabel = getLabel(mockPilotSeats, data.trialSeats) || data.trialSeats || '—';
  const trialSeatsDisplay = trialSeatsLabel && trialSeatsLabel !== '—' ? `${trialSeatsLabel} seats` : trialSeatsLabel;

  const trialStatusBadge =
    isTrial ? (
      <Badge
        label="Active"
        backgroundColor="rgba(241, 246, 253, 1)"
        textColor="rgba(58, 111, 216, 1)"
        role="status"
        ariaLabel="Trial Status: Active"
      />
    ) : null;

  return (
    <Box
      id="plan-and-seats-tabpanel"
      role="tabpanel"
      aria-labelledby="plan-and-seats-tab"
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <FormCard title="Plan Allocation & Seats Management">
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <ConfigDisplayRow label="Plan" value={planLabel} />
              <ConfigDisplayRow label="Total Seats" value={data.totalSeats || '—'} />
              <ConfigDisplayRow label="Billing Cycle" value={billingCycleLabel} />
              <ConfigDisplayRow label="Payment Type" value={paymentTypeLabel} />
              <ConfigDisplayRow label="Billing Currency" value={billingCurrencyLabel} />
            </Box>
          </FormCard>
        </Box>

        <Box sx={{ flex: 1 }}>
          <FormCard title="Trial Configuration">
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <ConfigDisplayRow label="Trial Status" value={trialStatusBadge || <Badge label="Active" backgroundColor="rgba(241, 246, 253, 1)" textColor="rgba(58, 111, 216, 1)" />} />
              <ConfigDisplayRow label="Trial Length" value={trialLengthFormatted} />
              <ConfigDisplayRow label="Trial End Date" value={data.trialEndDate || '—'} />
              <ConfigDisplayRow label="Trial Seats" value={trialSeatsDisplay} />
            </Box>
          </FormCard>
        </Box>
      </Box>

      <FormCard title="ACH (Bank Transfer) Details">
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <ConfigDisplayRow label="Account Holder Name" value={ach.accountHolderName || '—'} />
          <ConfigDisplayRow label="Bank Name" value={ach.bankName || '—'} />
          <ConfigDisplayRow label="Account No." value={ach.accountNumber || '—'} />
          <ConfigDisplayRow label="Account Type" value={accountTypeLabel} />
          <ConfigDisplayRow label="Payment Direction" value={paymentDirectionLabel} />
          <ConfigDisplayRow label="Routing No." value={ach.routingNumber || '—'} />
        </Box>
      </FormCard>
    </Box>
  );
}
