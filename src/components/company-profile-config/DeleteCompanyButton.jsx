import { Button } from '@mui/material';
import { Trash2 } from 'lucide-react';

export function DeleteCompanyButton({ onClick, disabled, ariaLabel = 'Delete company' }) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      startIcon={<Trash2 size={18} strokeWidth={1.5} style={{ color: 'rgba(196, 71, 85, 1)' }} />}
      sx={{
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontSize: '14px',
        fontWeight: 600,
        color: 'rgba(196, 71, 85, 1)',
        borderColor: 'rgba(196, 71, 85, 1)',
        background: 'rgba(255, 255, 255, 1)',
        borderRadius: 2,
        textTransform: 'none',
        '&:hover': {
          background: 'rgba(196, 71, 85, 0.08)',
          borderColor: 'rgba(196, 71, 85, 1)',
          color: 'rgba(196, 71, 85, 1)',
        },
      }}
      aria-label={ariaLabel}
    >
      Delete
    </Button>
  );
}
