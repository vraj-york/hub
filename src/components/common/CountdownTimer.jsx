import { Typography } from '@mui/material';

export function CountdownTimer({ seconds = 0 }) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <Typography
      component="span"
      aria-live="polite"
      aria-label={`Time remaining: ${display}`}
      sx={{
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontSize: '14px',
        fontWeight: 400,
        color: 'rgba(56, 89, 102, 1)',
      }}
    >
      {display}
    </Typography>
  );
}
