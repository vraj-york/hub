/**
 * Mock audit log data for Corporation Profile - Configuration tab (Audit Log table).
 * AuditLogEntry: { id, timestamp, action, status, actorName, actorEmail }
 */

export const mockActionTypes = [
  { value: 'all', label: 'All action types' },
  { value: 'user_management', label: 'User Management' },
  { value: 'plan_seats', label: 'Plan & Seats' },
  { value: 'configuration', label: 'Configuration' },
];

export const mockTimeRanges = [
  { value: 'last_30_days', label: 'Last 30 days' },
  { value: 'last_7_days', label: 'Last 7 days' },
  { value: 'last_90_days', label: 'Last 90 days' },
];

function formatTimestamp(isoString) {
  const d = new Date(isoString);
  return d.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export const mockAuditLogEntries = [
  {
    id: 'al_001',
    timestamp: '2026-01-28T14:30:00Z',
    action: 'Updated key contact - Primary Corporate Admin',
    status: 'User Management',
    actorName: 'Nolan Thrust',
    actorEmail: 'nolan.thrust@acme.com',
  },
  {
    id: 'al_002',
    timestamp: '2026-01-27T11:15:00Z',
    action: 'Changed plan allocation - Total Seats',
    status: 'Plan & Seats',
    actorName: 'Luther Creed',
    actorEmail: 'luther.creed@acme.com',
  },
  {
    id: 'al_003',
    timestamp: '2026-01-26T09:45:00Z',
    action: 'Modified security settings - Session Timeout',
    status: 'Configuration',
    actorName: 'Mike Davis',
    actorEmail: 'mike_davis@email.com',
  },
  {
    id: 'al_004',
    timestamp: '2026-01-25T16:20:00Z',
    action: 'Added new company admin',
    status: 'User Management',
    actorName: 'Layla Hussain',
    actorEmail: 'layla.hussain@acme.com',
  },
];

export function getMockAuditLog(corporationId, { searchText = '', actionType = 'all', timeRange = 'last_30_days', page = 1, itemsPerPage = 10, sortColumn = 'timestamp', sortDirection = 'desc' }) {
  let data = [...mockAuditLogEntries].map((entry) => ({
    ...entry,
    timestampFormatted: formatTimestamp(entry.timestamp),
  }));

  if (searchText && searchText.trim()) {
    const q = searchText.toLowerCase().trim();
    data = data.filter(
      (e) =>
        e.action?.toLowerCase().includes(q) ||
        e.actorName?.toLowerCase().includes(q) ||
        e.actorEmail?.toLowerCase().includes(q) ||
        e.status?.toLowerCase().includes(q)
    );
  }

  if (actionType && actionType !== 'all') {
    const statusMap = { user_management: 'User Management', plan_seats: 'Plan & Seats', configuration: 'Configuration' };
    const filterStatus = statusMap[actionType];
    if (filterStatus) data = data.filter((e) => e.status === filterStatus);
  }

  const collator = new Intl.Collator(undefined, { numeric: true });
  const mult = sortDirection === 'asc' ? 1 : -1;
  data.sort((a, b) => {
    if (sortColumn === 'timestamp') return mult * (new Date(a.timestamp) - new Date(b.timestamp));
    if (sortColumn === 'actions') return mult * collator.compare(a.action || '', b.action || '');
    if (sortColumn === 'status') return mult * collator.compare(a.status || '', b.status || '');
    if (sortColumn === 'actor') return mult * collator.compare(a.actorName || '', b.actorName || '');
    return 0;
  });

  const totalEntries = data.length;
  const start = (page - 1) * itemsPerPage;
  const paginatedData = data.slice(start, start + itemsPerPage);

  return { data: paginatedData, totalEntries };
}
