/**
 * Mock dashboard data for Corporation Profile Configuration tab.
 * DashboardMetric: { value, description, badgeLabel?, badgeType?: 'positive' | 'negative' | 'neutral' }
 * ChartPoint: { month, users, sessions }
 */

export const MOCK_DASHBOARD_METRICS = {
  activeUsers: {
    value: '245',
    description: 'Last 30 days',
    badgeLabel: '+2.5%',
    badgeType: 'positive',
  },
  activeCompanies: {
    value: '12',
    description: 'Across corporation',
    badgeLabel: '+1',
    badgeType: 'positive',
  },
  activeTeams: {
    value: '34',
    description: 'Across corporation',
    badgeLabel: '-1.6%',
    badgeType: 'negative',
  },
  loginSessions: {
    value: '1850',
    description: 'Last 30 days',
    badgeLabel: '+5.2%',
    badgeType: 'positive',
  },
  biSpyCoachingSessions: {
    value: '342',
    description: 'Completed vs Required',
    badgeLabel: 'Compliant',
    badgeType: 'neutral',
  },
  bspAssessmentCompliance: {
    value: '82%',
    description: 'Completed vs Required',
    badgeLabel: 'Compliant',
    badgeType: 'neutral',
  },
  sessionDuration: {
    value: '60 min',
    description: 'Average',
    badgeLabel: '+3 min',
    badgeType: 'positive',
  },
  peakConcurrentUsers: {
    value: '188',
    description: 'Last 30 days',
    badgeLabel: '-2.1%',
    badgeType: 'negative',
  },
  avgDailyActiveUsers: {
    value: '102',
    description: 'Last 30 days',
    badgeLabel: '+1.8%',
    badgeType: 'positive',
  },
};

export const MOCK_LOGIN_ACTIVITY_CHART = [
  { month: 'Jan', users: 45, sessions: 120 },
  { month: 'Feb', users: 52, sessions: 135 },
  { month: 'Mar', users: 48, sessions: 128 },
  { month: 'Apr', users: 61, sessions: 142 },
  { month: 'May', users: 55, sessions: 138 },
  { month: 'Jun', users: 70, sessions: 155 },
  { month: 'Jul', users: 65, sessions: 148 },
  { month: 'Aug', users: 55, sessions: 130 },
  { month: 'Sep', users: 72, sessions: 162 },
  { month: 'Oct', users: 68, sessions: 158 },
  { month: 'Nov', users: 75, sessions: 170 },
  { month: 'Dec', users: 80, sessions: 185 },
];

export function getMockDashboardData(corporationId) {
  return {
    metrics: { ...MOCK_DASHBOARD_METRICS },
    chart: [...MOCK_LOGIN_ACTIVITY_CHART],
  };
}
