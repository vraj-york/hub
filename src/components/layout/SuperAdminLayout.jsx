import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { SuperAdminSidebar } from './SuperAdminSidebar';
import { AppHeader } from './AppHeader';
import { MobileDashboardHeader } from './MobileDashboardHeader';
import { closeMobileSidebar, selectIsMobileSidebarOpen } from '../../store/slices/uiSlice';

const MOBILE_BREAKPOINT = 'md';

export function SuperAdminLayout({ children }) {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down(MOBILE_BREAKPOINT));
  const dispatch = useDispatch();
  const isMobileSidebarOpen = useSelector(selectIsMobileSidebarOpen);

  const handleCloseMobileSidebar = () => {
    dispatch(closeMobileSidebar());
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'var(--color-background)' }}>
      {isMobileView ? (
        <>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <MobileDashboardHeader />
            <Box component="main" sx={{ flex: 1, py: 3, px: 4 }}>
              {children}
            </Box>
          </Box>
          <Drawer
            anchor="left"
            open={isMobileSidebarOpen}
            onClose={handleCloseMobileSidebar}
            ModalProps={{
              keepMounted: true,
              'aria-label': 'Mobile navigation menu',
            }}
            sx={{
              display: { xs: 'block', [theme.breakpoints.up(MOBILE_BREAKPOINT)]: 'none' },
              '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
                top: 0,
                left: 0,
              },
            }}
          >
            <SuperAdminSidebar
              variant="drawer"
              onNavigate={handleCloseMobileSidebar}
              onClose={handleCloseMobileSidebar}
            />
          </Drawer>
        </>
      ) : (
        <>
          <SuperAdminSidebar />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <AppHeader />
            <Box component="main" sx={{ flex: 1, py: 3, px: 4 }}>
              {children}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
