import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMockDashboardData } from '../../data/mockDashboard';
import { getMockAuditLog } from '../../data/mockAuditLog';
import { getMockCorporationsList } from '../../data/mockCorporationsList';

const initialState = {
  currentCorporation: null,
  loading: false,
  error: null,
  selectedTab: 'basic-info',
  companiesSearchQuery: '',
  closeCorporationStatus: 'idle',
  closeCorporationError: null,
  suspendCorporationStatus: 'idle',
  suspendCorporationError: null,
  // Dashboard (Configuration tab - deprecated for this tab, retained for potential use elsewhere)
  currentCorporationDashboard: null,
  dashboardLoading: false,
  dashboardError: null,
  dashboardFilters: {
    search: '',
    companyFilter: 'all',
    timeRange: 'last_30_days',
  },
  chartAggregation: 'monthly',
  // Audit Log (Configuration tab)
  currentCorporationAuditLog: { data: [], totalEntries: 0 },
  auditLogLoading: false,
  auditLogError: null,
  auditLogFilters: {
    searchText: '',
    actionType: 'all',
    timeRange: 'last_30_days',
  },
  auditLogPagination: { currentPage: 1, itemsPerPage: 10 },
  auditLogSort: { column: 'timestamp', direction: 'desc' },
  // Corporation Directory list
  corporationsList: [],
  listLoading: false,
  listError: null,
  listFilters: { searchText: '', status: 'all', timeRange: 'all_time' },
  listPagination: { currentPage: 1, itemsPerPage: 10, totalEntries: 0 },
  listSort: { column: 'name', direction: 'asc' },
  selectedCorporationIdForActions: null,
  // Edit Corporation - Basic Info save
  corporationEditSaveStatus: 'idle',
  corporationEditSaveError: null,
  // Edit Corporation - Branding save
  editingCorporationBranding: {
    status: 'idle',
    error: null,
  },
  // Edit Corporation - Companies tab
  currentCorporationCompanies: [],
  isUpdatingCorporationCompanies: 'idle', // 'idle' | 'pending' | 'success' | 'error'
  updateCorporationCompaniesError: null,
  // Edit Corporation - Configuration tab (security config)
  currentCorporationSecurityConfigFormData: null,
  updateCorporationSecurityConfigStatus: 'idle', // 'idle' | 'pending' | 'success' | 'error'
  updateCorporationSecurityConfigError: null,
  // Edit Corporation - Key Contacts tab
  updateCorporationKeyContactsStatus: 'idle', // 'idle' | 'pending' | 'success' | 'error'
  updateCorporationKeyContactsError: null,
};

export const closeCorporationRequest = createAsyncThunk(
  'corporations/closeCorporation',
  async ({ corporationId, reasonId, notes }, { rejectWithValue }) => {
    try {
      // Simulate API call; replace with real API when available
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { corporationId, reasonId, notes };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to close corporation');
    }
  }
);

export const suspendCorporationRequest = createAsyncThunk(
  'corporations/suspendCorporation',
  async ({ corporationId, reasonId, notes }, { rejectWithValue }) => {
    try {
      // Simulate API call; replace with real API when available
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { corporationId, reasonId, notes };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to suspend corporation');
    }
  }
);

export const fetchCorporationDashboardData = createAsyncThunk(
  'corporations/fetchDashboard',
  async (corporationId, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return getMockDashboardData(corporationId);
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load dashboard');
    }
  }
);

export const fetchCorporationsList = createAsyncThunk(
  'corporations/fetchCorporationsList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { listFilters, listPagination, listSort } = state.corporations;
      await new Promise((resolve) => setTimeout(resolve, 200));
      return getMockCorporationsList({
        searchText: listFilters.searchText,
        status: listFilters.status,
        timeRange: listFilters.timeRange,
        page: listPagination.currentPage,
        itemsPerPage: listPagination.itemsPerPage,
        sortColumn: listSort.column,
        sortDirection: listSort.direction,
      });
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load corporations list');
    }
  }
);

