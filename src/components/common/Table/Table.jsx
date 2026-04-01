import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  TableFooter,
} from '@mui/material';
import { TableHeader } from './TableHeader';
import { TableCell } from './TableCell';
import { TablePagination } from './TablePagination';

const AUDIT_LOG_STATUS_BADGE_STYLES = {
  'User Management': {
    backgroundColor: 'rgba(241, 240, 247, 1)',
    textColor: 'rgba(125, 100, 157, 1)',
  },
  'Plan & Seats': {
    backgroundColor: 'rgba(251, 248, 235, 1)',
    textColor: 'rgba(203, 145, 39, 1)',
  },
  Configuration: {
    backgroundColor: 'rgba(241, 246, 253, 1)',
    textColor: 'rgba(58, 111, 216, 1)',
  },
};

function getBadgeProps(status) {
  const style = AUDIT_LOG_STATUS_BADGE_STYLES[status];
  if (!style) return { label: status };
  return {
    label: status,
    backgroundColor: style.backgroundColor,
    textColor: style.textColor,
    ariaLabel: `Audit action status: ${status}`,
  };
}

export function Table({
  data = [],
  columns = [],
  isLoading,
  error,
  totalEntries,
  currentPage,
  itemsPerPage,
  onPageChange,
  onSort,
  sortColumn,
  sortDirection = 'asc',
  renderCell,
}) {
  const defaultColumns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true },
    { key: 'actions', label: 'Actions', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actor', label: 'Actor', sortable: true },
  ];

  const cols = columns.length ? columns : defaultColumns;

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
              />
            </TableRow>
          </TableBody>
        </MuiTable>
      </TableContainer>
    );
  }

  if (isLoading) {
    return (
      <TableContainer>
        <MuiTable role="table" sx={{ minWidth: 600 }}>
          <TableBody>
            <TableRow>
              <TableCell content="Loading..." />
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
            {cols.map((col) => (
              <TableHeader
                key={col.key}
                label={col.label}
                columnKey={col.key}
                sortable={col.sortable !== false}
                onSort={onSort}
                currentSortColumn={sortColumn}
                currentSortDirection={sortDirection}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow role="row">
              <TableCell content="No entries" colSpan={cols.length} />
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={row.id} role="row">
                {cols.map((col) => {
                  if (renderCell) {
                    const cell = renderCell(col.key, row);
                    if (cell !== undefined) return cell;
                  }
                  if (col.key === 'timestamp') {
                    return (
                      <TableCell
                        key={col.key}
                        content={row.timestampFormatted ?? row.timestamp}
                      />
                    );
                  }
                  if (col.key === 'actions') {
                    return (
                      <TableCell key={col.key} content={row.action} />
                    );
                  }
                  if (col.key === 'status') {
                    return (
                      <TableCell
                        key={col.key}
                        badgeProps={getBadgeProps(row.status)}
                      />
                    );
                  }
                  if (col.key === 'actor') {
                    return (
                      <TableCell
                        key={col.key}
                        content={row.actorName}
                        secondaryContent={row.actorEmail}
                      />
                    );
                  }
                  return (
                    <TableCell
                      key={col.key}
                      content={row[col.key]}
                    />
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
        {totalEntries != null && (
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={cols.length}
                content={
                  <TablePagination
                    totalEntries={totalEntries}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={onPageChange}
                  />
                }
              />
            </TableRow>
          </TableFooter>
        )}
      </MuiTable>
    </TableContainer>
  );
}
