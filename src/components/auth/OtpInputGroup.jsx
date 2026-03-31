import { useRef, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { OtpInput } from './OtpInput';

const LENGTH = 6;
const SEPARATOR_AFTER_INDEX = 2; // separator between 3rd and 4th input

export function OtpInputGroup({
  length = LENGTH,
  value,
  onChange,
  onComplete,
  hasError = false,
  errorMessage,
  isDisabled = false,
  /** Placeholder "0" text color for OtpInput; default rgba(56, 89, 102, 1) per Mobile 2FA spec */
  placeholderValueColor,
}) {
  const digits = value.split('').concat(Array(length).fill('')).slice(0, length);
  const inputRefs = useRef([]);

  const focusInput = useCallback((index) => {
    const i = Math.max(0, Math.min(index, length - 1));
    inputRefs.current[i]?.focus();
  }, [length]);

  const handleChange = useCallback(
    (index, digit) => {
      const newDigits = [...digits];
      newDigits[index] = digit.replace(/\D/g, '').slice(-1);
      const newValue = newDigits.join('');
      onChange(newValue);
      if (newValue.length === length && onComplete) {
        onComplete(newValue);
      }
      if (digit && index < length - 1) {
        focusInput(index + 1);
      }
    },
    [digits, length, onChange, onComplete, focusInput]
  );

  const handleKeyDown = useCallback(
    (index, e) => {
      if (e.key === 'Backspace' && !digits[index] && index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        onChange(newDigits.join(''));
        focusInput(index - 1);
        e.preventDefault();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        focusInput(index - 1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        focusInput(index + 1);
      }
    },
    [digits, onChange, focusInput]
  );

  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, length);
      if (pasted.length > 0) {
        const newDigits = [...digits];
        pasted.split('').forEach((char, i) => {
          if (i < length) newDigits[i] = char;
        });
        const newValue = newDigits.join('');
        onChange(newValue);
        if (newValue.length === length) {
          focusInput(length - 1);
          onComplete?.(newValue);
        } else {
          focusInput(pasted.length);
        }
      }
    },
    [digits, length, onChange, onComplete, focusInput]
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box
        role="group"
        aria-labelledby="otp-input-label"
        aria-invalid={hasError}
        aria-describedby={hasError && errorMessage ? 'otp-error-message' : undefined}
        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}
      >
        {Array.from({ length }, (_, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <OtpInput
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digits[index] ?? ''}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              isError={hasError}
              isDisabled={isDisabled}
              placeholderValueColor={placeholderValueColor}
              aria-label={`Verification code digit ${index + 1} of ${length}`}
            />
            {index === SEPARATOR_AFTER_INDEX && index < length - 1 && (
              <Box
                component="img"
                src="/vectors/separator.svg"
                alt=""
                aria-hidden
                sx={{ mx: 0.5, width: 1, height: 36 }}
              />
            )}
          </Box>
        ))}
      </Box>
      {hasError && errorMessage && (
        <Typography
          id="otp-error-message"
          role="alert"
          aria-live="assertive"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(161, 47, 63, 1)',
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}
