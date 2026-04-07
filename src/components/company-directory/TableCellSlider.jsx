import { Box, Typography } from '@mui/material';

function SeatProgressBar({ value, max, ariaLabel }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <Box
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      sx={{
        height: 8,
        borderRadius: 1,
        background: 'rgba(243, 246, 252, 1)',
        overflow: 'hidden',
        mt: 0.75,
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: `${pct}%`,
          background: 'linear-gradient(90deg, rgba(48, 95, 161, 1), rgba(122, 169, 187, 1))',
          borderRadius: 1,
          transition: 'width 0.3s ease',
        }}
      />
    </Box>
  );
}

export function TableCellSlider({ currentSeats, totalSeats }) {
  const label = `Seat usage: ${currentSeats} out of ${totalSeats} seats`;
  return (
    <Box
      component="td"
      sx={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(222, 236, 239, 1)',
        verticalAlign: 'middle',
      }}
    >
      <Typography
        component="span"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontWeight: 500,
          fontSize: 12,
          color: 'rgba(26, 39, 46, 1)',
        }}
      >
        {currentSeats} / {totalSeats}
      </Typography>
      <SeatProgressBar
        value={currentSeats}
        max={totalSeats}
        ariaLabel={label}
      />
    </Box>
  );
}
