import { useEffect } from 'react';
import { Box, Typography, Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import { ExportReportButton } from '../components/common/ExportReportButton';
import { SuperAdminPersonaDisplay } from '../components/common/SuperAdminPersonaDisplay';
import {
  fetchDashboardData,
  selectDashboardData,
  selectDashboardLoading,
  selectIsDashboardEmpty,
} from '../store/slices/dashboardSlice';
import {
  selectCurrentPersonaType,
  selectActiveThemePreference,
} from '../store/slices/authSlice';
import { setActiveSidebarItem } from '../store/slices/uiSlice';

function themePreferenceToDisplay(preference) {
  if (preference === 'dark') return 'Dark Theme';
  return 'Light Theme';
}

export function DashboardPage() {
  const dispatch = useDispatch();
  const dashboardData = useSelector(selectDashboardData);
  const dashboardLoading = useSelector(selectDashboardLoading);
  const isEmptyState = useSelector(selectIsDashboardEmpty);
  const personaType = useSelector(selectCurrentPersonaType);
  const themePreference = useSelector(selectActiveThemePreference);

  useEffect(() => {
    dispatch(setActiveSidebarItem('dashboard'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const handleExportReport = () => {
    if (!isEmptyState) {
      // Placeholder: trigger export (e.g. CSV/PDF)
    }
  };

  return (
    <SuperAdminLayout>
      <Box component="main" role="main" sx={{ py: 0, px: 0 }}>
        <Box sx={{ mb: 3 }}>
          <SuperAdminPersonaDisplay
            personaType={personaType ?? 'Super Admin Persona'}
            themePreference={themePreferenceToDisplay(themePreference)}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                fontWeight: 600,
                fontSize: 16,
                color: 'rgba(47, 65, 74, 1)',
                mb: 0.5,
              }}
            >
              Dashboard Overview
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                fontSize: 14,
                color: 'rgba(56, 89, 102, 1)',
              }}
            >
              Monitor and manage your entire platform
            </Typography>
          </Box>
          <ExportReportButton
            onClick={handleExportReport}
            disabled={isEmptyState}
            aria-label="Export dashboard report"
          />
        </Box>

        <Card
          sx={{
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            minHeight: 320,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {dashboardLoading ? (
            <Typography
              sx={{
                fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                fontSize: 14,
                color: 'rgba(56, 89, 102, 1)',
              }}
            >
              Loading...
            </Typography>
          ) : isEmptyState ? (
            <Box
              role="status"
              aria-live="polite"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                py: 6,
                px: 3,
              }}
            >
              <Typography
                component="p"
                sx={{
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontWeight: 600,
                  fontSize: 20,
                  color: 'rgba(47, 65, 74, 1)',
                  textAlign: 'center',
                }}
              >
                No metrics available
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontWeight: 500,
                  fontSize: 14,
                  color: 'rgba(73, 130, 145, 1)',
                  textAlign: 'center',
                }}
              >
                Metrics will appear here once data is generated.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ p: 3 }}>
              {/* Future: DashboardMetricCard, LineChart, IconHoverCard when dashboardData is populated */}
              {dashboardData && (
                <Typography sx={{ color: 'rgba(56, 89, 102, 1)', fontSize: 14 }}>
                  Dashboard content (populated state) to be implemented.
                </Typography>
              )}
            </Box>
          )}
        </Card>
      </Box>
    </SuperAdminLayout>
  );
}
