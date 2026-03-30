import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import { SearchInput } from '../components/common/SearchInput';
import { CustomSelect } from '../components/company-creation/CustomSelect';
import { CompanyDirectoryTable } from '../components/company-directory/CompanyDirectoryTable';
import { TablePagination } from '../components/company-directory/TablePagination';
import { DeleteCompanyConfirmationModal } from '../components/company-profile-config/DeleteCompanyConfirmationModal';
import {
  fetchCompanies,
  setSearchTerm,
  setFilter,
  setSort,
  setCurrentPage,
  selectCompaniesData,
  selectCompanyDirectoryPagination,
  selectCompanyDirectoryFilters,
  selectCompanyDirectorySearchTerm,
  selectCompanyDirectorySort,
  selectCompanyDirectoryLoading,
} from '../store/slices/companyDirectorySlice';
import {
  setCompanyToDelete,
  clearCompanyToDelete,
  deleteCompanyRequest,
  selectCompanyToDeleteId,
  selectCompanyToDeleteName,
  selectIsDeletingCompany,
  selectDeleteCompanyError,
} from '../store/slices/companyConfigSlice';
import {
  openDeleteCompanyModal,
  closeDeleteCompanyModal,
  selectIsDeleteCompanyModalOpen,
} from '../store/slices/uiSlice';
import {
  STATUS_FILTER_OPTIONS,
  PLAN_FILTER_OPTIONS,
  ASSIGNED_CORPORATION_FILTER_OPTIONS,
  TIME_RANGE_OPTIONS,
} from '../data/mockCompaniesDirectory';

