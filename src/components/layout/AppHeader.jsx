import { Box, Typography, IconButton } from '@mui/material';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ChevronRight, Moon, Bell } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCurrentCorporation } from '../../store/slices/corporationsSlice';
import { selectCurrentCompany } from '../../store/slices/companyConfigSlice';

const breadcrumbSegments = (corporationName) => [
  { label: 'Corporation Directory', path: '/corporations' },
  { label: corporationName || 'Corporation Profile', current: true },
];

const companyDirectoryBreadcrumbs = (companyName, companyId = null, isEdit = false) => {
  const segments = [
    { label: 'Company Directory', path: '/companies' },
    { label: companyName || 'Company', path: isEdit && companyId ? `/companies/${companyId}` : undefined, current: !isEdit },
  ];
  if (isEdit) {
    segments.push({ label: 'Edit', current: true });
  }
  return segments;
};

const addCompanyBreadcrumbs = [
  { label: 'Company Directory', path: '/companies' },
  { label: 'Add New Company', current: true },
];

const addCorporationChooseSetupBreadcrumbs = [
  { label: 'Corporation Directory', path: '/corporations' },
  { label: 'Choose Setup', current: true },
];

const addCorporationBreadcrumbs = [
  { label: 'Corporation Directory', path: '/corporations' },
  { label: 'Add New Corporation', current: true },
];

const dashboardBreadcrumbs = [{ label: 'Dashboard', path: '/dashboard', current: true }];

export function AppHeader() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const corporation = useSelector(selectCurrentCorporation);
  const currentCompany = useSelector(selectCurrentCompany);
  const isOnDashboard = location.pathname === '/dashboard';
  const isOnProfile = location.pathname.match(/\/corporations\/[^/]+\/profile/);
  const isOnCompaniesList = location.pathname === '/companies';
  const isOnCompanyView = location.pathname.match(/^\/companies\/[^/]+$/) && !location.pathname.startsWith('/companies/add');
  const isOnCompanyEdit = location.pathname.match(/^\/companies\/[^/]+\/edit$/);
  const companyIdFromPath = isOnCompanyEdit ? location.pathname.split('/')[2] : null;
  const isAddCompany = location.pathname.startsWith('/companies/add');
  const isAddCorporation = location.pathname.startsWith('/corporations/add');
  const corporationAddFlow = searchParams.get('flow');
  const isCorporationSetupSelection = isAddCorporation && (corporationAddFlow !== 'quick' && corporationAddFlow !== 'advance');
  const segments = isOnDashboard
    ? dashboardBreadcrumbs
    : isAddCorporation
    ? (isCorporationSetupSelection ? addCorporationChooseSetupBreadcrumbs : addCorporationBreadcrumbs)
    : isAddCompany
    ? addCompanyBreadcrumbs
    : isOnCompaniesList
    ? [{ label: 'Company Directory', path: '/companies', current: true }]
    : isOnCompanyEdit && currentCompany
      ? companyDirectoryBreadcrumbs(currentCompany.name, companyIdFromPath, true)
      : isOnCompanyView && currentCompany
        ? companyDirectoryBreadcrumbs(currentCompany.name, companyIdFromPath, false)
        : isOnProfile && corporation
          ? breadcrumbSegments(corporation.name)
          : [{ label: 'Corporation Directory', path: '/corporations', current: location.pathname === '/corporations' }];

  return (
    <Box
      sx={{
        height: 64,
        background: 'var(--color-white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4,
        boxShadow: 'var(--box-shadow-header)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }} role="navigation" aria-label="Breadcrumb">
        {segments.map((seg, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {i > 0 && (
              <ChevronRight size={16} style={{ color: 'var(--color-secondary-blue)' }} aria-hidden />
            )}
            {seg.current ? (
              <Typography
                variant="subtitle2"
                aria-current={seg.current && (seg.label === 'Add New Corporation' || seg.label === 'Choose Setup') ? 'page' : undefined}
                sx={{
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: 'var(--color-primary-dark)',
                }}
              >
                {seg.label}
              </Typography>
            ) : (
              <Link
                to={seg.path}
                style={{
                  fontWeight: 400,
                  fontSize: '0.875rem',
                  color: 'var(--color-secondary-blue)',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => {
                  e.target.style.color = 'var(--color-accent-blue)';
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = 'var(--color-secondary-blue)';
                  e.target.style.textDecoration = 'none';
                }}
              >
                {seg.label}
              </Link>
            )}
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton size="small" aria-label="Toggle dark mode">
          <Moon size={20} strokeWidth={1.5} style={{ color: 'var(--color-primary-dark)' }} />
        </IconButton>
        <IconButton size="small" aria-label="Notifications">
          <Bell size={20} strokeWidth={1.5} style={{ color: 'var(--color-primary-dark)' }} />
        </IconButton>
        <img
          src="/vectors/separator.svg"
          alt=""
          aria-hidden
          style={{ width: 1, height: 24, margin: '0 4px' }}
        />
        <Box
          component="img"
          src="/images/Image-5e3027d6.png"
          alt="User avatar"
          sx={{ width: 36, height: 36, borderRadius: '50%' }}
        />
      </Box>
    </Box>
  );
}
