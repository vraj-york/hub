import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import { X, TriangleAlert } from 'lucide-react';
import { InfoAlertCard } from '../company-creation/InfoAlertCard';
import { FormGroupLabel } from '../company-creation/FormGroupLabel';
import { CustomSelect } from '../company-creation/CustomSelect';
import { Textarea } from '../common/Textarea';
import { mockCorporationSuspendReasons } from '../../data/mockCorporationSuspendReasons';

const REASON_OPTIONS = mockCorporationSuspendReasons.map((r) => ({ value: r.id, label: r.label }));

const BUTTON_SX = {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  borderRadius: '8px',
  textTransform: 'none',
};

export function SuspendCorporationConfirmationModal({
  isOpen,
  onClose,
  onSubmit,
  corporationName = 'Acme Corporation',
  suspendReasonId,
  additionalNotes,
  onSuspendReasonChange,
  onAdditionalNotesChange,
  validationErrors = {},
  isSubmitting = false,
  suspendCorporationStatus,
  onResetStatus,
}) {
  const [localReasonId, setLocalReasonId] = useState('');
  const [localNotes, setLocalNotes] = useState('');

  const reasonId = suspendReasonId ?? localReasonId;
  const notes = additionalNotes ?? localNotes;
  const setReasonId = onSuspendReasonChange ?? setLocalReasonId;
  const setNotes = onAdditionalNotesChange ?? setLocalNotes;

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        const el = document.getElementById('suspend-corporation-reason-select');
        if (el) el.focus();
      }, 100);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (suspendCorporationStatus === 'success') {
      onClose?.();
      onResetStatus?.();
    }
  }, [suspendCorporationStatus, onClose, onResetStatus]);

  const handleClose = () => {
    setReasonId('');
    setNotes('');
    onClose?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') handleClose();
  };

  const handleSubmit = () => {
    if (!reasonId || isSubmitting) return;
    onSubmit?.({ reasonId, notes: notes.trim() });
  };

  const isSubmitDisabled = !reasonId || isSubmitting;
  const submitLabel = isSubmitting ? 'Suspending Corporation...' : 'Suspend Corporation';

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="suspend-corporation-modal-title"
      PaperProps={{
        sx: {
          background: 'rgba(255, 255, 255, 1)',
          borderRadius: 2,
          minWidth: 320,
          maxWidth: 560,
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      slotProps={{
        backdrop: {
          sx: { background: 'rgba(26, 26, 26, 0.699999988079071)' },
        },
      }}
    >
      <DialogTitle
        id="suspend-corporation-modal-title"
        component="div"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '20px',
          fontWeight: 600,
          color: 'rgba(47, 65, 74, 1)',
          pt: 3,
          px: 3,
          pb: 0.5,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            component="span"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '20px',
              fontWeight: 600,
              color: 'rgba(47, 65, 74, 1)',
            }}
          >
            Suspend Corporation
          </Typography>
          <Typography
            component="div"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(56, 89, 102, 1)',
              mt: 0.5,
            }}
          >
            You are about to suspend {corporationName}.
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          size="small"
          aria-label="Close suspend corporation dialog"
          sx={{
            background: 'rgba(248, 247, 251, 1)',
            color: 'rgba(52, 76, 86, 1)',
            borderRadius: 1,
            '&:hover': { background: 'rgba(221, 217, 235, 1)' },
          }}
        >
          <X size={20} strokeWidth={2} aria-hidden />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 3, pb: 3, pt: 2, overflow: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <InfoAlertCard
              type="danger"
              icon={TriangleAlert}
              title="Suspend action will have the following impact:"
              description="All users will be immediately logged out. Login access will be revoked. Corporation data remains accessible to Super Admins only. Corporation status will change to 'Suspended'."
              ariaLabel="Warning: suspend action impact"
            />
          </Box>

          <Box>
            <FormGroupLabel
              label="Pre-defined Reasons"
              isRequired
              htmlFor="suspend-corporation-reason-select"
            />
            <CustomSelect
              id="suspend-corporation-reason-select"
              placeholder="Select a reason"
              options={REASON_OPTIONS}
              value={reasonId}
              onChange={setReasonId}
              isRequired
              errorMessage={validationErrors.suspendReasonId}
              inputBackground="rgba(255, 255, 255, 1)"
              aria-label="Pre-defined Reasons"
            />
          </Box>

          <Box>
            <FormGroupLabel label="Additional Notes" htmlFor="suspend-corporation-notes" />
            <Textarea
              id="suspend-corporation-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Type your notes here..."
              rows={3}
              resizable
              aria-label="Additional notes regarding corporation suspension"
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 2,
            pt: 3,
          }}
        >
          <Button
            variant="contained"
            onClick={handleClose}
            aria-label="Cancel corporation suspension process"
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
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            aria-label="Confirm and suspend corporation"
            aria-disabled={isSubmitDisabled}
            aria-busy={isSubmitting}
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
            {submitLabel}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
