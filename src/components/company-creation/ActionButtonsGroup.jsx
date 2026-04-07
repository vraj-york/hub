import { Box, Button } from '@mui/material';

export function ActionButtonsGroup({
  onCancel,
  onPrevious,
  onNext,
  nextLabel = 'Next',
  previousLabel = 'Previous',
  cancelLabel = 'Cancel',
  isNextDisabled,
  isPreviousDisabled,
  isNextLoading,
  loadingLabel,
  cancelAriaLabel,
  nextAriaLabel,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        pt: 3,
        gap: 2,
      }}
    >
      {/* Cancel button on the left */}
      <Box>
        {onCancel && (
          <Button
            variant="outlined"
            onClick={onCancel}
            aria-label={cancelAriaLabel ?? cancelLabel}
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              background: 'rgba(255, 255, 255, 1)',
              color: 'rgba(47, 65, 74, 1)',
              border: '1px solid rgba(47, 65, 74, 1)',
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              py: 1,
              '&:hover': {
                background: 'rgba(248, 247, 251, 1)',
                borderColor: 'rgba(47, 65, 74, 1)',
              },
            }}
          >
            {cancelLabel}
          </Button>
        )}
      </Box>

      {/* Previous and Next buttons on the right */}
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {onPrevious && (
          <Button
            variant="contained"
            onClick={onPrevious}
            disabled={isPreviousDisabled}
            aria-disabled={isPreviousDisabled}
            tabIndex={isPreviousDisabled ? -1 : 0}
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              background: 'rgba(107, 119, 127, 1)',
              color: 'rgba(255, 255, 255, 1)',
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              py: 1,
              '&:hover': { background: 'rgba(87, 99, 107, 1)' },
              '&.Mui-disabled': { color: 'rgba(255, 255, 255, 0.5)', background: 'rgba(107, 119, 127, 0.5)' },
            }}
          >
            {previousLabel}
          </Button>
        )}
        {onNext && (
          <Button
            variant="contained"
            onClick={onNext}
            disabled={isNextDisabled}
            aria-disabled={isNextDisabled}
            aria-busy={isNextLoading}
            aria-label={nextAriaLabel ?? nextLabel}
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              background: 'rgba(48, 95, 161, 1)',
              color: '#fff',
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              py: 1,
              '&:hover': { background: 'rgba(38, 75, 131, 1)' },
              '&.Mui-disabled': { color: 'rgba(255,255,255,0.5)', background: 'rgba(48, 95, 161, 0.5)' },
            }}
          >
            {isNextLoading ? (loadingLabel ?? 'Saving...') : nextLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
}
