import { Box, Typography } from '@mui/material';
import { PaginationButton } from './PaginationButton';

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  displayText: displayTextProp,
}) {
  const displayText = displayTextProp ?? `Showing ${totalItems} entries`;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box
      role="navigation"
      aria-label="Company directory pagination"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        py: 2,
        px: 0,
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontWeight: 400,
          fontSize: 14,
          color: 'rgba(56, 89, 102, 1)',
        }}
      >
        {displayText}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <PaginationButton
          label="Previous"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          startIcon="chevron-left"
          aria-label="Previous page"
        />
        {pageNumbers.map((num) => (
          <PaginationButton
            key={num}
            label={num}
            onClick={() => onPageChange(num)}
            isActive={num === currentPage}
            aria-label={`Go to page ${num}`}
          />
        ))}
        <PaginationButton
          label="Next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          endIcon="chevron-right"
          aria-label="Next page"
        />
      </Box>
    </Box>
  );
}
