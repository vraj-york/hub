import { Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const iconColor = 'rgba(47, 65, 74, 1)';

export function PaginationButton({
  label,
  onClick,
  disabled = false,
  isActive = false,
  startIcon,
  endIcon,
  'aria-label': ariaLabel,
}) {
  const StartIconNode = startIcon === 'chevron-left' ? <ChevronLeft size={18} style={{ color: iconColor }} /> : startIcon;
  const EndIconNode = endIcon === 'chevron-right' ? <ChevronRight size={18} style={{ color: iconColor }} /> : endIcon;
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      startIcon={StartIconNode}
      endIcon={EndIconNode}
      aria-label={ariaLabel}
      aria-current={isActive ? 'page' : undefined}
      aria-disabled={disabled}
      role="button"
      size="small"
      sx={{
        minWidth: 40,
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontWeight: 600,
        fontSize: 14,
        color: 'rgba(47, 65, 74, 1)',
        background: isActive ? 'rgba(248, 247, 251, 1)' : 'rgba(255, 255, 255, 1)',
        border: '1px solid rgba(221, 217, 235, 1)',
        borderRadius: 1,
        '&:hover': {
          background: 'rgba(248, 247, 251, 1)',
          borderColor: 'rgba(221, 217, 235, 1)',
        },
        '&.Mui-disabled': {
          color: 'rgba(150, 150, 150, 1)',
        },
      }}
    >
      {label}
    </Button>
  );
}
