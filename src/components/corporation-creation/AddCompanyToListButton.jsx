import { Button } from '@mui/material';
import { Plus } from 'lucide-react';

/**
 * Button to add a new company to the corporation list (Add New Corporation - Step 2).
 */
export function AddCompanyToListButton({ onClick, label = 'Add New Company', ariaLabel = 'Add new company to corporation', disabled = false }) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      startIcon={<Plus size={18} strokeWidth={2} style={{ color: 'rgba(48, 95, 161, 1)' }} />}
      sx={{
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontSize: '14px',
        fontWeight: 600,
        color: 'rgba(48, 95, 161, 1)',
        background: 'rgba(255, 255, 255, 1)',
        border: '1px solid rgba(221, 217, 235, 1)',
        borderRadius: 2,
        textTransform: 'none',
        alignSelf: 'flex-start',
        '&:hover': {
          background: 'rgba(241, 246, 253, 1)',
          borderColor: 'rgba(48, 95, 161, 0.5)',
        },
      }}
    >
      {label}
    </Button>
  );
}
