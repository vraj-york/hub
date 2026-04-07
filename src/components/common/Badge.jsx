import { Chip } from '@mui/material';

const variantColors = {
  primary: { bg: 'var(--color-accent-blue)', color: 'var(--color-white)' },
  success: { bg: 'var(--color-success)', color: 'var(--color-white)' },
  info: { bg: 'var(--color-secondary-blue)', color: 'var(--color-white)' },
  error: { bg: 'var(--color-error)', color: 'var(--color-white)' },
};

export function Badge({ label, children, variant = 'primary', backgroundColor, textColor, role, ariaLabel }) {
  const variantStyle = variantColors[variant] ?? variantColors.primary;
  const bg = backgroundColor ?? variantStyle.bg;
  const color = textColor ?? variantStyle.color;
  const displayLabel = label ?? children;
  return (
    <Chip
      label={displayLabel}
      size="small"
      role={role}
      aria-label={ariaLabel}
      sx={{
        height: 24,
        borderRadius: 9999,
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontWeight: 600,
        fontSize: '12px',
        backgroundColor: bg,
        color,
        '& .MuiChip-label': { px: 1.5, py: 0.5 },
      }}
    />
  );
}
