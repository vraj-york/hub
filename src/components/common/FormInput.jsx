import { TextField } from '@mui/material';

const labelSx = {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  fontSize: '14px',
  fontWeight: 500,
  color: 'rgba(47, 65, 74, 1)',
  '& .MuiFormLabel-asterisk': {
    color: 'rgba(196, 71, 85, 1)',
  },
};

const inputSx = (readOnly) => ({
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: 'rgba(73, 130, 145, 1)',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(221, 217, 235, 1)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: readOnly ? 'rgba(221, 217, 235, 1)' : 'rgba(73, 130, 145, 0.5)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(58, 111, 216, 1)',
    borderWidth: 1,
  },
  '&.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(196, 71, 85, 1)',
  },
  borderRadius: '8px',
  backgroundColor: readOnly ? 'rgba(248, 247, 251, 1)' : 'rgba(255, 255, 255, 1)',
});

export function FormInput({
  label,
  placeholder,
  value,
  onChange,
  required,
  error,
  helperText,
  readOnly,
  type = 'text',
  id: idProp,
  inputProps,
  ...rest
}) {
  const id = idProp || `form-input-${label?.replace(/\s+/g, '-').toLowerCase() || 'field'}`;
  return (
    <TextField
      id={id}
      label={label}
      placeholder={placeholder}
      value={value ?? ''}
      onChange={onChange}
      required={required}
      error={error}
      helperText={helperText}
      InputProps={{
        readOnly: !!readOnly,
        ...rest.InputProps,
      }}
      inputProps={{
        'aria-required': required ? 'true' : undefined,
        'aria-invalid': error ? 'true' : undefined,
        'aria-describedby': error && helperText ? `${id}-helper` : undefined,
        inputMode: type === 'tel' || type === 'number' ? 'numeric' : undefined,
        pattern: type === 'tel' ? '[0-9]*' : undefined,
        ...inputProps,
      }}
      FormHelperTextProps={{
        id: error && helperText ? `${id}-helper` : undefined,
        ...rest.FormHelperTextProps,
      }}
      fullWidth
      size="small"
      type={type}
      variant="outlined"
      sx={{
        '& .MuiInputLabel-root': labelSx,
        '& .MuiInputBase-input': inputSx(readOnly),
        '& .MuiFormHelperText-root': {
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '12px',
          color: 'rgba(196, 71, 85, 1)',
        },
      }}
      {...rest}
    />
  );
}
