import { Box, Typography } from '@mui/material';
import { FormGroupLabel } from '../company-creation/FormGroupLabel';

const inputSx = (resizable) => ({
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: 'rgba(73, 130, 145, 1)',
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px 16px',
  borderRadius: '8px',
  border: '1px solid rgba(221, 217, 235, 1)',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  resize: resizable ? 'vertical' : 'none',
  minHeight: 80,
  '&::placeholder': {
    color: 'rgba(73, 130, 145, 1)',
  },
  '&:hover': {
    borderColor: 'rgba(73, 130, 145, 0.5)',
  },
  '&:focus': {
    outline: 'none',
    borderColor: 'rgba(58, 111, 216, 1)',
    boxShadow: '0 0 0 2px rgba(58, 111, 216, 0.2)',
  },
  '&:focus-visible': {
    outline: '2px solid rgba(58, 111, 216, 1)',
    outlineOffset: 2,
  },
});

export function Textarea({
  id: idProp,
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  error = false,
  helperText,
  rows = 3,
  maxRows,
  readOnly = false,
  resizable = true,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}) {
  const id = idProp || `textarea-${(label || 'field').replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <Box>
      {label && (
        <FormGroupLabel label={label} isRequired={required} htmlFor={id} />
      )}
      <Box
        component="textarea"
        id={id}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
        aria-required={required ? 'true' : undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error && helperText ? `${id}-helper` : ariaDescribedby}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        sx={inputSx(resizable)}
      />
      {error && helperText && (
        <Typography
          id={`${id}-helper`}
          role="alert"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(196, 71, 85, 1)',
            mt: 1,
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
}