export const updateCorporationBasicInfoRequest = createAsyncThunk(
  'corporations/updateBasicInfo',
  async ({ corporationId, basicInfoPayload }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { corporationId, basicInfoPayload };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update corporation basic info');
    }
  }
);

export const updateCorporationBrandingRequest = createAsyncThunk(
  'corporations/updateBranding',
  async ({ corporationId, logoFile }, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      // Mock: simulate success; in production would upload file and return new logo URL
      const state = getState();
      const currentCorp = state.corporations.currentCorporation;
      const logoUrl = currentCorp?.logoUrl ?? '/images/Logo 1-c24ca4a3.png';
      return { corporationId, logoUrl };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update corporation branding');
    }
  }
);

export const fetchCorporationCompaniesRequest = createAsyncThunk(
  'corporations/fetchCorporationCompanies',
  async (corporationId, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const state = getState();
      const corp = state.corporations.currentCorporation;
      const companies = corp?.id === corporationId && Array.isArray(corp?.companies)
        ? corp.companies
        : [];
      return { corporationId, companies };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load corporation companies');
    }
  }
);

export const updateCorporationCompaniesRequest = createAsyncThunk(
  'corporations/updateCorporationCompanies',
  async ({ corporationId, companies }, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { corporationId, companies };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update corporation companies');
    }
  }
);

export const updateCorporationSecurityConfigRequest = createAsyncThunk(
  'corporations/updateCorporationSecurityConfig',
  async (
    { corporationId, securityConfigData },
    { getState, rejectWithValue }
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { corporationId, securityConfigData };
    } catch (err) {
      return rejectWithValue(
        err.message || 'Failed to update corporation security configuration'
      );
    }
  }
);

export const updateCorporationKeyContactsRequest = createAsyncThunk(
  'corporations/updateCorporationKeyContacts',
  async ({ corporationId, primaryCorporateAdminData }, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { corporationId, primaryCorporateAdminData };
    } catch (err) {
      return rejectWithValue(
        err.message || 'Failed to update corporation key contacts'
      );
    }
  }
);

export const fetchCorporationAuditLogData = createAsyncThunk(
  'corporations/fetchAuditLog',
  async (
    { corporationId, filters, pagination, sort },
    { rejectWithValue }
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return getMockAuditLog(corporationId, {
        searchText: filters?.searchText ?? '',
        actionType: filters?.actionType ?? 'all',
        timeRange: filters?.timeRange ?? 'last_30_days',
        page: pagination?.currentPage ?? 1,
        itemsPerPage: pagination?.itemsPerPage ?? 10,
        sortColumn: sort?.column ?? 'timestamp',
        sortDirection: sort?.direction ?? 'desc',
      });
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load audit log');
    }
  }
);