export function CompaniesDirectoryPage() {
  const dispatch = useDispatch();
  const companies = useSelector(selectCompaniesData);
  const pagination = useSelector(selectCompanyDirectoryPagination);
  const filters = useSelector(selectCompanyDirectoryFilters);
  const searchTerm = useSelector(selectCompanyDirectorySearchTerm);
  const sort = useSelector(selectCompanyDirectorySort);
  const loading = useSelector(selectCompanyDirectoryLoading);
  const isDeleteModalOpen = useSelector(selectIsDeleteCompanyModalOpen);
  const companyToDeleteId = useSelector(selectCompanyToDeleteId);
  const companyToDeleteName = useSelector(selectCompanyToDeleteName);
  const isDeletingCompany = useSelector(selectIsDeletingCompany);
  const deleteCompanyError = useSelector(selectDeleteCompanyError);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch, searchTerm, filters, sort, pagination.currentPage]);

  const handleSort = (columnId) => {
    const nextDirection =
      sort.column === columnId && sort.direction === 'asc' ? 'desc' : 'asc';
    dispatch(setSort({ column: columnId, direction: nextDirection }));
  };

  const handleDeleteModalClose = useCallback(() => {
    dispatch(closeDeleteCompanyModal());
    dispatch(clearCompanyToDelete());
  }, [dispatch]);

  const handleDeleteCompanyConfirm = useCallback(async () => {
    if (!companyToDeleteId) return;
    try {
      await dispatch(deleteCompanyRequest(companyToDeleteId)).unwrap();
      dispatch(closeDeleteCompanyModal());
      dispatch(clearCompanyToDelete());
      dispatch(fetchCompanies());
    } catch (_err) {
      // Error stored in companyConfigSlice, modal stays open
    }
  }, [companyToDeleteId, dispatch]);

  return (
    <SuperAdminLayout>
      <Box
        component="main"
        role="main"
        sx={{
          flex: 1,
          background: 'rgba(248, 247, 251, 1)',
          p: 3,
          overflow: 'auto',
        }}
      >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box>
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontWeight: 600,
                  fontSize: 20,
                  color: 'rgba(47, 65, 74, 1)',
                  mb: 0.5,
                }}
              >
                Companies
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontWeight: 400,
                  fontSize: 14,
                  color: 'rgba(56, 89, 102, 1)',
                }}
              >
                View and manage all companies across the platform
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/companies/add"
              variant="contained"
              startIcon={<Plus size={18} style={{ color: 'rgba(255, 255, 255, 1)' }} />}
              aria-label="Add a new company"
              sx={{
                fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                fontWeight: 600,
                fontSize: 14,
                color: 'rgba(255, 255, 255, 1)',
                background: 'rgba(48, 95, 161, 1)',
                '&:hover': { background: 'rgba(48, 95, 161, 0.9)' },
                borderRadius: 2,
              }}
            >
              Add New Company
            </Button>
          </Box>

          <Paper
            elevation={0}
            sx={{
              background: 'rgba(255, 255, 255, 1)',
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid rgba(221, 217, 235, 1)',
            }}
          >
            <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
              <SearchInput
                placeholder="Search here..."
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                aria-label="Search company directory"
              />
              <CustomSelect
                placeholder="All status"
                options={STATUS_FILTER_OPTIONS}
                value={filters.status}
                onChange={(v) => dispatch(setFilter({ key: 'status', value: v }))}
                inputBackground="rgba(255, 255, 255, 1)"
                selectedValueTextColor="rgba(47, 65, 74, 1)"
                aria-label="Filter by company status"
              />
              <CustomSelect
                placeholder="All plans"
                options={PLAN_FILTER_OPTIONS}
                value={filters.plan}
                onChange={(v) => dispatch(setFilter({ key: 'plan', value: v }))}
                inputBackground="rgba(255, 255, 255, 1)"
                selectedValueTextColor="rgba(47, 65, 74, 1)"
                aria-label="Filter by company plan"
              />
              <CustomSelect
                placeholder="All corporations"
                options={ASSIGNED_CORPORATION_FILTER_OPTIONS}
                value={filters.assignedCorporationId}
                onChange={(v) => dispatch(setFilter({ key: 'assignedCorporationId', value: v }))}
                inputBackground="rgba(255, 255, 255, 1)"
                selectedValueTextColor="rgba(47, 65, 74, 1)"
                aria-label="Filter by assigned corporation"
              />
              <CustomSelect
                placeholder="All time"
                options={TIME_RANGE_OPTIONS}
                value={filters.createdOnRange}
                onChange={(v) => dispatch(setFilter({ key: 'createdOnRange', value: v }))}
                inputBackground="rgba(255, 255, 255, 1)"
                selectedValueTextColor="rgba(47, 65, 74, 1)"
                aria-label="Filter by creation time range"
              />
              <CustomSelect
                placeholder="All time"
                options={TIME_RANGE_OPTIONS}
                value={filters.lastUpdatedOnRange}
                onChange={(v) => dispatch(setFilter({ key: 'lastUpdatedOnRange', value: v }))}
                inputBackground="rgba(255, 255, 255, 1)"
                selectedValueTextColor="rgba(47, 65, 74, 1)"
                aria-label="Filter by last updated time range"
              />
            </Box>

            <Box sx={{ px: 2, pb: 2, overflowX: 'auto' }}>
              <CompanyDirectoryTable
                companies={companies}
                onSort={handleSort}
                currentSortColumn={sort.column}
                sortDirection={sort.direction}
                loading={loading}
              />
            </Box>

            <Box sx={{ px: 2, pb: 2 }}>
              <TablePagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
                onPageChange={(page) => dispatch(setCurrentPage(page))}
                displayText={`Showing ${pagination.totalItems} entries`}
              />
            </Box>
          </Paper>

          <DeleteCompanyConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={handleDeleteModalClose}
            onConfirm={handleDeleteCompanyConfirm}
            companyId={companyToDeleteId}
            companyName={companyToDeleteName}
            isDeleting={isDeletingCompany}
            deleteError={deleteCompanyError}
          />
        </Box>
    </SuperAdminLayout>
  );
}
