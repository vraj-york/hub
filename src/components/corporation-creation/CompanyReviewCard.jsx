import { Box, Typography } from '@mui/material';
import { Building2 } from 'lucide-react';

/**
 * Read-only card displaying a single company summary (name, type, location)
 * for the Add New Corporation Step 5 Confirmation section.
 */
export function CompanyReviewCard({ companyName, companyType, location }) {
  return (
    <Box
      tabIndex={-1}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 1,
        px: 1.5,
        borderRadius: 2,
        background: '#fff',
        border: '1px solid rgba(221, 217, 235, 1)',
      }}
      aria-label={`Company: ${companyName}, Type: ${companyType}, Location: ${location}`}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 1,
          background: 'rgba(231, 237, 247, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
        aria-hidden
      >
        <Building2 size={20} color="rgba(48, 95, 161, 1)" strokeWidth={2} />
      </Box>
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'rgba(100, 157, 172, 1)',
          flexShrink: 0,
        }}
        aria-hidden
      />
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(47, 65, 74, 1)',
          }}
        >
          {companyName ?? 'N/A'}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '12px',
            fontWeight: 400,
            color: 'rgba(56, 89, 102, 1)',
            mt: 0.25,
          }}
        >
          {companyType ?? 'N/A'}, {location ?? 'N/A'}
        </Typography>
      </Box>
    </Box>
  );
}
