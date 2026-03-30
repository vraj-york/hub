import { Box, Typography } from '@mui/material';
import { CorporationCompanyAssignmentInfoCard } from './CorporationCompanyAssignmentInfoCard';
import { CompanyCard } from '../CompanyCard';
import { AddCompanyToListButton } from './AddCompanyToListButton';

/**
 * Step 2 Company Setup: info card, list of company cards with edit/delete, and Add New Company button.
 */
export function CompanyAssignmentList({
  companies = [],
  onAddCompany,
  onEditCompany,
  onDeleteCompany,
  infoCardTitle,
  infoCardDescription,
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <CorporationCompanyAssignmentInfoCard title={infoCardTitle} description={infoCardDescription} />
      <Typography
        component="span"
        id="companies-list-label"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          color: 'rgba(56, 89, 102, 1)',
        }}
      >
        Companies ({companies.length})
      </Typography>
      <Box
        component="ul"
        aria-labelledby="companies-list-label"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          listStyle: 'none',
          m: 0,
          p: 0,
        }}
      >
        {companies.map((company) => (
          <Box component="li" key={company.id}>
            <CompanyCard
              company={company}
              onEdit={onEditCompany}
              onDelete={onDeleteCompany}
            />
          </Box>
        ))}
      </Box>
      <AddCompanyToListButton onClick={onAddCompany} label="Add New Company" />
    </Box>
  );
}
