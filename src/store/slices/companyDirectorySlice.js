import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMockCompaniesDirectory } from '../../data/mockCompaniesDirectory';

const ITEMS_PER_PAGE = 4;

const initialState = {
  companies: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    totalItems: 0,
    totalPages: 0,
  },
  filters: {
    status: 'All',
    corporation: 'All',
    assignedCorporationId: 'All',
    plan: 'All',
    companyType: 'All',
    timeRange: 'All',
    createdOnRange: 'All',
    lastUpdatedOnRange: 'All',
  },
  searchTerm: '',
  sort: {
    column: 'companyName',
    direction: 'asc',
  },
  loading: false,
  error: null,
};

export const fetchCompanies = createAsyncThunk(
  'companyDirectory/fetchCompanies',
  async (_, { getState }) => {
    const { companyDirectory } = getState();
    const { searchTerm, filters, sort, pagination } = companyDirectory;
    await new Promise((r) => setTimeout(r, 300));
    let list = getMockCompaniesDirectory();

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          (c.region && c.region.toLowerCase().includes(q))
      );
    }
    if (filters.status && filters.status !== 'All') {
      list = list.filter((c) => c.status === filters.status);
    }
    if (filters.assignedCorporationId && filters.assignedCorporationId !== 'All') {
      list = list.filter(
        (c) =>
          c.assignedCorporation !== 'NA' &&
          c.assignedCorporation?.corpCode === filters.assignedCorporationId
      );
    }
    if (filters.plan && filters.plan !== 'All') {
      list = list.filter((c) => c.plan === filters.plan);
    }

    const columnMap = {
      companyId: 'id',
      companyName: 'name',
      status: 'status',
      assignedCorporation: (c) =>
        c.assignedCorporation === 'NA' ? '' : c.assignedCorporation?.name ?? '',
      plan: 'plan',
      seatUsage: (c) =>
        c.seatUsage?.total ? (c.seatUsage?.used ?? 0) / c.seatUsage.total : 0,
      createdOn: 'createdOn',
      lastUpdatedOn: 'lastUpdatedOn',
    };
    const key = sort.column;
    const getVal =
      typeof columnMap[key] === 'function'
        ? columnMap[key]
        : (c) => c[columnMap[key] ?? key];
    list = [...list].sort((a, b) => {
      const va = getVal(a);
      const vb = getVal(b);
      const cmp =
        typeof va === 'number' && typeof vb === 'number'
          ? va - vb
          : String(va).localeCompare(String(vb));
      return sort.direction === 'asc' ? cmp : -cmp;
    });

    const totalItems = list.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pagination.itemsPerPage));
    const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const companies = list.slice(start, start + pagination.itemsPerPage);

    return { companies, totalItems, totalPages };
  }
);

const companyDirectorySlice = createSlice({
  name: 'companyDirectory',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.pagination.currentPage = 1;
    },
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      if (state.filters[key] !== undefined) state.filters[key] = value;
      state.pagination.currentPage = 1;
    },
    setSort: (state, action) => {
      const { column, direction } = action.payload;
      state.sort.column = column;
      state.sort.direction = direction;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = Math.max(1, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload.companies;
        state.pagination.totalItems = action.payload.totalItems;
        state.pagination.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Failed to load companies';
      });
  },
});

export const { setSearchTerm, setFilter, setSort, setCurrentPage } =
  companyDirectorySlice.actions;

export const selectCompaniesData = (state) => state.companyDirectory.companies;
export const selectCompanyDirectoryPagination = (state) =>
  state.companyDirectory.pagination;
export const selectCompanyDirectoryFilters = (state) =>
  state.companyDirectory.filters;
export const selectCompanyDirectorySearchTerm = (state) =>
  state.companyDirectory.searchTerm;
export const selectCompanyDirectorySort = (state) =>
  state.companyDirectory.sort;
export const selectCompanyDirectoryLoading = (state) =>
  state.companyDirectory.loading;
export const selectCompanyDirectoryError = (state) =>
  state.companyDirectory.error;

export default companyDirectorySlice.reducer;
