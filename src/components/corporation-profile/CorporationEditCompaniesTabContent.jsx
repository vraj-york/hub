import { useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { CompanyCard } from '../CompanyCard';
import { CorporationCompanyAssignmentInfoCard } from '../corporation-creation/CorporationCompanyAssignmentInfoCard';
import { AddCompanyToListButton } from '../corporation-creation/AddCompanyToListButton';
import { AddCorporationCompanyModal } from '../corporation-creation/AddCorporationCompanyModal';
import { DeleteCompanyConfirmationModal } from '../company-profile-config/DeleteCompanyConfirmationModal';
import { mockCompanyTypes } from '../../data/mockCompanyTypes';
import { mockRegions } from '../../data/mockRegions';

const INITIAL_FORM_DATA = {
  companyLegalName: '',
  companyType: 'operating',
  officeType: 'regional',
  region: 'na',
  industry: 'tech-saas',
  stateProvince: '',
  city: '',
  zipPostalCode: '',
  timeZone: '',
  adminName: '',
  companyAdminEmail: '',
  numberOfEmployees: '',
  securityPosture: 'Standard',
};

const INITIAL_VALIDATION = {
  companyLegalName: '',
  companyType: '',
  officeType: '',
  region: '',
  industry: '',
  stateProvince: '',
  city: '',
  zipPostalCode: '',
  timeZone: '',
  adminName: '',
  companyAdminEmail: '',
  numberOfEmployees: '',
};

function findOptionValue(options, label) {
  if (!label) return options?.[0]?.value ?? '';
  const opt = (options ?? []).find((o) => o.label === label || o.value === label);
  return opt ? opt.value : (options?.[0]?.value ?? '');
}

function findOptionLabel(options, value) {
  if (value == null || value === '') return '';
  const opt = (options ?? []).find((o) => o.value === value || o.label === value);
  return opt ? opt.label : String(value);
}

const TYPE_VALUE_MAP = {
  'Operating Company': 'operating',
  'Holding Company': 'holding',
  Subsidiary: 'subsidiary',
  Franchise: 'franchise',
  Other: 'other',
};
const TYPE_LABEL_MAP = Object.fromEntries(
  mockCompanyTypes.map((o) => [o.value, o.label])
);

function validateFormData(d) {
  const errors = {};
  if (!(d.companyLegalName ?? '').trim()) errors.companyLegalName = 'Required';
  if (!(d.companyType ?? '')) errors.companyType = 'Required';
  if (!(d.officeType ?? '')) errors.officeType = 'Required';
  if (!(d.stateProvince ?? '')) errors.stateProvince = 'Required';
  if (!(d.city ?? '')) errors.city = 'Required';
  if (!(d.zipPostalCode ?? '').toString().trim()) errors.zipPostalCode = 'Required';
  if (!(d.timeZone ?? '')) errors.timeZone = 'Required';
  if (!(d.adminName ?? '').trim()) errors.adminName = 'Required';
  if (!(d.companyAdminEmail ?? '').trim()) errors.companyAdminEmail = 'Required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((d.companyAdminEmail ?? '').trim())) {
    errors.companyAdminEmail = 'Invalid email';
  }
  const numEmp = (d.numberOfEmployees ?? '').toString().trim();
  if (!numEmp) errors.numberOfEmployees = 'Required';
  else if (isNaN(Number(numEmp)) || Number(numEmp) < 0) errors.numberOfEmployees = 'Invalid number';
  return errors;
}

function companyToFormData(company) {
  if (!company) return { ...INITIAL_FORM_DATA };
  const typeValue = TYPE_VALUE_MAP[company.type] ?? 'operating';
  const regionValue = findOptionValue(mockRegions, company.location) || 'na';
  return {
    ...INITIAL_FORM_DATA,
    companyLegalName: company.name ?? '',
    companyType: typeValue,
    officeType: 'regional',
    region: regionValue,
    stateProvince: '',
    city: '',
    zipPostalCode: '',
    timeZone: company.timeZone ?? '',
    adminName: '',
    companyAdminEmail: '',
    numberOfEmployees: '',
  };
}

function formDataToCompany(formData, existingId = null) {
  const typeLabel = TYPE_LABEL_MAP[formData.companyType] ?? 'Operating Company';
  const locationLabel = findOptionLabel(mockRegions, formData.region) || 'North America';
  return {
    id: existingId ?? `company-${Date.now()}`,
    name: (formData.companyLegalName ?? '').trim() || 'New Company',
    type: typeLabel,
    location: locationLabel,
    timeZone: formData.timeZone ?? '',
  };
}

