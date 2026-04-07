import { Box, Typography } from '@mui/material';
import { ArrowUpDown } from 'lucide-react';

export function TableHeader({
  label,
  columnKey,
  sortable = false,
  onSort,
  currentSortColumn,
  currentSortDirection = 'asc',
}) {
  const isSorted = currentSortColumn === columnKey;
  const ariaSort =
    !sortable || !isSorted ? 'none' : currentSortDirection === 'asc' ? 'ascending' : 'descending';

  const handleClick = () => {
    if (sortable && onSort) onSort(columnKey);
  };

  const handleKeyDown = (e) => {
    if (sortable && onSort && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSort(columnKey);
    }
  };

  return (
    <Box
      component="th"
      scope="col"
      role="columnheader"
      aria-sort={ariaSort}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={sortable ? 0 : undefined}
      sx={{
        textAlign: 'left',
        padding: '12px 16px',
        background: 'rgba(248, 247, 251, 1)',
        borderBottom: '1px solid rgba(221, 217, 235, 1)',
        cursor: sortable ? 'pointer' : 'default',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          component="span"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
            fontSize: 14,
            color: 'rgba(47, 65, 74, 1)',
          }}
        >
          {label}
        </Typography>
        {sortable && (
          <ArrowUpDown
            size={16}
            style={{ color: 'rgba(217, 217, 217, 1)', flexShrink: 0 }}
            aria-hidden
          />
        )}
      </Box>
    </Box>
  );
}
