/**
 * Mock data for Corporation Directory page.
 * CorporationListItem: id, name, region, status, executiveSponsor { name, email }, numCompanies, createdOn
 */

function formatCreatedOn(isoDate) {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${month}-${day}-${year}`;
}

export const mockCorporationsList = [
  {
    id: 'corp_001',
    name: 'Acme Corporation',
    region: 'North America',
    status: 'Active',
    executiveSponsor: { name: 'Alice Johnson', email: 'alice_j@acme.com' },
    numCompanies: 5,
    createdOn: '2025-01-15T10:00:00Z',
  },
  {
    id: 'corp_002',
    name: 'Beta Industries',
    region: 'Europe',
    status: 'Incomplete',
    executiveSponsor: { name: 'Bob Smith', email: 'bob.smith@betaind.com' },
    numCompanies: 2,
    createdOn: '2025-01-10T14:30:00Z',
  },
  {
    id: 'corp_003',
    name: 'Gamma Solutions',
    region: 'Asia Pacific',
    status: 'Suspended',
    executiveSponsor: { name: 'Carol White', email: 'cwhite@gammasol.com' },
    numCompanies: 8,
    createdOn: '2024-12-20T09:00:00Z',
  },
  {
    id: 'corp_004',
    name: 'Delta Ventures',
    region: 'North America',
    status: 'Closed',
    executiveSponsor: { name: 'David Lee', email: 'dlee@deltaventures.com' },
    numCompanies: 0,
    createdOn: '2024-11-05T16:00:00Z',
  },
  {
    id: 'corp_005',
    name: 'Epsilon Corp',
    region: 'Europe',
    status: 'Active',
    executiveSponsor: { name: 'Eve Brown', email: 'eve.brown@epsilon.com' },
    numCompanies: 12,
    createdOn: '2025-01-08T11:20:00Z',
  },
];

export function getMockCorporationsList(opts = {}) {
  const {
    searchText = '',
    status = 'all',
    timeRange = 'last_30_days',
    page = 1,
    itemsPerPage = 10,
    sortColumn = 'name',
    sortDirection = 'asc',
  } = opts;

  let list = mockCorporationsList.map((c) => ({
    ...c,
    createdOnFormatted: formatCreatedOn(c.createdOn),
  }));

  if (searchText && searchText.trim()) {
    const q = searchText.toLowerCase().trim();
    list = list.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.region && c.region.toLowerCase().includes(q)) ||
        (c.executiveSponsor?.name && c.executiveSponsor.name.toLowerCase().includes(q)) ||
        (c.executiveSponsor?.email && c.executiveSponsor.email.toLowerCase().includes(q)) ||
        (c.id && c.id.toLowerCase().includes(q))
    );
  }

  if (status && status !== 'all') {
    const statusNorm = status.toLowerCase();
    list = list.filter((c) => c.status && c.status.toLowerCase() === statusNorm);
  }

  if (timeRange && timeRange !== 'all_time') {
    const now = new Date();
    let cutoff;
    if (timeRange === 'last_30_days') cutoff = 30;
    else if (timeRange === 'last_90_days') cutoff = 90;
    else if (timeRange === 'last_year') cutoff = 365;
    else cutoff = 30;
    const cutoffDate = new Date(now);
    cutoffDate.setDate(cutoffDate.getDate() - cutoff);
    list = list.filter((c) => new Date(c.createdOn) >= cutoffDate);
  }

  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  list.sort((a, b) => {
    let aVal = a[sortColumn];
    let bVal = b[sortColumn];
    if (sortColumn === 'executiveSponsor') {
      aVal = a.executiveSponsor?.name ?? '';
      bVal = b.executiveSponsor?.name ?? '';
    }
    if (sortColumn === 'createdOn') {
      aVal = a.createdOn ?? '';
      bVal = b.createdOn ?? '';
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    const cmp = collator.compare(String(aVal ?? ''), String(bVal ?? ''));
    return sortDirection === 'asc' ? cmp : -cmp;
  });

  const totalEntries = list.length;
  const start = (page - 1) * itemsPerPage;
  const paginated = list.slice(start, start + itemsPerPage);

  return { data: paginated, totalEntries };
}

export const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All status' },
  { value: 'active', label: 'Active' },
  { value: 'incomplete', label: 'Incomplete' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'closed', label: 'Closed' },
];

export const TIME_RANGE_OPTIONS = [
  { value: 'last_30_days', label: 'Last 30 days' },
  { value: 'last_90_days', label: 'Last 90 days' },
  { value: 'last_year', label: 'Last year' },
  { value: 'all_time', label: 'All time' },
];