const corporationsSlice = createSlice({
  name: 'corporations',
  initialState,
  reducers: {
    setCurrentCorporation: (state, action) => {
      state.currentCorporation = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setCompaniesSearchQuery: (state, action) => {
      state.companiesSearchQuery = action.payload;
    },
    resetCloseCorporationStatus: (state) => {
      state.closeCorporationStatus = 'idle';
      state.closeCorporationError = null;
    },
    resetSuspendCorporationStatus: (state) => {
      state.suspendCorporationStatus = 'idle';
      state.suspendCorporationError = null;
    },
    setDashboardFilters: (state, action) => {
      const payload = action.payload;
      if (payload.search !== undefined) state.dashboardFilters.search = payload.search;
      if (payload.companyFilter !== undefined) state.dashboardFilters.companyFilter = payload.companyFilter;
      if (payload.timeRange !== undefined) state.dashboardFilters.timeRange = payload.timeRange;
    },
    setChartAggregation: (state, action) => {
      state.chartAggregation = action.payload;
    },
    setAuditLogSearchText: (state, action) => {
      state.auditLogFilters.searchText = action.payload;
      state.auditLogPagination.currentPage = 1;
    },
    setAuditLogFilter: (state, action) => {
      const { filterName, value } = action.payload;
      if (filterName === 'actionType') state.auditLogFilters.actionType = value;
      if (filterName === 'timeRange') state.auditLogFilters.timeRange = value;
      state.auditLogPagination.currentPage = 1;
    },
    setAuditLogPage: (state, action) => {
      state.auditLogPagination.currentPage = action.payload;
    },
    setAuditLogSort: (state, action) => {
      const { column, direction } = action.payload;
      state.auditLogSort.column = column;
      state.auditLogSort.direction = direction;
    },
    setListSearchText: (state, action) => {
      state.listFilters.searchText = action.payload;
      state.listPagination.currentPage = 1;
    },
    setListStatusFilter: (state, action) => {
      state.listFilters.status = action.payload;
      state.listPagination.currentPage = 1;
    },
    setListTimeRangeFilter: (state, action) => {
      state.listFilters.timeRange = action.payload;
      state.listPagination.currentPage = 1;
    },
    setListPage: (state, action) => {
      state.listPagination.currentPage = action.payload;
    },
    setListItemsPerPage: (state, action) => {
      state.listPagination.itemsPerPage = action.payload;
      state.listPagination.currentPage = 1;
    },
    setListSortColumn: (state, action) => {
      state.listSort.column = action.payload;
    },
    setListSortDirection: (state, action) => {
      state.listSort.direction = action.payload;
    },
    setSelectedCorporationForActions: (state, action) => {
      state.selectedCorporationIdForActions = action.payload;
    },
    resetCorporationEditSaveStatus: (state) => {
      state.corporationEditSaveStatus = 'idle';
      state.corporationEditSaveError = null;
    },
    setEditingCorporationBrandingStatus: (state, action) => {
      state.editingCorporationBranding.status = action.payload;
    },
    setEditingCorporationBrandingError: (state, action) => {
      state.editingCorporationBranding.error = action.payload;
    },
    resetEditingCorporationBrandingState: (state) => {
      state.editingCorporationBranding.status = 'idle';
      state.editingCorporationBranding.error = null;
    },
    setCorporationCompanies: (state, action) => {
      state.currentCorporationCompanies = Array.isArray(action.payload) ? action.payload : [];
    },
    setUpdatingCorporationCompaniesStatus: (state, action) => {
      state.isUpdatingCorporationCompanies = action.payload;
    },
    setUpdatingCorporationCompaniesError: (state, action) => {
      state.updateCorporationCompaniesError = action.payload;
    },
    resetUpdatingCorporationCompaniesState: (state) => {
      state.isUpdatingCorporationCompanies = 'idle';
      state.updateCorporationCompaniesError = null;
    },
    updateCorporationSecurityConfigField: (state, action) => {
      const { field, value } = action.payload;
      if (!state.currentCorporationSecurityConfigFormData) return;
      if (field === 'passwordPolicy' || field === 'tfaRequirement' || field === 'sessionTimeout') {
        state.currentCorporationSecurityConfigFormData[field] = value;
      }
    },
    setCorporationSecurityConfigFormData: (state, action) => {
      state.currentCorporationSecurityConfigFormData = action.payload;
    },
    setUpdateCorporationSecurityConfigStatus: (state, action) => {
      state.updateCorporationSecurityConfigStatus = action.payload;
    },
    setUpdateCorporationSecurityConfigError: (state, action) => {
      state.updateCorporationSecurityConfigError = action.payload;
    },
    resetCorporationSecurityConfigEditState: (state) => {
      state.currentCorporationSecurityConfigFormData = null;
      state.updateCorporationSecurityConfigStatus = 'idle';
      state.updateCorporationSecurityConfigError = null;
    },
    setPrimaryCorporateAdminField: (state, action) => {
      const { field, value } = action.payload;
      if (!state.currentCorporation?.keyContacts) return;
      if (!state.currentCorporation.keyContacts.primaryCorporateAdmin) {
        state.currentCorporation.keyContacts.primaryCorporateAdmin = {
          name: '',
          role: '',
          email: '',
          workPhoneNo: '',
          cellPhoneNo: '',
        };
      }
      if (Object.prototype.hasOwnProperty.call(state.currentCorporation.keyContacts.primaryCorporateAdmin, field)) {
        state.currentCorporation.keyContacts.primaryCorporateAdmin[field] = value;
      }
    },
    setUpdateCorporationKeyContactsStatus: (state, action) => {
      state.updateCorporationKeyContactsStatus = action.payload;
    },
    setUpdateCorporationKeyContactsError: (state, action) => {
      state.updateCorporationKeyContactsError = action.payload;
    },
    resetUpdateCorporationKeyContactsState: (state) => {
      state.updateCorporationKeyContactsStatus = 'idle';
      state.updateCorporationKeyContactsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(closeCorporationRequest.pending, (state) => {
        state.closeCorporationStatus = 'pending';
        state.closeCorporationError = null;
      })
      .addCase(closeCorporationRequest.fulfilled, (state) => {
        state.closeCorporationStatus = 'success';
        state.closeCorporationError = null;
        state.currentCorporation = null;
      })
      .addCase(closeCorporationRequest.rejected, (state, action) => {
        state.closeCorporationStatus = 'error';
        state.closeCorporationError = action.payload || action.error?.message || 'Failed to close corporation';
      })
      .addCase(suspendCorporationRequest.pending, (state) => {
        state.suspendCorporationStatus = 'pending';
        state.suspendCorporationError = null;
      })
      .addCase(suspendCorporationRequest.fulfilled, (state) => {
        state.suspendCorporationStatus = 'success';
        state.suspendCorporationError = null;
        if (state.currentCorporation) {
          state.currentCorporation = { ...state.currentCorporation, status: 'Suspended' };
        }
      })
      .addCase(suspendCorporationRequest.rejected, (state, action) => {
        state.suspendCorporationStatus = 'error';
        state.suspendCorporationError = action.payload || action.error?.message || 'Failed to suspend corporation';
      })
      .addCase(fetchCorporationDashboardData.pending, (state) => {
        state.dashboardLoading = true;
        state.dashboardError = null;
      })
      .addCase(fetchCorporationDashboardData.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardError = null;
        state.currentCorporationDashboard = action.payload;
      })
      .addCase(fetchCorporationDashboardData.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardError = action.payload || action.error?.message || 'Failed to load dashboard';
      })
      .addCase(fetchCorporationAuditLogData.pending, (state) => {
        state.auditLogLoading = true;
        state.auditLogError = null;
      })
      .addCase(fetchCorporationAuditLogData.fulfilled, (state, action) => {
        state.auditLogLoading = false;
        state.auditLogError = null;
        state.currentCorporationAuditLog = {
          data: action.payload?.data ?? [],
          totalEntries: action.payload?.totalEntries ?? 0,
        };
      })
      .addCase(fetchCorporationAuditLogData.rejected, (state, action) => {
        state.auditLogLoading = false;
        state.auditLogError = action.payload || action.error?.message || 'Failed to load audit log';
      })
      .addCase(fetchCorporationsList.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(fetchCorporationsList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.listError = null;
        state.corporationsList = action.payload?.data ?? [];
        state.listPagination.totalEntries = action.payload?.totalEntries ?? 0;
      })
      .addCase(fetchCorporationsList.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.payload || action.error?.message || 'Failed to load corporations list';
      })
      .addCase(updateCorporationBasicInfoRequest.pending, (state) => {
        state.corporationEditSaveStatus = 'pending';
        state.corporationEditSaveError = null;
      })
      .addCase(updateCorporationBasicInfoRequest.fulfilled, (state, action) => {
        state.corporationEditSaveStatus = 'success';
        state.corporationEditSaveError = null;
        if (state.currentCorporation && state.currentCorporation.id === action.payload.corporationId) {
          state.currentCorporation = { ...state.currentCorporation, ...action.payload.basicInfoPayload };
        }
      })
      .addCase(updateCorporationBasicInfoRequest.rejected, (state, action) => {
        state.corporationEditSaveStatus = 'error';
        state.corporationEditSaveError = action.payload || action.error?.message || 'Failed to update';
      })
      .addCase(updateCorporationBrandingRequest.pending, (state) => {
        state.editingCorporationBranding.status = 'pending';
        state.editingCorporationBranding.error = null;
      })
      .addCase(updateCorporationBrandingRequest.fulfilled, (state, action) => {
        state.editingCorporationBranding.status = 'success';
        state.editingCorporationBranding.error = null;
        if (state.currentCorporation && state.currentCorporation.id === action.payload.corporationId) {
          state.currentCorporation = { ...state.currentCorporation, logoUrl: action.payload.logoUrl };
        }
      })
      .addCase(updateCorporationBrandingRequest.rejected, (state, action) => {
        state.editingCorporationBranding.status = 'error';
        state.editingCorporationBranding.error = action.payload || action.error?.message || 'Failed to update branding';
      })
      .addCase(fetchCorporationCompaniesRequest.pending, (state) => {
        // Keep existing list; optional: set loading flag if needed
      })
      .addCase(fetchCorporationCompaniesRequest.fulfilled, (state, action) => {
        state.currentCorporationCompanies = action.payload?.companies ?? [];
      })
      .addCase(fetchCorporationCompaniesRequest.rejected, (state) => {
        state.currentCorporationCompanies = [];
      })
      .addCase(updateCorporationCompaniesRequest.pending, (state) => {
        state.isUpdatingCorporationCompanies = 'pending';
        state.updateCorporationCompaniesError = null;
      })
      .addCase(updateCorporationCompaniesRequest.fulfilled, (state, action) => {
        state.isUpdatingCorporationCompanies = 'success';
        state.updateCorporationCompaniesError = null;
        state.currentCorporationCompanies = action.payload?.companies ?? state.currentCorporationCompanies;
        if (state.currentCorporation && state.currentCorporation.id === action.payload?.corporationId) {
          state.currentCorporation = { ...state.currentCorporation, companies: action.payload.companies };
        }
      })
      .addCase(updateCorporationCompaniesRequest.rejected, (state, action) => {
        state.isUpdatingCorporationCompanies = 'error';
        state.updateCorporationCompaniesError = action.payload || action.error?.message || 'Failed to update companies';
      })
      .addCase(updateCorporationSecurityConfigRequest.pending, (state) => {
        state.updateCorporationSecurityConfigStatus = 'pending';
        state.updateCorporationSecurityConfigError = null;
      })
      .addCase(updateCorporationSecurityConfigRequest.fulfilled, (state, action) => {
        state.updateCorporationSecurityConfigStatus = 'success';
        state.updateCorporationSecurityConfigError = null;
        const { corporationId, securityConfigData } = action.payload;
        if (state.currentCorporation && state.currentCorporation.id === corporationId) {
          state.currentCorporation = {
            ...state.currentCorporation,
            securityConfig: securityConfigData,
          };
        }
        state.currentCorporationSecurityConfigFormData = null;
      })
      .addCase(updateCorporationSecurityConfigRequest.rejected, (state, action) => {
        state.updateCorporationSecurityConfigStatus = 'error';
        state.updateCorporationSecurityConfigError =
          action.payload || action.error?.message || 'Failed to update security configuration';
      })
      .addCase(updateCorporationKeyContactsRequest.pending, (state) => {
        state.updateCorporationKeyContactsStatus = 'pending';
        state.updateCorporationKeyContactsError = null;
      })
      .addCase(updateCorporationKeyContactsRequest.fulfilled, (state, action) => {
        state.updateCorporationKeyContactsStatus = 'success';
        state.updateCorporationKeyContactsError = null;
        const { corporationId, primaryCorporateAdminData } = action.payload;
        if (state.currentCorporation && state.currentCorporation.id === corporationId && state.currentCorporation.keyContacts) {
          state.currentCorporation.keyContacts.primaryCorporateAdmin = primaryCorporateAdminData;
        }
      })
      .addCase(updateCorporationKeyContactsRequest.rejected, (state, action) => {
        state.updateCorporationKeyContactsStatus = 'error';
        state.updateCorporationKeyContactsError =
          action.payload || action.error?.message || 'Failed to update key contacts';
      });
  },
});

