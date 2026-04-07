/**
 * Mock data for Company Directory list page (/companies).
 * CompanyItem shape: id, name, region, status, assignedCorporation { name, corpCode } | 'NA',
 * plan, seatUsage { used, total }, createdOn, lastUpdatedOn.
 */

export const STATUS_FILTER_OPTIONS = [
  { value: 'All', label: 'All status' },
  { value: 'Assigned', label: 'Assigned' },
  { value: 'Unassigned', label: 'Unassigned' },
  { value: 'Archived', label: 'Archived' },
  { value: 'Draft', label: 'Draft' },
];

export const PLAN_FILTER_OPTIONS = [
  { value: 'All', label: 'All plans' },
  { value: 'Enterprise', label: 'Enterprise' },
  { value: 'Standard', label: 'Standard' },
  { value: 'Professional', label: 'Professional' },
];

export const ASSIGNED_CORPORATION_FILTER_OPTIONS = [
  { value: 'All', label: 'All corporations' },
  { value: 'CORP-001', label: 'Acme Corporation' },
  { value: 'CORP-002', label: 'Beta Solutions' },
  { value: 'CORP-003', label: 'Alpha Innovations' },
  { value: 'CORP-004', label: 'Delta Dynamics' },
  { value: 'CORP-005', label: 'Epsilon Enterprises' },
];

export const TIME_RANGE_OPTIONS = [
  { value: 'All', label: 'All time' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
];

export const mockCompaniesDirectory = [
  {
    id: 'COMP-001',
    name: 'New York HQ',
    region: 'US East',
    status: 'Assigned',
    assignedCorporation: { name: 'Acme Corporation', corpCode: 'CORP-001' },
    plan: 'Enterprise',
    seatUsage: { used: 250, total: 300 },
    createdOn: '01-15-2025',
    lastUpdatedOn: '01-20-2025',
  },
  {
    id: 'COMP-002',
    name: 'San Francisco Office',
    region: 'US West',
    status: 'Assigned',
    assignedCorporation: { name: 'Beta Solutions', corpCode: 'CORP-002' },
    plan: 'Standard',
    seatUsage: { used: 50, total: 100 },
    createdOn: '01-10-2025',
    lastUpdatedOn: '01-18-2025',
  },
  {
    id: 'COMP-003',
    name: 'New York Office',
    region: 'US East',
    status: 'Unassigned',
    assignedCorporation: { name: 'Beta Solutions', corpCode: 'CORP-002' },
    plan: 'Professional',
    seatUsage: { used: 245, total: 300 },
    createdOn: '01-12-2025',
    lastUpdatedOn: '01-19-2025',
  },
  {
    id: 'COMP-004',
    name: 'Toronto Office',
    region: 'Canada',
    status: 'Archived',
    assignedCorporation: { name: 'Alpha Innovations', corpCode: 'CORP-003' },
    plan: 'Standard',
    seatUsage: { used: 146, total: 250 },
    createdOn: '01-08-2025',
    lastUpdatedOn: '01-17-2025',
  },
  {
    id: 'COMP-005',
    name: 'London Office',
    region: 'UK',
    status: 'Draft',
    assignedCorporation: 'NA',
    plan: 'Enterprise',
    seatUsage: { used: 90, total: 100 },
    createdOn: '01-14-2025',
    lastUpdatedOn: '01-21-2025',
  },
  {
    id: 'COMP-006',
    name: 'Berlin Office',
    region: 'Germany',
    status: 'Assigned',
    assignedCorporation: { name: 'Delta Dynamics', corpCode: 'CORP-004' },
    plan: 'Standard',
    seatUsage: { used: 245, total: 300 },
    createdOn: '01-11-2025',
    lastUpdatedOn: '01-20-2025',
  },
  {
    id: 'COMP-007',
    name: 'Tokyo Office',
    region: 'Japan',
    status: 'Archived',
    assignedCorporation: 'NA',
    plan: 'Professional',
    seatUsage: { used: 60, total: 80 },
    createdOn: '01-09-2025',
    lastUpdatedOn: '01-16-2025',
  },
  {
    id: 'COMP-008',
    name: 'Sydney Office',
    region: 'Australia',
    status: 'Unassigned',
    assignedCorporation: { name: 'Epsilon Enterprises', corpCode: 'CORP-005' },
    plan: 'Enterprise',
    seatUsage: { used: 60, total: 80 },
    createdOn: '01-13-2025',
    lastUpdatedOn: '01-22-2025',
  },
];

export function getMockCompaniesDirectory() {
  return [...mockCompaniesDirectory];
}