export function CorporationEditCompaniesTabContent({
  corporationId,
  initialCompanies = [],
  onCompaniesUpdate,
  onValidityChange,
  isParentSaving = false,
}) {
  const [localCompanies, setLocalCompanies] = useState(() => [...(initialCompanies || [])]);
  const [isAddCompanyModalOpen, setAddCompanyModalOpen] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState(null);
  const [isDeleteCompanyModalOpen, setDeleteCompanyModalOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [modalFormData, setModalFormData] = useState(() => ({ ...INITIAL_FORM_DATA }));
  const [modalValidation, setModalValidation] = useState(() => ({ ...INITIAL_VALIDATION }));

  useEffect(() => {
    setLocalCompanies([...(initialCompanies || [])]);
  }, [corporationId, initialCompanies]);

  useEffect(() => {
    const isValid = (localCompanies?.length ?? 0) > 0;
    onValidityChange?.(isValid);
  }, [localCompanies, onValidityChange]);

  const isFormValid = Object.keys(modalValidation).every((k) => !modalValidation[k]);

  const handleCompaniesChange = useCallback(
    (nextList) => {
      setLocalCompanies(nextList);
      onCompaniesUpdate?.(nextList);
    },
    [onCompaniesUpdate]
  );

  const handleAddCompanyClick = useCallback(() => {
    setCompanyToEdit(null);
    setModalFormData({ ...INITIAL_FORM_DATA });
    setModalValidation({ ...INITIAL_VALIDATION });
    setAddCompanyModalOpen(true);
  }, []);

  const handleEditCompanyClick = useCallback((company) => {
    setCompanyToEdit(company);
    setModalFormData(companyToFormData(company));
    setModalValidation({ ...INITIAL_VALIDATION });
    setAddCompanyModalOpen(true);
  }, []);

  const handleDeleteCompanyClick = useCallback((company) => {
    setCompanyToDelete({ id: company.id, name: company.name ?? company.companyLegalName ?? 'Company' });
    setDeleteCompanyModalOpen(true);
  }, []);

  const handleModalFieldChange = useCallback((field, value) => {
    setModalFormData((prev) => (field in prev ? { ...prev, [field]: value } : prev));
    setModalValidation((prev) => {
      const next = { ...prev };
      if (field in next) next[field] = '';
      return next;
    });
  }, []);

  const handleValidateModal = useCallback(() => {
    const errors = validateFormData(modalFormData);
    setModalValidation(errors);
  }, [modalFormData]);

  const handleModalSubmit = useCallback(
    (companyData) => {
      const payload = {
        ...INITIAL_FORM_DATA,
        ...companyData,
        companyLegalName: (companyData.companyLegalName ?? '').trim(),
        numberOfEmployees: (companyData.numberOfEmployees ?? '').toString(),
      };
      const company = formDataToCompany(payload, companyToEdit?.id ?? null);
      if (companyToEdit) {
        const next = localCompanies.map((c) => (c.id === company.id ? company : c));
        handleCompaniesChange(next);
      } else {
        handleCompaniesChange([...localCompanies, company]);
      }
      setAddCompanyModalOpen(false);
      setCompanyToEdit(null);
      setModalFormData({ ...INITIAL_FORM_DATA });
      setModalValidation({ ...INITIAL_VALIDATION });
    },
    [companyToEdit, localCompanies, handleCompaniesChange]
  );

  const handleModalClose = useCallback(() => {
    setAddCompanyModalOpen(false);
    setCompanyToEdit(null);
    setModalFormData({ ...INITIAL_FORM_DATA });
    setModalValidation({ ...INITIAL_VALIDATION });
  }, []);

  const handleDeleteConfirm = useCallback(
    (companyId) => {
      const next = localCompanies.filter((c) => c.id !== companyId);
      handleCompaniesChange(next);
      setDeleteCompanyModalOpen(false);
      setCompanyToDelete(null);
    },
    [localCompanies, handleCompaniesChange]
  );

  const handleDeleteModalClose = useCallback(() => {
    setDeleteCompanyModalOpen(false);
    setCompanyToDelete(null);
  }, []);

  const count = localCompanies?.length ?? 0;
  const disabled = isParentSaving;

  return (
    <Box
      sx={{ p: 3, background: 'rgba(255, 255, 255, 1)', borderRadius: '0 0 8px 8px' }}
      role="tabpanel"
      id="companies-tabpanel"
      aria-labelledby="companies-tab"
    >
      <Typography
        component="h2"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontWeight: 600,
          fontSize: '20px',
          color: 'rgba(47, 65, 74, 1)',
          mb: 0.5,
        }}
      >
        Company Setup
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          color: 'rgba(73, 130, 145, 1)',
          mb: 2,
        }}
      >
        Each corporation must have at least one Company before continuing.
      </Typography>

      <Box sx={{ mb: 2 }} role="status" aria-label="Company Assignment and Modification Information">
        <CorporationCompanyAssignmentInfoCard />
      </Box>

      <Typography
        component="div"
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          color: 'rgba(56, 89, 102, 1)',
          mb: 1.5,
        }}
        aria-label={`List of companies assigned to corporation, currently showing ${count} companies`}
      >
        Companies ({count})
      </Typography>

      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
        {(localCompanies || []).map((company) => (
          <Box
            component="li"
            key={company.id}
            role="listitem"
            aria-label={`Company: ${company.name ?? ''}, Type: ${company.type ?? ''}, Location: ${company.location ?? ''}`}
          >
            <CompanyCard
              company={company}
              onEdit={() => handleEditCompanyClick(company)}
              onDelete={() => handleDeleteCompanyClick(company)}
              deleteAriaLabelSuffix=" from corporation"
            />
          </Box>
        ))}
      </Box>

      <AddCompanyToListButton
        onClick={disabled ? undefined : handleAddCompanyClick}
        label="Add New Company"
        ariaLabel="Add a new company to this corporation"
        disabled={disabled}
      />

      <AddCorporationCompanyModal
        isOpen={isAddCompanyModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        formData={modalFormData}
        validationErrors={modalValidation}
        onFieldChange={handleModalFieldChange}
        isFormValid={isFormValid}
        onValidate={handleValidateModal}
        editMode={!!companyToEdit}
      />

      <DeleteCompanyConfirmationModal
        isOpen={isDeleteCompanyModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteConfirm}
        companyId={companyToDelete?.id ?? ''}
        companyName={companyToDelete?.name ?? ''}
      />
    </Box>
  );
}
