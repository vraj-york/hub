import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import { setActiveSidebarItem } from '../store/slices/uiSlice';
import projectsPageContent from '../assets/data/projectsPageContent.json';

export function ProjectsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveSidebarItem('projects'));
  }, [dispatch]);

  return (
    <SuperAdminLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, height: '100%' }}>
        <Box
          sx={{
            height: 52,
            flexShrink: 0,
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            sx={{
              margin: 0,
              fontSize: 20,
              fontWeight: 600,
              color: '#111827',
              lineHeight: 1.5,
            }}
          >
            {projectsPageContent.pageTitle}
          </Typography>
        </Box>
      </Box>
    </SuperAdminLayout>
  );
}
