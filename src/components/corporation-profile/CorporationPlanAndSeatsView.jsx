import { Box, Typography, InputBase, Select, MenuItem, Button } from '@mui/material';
import { Search, Upload } from 'lucide-react';

const statsData = [
  { label: 'Active Users', value: '245', subtext: 'Last 30 days', change: '+2.5%', changeType: 'positive' },
  { label: 'Active Companies', value: '12', subtext: 'Last 30 days', change: '+2.5%', changeType: 'positive' },
  { label: 'Active Teams', value: '34', subtext: 'Across corporation', change: '-1.6%', changeType: 'negative' },
  { label: 'Login Sessions', value: '1850', subtext: 'Last 30 days', change: '+2.5%', changeType: 'positive' },
  { label: 'BiSPy AI Coaching Sessions', value: '342', subtext: 'Last 30 days', change: '+12.5%', changeType: 'positive' },
  { label: 'BSP Assessment Compliance', value: '82%', subtext: 'Completed vs Required', change: 'Compliant', changeType: 'success' },
  { label: 'Session Duration', value: '60 min', subtext: 'Last 30 days', change: null, changeType: null },
  { label: 'Peak Concurrent Users', value: '188', subtext: 'Last 30 days', change: '-3.0%', changeType: 'negative' },
  { label: 'Avg. Daily Active Users', value: '102', subtext: 'Last 30 days', change: null, changeType: null },
];

function StatCard({ label, value, subtext, change, changeType }) {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'rgba(34, 139, 34, 1)';
    if (changeType === 'negative') return 'rgba(196, 71, 85, 1)';
    if (changeType === 'success') return 'rgba(34, 139, 34, 1)';
    return 'rgba(107, 119, 127, 1)';
  };

  return (
    <Box
      sx={{
        background: 'rgba(255, 255, 255, 1)',
        border: '1px solid rgba(221, 217, 235, 1)',
        borderRadius: '8px',
        p: 2,
        flex: 1,
        minWidth: 200,
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          color: 'rgba(48, 95, 161, 1)',
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Box>
          <Typography
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '24px',
              fontWeight: 700,
              color: 'rgba(47, 65, 74, 1)',
            }}
          >
            {value}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              color: 'rgba(107, 119, 127, 1)',
            }}
          >
            {subtext}
          </Typography>
        </Box>
        {change && (
          <Typography
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              color: getChangeColor(),
              background: changeType === 'success' ? 'rgba(34, 139, 34, 0.1)' : 'transparent',
              px: changeType === 'success' ? 1 : 0,
              py: changeType === 'success' ? 0.25 : 0,
              borderRadius: '4px',
            }}
          >
            {change}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export function CorporationPlanAndSeatsView() {
  return (
    <Box sx={{ py: 2 }}>
      {/* Filters Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            background: 'rgba(255, 255, 255, 1)',
            border: '1px solid rgba(221, 217, 235, 1)',
            borderRadius: '8px',
            px: 1.5,
            py: 0.75,
            width: 200,
          }}
        >
          <Search size={16} color="rgba(107, 119, 127, 1)" />
          <InputBase
            placeholder="Search here..."
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              color: 'rgba(47, 65, 74, 1)',
              flex: 1,
              '& input::placeholder': {
                color: 'rgba(107, 119, 127, 1)',
                opacity: 1,
              },
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Select
            defaultValue="all"
            size="small"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              background: 'rgba(255, 255, 255, 1)',
              minWidth: 150,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(221, 217, 235, 1)',
              },
            }}
          >
            <MenuItem value="all">All companies</MenuItem>
          </Select>
          <Select
            defaultValue="30days"
            size="small"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              background: 'rgba(255, 255, 255, 1)',
              minWidth: 150,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(221, 217, 235, 1)',
              },
            }}
          >
            <MenuItem value="30days">Last 30 days</MenuItem>
            <MenuItem value="7days">Last 7 days</MenuItem>
            <MenuItem value="90days">Last 90 days</MenuItem>
          </Select>
          <Button
            variant="outlined"
            startIcon={<Upload size={16} />}
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              textTransform: 'none',
              borderColor: 'rgba(221, 217, 235, 1)',
              color: 'rgba(47, 65, 74, 1)',
              background: 'rgba(255, 255, 255, 1)',
              '&:hover': {
                borderColor: 'rgba(107, 119, 127, 1)',
                background: 'rgba(248, 247, 251, 1)',
              },
            }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Stats Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 3 }}>
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </Box>

      {/* Login Activity Chart */}
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 1)',
          border: '1px solid rgba(221, 217, 235, 1)',
          borderRadius: '8px',
          p: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              color: 'rgba(48, 95, 161, 1)',
            }}
          >
            Login Activity
          </Typography>
          <Select
            defaultValue="monthly"
            size="small"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              background: 'rgba(255, 255, 255, 1)',
              minWidth: 120,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(221, 217, 235, 1)',
              },
            }}
          >
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
          </Select>
        </Box>
        {/* Placeholder for chart */}
        <Box
          sx={{
            height: 250,
            background: 'linear-gradient(180deg, rgba(248, 247, 251, 0.5) 0%, rgba(255, 255, 255, 1) 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Simple line chart representation */}
          <svg width="100%" height="200" viewBox="0 0 800 200" preserveAspectRatio="none">
            <path
              d="M0,150 Q100,120 150,100 T300,60 T450,40 T550,80 T650,100 T800,70"
              fill="none"
              stroke="rgba(48, 95, 161, 1)"
              strokeWidth="2"
            />
            <path
              d="M0,170 Q100,160 150,140 T300,120 T450,130 T550,150 T650,160 T800,140"
              fill="none"
              stroke="rgba(200, 180, 100, 1)"
              strokeWidth="2"
            />
          </svg>
          <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', px: 2, py: 1 }}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
              <Typography
                key={month}
                sx={{
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontSize: '12px',
                  color: 'rgba(107, 119, 127, 1)',
                }}
              >
                {month}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
