import { InputBase } from '@mui/material';

const DEFAULT_PLACEHOLDER_VALUE_COLOR = 'rgba(56, 89, 102, 1)';

export function OtpInput({
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  isFocused,
  isError,
  isDisabled,
  inputRef,
  /** Placeholder "0" text color; default rgba(56, 89, 102, 1) per Mobile 2FA spec */
  placeholderValueColor = DEFAULT_PLACEHOLDER_VALUE_COLOR,
  'aria-label': ariaLabel,
  ...rest
}) {
  return (
    <InputBase
      inputRef={inputRef}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={isDisabled}
      inputProps={{
        'aria-label': ariaLabel,
        'aria-invalid': isError,
        inputMode: 'numeric',
        pattern: '[0-9]*',
        autoComplete: 'one-time-code',
        maxLength: 1,
        placeholder: '0',
        ...rest.inputProps,
      }}
      sx={{
        width: 40,
        height: 40,
        textAlign: 'center',
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontSize: '14px',
        fontWeight: 400,
        color: value ? 'rgba(47, 65, 74, 1)' : placeholderValueColor,
        border: 'none',
        borderBottom: isError
          ? '2px solid rgba(161, 47, 63, 1)'
          : isFocused
            ? '2px solid #305FA1'
            : '1px solid rgba(221, 217, 235, 1)',
        borderRadius: 0,
        '& .MuiInputBase-input': {
          textAlign: 'center',
          padding: 0,
          color: 'inherit',
        },
        '& .MuiInputBase-input::placeholder': {
          color: placeholderValueColor,
          opacity: 1,
        },
        ...rest.sx,
      }}
      {...rest}
    />
  );
}
