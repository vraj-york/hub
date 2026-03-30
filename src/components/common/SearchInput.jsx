import { TextField, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';

export function SearchInput({ placeholder = 'Search here...', value, onChange, 'aria-label': ariaLabel }) {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      size="small"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ mr: 1 }}>
            <Search size={18} style={{ color: 'rgba(73, 130, 145, 1)' }} />
          </InputAdornment>
        ),
        sx: {
          borderRadius: 1,
          fontSize: '0.875rem',
          backgroundColor: 'var(--color-white)',
          '& fieldset': {
            borderColor: 'var(--color-grey-400)',
          },
          '&:hover fieldset': { borderColor: 'var(--color-grey-400)' },
          '&.Mui-focused fieldset': { borderColor: 'var(--color-accent-blue)', borderWidth: 1 },
          '& .MuiInputBase-input::placeholder': {
            color: 'rgba(73, 130, 145, 1)',
            opacity: 1,
          },
        },
      }}
      inputProps={{
        role: 'searchbox',
        'aria-label': ariaLabel ?? 'Search corporation directory',
        inputmode: 'text',
      }}
    />
  );
}
