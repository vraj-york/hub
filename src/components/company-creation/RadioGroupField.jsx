import { Box, Typography, Radio } from '@mui/material';

export function RadioGroupField({
  name,
  label,
  options = [],
  value,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}) {
  const groupId = `${name}-radiogroup`;

  return (
    <Box
      role="radiogroup"
      aria-label={ariaLabel ?? label}
      aria-labelledby={ariaLabelledby ?? (label ? `${groupId}-label` : undefined)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
    >
      {label && (
        <Typography
          id={`${groupId}-label`}
          component="span"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(47, 65, 74, 1)',
            display: 'block',
            mb: 0.5,
          }}
        >
          {label}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
        {options.map((opt) => (
          <Box
            key={opt.value}
            component="label"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
          >
            <Radio
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange?.(e.target.value)}
              inputProps={{
                role: 'radio',
                'aria-checked': value === opt.value,
                'aria-label': opt.label,
              }}
              sx={{
                color: 'rgba(221, 217, 235, 1)',
                '&.Mui-checked': {
                  color: 'rgba(48, 95, 161, 1)',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 20,
                },
              }}
            />
            <Typography
              component="span"
              sx={{
                fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: 'rgba(47, 65, 74, 1)',
              }}
            >
              {opt.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
