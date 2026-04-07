import { Box, Typography } from '@mui/material';

const DEFAULT_FRAME_BG = 'rgba(48, 95, 161, 1)';
const DEFAULT_TEXT_COLOR = 'rgba(255, 255, 255, 1)';

/**
 * Displays the Super Admin persona and active theme within a styled frame.
 * Container has role="region" and aria-label for accessibility.
 */
export function SuperAdminPersonaDisplay({
  personaType = 'Super Admin Persona',
  themePreference = 'Light Theme',
  frameBackgroundColor = DEFAULT_FRAME_BG,
  textColor = DEFAULT_TEXT_COLOR,
}) {
  const displayText = `${personaType} - ${themePreference}`;

  return (
    <Box
      component="section"
      role="region"
      aria-label="Super Admin Persona Details"
      sx={{
        backgroundColor: frameBackgroundColor,
        borderRadius: 1,
        padding: 2,
        textAlign: 'center',
      }}
    >
      <Typography
        component="span"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontWeight: 500,
          fontSize: 16,
          color: textColor,
        }}
      >
        {displayText}
      </Typography>
    </Box>
  );
}
