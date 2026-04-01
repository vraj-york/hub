import { Button } from '@mui/material';
import { SquarePen } from 'lucide-react';

export function EditCompanyButton({ onClick }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      startIcon={<SquarePen size={18} strokeWidth={2} style={{ color: 'rgba(255, 255, 255, 1)' }} />}
      sx={{
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontSize: '14px',
        fontWeight: 600,
        color: 'rgba(255, 255, 255, 1)',
        background: 'rgba(48, 95, 161, 1)',
        borderRadius: '8px',
        textTransform: 'none',
        py: 1,
        px: 2,
        '&:hover': {
          background: 'rgba(48, 95, 161, 1)',
          filter: 'brightness(1.08)',
        },
      }}
      role="button"
      aria-label="Edit company basic information"
    >
      Edit Company
    </Button>
  );
}
