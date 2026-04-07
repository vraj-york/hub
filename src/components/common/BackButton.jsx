import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const defaultIconColor = 'rgba(52, 76, 86, 1)';
const labelColor = 'rgba(47, 65, 74, 1)';

const buttonSx = {
  fontWeight: 600,
  fontSize: '0.875rem',
  color: labelColor,
  background: 'rgba(255, 255, 255, 1)',
  borderColor: 'var(--color-grey-400)',
  borderRadius: 1,
  py: 1,
  px: 2,
  textTransform: 'none',
  '&:hover': {
    background: 'rgba(248, 247, 251, 1)',
    borderColor: 'var(--color-grey-400)',
  },
  '&:active': {
    background: 'rgba(240, 240, 245, 1)',
  },
};

export function BackButton({ label = 'Back', to, onClick, ariaLabel = 'Back to corporation directory', iconColor = defaultIconColor }) {
  const startIcon = <ChevronLeft size={18} strokeWidth={2} style={{ color: iconColor }} />;
  if (to) {
    return (
      <Button
        component={Link}
        to={to}
        variant="outlined"
        startIcon={startIcon}
        sx={buttonSx}
        aria-label={ariaLabel}
      >
        {label}
      </Button>
    );
  }
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      startIcon={startIcon}
      sx={buttonSx}
      aria-label={ariaLabel}
    >
      {label}
    </Button>
  );
}
