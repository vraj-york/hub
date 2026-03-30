import { Box, Typography, InputBase } from '@mui/material';
import { Search, Building2 } from 'lucide-react';

const mockCompanies = [
  { id: 1, name: 'Tech Ventures Digital', type: 'Operating Company', region: 'North America' },
  { id: 2, name: 'Innovation Labs', type: 'Subsidiary', region: 'Europe' },
  { id: 3, name: 'Marit Inc.', type: 'Franchise', region: 'United Kingdom' },
];

function CompanyCard({ name, type, region }) {
  return (
    <Box
      sx={{
        background: 'rgba(255, 255, 255, 1)',
        border: '1px solid rgba(221, 217, 235, 1)',
        borderRadius: '8px',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        minWidth: 280,
        flex: 1,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '8px',
          background: 'rgba(241, 240, 247, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Building2 size={20} color="rgba(48, 95, 161, 1)" />
      </Box>
      <Box>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            color: 'rgba(47, 65, 74, 1)',
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '12px',
            fontWeight: 400,
            color: 'rgba(56, 89, 102, 1)',
          }}
        >
          {type} • {region}
        </Typography>
      </Box>
    </Box>
  );
}

export function CorporationKeyContactsView() {
  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: 'rgba(47, 65, 74, 1)',
          }}
        >
          Companies ({mockCompanies.length})
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            background: 'rgba(255, 255, 255, 1)',
            border: '1px solid rgba(221, 217, 235, 1)',
            borderRadius: '8px',
            px: 1.5,
            py: 0.75,
            width: 200,
          }}
        >
          <Search size={16} color="rgba(107, 119, 127, 1)" />
          <InputBase
            placeholder="Search here..."
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              color: 'rgba(47, 65, 74, 1)',
              flex: 1,
              '& input::placeholder': {
                color: 'rgba(107, 119, 127, 1)',
                opacity: 1,
              },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {mockCompanies.map((company) => (
          <CompanyCard
            key={company.id}
            name={company.name}
            type={company.type}
            region={company.region}
          />
        ))}
      </Box>
    </Box>
  );
}