export const {
  setCurrentCorporation,
  setLoading,
  setError,
  setSelectedTab,
  setCompaniesSearchQuery,
  resetCloseCorporationStatus,
  resetSuspendCorporationStatus,
  setDashboardFilters,
  setChartAggregation,
  setAuditLogSearchText,
  setAuditLogFilter,
  setAuditLogPage,
  setAuditLogSort,
  setListSearchText,
  setListStatusFilter,
  setListTimeRangeFilter,
  setListPage,
  setListItemsPerPage,
  setListSortColumn,
  setListSortDirection,
  setSelectedCorporationForActions,
  resetCorporationEditSaveStatus,
  setEditingCorporationBrandingStatus,
  setEditingCorporationBrandingError,
  resetEditingCorporationBrandingState,
  setCorporationCompanies,
  setUpdatingCorporationCompaniesStatus,
  setUpdatingCorporationCompaniesError,
  resetUpdatingCorporationCompaniesState,
  updateCorporationSecurityConfigField,
  setCorporationSecurityConfigFormData,
  setUpdateCorporationSecurityConfigStatus,
  setUpdateCorporationSecurityConfigError,
  resetCorporationSecurityConfigEditState,
  setPrimaryCorporateAdminField,
  setUpdateCorporationKeyContactsStatus,
  setUpdateCorporationKeyContactsError,
  resetUpdateCorporationKeyContactsState,
} = corporationsSlice.actions;

