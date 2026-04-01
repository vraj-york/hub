import { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCorporationDashboardData,
  selectDashboardFilters,
  selectChartAggregation,
  selectDashboardLoading,
  selectDashboardError,
  setDashboardFilters,
  setChartAggregation,
} from '../../store/slices/corporationsSlice';
import { SearchInput } from '../common/SearchInput';
import { CustomSelect } from '../company-creation/CustomSelect';
import { ExportButton } from './ExportButton';
import { DashboardMetricCard } from './DashboardMetricCard';
import { LineChart } from './LineChart';
import { mockTimeAggregationOptions } from '../../data/mockTimeAggregationOptions';

const COMPANY_FILTER_OPTIONS = [
  { value: 'all', label: 'All companies' },
  { value: 'company_001', label: 'Tech Ventures Digital' },
  { value: 'company_002', label: 'Innovation Labs' },
  { value: 'company_003', label: 'Marit Inc.' },
];

const TIME_RANGE_OPTIONS = [
  { value: 'last_30_days', label: 'Last 30 days' },
  { value: 'last_7_days', label: 'Last 7 days' },
  { value: 'last_90_days', label: 'Last 90 days' },
];

const METRIC_KEYS = [
  { key: 'activeUsers', title: 'Active Users' },
  { key: 'activeCompanies', title: 'Active Companies' },
  { key: 'activeTeams', title: 'Active Teams' },
  { key: 'loginSessions', title: 'Login Sessions' },
  { key: 'biSpyCoachingSessions', title: 'BiSPy AI Coaching Sessions' },
  { key: 'bspAssessmentCompliance', title: 'BSP Assessment Compliance' },
  { key: 'sessionDuration', title: 'Session Duration' },
  { key: 'peakConcurrentUsers', title: 'Peak Concurrent Users' },
  { key: 'avgDailyActiveUsers', title: 'Avg. Daily Active Users' },
];

export function CorporationDashboardContent({ corporationId }) {
  const dispatch = useDispatch();
  const dashboardData = useSelector(selectCorporationDashboardData);
  const filters = useSelector(selectDashboardFilters);
  const chartAggregation = useSelector(selectChartAggregation);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);

  const handleSearchChange = useCallback(
    (e) => dispatch(setDashboardFilters({ search: e.target.value })),
    [dispatch]
  );
  const handleCompanyFilterChange = useCallback(
    (value) => dispatch(setDashboardFilters({ companyFilter: value })),
    [dispatch]
  );
  const handleTimeRangeChange = useCallback(
    (value) => dispatch(setDashboardFilters({ timeRange: value })),
    [dispatch]
  );
  const handleChartAggregationChange = useCallback(
    (value) => dispatch(setChartAggregation(value)),
    [dispatch]
  );
  const handleExport = useCallback(() => {
    // Placeholder: trigger CSV/download when API is available
    const blob = new Blob(['Dashboard export placeholder'], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `corporation-dashboard-${corporationId ?? 'export'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [corporationId]);

  if (loading) {
    return (
      <Box role="tabpanel" id="configuration-tabpanel" aria-labelledby="configuration-tab" sx={{ py: 4 }}>
        <Typography sx={{ color: 'rgba(56, 89, 102, 1)' }}>Loading dashboard...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box role="tabpanel" id="configuration-tabpanel" aria-labelledby="configuration-tab" sx={{ py: 4 }}>
        <Typography sx={{ color: 'rgba(196, 71, 85, 1)' }}>{error}</Typography>
      </Box>
    );
  }

  const metrics = dashboardData?.metrics ?? {};
  const chartData = dashboardData?.chart ?? [];
  const timeOptions = mockTimeAggregationOptions.map((o) => ({ value: o.value, label: o.label }));

  return (
    <Box
      role="tabpanel"
      id="configuration-tabpanel"
      aria-labelledby="configuration-tab"
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      {/* Dashboard Header */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <SearchInput
          placeholder="Search here..."
          value={filters.search}
          onChange={handleSearchChange}
          aria-label="Search dashboard data"
        />
        <CustomSelect
          options={COMPANY_FILTER_OPTIONS}
          value={filters.companyFilter}
          onChange={handleCompanyFilterChange}
          placeholder="All companies"
          selectedValueTextColor="rgba(47, 65, 74, 1)"
          inputBackground="rgba(255, 255, 255, 1)"
          aria-label="Filter by companies"
        />
        <CustomSelect
          options={TIME_RANGE_OPTIONS}
          value={filters.timeRange}
          onChange={handleTimeRangeChange}
          placeholder="Last 30 days"
          selectedValueTextColor="rgba(47, 65, 74, 1)"
          inputBackground="rgba(255, 255, 255, 1)"
          aria-label="Select time range"
        />
        <ExportButton onClick={handleExport} />
      </Box>

      {/* Metric Cards Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {METRIC_KEYS.map(({ key, title }) => {
          const m = metrics[key];
          if (!m) return null;
          return (
            <DashboardMetricCard
              key={key}
              titleId={`dashboard-metric-${key}`}
              title={title}
              value={m.value}
              description={m.description}
              badgeLabel={m.badgeLabel}
              badgeType={m.badgeType}
            />
          );
        })}
      </Box>

      {/* Login Activity Chart */}
      <LineChart
        data={chartData}
        timeAggregationOptions={timeOptions}
        selectedTimeAggregation={chartAggregation}
        onTimeAggregationChange={handleChartAggregationChange}
        chartTitle="Login Activity"
      />
    </Box>
  );
}
