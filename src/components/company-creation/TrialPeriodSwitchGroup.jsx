import { Box, Typography, Switch } from '@mui/material';

export function TrialPeriodSwitchGroup({
  label,
  secondaryText,
  secondaryTextColor = 'rgba(73, 130, 145, 1)',
  checked,
  onChange,
  disabled = false,
  'aria-label': ariaLabel,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        background: 'rgba(248, 247, 251, 1)',
        borderRadius: 2,
        px: 2,
        py: 1.5,
        minHeight: 56,
      }}
      role="group"
      aria-label={ariaLabel ?? `${label} toggle`}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(47, 65, 74, 1)',
          }}
        >
          {label}
        </Typography>
        {secondaryText && (
          <Typography
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              color: secondaryTextColor,
              mt: 0.25,
            }}
          >
            {secondaryText}
          </Typography>
        )}
      </Box>
      <Switch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        inputProps={{ 'aria-label': ariaLabel ?? `${label} toggle`, role: 'switch' }}
        sx={{
          '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
              '& + .MuiSwitch-track': { backgroundColor: 'rgba(48, 95, 161, 1)' },
            },
          },
          '& .MuiSwitch-track': {
            backgroundColor: 'rgba(221, 217, 235, 1)',
            borderRadius: 9999,
          },
          '& .MuiSwitch-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
        }}
      />
    </Box>
  );
}
