import { Box, Table, TableBody, TableRow, CircularProgress, Typography } from '@mui/material';
import { TableHeader } from './TableHeader';
import { TableCell } from './TableCell';
import { TwoLineTableCell } from './TwoLineTableCell';
import { Badge } from '../common/Badge';
import { SeatUsageProgressBar } from '../common/SeatUsageProgressBar';
import { CompanyActionsCell } from './CompanyActionsCell';

const STATUS_BADGE_COLORS = {
  Assigned: { bg: 'rgba(239, 250, 245, 1)', color: 'rgba(47, 143, 107, 1)' },
  Unassigned: { bg: 'rgba(251, 248, 235, 1)', color: 'rgba(203, 145, 39, 1)' },
  Archived: { bg: 'rgba(253, 243, 243, 1)', color: 'rgba(196, 71, 85, 1)' },
  Draft: { bg: 'rgba(241, 240, 247, 1)', color: 'rgba(125, 100, 157, 1)' },
};

const PLAN_BADGE_COLORS = {
  Enterprise: { bg: 'rgba(241, 246, 253, 1)', color: 'rgba(58, 111, 216, 1)' },
  Standard: { bg: 'rgba(241, 240, 247, 1)', color: 'rgba(125, 100, 157, 1)' },
  Professional: { bg: 'rgba(242, 248, 249, 1)', color: 'rgba(61, 104, 125, 1)' },
};

export function CompanyDirectoryTable({
  companies,
  onSort,
  currentSortColumn,
  sortDirection,
  loading,
  onViewCompany,
  onEditCompany,
  onDeleteCompany,
}) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress size={40} sx={{ color: 'rgba(48, 95, 161, 1)' }} aria-label="Loading companies" />
      </Box>
    );
  }

  if (!companies || companies.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: 14, color: 'rgba(56, 89, 102, 1)' }}>
          No companies match your search or filters.
        </Typography>
      </Box>
    );
  }

  return (
    <Table
      component="table"
      role="table"
      aria-label="Company Directory"
      sx={{
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'auto',
      }}
    >
      <thead>
        <TableRow>
          <TableHeader
            label="Company ID"
            columnId="companyId"
            sortable
            onSort={onSort}
            isSorted={currentSortColumn === 'companyId'}
            sortDirection={sortDirection}
          />
          <TableHeader
            label="Company Name"
            columnId="companyName"
            sortable
            onSort={onSort}
            isSorted={currentSortColumn === 'companyName'}
            sortDirection={sortDirection}
          />
          <TableHeader
            label="Status"
            columnId="status"
            sortable
            onSort={onSort}
            isSorted={currentSortColumn === 'status'}
            sortDirection={sortDirection}
          />
          <TableHeader
            label="Assigned Corporation"
            columnId="assignedCorporation"
            sortable
            onSort={onSort}
            isSorted={currentSortColumn === 'assignedCorporation'}
            sortDirection={sortDirection}
          />
          <TableHeader
            label="Plan"
            columnId="plan"
            sortable
            onSort={onSort}
            isSorted={currentSortColumn === 'plan'}
            sortDirection={sortDirection}
          />
          <TableHeader
            label="Seat Usage"
            columnId="seatUsage"
            sortable
            onSort={onSort}
            isSorted={currentSortColumn === 'seatUsage'}
            sortDirection={sortDirection}
          />
          <TableHeader
            label="Created On"
            columnId="createdOn"
            sortable
            onSort={onSort}
            isSorted={currentSortColumn === 'createdOn'}
            sortDirection={sortDirection}
          />
          <TableHeader
            label="Last Updated On"
            columnId="lastUpdatedOn"
            sortable
            onSort={onSort}
            isSorted={currentSortColumn === 'lastUpdatedOn'}
            sortDirection={sortDirection}
          />
          <TableHeader
            label="Actions"
            columnId="actions"
            sortable={false}
            onSort={onSort}
            isSorted={false}
            sortDirection={sortDirection}
          />
        </TableRow>
      </thead>
      <TableBody>
        {companies.map((company) => {
          const statusColors = STATUS_BADGE_COLORS[company.status] ?? {};
          const planColors = PLAN_BADGE_COLORS[company.plan] ?? {};
          const corpPrimary =
            company.assignedCorporation === 'NA'
              ? 'NA'
              : company.assignedCorporation?.name ?? '';
          const corpSecondary =
            company.assignedCorporation === 'NA' || !company.assignedCorporation?.corpCode
              ? ''
              : company.assignedCorporation.corpCode;
          const used = company.seatUsage?.used ?? 0;
          const total = company.seatUsage?.total ?? 0;
          return (
            <TableRow
              key={company.id}
              sx={{
                '&:hover': { background: 'rgba(248, 247, 251, 0.6)' },
              }}
              role="row"
            >
              <TableCell value={company.id} />
              <TwoLineTableCell primaryValue={company.name} secondaryValue={company.region} />
              <TableCell>
                <Badge
                  label={company.status}
                  backgroundColor={statusColors.bg}
                  textColor={statusColors.color}
                  role="status"
                  ariaLabel={`Status: ${company.status}`}
                />
              </TableCell>
              <TwoLineTableCell primaryValue={corpPrimary} secondaryValue={corpSecondary} />
              <TableCell>
                <Badge
                  label={company.plan}
                  backgroundColor={planColors.bg}
                  textColor={planColors.color}
                  role="status"
                  ariaLabel={`Plan: ${company.plan}`}
                />
              </TableCell>
              <TableCell>
                <SeatUsageProgressBar used={used} total={total} />
              </TableCell>
              <TableCell value={company.createdOn ?? ''} />
              <TableCell value={company.lastUpdatedOn ?? ''} />
              <CompanyActionsCell
                companyId={company.id}
                companyName={company.name}
                onView={onViewCompany}
                onEdit={onEditCompany}
                onDelete={onDeleteCompany}
              />
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
