import { IconButton } from '@mui/material';
import { SquarePen, Trash2 } from 'lucide-react';

/**
 * Edit and Delete action buttons for a CompanyCard in Add New Corporation - Step 2.
 */
export function CompanyActions({ companyId, companyName, onEdit, onDelete, deleteAriaLabelSuffix = '' }) {
  return (
    <>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onEdit?.(companyId);
        }}
        aria-label={`Edit ${companyName ?? 'company'} details`}
        sx={{
          color: 'rgba(52, 76, 86, 1)',
          p: 0.75,
          '&:hover': { background: 'rgba(231, 237, 247, 0.5)' },
        }}
      >
        <SquarePen size={18} strokeWidth={1.5} />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.(companyId);
        }}
        aria-label={`Delete ${companyName ?? 'company'}${deleteAriaLabelSuffix}`}
        sx={{
          color: 'rgba(196, 71, 85, 1)',
          p: 0.75,
          '&:hover': { background: 'rgba(241, 246, 253, 0.8)' },
        }}
      >
        <Trash2 size={18} strokeWidth={1.5} />
      </IconButton>
    </>
  );
}
