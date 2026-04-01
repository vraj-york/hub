import { Box, Button } from '@mui/material';

const buttonSx = {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  borderRadius: '8px',
  textTransform: 'none',
};

export function FooterButtonGroup({
  onCancel,
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled,
  isPreviousHidden,
  cancelLabel = 'Cancel',
  previousLabel = 'Previous',
  nextLabel = 'Next',
}) {
  const showPrevious = onPrevious != null && !isPreviousHidden;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 2,
        flexWrap: 'wrap',
        pt: 3,
      }}
    >
      {onCancel && (
        <Button
          variant="contained"
          onClick={onCancel}
          aria-label={cancelLabel}
          sx={{
            ...buttonSx,
            background: 'rgba(255, 255, 255, 1)',
            color: 'rgba(47, 65, 74, 1)',
            border: '1px solid rgba(221, 217, 235, 1)',
            '&:hover': {
              background: 'rgba(248, 247, 251, 1)',
              borderColor: 'rgba(47, 65, 74, 0.3)',
            },
          }}
        >
          {cancelLabel}
        </Button>
      )}
      {(onPrevious != null || isPreviousHidden) && (
        <Button
          variant="contained"
          onClick={onPrevious || undefined}
          disabled={isPreviousDisabled || isPreviousHidden}
          aria-label={previousLabel}
          aria-disabled={isPreviousDisabled || isPreviousHidden}
          sx={{
            ...buttonSx,
            background: 'rgba(221, 217, 235, 1)',
            color: 'rgba(47, 65, 74, 1)',
            visibility: isPreviousHidden ? 'hidden' : 'visible',
            pointerEvents: isPreviousHidden ? 'none' : 'auto',
            '&:hover': { background: 'rgba(211, 205, 227, 1)' },
            '&.Mui-disabled': { color: 'rgba(47, 65, 74, 0.5)', background: 'rgba(241, 240, 247, 1)' },
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
          aria-label={nextLabel}
          aria-disabled={isNextDisabled}
          sx={{
            ...buttonSx,
            background: 'rgba(48, 95, 161, 1)',
            color: 'rgba(255, 255, 255, 1)',
            '&:hover': { background: 'rgba(38, 75, 131, 1)' },
            '&.Mui-disabled': { color: 'rgba(255,255,255,0.5)', background: 'rgba(48, 95, 161, 0.5)' },
          }}
        >
          {nextLabel}
        </Button>
      )}
    </Box>
  );
}
