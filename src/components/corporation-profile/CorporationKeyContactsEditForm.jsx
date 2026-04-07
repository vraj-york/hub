import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPrimaryCorporateAdminField,
  updateCorporationKeyContactsRequest,
  resetUpdateCorporationKeyContactsState,
  selectCurrentCorporationPrimaryCorporateAdminFormData,
  selectUpdateCorporationKeyContactsStatus,
  selectUpdateCorporationKeyContactsError,
  selectIsCorporationKeyContactsFormValid,
} from '../../store/slices/corporationsSlice';
import { setToastMessage } from '../../store/slices/authSlice';
import { PrimaryCorporateAdminEditCard } from './PrimaryCorporateAdminEditCard';
import { BillingFinanceContactCard } from '../corporation-creation/BillingFinanceContactCard';
import { LegalComplianceContactCard } from '../corporation-creation/LegalComplianceContactCard';
import { ActionButtonsGroup } from '../company-creation/ActionButtonsGroup';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePrimaryAdmin(data) {
  const errors = {};
  if (!(data.name || '').trim()) errors.name = 'Required';
  if (!(data.role || '').trim()) errors.role = 'Required';
  if (!(data.email || '').trim()) {
    errors.email = 'Required';
  } else if (!EMAIL_REGEX.test((data.email || '').trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (!(data.workPhoneNo || '').trim()) errors.workPhoneNo = 'Required';
  return errors;
}

export function CorporationKeyContactsEditForm({ corporationId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const primaryAdminFormData = useSelector(selectCurrentCorporationPrimaryCorporateAdminFormData);
  const saveStatus = useSelector(selectUpdateCorporationKeyContactsStatus);
  const saveError = useSelector(selectUpdateCorporationKeyContactsError);
  const isFormValid = useSelector(selectIsCorporationKeyContactsFormValid);

  const [validationErrors, setValidationErrors] = useState({});
  const [isPrimaryAdminCardCollapsed, setPrimaryAdminCardCollapsed] = useState(false);
  const initialSnapshotRef = useRef(null);

  useEffect(() => {
    if (primaryAdminFormData && Object.keys(primaryAdminFormData).length) {
      if (initialSnapshotRef.current === null) {
        initialSnapshotRef.current = JSON.stringify(primaryAdminFormData);
      }
    }
  }, [primaryAdminFormData]);

  useEffect(() => {
    setValidationErrors(validatePrimaryAdmin(primaryAdminFormData));
  }, [primaryAdminFormData]);

  useEffect(() => {
    if (saveStatus === 'success') {
      initialSnapshotRef.current = JSON.stringify(primaryAdminFormData);
    }
  }, [saveStatus, primaryAdminFormData]);

  const hasChanges = useMemo(() => {
    if (initialSnapshotRef.current === null) return false;
    return JSON.stringify(primaryAdminFormData) !== initialSnapshotRef.current;
  }, [primaryAdminFormData]);

  const isValid = isFormValid && Object.keys(validationErrors).length === 0;

  const handleFieldChange = useCallback(
    (field, value) => {
      dispatch(setPrimaryCorporateAdminField({ field, value }));
      if (validationErrors[field]) {
        setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [dispatch, validationErrors]
  );

  const handleSave = useCallback(() => {
    const errors = validatePrimaryAdmin(primaryAdminFormData);
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;
    if (!hasChanges || !isFormValid) return;
    dispatch(
      updateCorporationKeyContactsRequest({
        corporationId,
        primaryCorporateAdminData: primaryAdminFormData,
      })
    );
  }, [corporationId, primaryAdminFormData, hasChanges, isFormValid, dispatch]);

  const handleCancel = useCallback(() => {
    navigate(`/corporations/${corporationId}/profile`);
  }, [navigate, corporationId]);

  const isSaving = saveStatus === 'pending';
  const saveButtonDisabled = !hasChanges || !isValid || isSaving;

  return (
    <Box
      role="group"
      aria-label="Edit corporation key contacts section"
      sx={{
        background: 'rgba(255, 255, 255, 1)',
        borderRadius: '0 0 8px 8px',
        p: 3,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '20px',
          fontWeight: 600,
          color: 'rgba(47, 65, 74, 1)',
          mb: 0.5,
        }}
      >
        Key Contacts
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          color: 'rgba(73, 130, 145, 1)',
          mb: 3,
        }}
      >
        Define governance, financial, and compliance ownership at the corporate level.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <PrimaryCorporateAdminEditCard
          formData={primaryAdminFormData}
          onFieldChange={handleFieldChange}
          validationErrors={validationErrors}
          isCollapsed={isPrimaryAdminCardCollapsed}
          onToggleCollapse={() => setPrimaryAdminCardCollapsed((prev) => !prev)}
        />
        <BillingFinanceContactCard
          title="Billing/ Finance Contact"
          aria-label="View Billing and Finance Contact Details"
        />
        <LegalComplianceContactCard
          title="Legal/ Compliance Contact"
          aria-label="View Legal and Compliance Contact Details"
        />
      </Box>

      <ActionButtonsGroup
        onCancel={handleCancel}
        onNext={handleSave}
        nextLabel="Save & Update"
        cancelLabel="Cancel"
        isNextDisabled={saveButtonDisabled}
        isPreviousDisabled
        previousLabel="Previous"
        onPrevious={undefined}
        isNextLoading={isSaving}
        loadingLabel="Saving Key Contacts..."
        cancelAriaLabel="Cancel corporation key contact changes"
        nextAriaLabel={
          isSaving
            ? 'Saving Key Contacts...'
            : 'Save and update corporation key contact details'
        }
      />
    </Box>
  );
}
