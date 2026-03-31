import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';

export function CompanyProfilePage() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  return (
    <SuperAdminLayout>
      <Box sx={{ py: 4 }}>
        <Button
          onClick={() => navigate(-1)}
          sx={{ mb: 2, color: 'var(--color-primary-dark)', textTransform: 'none' }}
        >
          Back
        </Button>
        <Typography variant="h5" sx={{ color: 'var(--color-primary-dark)' }}>
          Company Profile: {companyId}
        </Typography>
        <Typography sx={{ mt: 1, color: 'var(--color-secondary-blue)' }}>
          Company details would be displayed here.
        </Typography>
      </Box>
    </SuperAdminLayout>
  );
}
