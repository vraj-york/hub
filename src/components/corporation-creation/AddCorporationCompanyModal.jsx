import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Divider,
} from '@mui/material';
import { setToastMessage } from '../../store/slices/authSlice';
import { TextInput } from '../company-creation/TextInput';
import { CustomSelect } from '../company-creation/CustomSelect';
import { ActionButtonsGroup } from '../company-creation/ActionButtonsGroup';
import { mockCompanyTypes } from '../../data/mockCompanyTypes';
import { mockOfficeTypes } from '../../data/mockOfficeTypes';
import { mockRegions } from '../../data/mockRegions';
import { mockIndustries } from '../../data/mockIndustries';
import { mockStates } from '../../data/mockStates';
import { mockCities } from '../../data/mockCities';

const SECTION_HEADER_SX = {
  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: 'rgba(56, 89, 102, 1)',
  mb: 1.5,
};

const INPUT_WHITE = 'rgba(255, 255, 255, 1)';
const INPUT_GREY = 'rgba(248, 247, 251, 1)';

export function AddCorporationCompanyModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  validationErrors,
  onFieldChange,
  isFormValid,
  onValidate,
  editMode = false,
  isLoading = false,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        const el = document.getElementById('add-company-legal-name');
        if (el) el.focus();
      }, 100);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    console.log('Add Company clicked');
    console.log('Form Data:', formData);
    console.log('Validation Errors:', validationErrors);
    console.log('Is Form Valid:', isFormValid);
    
    onValidate?.();
    if (!isFormValid) {
      console.log('Validation failed - required fields missing');
      dispatch(setToastMessage({ type: 'error', message: 'Required fields missing' }));
      return;
    }
    const numEmp = (formData.numberOfEmployees ?? '').toString().trim();
    const payload = {
      companyLegalName: (formData.companyLegalName ?? '').trim(),
      companyType: formData.companyType ?? 'operating',
      officeType: formData.officeType ?? 'regional',
      region: formData.region ?? 'na',
      industry: formData.industry ?? 'tech-saas',
      stateProvince: formData.stateProvince ?? '',
      city: formData.city ?? '',
      zipPostalCode: (formData.zipPostalCode ?? '').trim(),
      timeZone: formData.timeZone ?? '',
      adminName: (formData.adminName ?? '').trim(),
      companyAdminEmail: (formData.companyAdminEmail ?? '').trim(),
      numberOfEmployees: numEmp ? Number(numEmp) : 0,
      securityPosture: formData.securityPosture ?? 'Standard',
    };
    console.log('Payload to submit:', payload);
    onSubmit(payload);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };

  const titleId = editMode ? 'edit-company-modal-title' : 'add-company-modal-title';
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      PaperProps={{
        sx: {
          background: 'rgba(255, 255, 255, 1)',
          borderRadius: 2,
          minWidth: 320,
          maxWidth: 720,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      slotProps={{
        backdrop: {
          sx: { background: 'rgba(26, 26, 26, 0.7)' },
        },
      }}
    >
      <DialogTitle
        id={titleId}
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
            {editMode ? 'Edit Company' : 'Add New Company'}
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
            {editMode ? 'Modify company details' : 'Add a new physical Company to the system'}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          aria-label={editMode ? 'Close edit company form' : 'Close add new company form'}
          sx={{
            background: 'rgba(248, 247, 251, 1)',
            color: 'rgba(52, 76, 86, 1)',
            borderRadius: 1,
            '&:hover': { background: 'rgba(221, 217, 235, 1)' },
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 3, pb: 3, pt: 2, overflow: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography sx={SECTION_HEADER_SX}>Company Info.</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextInput
                label="Company Legal Name"
                placeholder="e.g., Acme India Pvt Ltd"
                value={formData.companyLegalName ?? ''}
                onChange={(e) => onFieldChange('companyLegalName', e.target.value)}
                isRequired
                errorMessage={validationErrors.companyLegalName}
                id="add-company-legal-name"
                inputBackground={INPUT_WHITE}
                aria-label="Company legal name"
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    label="Company Type"
                    placeholder="Select company type"
                    options={mockCompanyTypes}
                    value={formData.companyType ?? 'operating'}
                    onChange={(v) => onFieldChange('companyType', v)}
                    isRequired
                    errorMessage={validationErrors.companyType}
                    id="add-company-type"
                    inputBackground={INPUT_WHITE}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    label="Office Type"
                    placeholder="Select office type"
                    options={mockOfficeTypes}
                    value={formData.officeType ?? 'regional'}
                    onChange={(v) => onFieldChange('officeType', v)}
                    isRequired
                    errorMessage={validationErrors.officeType}
                    id="add-company-office-type"
                    inputBackground={INPUT_WHITE}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    label="Region (Data Residency)"
                    placeholder="North America"
                    options={mockRegions}
                    value={formData.region ?? 'na'}
                    onChange={() => {}}
                    id="add-company-region"
                    inputBackground={INPUT_GREY}
                    readOnly
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    label="Industry"
                    placeholder="Technology/ SaaS"
                    options={mockIndustries}
                    value={formData.industry ?? 'tech-saas'}
                    onChange={() => {}}
                    id="add-company-industry"
                    inputBackground={INPUT_GREY}
                    readOnly
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    label="State/ Province"
                    placeholder="Select state/ province"
                    options={mockStates}
                    value={formData.stateProvince ?? ''}
                    onChange={(v) => onFieldChange('stateProvince', v)}
                    isRequired
                    errorMessage={validationErrors.stateProvince}
                    id="add-company-state"
                    inputBackground={INPUT_WHITE}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    label="City"
                    placeholder="Select city"
                    options={mockCities}
                    value={formData.city ?? ''}
                    onChange={(v) => onFieldChange('city', v)}
                    isRequired
                    errorMessage={validationErrors.city}
                    id="add-company-city"
                    inputBackground={INPUT_WHITE}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <TextInput
                    label="ZIP/ Postal Code"
                    placeholder="Enter zip/ postal code"
                    value={formData.zipPostalCode ?? ''}
                    onChange={(e) => onFieldChange('zipPostalCode', e.target.value)}
                    isRequired
                    inputMode="numeric"
                    errorMessage={validationErrors.zipPostalCode}
                    id="add-company-zip"
                    inputBackground={INPUT_WHITE}
                    aria-label="ZIP or postal code"
                  />
                </Box>
                <Box sx={{ flex: 1 }} />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(221, 217, 235, 1)', my: 1 }} />

          <Box>
            <Typography sx={SECTION_HEADER_SX}>Access Setup</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <TextInput
                    label="Admin Name"
                    placeholder="e.g., Martin Morgan"
                    value={formData.adminName ?? ''}
                    onChange={(e) => onFieldChange('adminName', e.target.value)}
                    isRequired
                    errorMessage={validationErrors.adminName}
                    id="add-company-admin-name"
                    inputBackground={INPUT_WHITE}
                    aria-label="Admin name"
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextInput
                    label="Company Admin Email"
                    placeholder="e.g., admin@acmcare.com"
                    value={formData.companyAdminEmail ?? ''}
                    onChange={(e) => onFieldChange('companyAdminEmail', e.target.value)}
                    isRequired
                    inputMode="email"
                    errorMessage={validationErrors.companyAdminEmail}
                    id="add-company-admin-email"
                    inputBackground={INPUT_WHITE}
                    aria-label="Company admin email"
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <TextInput
                    label="No. of Employees"
                    placeholder="e.g., 25, 50, etc."
                    value={formData.numberOfEmployees ?? ''}
                    onChange={(e) => onFieldChange('numberOfEmployees', e.target.value)}
                    isRequired
                    inputMode="numeric"
                    errorMessage={validationErrors.numberOfEmployees}
                    id="add-company-num-employees"
                    inputBackground={INPUT_WHITE}
                    aria-label="Number of employees"
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextInput
                    label="Security Posture"
                    placeholder="Standard"
                    value={formData.securityPosture ?? 'Standard'}
                    readOnly
                    id="add-company-security-posture"
                    inputBackground={INPUT_GREY}
                    aria-label="Security posture"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <ActionButtonsGroup
          onCancel={onClose}
          onNext={handleSubmit}
          nextLabel={editMode ? 'Save & Update' : 'Add Company'}
          loadingLabel="Saving Company..."
          cancelLabel="Cancel"
          isNextDisabled={isLoading}
          isNextLoading={isLoading}
          isPreviousDisabled
          previousLabel="Previous"
          onPrevious={undefined}
          cancelAriaLabel="Cancel company details editing"
          nextAriaLabel={editMode ? 'Save and update company details' : 'Add company'}
        />
      </DialogContent>
    </Dialog>
  );
}
