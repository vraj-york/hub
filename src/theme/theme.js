import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: { default: '#F8F7FB', paper: '#FFFFFF' },
    primary: { main: '#2F414A' },
    secondary: { main: '#498291' },
    accent: { main: '#305FA1' },
    success: { main: '#2F8F6B' },
    error: { main: '#C44755', textPrimary: '#A12F3F' },
    info: { main: '#3A6FD8' },
    grey: {
      100: '#E7EDF7',
      200: '#F1F0F7',
      300: '#D3CDE5',
      400: '#DDD9EB',
    },
    common: {
      lightBlue100: '#F1F6FD',
      lightGrey100: '#F1F0F7',
      lightGrey200: '#D3CDE5',
      transparentDark5: 'rgba(26, 39, 46, 0.05)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.2 },
    h6: { fontWeight: 500, fontSize: '1rem', lineHeight: 1.5 },
    subtitle2: { fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.5 },
    body2: { fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.5 },
    caption: { fontWeight: 600, fontSize: '0.75rem', lineHeight: 1.5 },
    overline: { fontWeight: 600, fontSize: '0.75rem', lineHeight: 1.5 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--color-background': '#F8F7FB',
          '--color-white': '#FFFFFF',
          '--color-primary-dark': '#2F414A',
          '--color-secondary-blue': '#498291',
          '--color-accent-blue': '#305FA1',
          '--color-primary-action-alt-blue': 'rgba(99, 146, 205, 1)',
          '--color-success': '#2F8F6B',
          '--color-error': '#C44755',
          '--color-error-text': '#A12F3F',
          '--color-grey-100': '#E7EDF7',
          '--color-grey-200': '#F1F0F7',
          '--color-grey-300': '#D3CDE5',
          '--color-grey-400': '#DDD9EB',
          '--color-light-blue-100': '#F1F6FD',
          '--color-light-grey-100': '#F1F0F7',
          '--color-dot-separator': '#649DAC',
          '--color-stroke-dark': '#344C56',
          '--box-shadow-header': '0px 1px 4px rgba(0, 0, 0, 0.05)',
          '--box-shadow-card': '0px 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;
