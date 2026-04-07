import { IconButton } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import { TextInput } from '../company-creation/TextInput';

const TOGGLE_ICON_COLOR = 'rgba(255, 255, 255, 1)';
const TOGGLE_BG_COLOR = 'rgba(73, 130, 145, 1)';

export function PasswordInput({
  showToggle = true,
  isPasswordVisible = false,
  onToggleVisibility,
  id: idProp,
  'aria-label': ariaLabel,
  ...rest
}) {
  const inputId = idProp ?? 'password-input';
  const toggleAriaLabel = isPasswordVisible ? 'Hide password' : 'Show password';

  const endAdornment = showToggle ? (
    <IconButton
      type="button"
      size="small"
      onClick={onToggleVisibility}
      role="button"
      aria-label={toggleAriaLabel}
      aria-pressed={isPasswordVisible}
      sx={{
        color: TOGGLE_ICON_COLOR,
        backgroundColor: TOGGLE_BG_COLOR,
        padding: 0.5,
        borderRadius: '8px',
        '&:hover': { backgroundColor: 'rgba(73, 130, 145, 0.85)' },
      }}
    >
      {isPasswordVisible ? (
        <EyeOff size={20} color={TOGGLE_ICON_COLOR} aria-hidden />
      ) : (
        <Eye size={20} color={TOGGLE_ICON_COLOR} aria-hidden />
      )}
    </IconButton>
  ) : null;

  return (
    <TextInput
      id={inputId}
      type={isPasswordVisible ? 'text' : 'password'}
      inputMode="text"
      autoComplete="current-password"
      aria-label={ariaLabel ?? 'Password'}
      endAdornment={endAdornment}
      valueTextColor="rgba(73, 130, 145, 1)"
      {...rest}
    />
  );
}
