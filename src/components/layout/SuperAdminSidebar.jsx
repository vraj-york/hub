import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  PanelLeft,
  Building2,
  Users,
  Settings,
  LayoutDashboard,
  MapPin,
  UserRoundCog,
  UserRound,
  Shield,
  GraduationCap,
  CreditCard,
  Landmark,
  Tag,
  FileQuestion,
  BookOpen,
  Activity,
  Lock,
  FileSpreadsheet,
  Wrench,
  BarChart3,
  Bell,
  X,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, selectIsSidebarOpen } from '../../store/slices/uiSlice';
import { selectCurrentCorporationLogoUrl } from '../../store/slices/corporationsSlice';

const sidebarGroups = [
  {
    label: 'Main',
    items: [{ label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Administration',
    items: [
      { label: 'Corporation Directory', path: '/corporations', icon: Building2 },
      { label: 'Company Directory', path: '/companies', icon: MapPin },
    ],
  },
  {
    label: 'Users & Access',
    items: [
      { label: 'User Directory', path: '/admin/users', icon: Users },
      { label: 'Company Admins', path: '/admin/company-admins', icon: UserRoundCog },
      { label: 'Team Leads', path: '/admin/team-leads', icon: UserRound },
      { label: 'Roles & Permissions', path: '/admin/roles', icon: Shield },
      { label: 'Coaches', path: '/admin/coaches', icon: GraduationCap },
    ],
  },
  {
    label: 'Finance',
    items: [
      { label: 'Billing Overview', path: '/admin/billing', icon: CreditCard },
      { label: 'Global Billing Settings', path: '/admin/billing/global', icon: Landmark },
      { label: 'Promo Code Management', path: '/admin/promo', icon: Tag },
    ],
  },
  {
    label: 'Assessments',
    items: [{ label: 'Question Bank', path: '/admin/question-bank', icon: FileQuestion }],
  },
  {
    label: 'BSPU',
    items: [{ label: 'Learning Library', path: '/admin/learning', icon: BookOpen }],
  },
  {
    label: 'System',
    items: [
      { label: 'System Health', path: '/admin/health', icon: Activity },
      { label: 'Security Baselines', path: '/admin/security', icon: Lock },
      { label: 'Audit Logs', path: '/admin/audit', icon: FileSpreadsheet },
      { label: 'Maintenance', path: '/admin/maintenance', icon: Wrench },
    ],
  },
  {
    label: 'Insights',
    items: [{ label: 'Reports', path: '/admin/reports', icon: BarChart3 }],
  },
  {
    label: 'Notifications',
    items: [{ label: 'Notifications', path: '/notifications', icon: Bell, badgeCount: 1 }],
  },
  {
    label: 'Configuration',
    items: [{ label: 'Settings', path: '/settings', icon: Settings }],
  },
];

export function SuperAdminSidebar({ variant, onNavigate, onClose } = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsSidebarOpen);
  const corporationLogoUrl = useSelector(selectCurrentCorporationLogoUrl);
  const isDrawer = variant === 'drawer';
  
  // Check if we're on a corporation profile page
  const isCorporationProfilePage = location.pathname.match(/^\/corporations\/[^/]+\/profile/);
  const logoSrc = isCorporationProfilePage && corporationLogoUrl ? corporationLogoUrl : '/vectors/l.svg';

  const handleNavClick = (path) => {
    if (isDrawer && onNavigate) onNavigate();
    navigate(path);
  };

  return (
    <Box
      id={isDrawer ? 'mobile-sidebar-panel' : undefined}
      role="navigation"
      aria-modal={isDrawer ? 'true' : undefined}
      sx={{
        width: isDrawer ? 240 : isOpen ? 240 : 0,
        minWidth: isDrawer ? 240 : isOpen ? 240 : 0,
        background: 'var(--color-white)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: isDrawer ? 'none' : 'width 200ms ease-out',
        borderRight: isDrawer ? 'none' : '1px solid var(--color-grey-400)',
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid var(--color-grey-400)' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <img
              src={logoSrc}
              alt={isCorporationProfilePage && corporationLogoUrl ? "Corporation logo" : "BSPBlueprint logo"}
              style={{ height: 32, width: 'auto' }}
            />
            {isCorporationProfilePage && corporationLogoUrl && (
              <Typography
                sx={{
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: 'rgba(73, 130, 145, 1)',
                  mt: 0.5,
                }}
              >
                powered by BSPBlueprint
              </Typography>
            )}
          </Box>
          {isDrawer && onClose ? (
            <IconButton
              size="small"
              onClick={onClose}
              aria-label="Close navigation menu"
              sx={{
                color: 'rgba(73, 130, 145, 1)',
                width: 37.25,
                height: 36,
                p: 0,
              }}
            >
              <X size={16} strokeWidth={1.5} />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              onClick={() => dispatch(toggleSidebar())}
              aria-label="Collapse sidebar"
              sx={{
                color: 'rgba(73, 130, 145, 1)',
                width: 37.25,
                height: 36,
                p: 0,
              }}
            >
              <PanelLeft size={16} strokeWidth={1.5} />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        {sidebarGroups.map((group) => (
          <Box key={group.label} sx={{ mb: 1 }}>
            <Typography
              variant="overline"
              sx={{
                px: 2,
                py: 0.5,
                display: 'block',
                color: 'rgba(73, 130, 145, 1)',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            >
              {group.label}
            </Typography>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isDashboard = item.path === '/dashboard';
              const isCompaniesDirectory = item.path === '/companies';
              const isActive =
                item.path === '/corporations'
                  ? location.pathname.startsWith('/corporations')
                  : isCompaniesDirectory
                    ? location.pathname.startsWith('/companies')
                    : isDashboard
                      ? location.pathname === '/dashboard'
                      : location.pathname.startsWith(item.path);
              const isDashboardActive = isDashboard && isActive;
              const isCompaniesDirectoryActive = isCompaniesDirectory && isActive;
              const ariaLabel = item.badgeCount
                ? `${item.label}, ${item.badgeCount} new notification${item.badgeCount !== 1 ? 's' : ''}`
                : `Navigate to ${item.label}`;
              return (
                <Box
                  key={item.path + item.label}
                  onClick={() => handleNavClick(item.path)}
                  role="link"
                  aria-label={ariaLabel}
                  aria-current={isDashboardActive || isCompaniesDirectoryActive ? 'page' : undefined}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mx: 1,
                    py: 1,
                    px: 1.5,
                    borderRadius: 1,
                    cursor: 'pointer',
                    background: isDashboardActive || isCompaniesDirectoryActive
                      ? 'rgba(48, 95, 161, 1)'
                      : isActive
                        ? 'var(--color-grey-100)'
                        : 'transparent',
                    borderLeft: isActive && !isDashboardActive && !isCompaniesDirectoryActive ? '4px solid var(--color-accent-blue)' : '4px solid transparent',
                    color: isDashboardActive || isCompaniesDirectoryActive
                      ? 'rgba(255, 255, 255, 1)'
                      : isActive
                        ? 'var(--color-accent-blue)'
                        : 'var(--color-primary-dark)',
                    '&:hover': {
                      background: isDashboardActive || isCompaniesDirectoryActive
                        ? 'rgba(48, 95, 161, 0.9)'
                        : isActive
                          ? 'var(--color-grey-100)'
                          : 'rgba(231, 237, 247, 0.5)',
                      color: isDashboardActive || isCompaniesDirectoryActive ? 'rgba(255, 255, 255, 1)' : 'var(--color-accent-blue)',
                    },
                  }}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    style={{
                      flexShrink: 0,
                      color: Icon === Settings
                        ? 'rgba(52, 76, 86, 1)'
                        : isDashboardActive || isCompaniesDirectoryActive
                          ? 'rgba(255, 255, 255, 1)'
                          : 'rgba(47, 65, 74, 1)',
                    }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 400, fontSize: '0.875rem', flex: 1 }}>
                    {item.label}
                  </Typography>
                  {item.badgeCount != null && item.badgeCount > 0 && (
                    <Box
                      component="span"
                      sx={{
                        background: 'rgba(241, 246, 253, 1)',
                        color: 'rgba(58, 111, 216, 1)',
                        borderRadius: 9999,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        px: 1,
                        py: 0.25,
                        minWidth: 20,
                        textAlign: 'center',
                      }}
                    >
                      {item.badgeCount}
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
