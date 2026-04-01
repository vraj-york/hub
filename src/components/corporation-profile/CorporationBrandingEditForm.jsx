import { useCallback, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { FormGroupLabel } from '../company-creation/FormGroupLabel';
import { FileUploadInput } from '../company-creation/FileUploadInput';
import { ActionButtonsGroup } from '../company-creation/ActionButtonsGroup';
import { CorporationLogoDisplay } from '../corporation-creation/CorporationLogoDisplay';
import { updateCorporationBrandingRequest } from '../../store/slices/corporationsSlice';

const ALLOWED_TYPES = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg'];
const ALLOWED_EXTENSIONS = ['.svg', '.png', '.jpg', '.jpeg'];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

function validateFile(file) {
  const errors = {};
  if (!file) return errors;
  const ext = '.' + (file.name?.split('.').pop() ?? '').toLowerCase();
  const typeOk = ALLOWED_TYPES.includes(file.type) || ALLOWED_EXTENSIONS.includes(ext);
  if (!typeOk) errors.type = 'File type not supported. Use SVG, PNG or JPG.';
  if (file.size > MAX_SIZE_BYTES) errors.size = 'File size exceeds 10MB.';
  return errors;
}

export function CorporationBrandingEditForm({
  corporationId,
  initialLogoUrl = null,
  corporationName = '',
  isSaving = false,
  saveStatus = 'idle',
  saveError = null,
  onCancel,
}) {
  const dispatch = useDispatch();
  const [localLogoFile, setLocalLogoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileValidationErrors, setFileValidationErrors] = useState({});

  const isFormDirty = Boolean(localLogoFile);
  const isFormValid = Object.keys(fileValidationErrors).length === 0;

  useEffect(() => {
    return () => {
      if (previewUrl && localLogoFile) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, localLogoFile]);

  useEffect(() => {
    if (saveStatus === 'success') {
      setLocalLogoFile(null);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      setFileValidationErrors({});
    }
  }, [saveStatus]);

  const handleFileChange = useCallback((file) => {
    if (!file) {
      setLocalLogoFile(null);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      setFileValidationErrors({});
      return;
    }
    const errors = validateFile(file);
    setFileValidationErrors(errors);
    setLocalLogoFile(file);
    if (errors.type || errors.size) {
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      return;
    }
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }, []);

  const handleSave = useCallback(() => {
    if (isSaving || !isFormDirty || !isFormValid) return;
    dispatch(updateCorporationBrandingRequest({ corporationId, logoFile: localLogoFile }));
  }, [corporationId, dispatch, isFormDirty, isFormValid, isSaving, localLogoFile]);

  const combinedErrorMessage = [
    fileValidationErrors.type,
    fileValidationErrors.size,
    saveError,
  ].filter(Boolean).join(' ');

  const displayLogoSrc = previewUrl || initialLogoUrl;
  const altText = corporationName ? `Logo for ${corporationName}` : 'Corporation logo';

  return (
    <Box
      sx={{ padding: '24px 32px', background: 'rgba(255, 255, 255, 1)', borderRadius: '8px' }}
      role="tabpanel"
      id="branding-tabpanel"
      aria-labelledby="branding-tab"
    >
      <Typography
        component="h2"
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: '20px',
          color: 'rgba(47, 65, 74, 1)',
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          mb: 0.5,
        }}
      >
        Branding
      </Typography>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: '14px',
          color: 'rgba(73, 130, 145, 1)',
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          mb: 3,
        }}
      >
        Configure corporation identity...
      </Typography>

      <FileUploadInput
        label="Upload Logo"
        instructionText="Click to upload or drag-&-drop file"
        supportedFormatsText="Supported file formats are SVG, PNG & JPG up to 10MB"
        allowedFormats="SVG, PNG, JPG"
        maxSize="10MB"
        maxFileSizeMB={10}
        accept=".svg,.png,.jpg,.jpeg"
        onFileChange={handleFileChange}
        currentFile={localLogoFile}
        errorMessage={combinedErrorMessage || undefined}
        isRequired={false}
        ariaLabel="Upload corporation logo file"
      />

      <Box sx={{ mt: 3 }}>
        <FormGroupLabel label="Logo Preview" isRequired={false} />
        <Box sx={{ mt: 1 }} id="logo-preview-region">
          <CorporationLogoDisplay
            logoSrc={displayLogoSrc}
            altText={altText}
            width={100}
            height={100}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <ActionButtonsGroup
          onCancel={onCancel}
          onNext={handleSave}
          cancelLabel="Cancel"
          nextLabel="Save & Update"
          isNextDisabled={!isFormDirty || !isFormValid || isSaving}
          isNextLoading={isSaving}
          loadingLabel="Saving Branding..."
          cancelAriaLabel="Cancel branding changes and return to corporation profile"
          nextAriaLabel="Save and update corporation branding"
        />
      </Box>
    </Box>
  );
}