export const selectCurrentCorporation = (state) => state.corporations.currentCorporation;
export const selectCurrentCorporationCompanies = (state) =>
  state.corporations.currentCorporation?.companies ?? [];
export const selectLoadingStatus = (state) => state.corporations.loading;
export const selectError = (state) => state.corporations.error;
export const selectSelectedTab = (state) => state.corporations.selectedTab;
export const selectCompaniesSearchQuery = (state) => state.corporations.companiesSearchQuery;

export const selectFilteredCompanies = (state) => {
  const companies = selectCurrentCorporationCompanies(state);
  const query = (state.corporations.companiesSearchQuery || '').toLowerCase().trim();
  if (!query) return companies;
  return companies.filter(
    (c) =>
      (c.name && c.name.toLowerCase().includes(query)) ||
      (c.type && c.type.toLowerCase().includes(query)) ||
      (c.location && c.location.toLowerCase().includes(query))
  );
};

export const selectCorporationSecurityConfig = (state) =>
  state.corporations.currentCorporation?.securityConfig ?? null;
export const selectCorporationBrandingConfig = (state) => {
  const corp = state.corporations.currentCorporation;
  return corp ? { logoUrl: corp.logoUrl } : null;
};

export const selectCurrentCorporationLoading = (state) => state.corporations.loading;
export const selectCloseCorporationStatus = (state) => state.corporations.closeCorporationStatus;
export const selectCloseCorporationError = (state) => state.corporations.closeCorporationError;
export const selectSuspendCorporationStatus = (state) => state.corporations.suspendCorporationStatus;
export const selectSuspendCorporationError = (state) => state.corporations.suspendCorporationError;

