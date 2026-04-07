import { Box, Typography, Switch } from '@mui/material';

export function RememberMeSwitchGroup({
  label = 'Remember me',
  checked = false,
  onChange,
  disabled = false,
  id: idProp,
  'aria-label': ariaLabel,
}) {
  const switchId = idProp ?? 'remember-me-switch';
  const labelId = `${switchId}-label`;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
      }}
      role="group"
      aria-labelledby={labelId}
    >
      <Switch
        id={switchId}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        inputProps={{
          'aria-label': ariaLabel ?? label,
          'aria-labelledby': labelId,
          role: 'switch',
          'aria-checked': checked,
        }}
        sx={{
          padding: 0.5,
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
      <Typography
        id={labelId}
        component="label"
        htmlFor={switchId}
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          color: 'rgba(47, 65, 74, 1)',
          cursor: disabled ? 'default' : 'pointer',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
