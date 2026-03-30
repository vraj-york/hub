import { Box, IconButton } from '@mui/material';
import { PanelLeft, MoreVertical } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { openMobileSidebar, closeMobileSidebar, selectIsMobileSidebarOpen } from '../../store/slices/uiSlice';
import { BSPBlueprintLogo } from '../common/BSPBlueprintLogo';

const iconColor = 'rgba(73, 130, 145, 1)';

export function MobileDashboardHeader() {
  const dispatch = useDispatch();
  const isMobileSidebarOpen = useSelector(selectIsMobileSidebarOpen);

  const handleToggleSidebar = () => {
    if (isMobileSidebarOpen) {
      dispatch(closeMobileSidebar());
    } else {
      dispatch(openMobileSidebar());
    }
  };

  return (
    <Box
      component="header"
      role="banner"
      sx={{
        background: 'rgba(255, 255, 255, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1.5,
        minHeight: 56,
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
      }}
    >
      <IconButton
        size="small"
        onClick={handleToggleSidebar}
        role="button"
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileSidebarOpen}
        aria-controls="mobile-sidebar-panel"
        sx={{ color: iconColor }}
      >
        <PanelLeft size={20} strokeWidth={1.5} />
      </IconButton>
      <BSPBlueprintLogo width="282.5px" height="40px" />
      <IconButton
        size="small"
        role="button"
        aria-label="More options"
        aria-haspopup="menu"
        sx={{ color: iconColor }}
      >
        <MoreVertical size={20} strokeWidth={1.5} />
      </IconButton>
    </Box>
  );
}
