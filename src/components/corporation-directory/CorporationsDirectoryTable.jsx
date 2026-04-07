import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  TableFooter,
} from '@mui/material';
import { TableHeader } from '../common/Table/TableHeader';
import { TableCell } from '../common/Table/TableCell';
import { TablePagination } from '../common/Table/TablePagination';
import { ViewCorporationDetailsButton } from './ViewCorporationDetailsButton';
import { CorporationActionsMenu } from './CorporationActionsMenu';

const CORPORATION_STATUS_BADGE = {
  Active: {
    backgroundColor: 'rgba(239, 250, 245, 1)',
    textColor: 'rgba(47, 143, 107, 1)',
  },
  Incomplete: {
    backgroundColor: 'rgba(241, 240, 247, 1)',
    textColor: 'rgba(125, 100, 157, 1)',
  },
  Suspended: {
    backgroundColor: 'rgba(251, 248, 235, 1)',
    textColor: 'rgba(203, 145, 39, 1)',
  },
  Closed: {
    backgroundColor: 'rgba(253, 243, 243, 1)',
    textColor: 'rgba(196, 71, 85, 1)',
  },
};

function getStatusBadgeProps(status) {
  const style = CORPORATION_STATUS_BADGE[status] || CORPORATION_STATUS_BADGE.Active;
  return {
    label: status,
    backgroundColor: style.backgroundColor,
    textColor: style.textColor,
    ariaLabel: `Corporation status: ${status}`,
  };
}

const COLUMNS = [
  { key: 'id', label: 'Corp. ID', sortable: true },
  { key: 'name', label: 'Corporation Name', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'executiveSponsor', label: 'Executive Sponsor', sortable: true },
  { key: 'numCompanies', label: 'Companies', sortable: true },
  { key: 'createdOn', label: 'Created On', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false },
];

export function CorporationsDirectoryTable({
  data = [],
  loading,
  error,
  sortColumn,
  sortDirection,
  onSort,
  currentPage,
  itemsPerPage,
  totalEntries,
  onPageChange,
  onViewDetails,
  onManageActions,
}) {
  const handleSort = (columnKey) => {
    if (!onSort) return;
    const nextDir =
      sortColumn !== columnKey ? 'asc' : sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(columnKey, nextDir);
  };

  if (error) {
    return (
      <TableContainer>
        <MuiTable role="table" sx={{ minWidth: 600 }}>
          <TableBody>
            <TableRow>
              <TableCell
                content={
                  <span style={{ color: 'rgba(196, 71, 85, 1)' }}>{error}</span>
                }
                colSpan={COLUMNS.length}
              />
            </TableRow>
          </TableBody>
        </MuiTable>
      </TableContainer>
    );
  }

  if (loading) {
    return (
      <TableContainer>
        <MuiTable role="table" sx={{ minWidth: 600 }}>
          <TableBody>
            <TableRow>
              <TableCell content="Loading..." colSpan={COLUMNS.length} />
            </TableRow>
          </TableBody>
        </MuiTable>
      </TableContainer>
    );
  }

  return (
    <TableContainer sx={{ overflowX: 'auto' }}>
      <MuiTable role="table" sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow role="row">
            {COLUMNS.map((col) => (
              <TableHeader
                key={col.key}
                label={col.label}
                columnKey={col.key}
                sortable={col.sortable !== false}
                onSort={handleSort}
                currentSortColumn={sortColumn}
                currentSortDirection={sortDirection}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow role="row">
              <TableCell content="No corporations found" colSpan={COLUMNS.length} />
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={row.id} role="row">
                <TableCell content={row.id} />
                <TableCell
                  content={row.name}
                  secondaryContent={row.region}
                />
                <TableCell
                  badgeProps={getStatusBadgeProps(row.status)}
                />
                <TableCell
                  content={row.executiveSponsor?.name}
                  secondaryContent={row.executiveSponsor?.email}
                />
                <TableCell content={String(row.numCompanies ?? 0)} />
                <TableCell content={row.createdOnFormatted ?? row.createdOn} />
                <TableCell
                  content={
                    <span style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                      <ViewCorporationDetailsButton
                        corporationId={row.id}
                        corporationName={row.name}
                        onClick={onViewDetails}
                      />
                      <CorporationActionsMenu
                        corporationId={row.id}
                        corporationName={row.name}
                        status={row.status}
                      />
                    </span>
                  }
                />
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={COLUMNS.length}
              content={
                <TablePagination
                  totalEntries={totalEntries}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onPageChange={onPageChange}
                  aria-label="Corporation list pagination"
                  displayText={`Showing ${totalEntries} corporations`}
                />
              }
            />
          </TableRow>
        </TableFooter>
      </MuiTable>
    </TableContainer>
  );
}
