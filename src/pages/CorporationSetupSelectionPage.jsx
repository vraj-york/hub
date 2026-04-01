import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import { BackButton } from '../components/common/BackButton';
import { SetupTypeCard } from '../components/corporation-creation/SetupTypeCard';
import { setCorporationFlowType } from '../store/slices/corporationCreationSlice';

const QUICK_SETUP_FEATURES = [
  { stepNumber: 1, title: 'Corporation & Company', subtitle: 'Create both in one flow' },
  { stepNumber: 2, title: 'Admin User Setup', subtitle: 'First admin created automatically' },
  { stepNumber: 3, title: 'Plan Allocation', subtitle: 'Trial or paid plans' },
  { stepNumber: 4, title: 'Smart Defaults', subtitle: 'Preconfigured best practices' },
];

const ADVANCE_SETUP_FEATURES = [
  { stepNumber: 1, title: 'Multiple Companies', subtitle: 'Add several companies at once' },
  { stepNumber: 2, title: 'Granular Control', subtitle: 'Configure every detail' },
  { stepNumber: 3, title: 'Custom Permissions', subtitle: 'Define role-based access' },
  { stepNumber: 4, title: 'Customised Billing', subtitle: 'Multi-tier pricing setup' },
];

export function CorporationSetupSelectionPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelect = (type) => {
    dispatch(setCorporationFlowType(type));
    navigate(`/corporations/add?flow=${type}`);
  };

  return (
    <SuperAdminLayout>
      <Box
        sx={{
          background: 'rgba(248, 247, 251, 1)',
          minHeight: 'calc(100vh - 64px)',
          p: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <BackButton
            to="/corporations"
            ariaLabel="Back to Corporation Directory"
            label="Back"
            iconColor="rgba(47, 65, 74, 1)"
          />
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              color: 'rgba(47, 65, 74, 1)',
            }}
          >
            Choose Setup Type
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            maxWidth: 1100,
          }}
        >
          <SetupTypeCard
            type="quick"
            title="Quick Setup"
            description="Best for first-time onboarding. Applies system defaults and guides you through the essentials in a streamlined 4-step process. Perfect for getting started quickly."
            etaText="4 steps | ~2 minutes | System defaults applied"
            features={QUICK_SETUP_FEATURES}
            onSelect={handleSelect}
            isRecommended
          />
          <SetupTypeCard
            type="advance"
            title="Advanced Setup"
            description="Full control over companies, plans, and permissions. Configure detailed settings, add multiple companies, and customize security policies from the ground up."
            etaText="Multiple nested steps | Advanced users | Full customization"
            features={ADVANCE_SETUP_FEATURES}
            onSelect={handleSelect}
            isRecommended={false}
          />
        </Box>
      </Box>
    </SuperAdminLayout>
  );
}
