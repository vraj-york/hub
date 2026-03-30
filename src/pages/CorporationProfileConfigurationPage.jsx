import { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { SquarePen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentCorporation,
  setLoading,
  setSelectedTab,
  closeCorporationRequest,
  resetCloseCorporationStatus,
  suspendCorporationRequest,
  resetSuspendCorporationStatus,
  selectCurrentCorporation,
  selectSelectedTab,
  selectCloseCorporationStatus,
  selectCloseCorporationError,
  selectSuspendCorporationStatus,
  selectSuspendCorporationError,
  selectCurrentCorporationLoading,
} from '../store/slices/corporationsSlice';
import {
  openCloseCorporationModal,
  closeCloseCorporationModal,
  openSuspendCorporationModal,
  closeSuspendCorporationModal,
  selectIsCloseCorporationModalOpen,
  selectIsSuspendCorporationModalOpen,
} from '../store/slices/uiSlice';
import { setToastMessage } from '../store/slices/authSlice';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import { BackButton } from '../components/common/BackButton';
import { Badge } from '../components/common/Badge';
import { ProfileTabs } from '../components/ProfileTabs';
import { CorporationAuditLogTable } from '../components/corporation-profile/CorporationAuditLogTable';
import { CorporationBasicInfoView } from '../components/corporation-profile/CorporationBasicInfoView';
import { CorporationKeyContactsView } from '../components/corporation-profile/CorporationKeyContactsView';
import { CorporationPlanAndSeatsView } from '../components/corporation-profile/CorporationPlanAndSeatsView';
import { CorporationConfiguration2View } from '../components/corporation-profile/CorporationConfiguration2View';
import { CloseCorporationConfirmationModal } from '../components/company-profile-config/CloseCorporationConfirmationModal';
import { SuspendCorporationConfirmationModal } from '../components/company-profile-config/SuspendCorporationConfirmationModal';
import { mockCorporationProfile } from '../data/mockCorporation';

const PROFILE_TABS = [
  { label: 'Basic Info.', value: 'basic-info' },
  { label: 'Key Contacts', value: 'key-contacts' },
  { label: 'Plan & Seats', value: 'plan-and-seats' },
  { label: 'Configuration', value: 'configuration' },
  { label: 'Configuration', value: 'configuration-2' },
];

export function CorporationProfileConfigurationPage() {
  const { corporationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const corporation = useSelector(selectCurrentCorporation);
  const loading = useSelector(selectCurrentCorporationLoading);
  const activeTab = useSelector(selectSelectedTab);
  const isCloseCorporationModalOpen = useSelector(selectIsCloseCorporationModalOpen);
  const closeCorporationStatus = useSelector(selectCloseCorporationStatus);
  const closeCorporationError = useSelector(selectCloseCorporationError);
  const isSuspendCorporationModalOpen = useSelector(selectIsSuspendCorporationModalOpen);
  const suspendCorporationStatus = useSelector(selectSuspendCorporationStatus);
  const suspendCorporationError = useSelector(selectSuspendCorporationError);

  useEffect(() => {
    dispatch(setLoading(true));
    const timer = setTimeout(() => {
      dispatch(setCurrentCorporation({ ...mockCorporationProfile, id: corporationId }));
      dispatch(setLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [corporationId, dispatch]);

  useEffect(() => {
    if (closeCorporationStatus === 'success') {
      dispatch(closeCloseCorporationModal());
      dispatch(resetCloseCorporationStatus());
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Corporation closed',
          body: 'The corporation has been closed successfully.',
          severity: 'info',
        })
      );
      navigate('/corporations');
    }
  }, [closeCorporationStatus, dispatch, navigate]);

  useEffect(() => {
    if (closeCorporationStatus === 'error' && closeCorporationError) {
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Failed to close corporation',
          body: closeCorporationError,
          severity: 'error',
        })
      );
      dispatch(resetCloseCorporationStatus());
    }
  }, [closeCorporationStatus, closeCorporationError, dispatch]);

  useEffect(() => {
    if (suspendCorporationStatus === 'success') {
      dispatch(closeSuspendCorporationModal());
      dispatch(resetSuspendCorporationStatus());
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Corporation suspended',
          body: 'The corporation has been suspended successfully.',
          severity: 'info',
        })
      );
    }
  }, [suspendCorporationStatus, dispatch]);

  useEffect(() => {
    if (suspendCorporationStatus === 'error' && suspendCorporationError) {
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Failed to suspend corporation',
          body: suspendCorporationError,
          severity: 'error',
        })
      );
      dispatch(resetSuspendCorporationStatus());
    }
  }, [suspendCorporationStatus, suspendCorporationError, dispatch]);

  const handleTabChange = useCallback(
    (value) => {
      dispatch(setSelectedTab(value));
    },
    [dispatch]
  );

  if (!corporation) {
    return (
      <SuperAdminLayout>
        <Box sx={{ py: 4 }}>
          <Typography>Loading...</Typography>
        </Box>
      </SuperAdminLayout>
    );
  }

  const corporationName = corporation.name ?? 'Corporation';

  return (
    <SuperAdminLayout>
      <Box sx={{ maxWidth: 1200 }}>
        <Box sx={{ mb: 3 }}>
          <BackButton to="/corporations" ariaLabel="Back to corporation directory" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 600,
                fontSize: '20px',
                color: 'rgba(47, 65, 74, 1)',
                fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              }}
            >
              {corporation.name}
            </Typography>
            <Badge label={corporation.code} variant="primary" />
            <Badge label={corporation.status} variant="success" />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={
                <SquarePen size={18} strokeWidth={1.5} style={{ color: 'rgba(52, 76, 86, 1)' }} />
              }
              onClick={() => navigate(`/corporations/${corporationId}/edit`)}
              sx={{
                background: 'rgba(255, 255, 255, 1)',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: 'rgba(47, 65, 74, 1)',
                borderColor: 'var(--color-grey-400)',
                borderRadius: 1,
                textTransform: 'none',
                '&:hover': {
                  background: 'rgba(0, 0, 0, 0.04)',
                  borderColor: 'var(--color-grey-400)',
                },
              }}
              aria-label="Edit corporation details"
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              onClick={() => dispatch(openSuspendCorporationModal())}
              sx={{
                background: 'rgba(255, 255, 255, 1)',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: 'rgba(196, 71, 85, 1)',
                borderColor: 'rgba(196, 71, 85, 1)',
                borderRadius: 1,
                textTransform: 'none',
                '&:hover': {
                  background: 'rgba(196, 71, 85, 0.08)',
                  borderColor: 'rgba(196, 71, 85, 1)',
                },
              }}
              aria-label={`Suspend corporation ${corporationName}`}
              aria-haspopup="dialog"
            >
              Suspend
            </Button>
            <Button
              variant="contained"
              onClick={() => dispatch(openCloseCorporationModal())}
              sx={{
                fontWeight: 600,
                fontSize: '0.875rem',
                background: 'rgba(196, 71, 85, 1)',
                color: 'rgba(255, 255, 255, 1)',
                borderRadius: 1,
                textTransform: 'none',
                '&:hover': {
                  background: '#a83a4a',
                  color: 'rgba(255, 255, 255, 1)',
                },
              }}
              aria-label={`Close corporation ${corporationName}`}
              aria-haspopup="dialog"
            >
              Close Corporation
            </Button>
          </Box>
        </Box>
        <ProfileTabs tabs={PROFILE_TABS} activeTab={activeTab} onTabChange={handleTabChange} />
        <Box
          sx={{
            background: activeTab === 'basic-info' ? 'rgba(248, 247, 251, 1)' : 'rgba(255, 255, 255, 1)',
            borderRadius: '0 0 8px 8px',
            p: activeTab === 'basic-info' ? 0 : 3,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          {activeTab === 'basic-info' && (
            <CorporationBasicInfoView
              corporationProfile={corporation}
              isLoading={loading}
            />
          )}
          {activeTab === 'key-contacts' && (
            <CorporationKeyContactsView />
          )}
          {activeTab === 'plan-and-seats' && (
            <CorporationPlanAndSeatsView />
          )}
          {activeTab === 'configuration' && (
            <CorporationAuditLogTable corporationId={corporationId} />
          )}
          {activeTab === 'configuration-2' && (
            <CorporationConfiguration2View />
          )}
        </Box>
        <CloseCorporationConfirmationModal
          isOpen={isCloseCorporationModalOpen}
          onClose={() => dispatch(closeCloseCorporationModal())}
          onSubmit={({ reasonId, notes }) =>
            dispatch(closeCorporationRequest({ corporationId, reasonId, notes }))
          }
          corporationName={corporation.name}
          isSubmitting={closeCorporationStatus === 'pending'}
          closeCorporationStatus={closeCorporationStatus}
          onResetStatus={() => dispatch(resetCloseCorporationStatus())}
        />
        <SuspendCorporationConfirmationModal
          isOpen={isSuspendCorporationModalOpen}
          onClose={() => dispatch(closeSuspendCorporationModal())}
          onSubmit={({ reasonId, notes }) =>
            dispatch(suspendCorporationRequest({ corporationId, reasonId, notes }))
          }
          corporationName={corporation.name}
          isSubmitting={suspendCorporationStatus === 'pending'}
          suspendCorporationStatus={suspendCorporationStatus}
          onResetStatus={() => dispatch(resetSuspendCorporationStatus())}
        />
      </Box>
    </SuperAdminLayout>
  );
}
