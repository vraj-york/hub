import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { ChevronDown } from 'lucide-react';

const labelSx = {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: 'rgba(47, 65, 74, 1)',
  '&.Mui-focused': {
    color: 'rgba(47, 65, 74, 1)',
  },
  '& .MuiFormLabel-asterisk': {
    color: 'rgba(196, 71, 85, 1)',
  },
};

const selectSx = {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: 'rgba(73, 130, 145, 1)',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(221, 217, 235, 1)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(73, 130, 145, 0.5)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(58, 111, 216, 1)',
    borderWidth: 1,
  },
  '&.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(196, 71, 85, 1)',
  },
};

export function FormSelect({
  label,
  placeholder = 'Select...',
  value,
  onChange,
  options = [],
  required,
  error,
  helperText,
  id: idProp,
  ...rest
}) {
  const id = idProp || `form-select-${label?.replace(/\s+/g, '-').toLowerCase() || 'field'}`;
  const labelId = `${id}-label`;
  const helperId = error && helperText ? `${id}-helper` : undefined;
  return (
    <FormControl fullWidth size="small" error={error} required={required} variant="outlined">
      <InputLabel id={labelId} sx={labelSx}>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value ?? ''}
        onChange={onChange}
        label={label}
        displayEmpty
        renderValue={(v) => {
          const opt = options.find((o) => o.value === v);
          return opt ? opt.label : (v || '');
        }}
        inputProps={{
          'aria-required': required ? 'true' : undefined,
          'aria-invalid': error ? 'true' : undefined,
          'aria-describedby': helperId,
        }}
        IconComponent={(props) => <ChevronDown {...props} size={20} style={{ color: 'rgba(73, 130, 145, 1)' }} aria-hidden />}
        sx={selectSx}
        {...rest}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText id={helperId} sx={{ fontFamily: '"Inter", "Helvetica", "Arial", sans-serif', fontSize: '12px' }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
