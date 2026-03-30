import { Button, CircularProgress } from '@mui/material';
import { Share2 } from 'lucide-react';

export function ExportReportButton({
  onClick,
  label = 'Export Report',
  icon: Icon = Share2,
  disabled = false,
  loading = false,
  'aria-label': ariaLabel = 'Export dashboard report',
}) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled || loading}
      role="button"
      aria-label={ariaLabel}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      startIcon={
        loading ? (
          <CircularProgress size={16} sx={{ color: 'rgba(255, 255, 255, 1)' }} />
        ) : (
          <Icon size={18} style={{ color: 'rgba(255, 255, 255, 1)' }} />
        )
      }
      sx={{
        background: 'rgba(99, 146, 205, 1)',
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontWeight: 600,
        fontSize: 14,
        textTransform: 'none',
        borderRadius: 2,
        '&:hover': {
          background: 'rgba(99, 146, 205, 0.9)',
        },
        '&.Mui-disabled': {
          background: 'rgba(99, 146, 205, 0.5)',
          color: 'rgba(255, 255, 255, 0.7)',
        },
      }}
    >
      {loading ? 'Exporting...' : label}
    </Button>
  );
}
