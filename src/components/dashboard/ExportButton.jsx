import { Button } from '@mui/material';
import { Share2 } from 'lucide-react';

export function ExportButton({ onClick, disabled = false }) {
  return (
    <Button
      variant="outlined"
      startIcon={<Share2 size={18} strokeWidth={1.5} style={{ color: 'rgba(52, 76, 86, 1)' }} />}
      onClick={onClick}
      disabled={disabled}
      aria-label="Export dashboard data to file"
      sx={{
        background: 'rgba(255, 255, 255, 1)',
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontWeight: 600,
        fontSize: '14px',
        color: 'rgba(47, 65, 74, 1)',
        borderRadius: '8px',
        textTransform: 'none',
        borderColor: 'rgba(221, 217, 235, 1)',
        '&:hover': {
          background: 'rgba(248, 247, 251, 1)',
          borderColor: 'rgba(56, 89, 102, 0.3)',
        },
      }}
    >
      Export
    </Button>
  );
}
