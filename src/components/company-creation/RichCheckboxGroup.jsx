import { Box, Typography, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { Check } from 'lucide-react';

function RichCheckbox({ checked }) {
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        borderRadius: 1,
        background: checked ? 'rgba(48, 95, 161, 1)' : 'rgba(255, 255, 255, 1)',
        border: `1px solid ${checked ? 'rgba(48, 95, 161, 1)' : 'rgba(221, 217, 235, 1)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
      aria-hidden
    >
      {checked && <Check size={14} color="#fff" strokeWidth={2.5} />}
    </Box>
  );
}

export function RichCheckboxGroup({
  label,
  options = [],
  selectedValue,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  id: idProp,
}) {
  const labelId = idProp ? `${idProp}-label` : undefined;

  return (
    <FormControl component="fieldset" aria-labelledby={ariaLabelledby ?? labelId} aria-label={ariaLabel} sx={{ display: 'block', width: '100%' }}>
      <FormLabel
        id={labelId}
        component="span"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          color: 'rgba(56, 89, 102, 1)',
          display: 'block',
          mb: 1.5,
        }}
      >
        {label}
      </FormLabel>
      <RadioGroup
        value={selectedValue}
        onChange={(e) => onChange?.(e.target.value)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
        role="radiogroup"
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                icon={<RichCheckbox checked={false} />}
                checkedIcon={<RichCheckbox checked={true} />}
                sx={{
                  p: 0,
                  mr: 1.5,
                  '&.Mui-focusVisible .MuiRadio-root': { outline: '2px solid rgba(58, 111, 216, 1)' },
                }}
                inputProps={{ 'aria-label': option.label, role: 'radio', 'aria-checked': selectedValue === option.value }}
              />
            }
            label={
              <Typography
                component="span"
                sx={{
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'rgba(47, 65, 74, 1)',
                }}
              >
                {option.label}
              </Typography>
            }
            sx={{
              m: 0,
              mb: 1,
              p: 1.5,
              borderRadius: 2,
              background: selectedValue === option.value ? 'rgba(241, 246, 253, 0.5)' : 'rgba(255, 255, 255, 1)',
              border: `1px solid ${selectedValue === option.value ? 'rgba(48, 95, 161, 0.3)' : 'rgba(221, 217, 235, 1)'}`,
              '&:hover': { borderColor: 'rgba(58, 111, 216, 0.5)', background: 'rgba(241, 246, 253, 0.3)' },
              alignItems: 'center',
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
