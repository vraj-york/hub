import { Box } from '@mui/material';
import { FormCard } from '../company-creation/FormCard';
import { ConfigDisplayRow } from '../company-profile-config/ConfigDisplayRow';
import { TextInput } from '../company-creation/TextInput';
import { CustomSelect } from '../company-creation/CustomSelect';
import { FormGroupLabel } from '../company-creation/FormGroupLabel';
import { mockOwnershipTypes } from '../../data/mockOwnershipTypes';

function getLabel(options, value) {
  const opt = options.find((o) => o.value === value);
  return opt?.label ?? value ?? '—';
}

export function ParentCorporationCard({ mode = 'view', data = {}, onFieldChange, validationErrors = {} }) {
  const parentName = data.parentName ?? '';
  const ownershipType = data.ownershipType ?? '';

  if (mode === 'view') {
    return (
      <FormCard title="Parent Corporation" titleId="parent-corporation-card" ariaLabel="Parent Corporation">
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <ConfigDisplayRow label="Parent Corporation Legal Name" value={parentName || '—'} />
          <ConfigDisplayRow label="Ownership Type" value={getLabel(mockOwnershipTypes, ownershipType)} />
        </Box>
      </FormCard>
    );
  }

  return (
    <FormCard title="Parent Corporation" titleId="parent-corporation-card" ariaLabel="Parent Corporation">
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <FormGroupLabel label="Parent Corporation Legal Name" isRequired={false} />
          <TextInput
            value={parentName}
            readOnly
            placeholder="—"
            inputBackground="rgba(248, 247, 251, 1)"
            aria-label="Parent Corporation Legal Name (read-only)"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <CustomSelect
            label="Ownership Type"
            placeholder="Select ownership type"
            options={mockOwnershipTypes}
            value={ownershipType}
            onChange={(v) => onFieldChange?.('ownershipType', v)}
            isRequired
            errorMessage={validationErrors.ownershipType}
          />
        </Box>
      </Box>
    </FormCard>
  );
}