export const selectCorporationDashboardData = (state) => state.corporations.currentCorporationDashboard;
export const selectDashboardMetric = (state, metricName) =>
  state.corporations.currentCorporationDashboard?.metrics?.[metricName] ?? null;
export const selectLoginActivityChartData = (state) =>
  state.corporations.currentCorporationDashboard?.chart ?? [];
export const selectDashboardFilters = (state) => state.corporations.dashboardFilters;
export const selectChartAggregation = (state) => state.corporations.chartAggregation;
export const selectDashboardLoading = (state) => state.corporations.dashboardLoading;
export const selectDashboardError = (state) => state.corporations.dashboardError;

export const selectCorporationAuditLogData = (state) =>
  state.corporations.currentCorporationAuditLog?.data ?? [];
export const selectAuditLogTotalEntries = (state) =>
  state.corporations.currentCorporationAuditLog?.totalEntries ?? 0;
export const selectAuditLogLoading = (state) => state.corporations.auditLogLoading;
export const selectAuditLogError = (state) => state.corporations.auditLogError;
export const selectAuditLogFilters = (state) => state.corporations.auditLogFilters;
export const selectAuditLogPagination = (state) => state.corporations.auditLogPagination;
export const selectAuditLogSort = (state) => state.corporations.auditLogSort;

