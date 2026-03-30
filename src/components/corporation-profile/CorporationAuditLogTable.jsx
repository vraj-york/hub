import { useCallback, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCorporationAuditLogData,
  setAuditLogSearchText,
  setAuditLogFilter,
  setAuditLogPage,
  setAuditLogSort,
  selectCorporationAuditLogData,
  selectAuditLogTotalEntries,
  selectAuditLogLoading,
  selectAuditLogError,
  selectAuditLogFilters,
  selectAuditLogPagination,
  selectAuditLogSort,
} from '../../store/slices/corporationsSlice';
import { SearchInput } from '../common/SearchInput';
import { CustomSelect } from '../company-creation/CustomSelect';
import { Table } from '../common/Table';
import { mockActionTypes, mockTimeRanges } from '../../data/mockAuditLog';

export function CorporationAuditLogTable({ corporationId }) {
  const dispatch = useDispatch();
  const data = useSelector(selectCorporationAuditLogData);
  const totalEntries = useSelector(selectAuditLogTotalEntries);
  const loading = useSelector(selectAuditLogLoading);
  const error = useSelector(selectAuditLogError);
  const filters = useSelector(selectAuditLogFilters);
  const pagination = useSelector(selectAuditLogPagination);
  const sort = useSelector(selectAuditLogSort);

  useEffect(() => {
    if (corporationId) {
      dispatch(
        fetchCorporationAuditLogData({
          corporationId,
          filters,
          pagination,
          sort,
        })
      );
    }
  }, [
    corporationId,
    dispatch,
    filters.searchText,
    filters.actionType,
    filters.timeRange,
    pagination.currentPage,
    pagination.itemsPerPage,
    sort.column,
    sort.direction,
  ]);

  const handleSearchChange = useCallback(
    (e) => dispatch(setAuditLogSearchText(e.target.value)),
    [dispatch]
  );
  const handleActionTypeChange = useCallback(
    (value) => dispatch(setAuditLogFilter({ filterName: 'actionType', value })),
    [dispatch]
  );
  const handleTimeRangeChange = useCallback(
    (value) => dispatch(setAuditLogFilter({ filterName: 'timeRange', value })),
    [dispatch]
  );
  const handlePageChange = useCallback(
    (page) => dispatch(setAuditLogPage(page)),
    [dispatch]
  );
  const handleSort = useCallback(
    (column) => {
      const nextDirection =
        sort.column === column && sort.direction === 'asc' ? 'desc' : 'asc';
      dispatch(setAuditLogSort({ column, direction: nextDirection }));
    },
    [dispatch, sort.column, sort.direction]
  );

  const actionTypeOptions = mockActionTypes.map((o) => ({ value: o.value, label: o.label }));
  const timeRangeOptions = mockTimeRanges.map((o) => ({ value: o.value, label: o.label }));

  return (
    <Box
      role="tabpanel"
      id="configuration-tabpanel"
      aria-labelledby="configuration-tab"
      sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 3 }}
    >
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
          value={filters.searchText}
          onChange={handleSearchChange}
          aria-label="Search audit log entries"
        />
        <CustomSelect
          options={actionTypeOptions}
          value={filters.actionType}
          onChange={handleActionTypeChange}
          placeholder="All action types"
          selectedValueTextColor="rgba(47, 65, 74, 1)"
          inputBackground="rgba(255, 255, 255, 1)"
          aria-label="Filter by action types"
        />
        <CustomSelect
          options={timeRangeOptions}
          value={filters.timeRange}
          onChange={handleTimeRangeChange}
          placeholder="Last 30 days"
          selectedValueTextColor="rgba(47, 65, 74, 1)"
          inputBackground="rgba(255, 255, 255, 1)"
          aria-label="Filter by time range"
        />
      </Box>

      <Box sx={{ overflowX: 'auto' }}>
        <Table
          data={data}
          totalEntries={totalEntries}
          isLoading={loading}
          error={error}
          currentPage={pagination.currentPage}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={handlePageChange}
          onSort={handleSort}
          sortColumn={sort.column}
          sortDirection={sort.direction}
        />
      </Box>
    </Box>
  );
}
