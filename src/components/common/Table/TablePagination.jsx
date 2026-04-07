import { Box, Typography, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const iconColor = 'rgba(47, 65, 74, 1)';

export function TablePagination({
  totalEntries,
  currentPage,
  itemsPerPage,
  onPageChange,
  'aria-label': ariaLabel = 'Audit log pagination',
  displayText: displayTextProp,
}) {
  const totalPages = Math.max(1, Math.ceil(totalEntries / itemsPerPage));
  const displayText = displayTextProp ?? `Showing ${totalEntries} entries`;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box
      role="navigation"
      aria-label={ariaLabel}
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
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          startIcon={<ChevronLeft size={18} style={{ color: iconColor }} />}
          aria-label="Previous page"
          size="small"
          sx={{
            minWidth: 40,
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
            fontSize: 14,
            color: 'rgba(47, 65, 74, 1)',
            background: 'rgba(255, 255, 255, 1)',
            border: '1px solid rgba(221, 217, 235, 1)',
            borderRadius: 1,
            textTransform: 'none',
            '&:hover': {
              background: 'rgba(248, 247, 251, 1)',
              borderColor: 'rgba(221, 217, 235, 1)',
            },
            '&.Mui-disabled': { color: 'rgba(150, 150, 150, 1)' },
          }}
        >
          Previous
        </Button>
        {pageNumbers.map((num) => (
          <Button
            key={num}
            onClick={() => onPageChange(num)}
            aria-label={`Go to page ${num}`}
            aria-current={num === currentPage ? 'page' : undefined}
            size="small"
            sx={{
              minWidth: 40,
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontWeight: 600,
              fontSize: 14,
              color: 'rgba(47, 65, 74, 1)',
              background: num === currentPage ? 'rgba(248, 247, 251, 1)' : 'rgba(255, 255, 255, 1)',
              border: '1px solid rgba(221, 217, 235, 1)',
              borderRadius: 1,
              textTransform: 'none',
              '&:hover': {
                background: 'rgba(248, 247, 251, 1)',
                borderColor: 'rgba(221, 217, 235, 1)',
              },
            }}
          >
            {num}
          </Button>
        ))}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          endIcon={<ChevronRight size={18} style={{ color: iconColor }} />}
          aria-label="Next page"
          size="small"
          sx={{
            minWidth: 40,
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
            fontSize: 14,
            color: 'rgba(47, 65, 74, 1)',
            background: 'rgba(255, 255, 255, 1)',
            border: '1px solid rgba(221, 217, 235, 1)',
            borderRadius: 1,
            textTransform: 'none',
            '&:hover': {
              background: 'rgba(248, 247, 251, 1)',
              borderColor: 'rgba(221, 217, 235, 1)',
            },
            '&.Mui-disabled': { color: 'rgba(150, 150, 150, 1)' },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
