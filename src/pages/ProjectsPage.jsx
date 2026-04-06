import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import '../assets/styles/projectsPageTitle.css';
import mockProjectsList from '../assets/data/mockProjectsList.json';

export function ProjectsPage() {
  return (
    <SuperAdminLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
          height: '100%',
        }}
      >
        <Box
          sx={{
            height: 52,
            flexShrink: 0,
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            px: 0,
          }}
        >
          <Typography
            component="h1"
            sx={{
              margin: 0,
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--projects-page-title-color)',
              lineHeight: 1.5,
            }}
          >
            Projects
          </Typography>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto', minWidth: 0, mt: 2 }}>
          <Table
            sx={{
              width: '100%',
              borderCollapse: 'collapse',
              '& .MuiTableCell-root': { borderBottom: 'none' },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 2, py: 1.5, fontSize: 13, fontWeight: 600, color: '#6B7280' }}>
                  Client
                </TableCell>
                <TableCell sx={{ px: 2, py: 1.5, fontSize: 13, fontWeight: 600, color: '#6B7280' }}>
                  Project
                </TableCell>
                <TableCell sx={{ px: 2, py: 1.5, fontSize: 13, fontWeight: 600, color: '#6B7280' }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockProjectsList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #F3F4F6',
                    '&:last-child td': { borderBottom: '1px solid #F3F4F6' },
                    '&:hover .project-name': { color: '#2563EB' },
                  }}
                >
                  <TableCell sx={{ px: 2, py: 1.25, verticalAlign: 'middle' }}>
                    <Typography component="span" sx={{ fontSize: 13, color: '#111827' }}>
                      {row.client}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ px: 2, py: 1.25, verticalAlign: 'middle' }}>
                    <Typography
                      component="span"
                      className="project-name"
                      sx={{
                        fontSize: 13,
                        color: '#111827',
                        fontWeight: 500,
                        transition: 'color 0.15s ease',
                      }}
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ px: 2, py: 1.25, verticalAlign: 'middle' }}>
                    <Typography component="span" sx={{ fontSize: 13, color: '#111827' }}>
                      {row.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </SuperAdminLayout>
  );
}
