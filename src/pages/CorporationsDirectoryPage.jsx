import { useEffect, useCallback } from 'react';
import { Box, Typography, Card, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import { SearchInput } from '../components/common/SearchInput';
import { CustomSelect } from '../components/company-creation/CustomSelect';
import { CorporationsDirectoryTable } from '../components/corporation-directory/CorporationsDirectoryTable';
import {
  fetchCorporationsList,
  setListSearchText,
  setListStatusFilter,
  setListTimeRangeFilter,
  setListPage,
  setListSortColumn,
  setListSortDirection,
  selectCorporationsList,
  selectCorporationsListLoading,
  selectCorporationsListError,
  selectListFilters,
  selectListPagination,
  selectListSort,
} from '../store/slices/corporationsSlice';
import { STATUS_FILTER_OPTIONS, TIME_RANGE_OPTIONS } from '../data/mockCorporationsList';

export function CorporationsDirectoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = useSelector(selectCorporationsList);
  const loading = useSelector(selectCorporationsListLoading);
  const error = useSelector(selectCorporationsListError);
  const filters = useSelector(selectListFilters);
  const pagination = useSelector(selectListPagination);
  const sort = useSelector(selectListSort);

  useEffect(() => {
    dispatch(fetchCorporationsList());
  }, [dispatch, filters.searchText, filters.status, filters.timeRange, pagination.currentPage, pagination.itemsPerPage, sort.column, sort.direction]);

  const handleSearchChange = useCallback(
    (e) => {
      dispatch(setListSearchText(e.target?.value ?? ''));
    },
    [dispatch]
  );

  const handleStatusChange = useCallback(
    (value) => {
      dispatch(setListStatusFilter(value ?? 'all'));
    },
    [dispatch]
  );

  const handleTimeRangeChange = useCallback(
    (value) => {
      dispatch(setListTimeRangeFilter(value ?? 'last_30_days'));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setListPage(page));
    },
    [dispatch]
  );

  const handleSort = useCallback(
    (column, direction) => {
      dispatch(setListSortColumn(column));
      dispatch(setListSortDirection(direction));
    },
    [dispatch]
  );

  const handleViewDetails = useCallback(
    (id) => {
      navigate(`/corporations/${id}/profile`);
    },
    [navigate]
  );

  return (
    <SuperAdminLayout>
      <Box component="main" role="main" sx={{ py: 3, px: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          <Box>
            <Typography
              sx={{
                fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                fontSize: 14,
                color: 'rgba(230, 81, 0, 1)',
              }}
            >
              View and manage all corporations across the platform
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Plus size={18} style={{ color: 'rgba(47, 65, 74, 1)' }} />}
            onClick={() => navigate('/corporations/add')}
            aria-label="Add a new corporation"
            sx={{
              background: 'rgba(245, 197, 24, 1)',
              color: 'rgba(47, 65, 74, 1)',
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontWeight: 600,
              fontSize: 14,
              textTransform: 'none',
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': {
                background: 'rgba(235, 180, 10, 1)',
                boxShadow: 'none',
              },
            }}
          >
            Add New Corporation
          </Button>
        </Box>

        <Card
          sx={{
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <SearchInput
              placeholder="Search here..."
              value={filters.searchText}
              onChange={handleSearchChange}
              aria-label="Search corporation directory"
              sx={{ width: 320, maxWidth: '100%' }}
            />
            <CustomSelect
              options={STATUS_FILTER_OPTIONS}
              value={filters.status}
              onChange={handleStatusChange}
              placeholder="All status"
              aria-label="Filter by corporation status"
              selectedValueTextColor="rgba(47, 65, 74, 1)"
              inputBackground="rgba(255, 255, 255, 1)"
            />
            <CustomSelect
              options={TIME_RANGE_OPTIONS}
              value={filters.timeRange}
              onChange={handleTimeRangeChange}
              placeholder="Last 30 days"
              aria-label="Filter by creation time range"
              selectedValueTextColor="rgba(47, 65, 74, 1)"
              inputBackground="rgba(255, 255, 255, 1)"
            />
          </Box>
          <CorporationsDirectoryTable
            data={list}
            loading={loading}
            error={error}
            sortColumn={sort.column}
            sortDirection={sort.direction}
            onSort={handleSort}
            currentPage={pagination.currentPage}
            itemsPerPage={pagination.itemsPerPage}
            totalEntries={pagination.totalEntries}
            onPageChange={handlePageChange}
            onViewDetails={handleViewDetails}
          />
        </Card>
      </Box>
    </SuperAdminLayout>
  );
}
