import { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';

const BUTTON_SX = {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  borderRadius: '8px',
  textTransform: 'none',
};

export function DeleteCompanyConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  companyId,
  companyName,
  isDeleting = false,
  deleteError = null,
}) {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        if (cancelButtonRef.current) cancelButtonRef.current.focus();
      }, 100);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (!isDeleting) onClose?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') handleClose();
  };

  const handleConfirm = () => {
    if (companyId && !isDeleting) onConfirm?.(companyId);
  };

  const displayName = companyName || 'this company';
  const deleteButtonLabel = isDeleting ? 'Deleting Company...' : 'Delete Company';
  const deleteAriaLabel = isDeleting
    ? 'Deleting company'
    : `Confirm and permanently delete company: ${displayName}`;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-company-modal-title"
      PaperProps={{
        sx: {
          background: 'rgba(255, 255, 255, 1)',
          borderRadius: 2,
          minWidth: 320,
          maxWidth: 480,
        },
      }}
      slotProps={{
        backdrop: {
          sx: { background: 'rgba(26, 26, 26, 0.699999988079071)' },
        },
      }}
    >
      <DialogTitle
        id="delete-company-modal-title"
        component="div"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '20px',
          fontWeight: 600,
          color: 'rgba(47, 65, 74, 1)',
          pt: 3,
          px: 3,
          pb: 1,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '20px',
            fontWeight: 600,
            color: 'rgba(47, 65, 74, 1)',
          }}
        >
          Are you sure you want to delete this company?
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ px: 3, pb: 3, pt: 0 }}>
        {deleteError && (
          <Typography
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(161, 47, 63, 1)',
              mb: 2,
            }}
          >
            {deleteError}
          </Typography>
        )}
        <Typography
          sx={{
            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(56, 89, 102, 1)',
            mb: 3,
          }}
        >
          {companyName
            ? `This will permanently remove "${companyName}" and cannot be undone.`
            : 'This action cannot be undone.'}
        </Typography>
        <Typography
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 2,
          }}
        >
          <Button
            ref={cancelButtonRef}
            variant="contained"
            onClick={handleClose}
            disabled={isDeleting}
            aria-label="Cancel company deletion process"
            sx={{
              ...BUTTON_SX,
              background: 'rgba(255, 255, 255, 1)',
              color: 'rgba(47, 65, 74, 1)',
              border: '1px solid rgba(221, 217, 235, 1)',
              '&:hover': {
                background: 'rgba(248, 247, 251, 1)',
                borderColor: 'rgba(47, 65, 74, 0.3)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={isDeleting || !companyId}
            aria-label={deleteAriaLabel}
            aria-disabled={isDeleting || !companyId}
            aria-busy={isDeleting}
            sx={{
              ...BUTTON_SX,
              background: 'rgba(196, 71, 85, 1)',
              color: 'rgba(255, 255, 255, 1)',
              '&:hover': {
                background: '#a83a4a',
                color: 'rgba(255, 255, 255, 1)',
              },
              '&.Mui-disabled': {
                color: 'rgba(255, 255, 255, 0.5)',
                background: 'rgba(196, 71, 85, 0.5)',
              },
            }}
          >
            {isDeleting && (
              <CircularProgress size={16} sx={{ color: 'inherit', mr: 1 }} />
            )}
            {deleteButtonLabel}
          </Button>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