export const selectCorporationsList = (state) => state.corporations.corporationsList;
export const selectCorporationsListLoading = (state) => state.corporations.listLoading;
export const selectCorporationsListError = (state) => state.corporations.listError;
export const selectListFilters = (state) => state.corporations.listFilters;
export const selectListPagination = (state) => state.corporations.listPagination;
export const selectListSort = (state) => state.corporations.listSort;
export const selectSelectedCorporationIdForActions = (state) =>
  state.corporations.selectedCorporationIdForActions;
export const selectCorporationEditSaveStatus = (state) => state.corporations.corporationEditSaveStatus;
export const selectCorporationEditSaveError = (state) => state.corporations.corporationEditSaveError;
export const selectEditingCorporationBrandingStatus = (state) =>
  state.corporations.editingCorporationBranding?.status ?? 'idle';
export const selectEditingCorporationBrandingError = (state) =>
  state.corporations.editingCorporationBranding?.error ?? null;
export const selectCurrentCorporationLogoUrl = (state) =>
  state.corporations.currentCorporation?.logoUrl ?? null;

export const selectEditCorporationCompanies = (state) =>
  state.corporations.currentCorporationCompanies ?? [];
export const selectIsUpdatingCorporationCompanies = (state) =>
  state.corporations.isUpdatingCorporationCompanies ?? 'idle';
export const selectUpdateCorporationCompaniesError = (state) =>
  state.corporations.updateCorporationCompaniesError ?? null;

export const selectCurrentCorporationSecurityConfigFormData = (state) =>
  state.corporations.currentCorporationSecurityConfigFormData;
export const selectUpdateCorporationSecurityConfigStatus = (state) =>
  state.corporations.updateCorporationSecurityConfigStatus ?? 'idle';
export const selectUpdateCorporationSecurityConfigError = (state) =>
  state.corporations.updateCorporationSecurityConfigError ?? null;
export const selectIsCorporationSecurityConfigFormValid = (state) => {
  const form = state.corporations.currentCorporationSecurityConfigFormData;
  if (!form) return false;
  return Boolean(form.passwordPolicy && form.tfaRequirement);
};

export const selectCurrentCorporationPrimaryCorporateAdminFormData = (state) => {
  const primary = state.corporations.currentCorporation?.keyContacts?.primaryCorporateAdmin;
  if (!primary || typeof primary !== 'object') {
    return {
      name: '',
      role: '',
      email: '',
      workPhoneNo: '',
      cellPhoneNo: '',
    };
  }
  return {
    name: primary.name ?? '',
    role: primary.role ?? '',
    email: primary.email ?? '',
    workPhoneNo: primary.workPhoneNo ?? '',
    cellPhoneNo: primary.cellPhoneNo ?? '',
  };
};

export const selectUpdateCorporationKeyContactsStatus = (state) =>
  state.corporations.updateCorporationKeyContactsStatus ?? 'idle';
export const selectUpdateCorporationKeyContactsError = (state) =>
  state.corporations.updateCorporationKeyContactsError ?? null;

export const selectIsCorporationKeyContactsFormValid = (state) => {
  const data = selectCurrentCorporationPrimaryCorporateAdminFormData(state);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!(data.name || '').trim()) return false;
  if (!(data.role || '').trim()) return false;
  if (!(data.email || '').trim()) return false;
  if (!emailRegex.test((data.email || '').trim())) return false;
  if (!(data.workPhoneNo || '').trim()) return false;
  return true;
};

export default corporationsSlice.reducer;
