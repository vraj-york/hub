import { Box, Typography, InputBase } from '@mui/material';
import { FormGroupLabel } from './FormGroupLabel';

export function TextInput({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  unit,
  isRequired = false,
  inputMode,
  errorMessage,
  error = false,
  helperText = '',
  inputBackground,
  valueTextColor,
  fontWeight,
  readOnly,
  endAdornment,
  'aria-label': ariaLabel,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
  id: idProp,
  ...rest
}) {
  const displayErrorText = helperText || errorMessage || '';
  const hasError = error || Boolean(errorMessage) || Boolean(helperText);
  const errorId = idProp ? `${idProp}-error` : undefined;
  const inputProps = {
    'aria-label': ariaLabel ?? label,
    'aria-required': ariaRequired ?? isRequired,
    'aria-invalid': ariaInvalid ?? hasError,
    'aria-describedby': hasError ? errorId : ariaDescribedby,
    'aria-readonly': readOnly ? 'true' : undefined,
    inputmode: inputMode ?? (type === 'number' ? 'numeric' : undefined),
    readOnly,
    ...rest,
  };

  return (
    <Box>
      {label && <FormGroupLabel label={label} htmlFor={idProp} isRequired={isRequired} />}
      <Box
        sx={{
          background: inputBackground ?? 'rgba(248, 247, 251, 1)',
          borderRadius: 2,
          border: `1px solid ${hasError ? 'rgba(161, 47, 63, 1)' : 'rgba(221, 217, 235, 1)'}`,
          px: 2,
          py: 1.5,
          minHeight: 44,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          '&:hover': { borderColor: hasError ? 'rgba(161, 47, 63, 1)' : 'rgba(58, 111, 216, 0.6)' },
          '&:focus-within': { outline: `2px solid ${hasError ? 'rgba(161, 47, 63, 1)' : 'rgba(58, 111, 216, 1)'}`, outlineOffset: 2, borderColor: 'transparent' },
        }}
      >
        <InputBase
          id={idProp}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          readOnly={readOnly}
          inputProps={inputProps}
          sx={{
            flex: 1,
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: fontWeight ?? 400,
            color: valueTextColor ?? 'rgba(73, 130, 145, 1)',
            '& .MuiInputBase-input::placeholder': { color: 'rgba(73, 130, 145, 1)', opacity: 1 },
          }}
        />
        {endAdornment}
        {unit && (
          <Typography
            component="span"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(56, 89, 102, 1)',
              flexShrink: 0,
            }}
          >
            {unit}
          </Typography>
        )}
      </Box>
      {displayErrorText && (
        <Typography
          id={errorId}
          role="alert"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'var(--color-error-text, rgba(161, 47, 63, 1))',
            mt: 1,
          }}
        >
          {displayErrorText}
        </Typography>
      )}
    </Box>
  );
}
