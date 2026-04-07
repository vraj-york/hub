import { Button } from '@mui/material';

export function LinkButton({ label, onClick, isDisabled, fontWeight = 600, ...rest }) {
  return (
    <Button
      variant="text"
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-label={rest['aria-label'] ?? label}
      sx={{
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontSize: '14px',
        fontWeight,
        color: 'rgba(58, 111, 216, 1)',
        textTransform: 'none',
        minWidth: 0,
        padding: 0,
        '&:hover': {
          backgroundColor: 'transparent',
          color: '#2a5ab8',
          textDecoration: 'underline',
        },
        '&.Mui-disabled': {
          color: 'rgba(56, 89, 102, 0.5)',
        },
      }}
      {...rest}
    >
      {label}
    </Button>
  );
}
