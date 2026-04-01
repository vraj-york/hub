import { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentCompany,
  setCompanyConfigLoading,
  setCompanyConfigActiveTab,
  clearCurrentCompany,
  setCompanyToDelete,
  clearCompanyToDelete,
  deleteCompanyRequest,
  setCompanyBeingEditedId,
  setCompanyEditFormData,
  resetCompanyEditFormState,
  updateCompanyBasicAndAccessInfoRequest,
  selectCurrentCompany,
  selectCompanyConfigLoading,
  selectCompanyConfigActiveTab,
  selectCompanyKeyContactsFormData,
  selectCompanyPlanAndSeatsFormData,
  selectCompanyAchDetailsFormData,
  selectCompanyBasicInfoFormData,
  selectCompanyToDeleteId,
  selectCompanyToDeleteName,
  selectIsDeletingCompany,
  selectDeleteCompanyError,
  selectCompanyBeingEditedId,
  selectCompanyEditFormData,
  selectCompanyEditFormValidation,
  selectCompanyEditSaveStatus,
  selectIsCompanyEditFormValid,
} from '../store/slices/companyConfigSlice';
import { openDeleteCompanyModal, closeDeleteCompanyModal, selectIsDeleteCompanyModalOpen, openEditCompanyModal, closeEditCompanyModal, selectIsEditCompanyModalOpen as selectUiIsEditCompanyModalOpen } from '../store/slices/uiSlice';
import { setToastMessage } from '../store/slices/authSlice';
import { getMockCompanyConfig } from '../data/mockCompanyConfig';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import { BackButton } from '../components/common/BackButton';
import { CompanyBadges } from '../components/company-profile-config/CompanyBadges';
import { DeleteCompanyButton } from '../components/company-profile-config/DeleteCompanyButton';
import { EditCompanyButton } from '../components/company-profile-config/EditCompanyButton';
import { ProfileTabs } from '../components/ProfileTabs';
import { CompanyConfigView } from '../components/company-profile-config/CompanyConfigView';
import { CompanyKeyContactsView } from '../components/company-profile-config/CompanyKeyContactsView';
import { CompanyPlanAndSeatsView } from '../components/company-profile-config/CompanyPlanAndSeatsView';
import { CompanyBasicInfoView } from '../components/company-profile-config/CompanyBasicInfoView';
import { DeleteCompanyConfirmationModal } from '../components/company-profile-config/DeleteCompanyConfirmationModal';
import { AddCorporationCompanyModal } from '../components/corporation-creation/AddCorporationCompanyModal';

function mapCompanyToEditFormData(company) {
  if (!company) return {};
  return {
    companyLegalName: company.companyLegalName ?? company.name ?? '',
    companyType: company.companyType ?? 'operating',
    officeType: company.officeType ?? 'regional',
    region: company.regionDataResidency ?? company.region ?? 'na',
    industry: company.industry ?? 'tech-saas',
    stateProvince: company.stateProvince ?? '',
    city: company.city ?? '',
    zipPostalCode: company.zipPostalCode ?? '',
    timeZone: company.timeZone ?? '',
    adminName: company.adminName ?? '',
    companyAdminEmail: company.companyAdminEmail ?? '',
    numberOfEmployees: (company.numEmployees ?? company.numberOfEmployees ?? '').toString(),
    securityPosture: company.securityPosture ?? 'Standard',
  };
}

const PROFILE_TABS = [
  { label: 'Basic Info.', value: 'basic-info' },
  { label: 'Key Contacts', value: 'key-contacts' },
  { label: 'Plan & Seats', value: 'plan-and-seats' },
  { label: 'Configuration', value: 'configuration' },
];

export function CompanyConfigPage() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const company = useSelector(selectCurrentCompany);
  const loading = useSelector(selectCompanyConfigLoading);
  const activeTab = useSelector(selectCompanyConfigActiveTab);
  const isDeleteModalOpen = useSelector(selectIsDeleteCompanyModalOpen);
  const companyToDeleteId = useSelector(selectCompanyToDeleteId);
  const companyToDeleteName = useSelector(selectCompanyToDeleteName);
  const isDeletingCompany = useSelector(selectIsDeletingCompany);
  const deleteCompanyError = useSelector(selectDeleteCompanyError);
  const isEditCompanyModalOpen = useSelector(selectUiIsEditCompanyModalOpen);
  const companyEditFormData = useSelector(selectCompanyEditFormData);
  const companyEditValidation = useSelector(selectCompanyEditFormValidation);
  const companyEditSaveStatus = useSelector(selectCompanyEditSaveStatus);
  const isCompanyEditFormValid = useSelector(selectIsCompanyEditFormValid);
  const keyContactsFormData = useSelector(selectCompanyKeyContactsFormData);
  const planAndSeatsFormData = useSelector(selectCompanyPlanAndSeatsFormData);
  const achDetailsFormData = useSelector(selectCompanyAchDetailsFormData);
  const basicInfoData = useSelector(selectCompanyBasicInfoFormData);

  useEffect(() => {
    dispatch(setCompanyConfigLoading(true));
    const timer = setTimeout(() => {
      dispatch(setCurrentCompany(getMockCompanyConfig(companyId)));
      dispatch(setCompanyConfigLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [companyId, dispatch]);

  useEffect(() => {
    return () => dispatch(clearCurrentCompany());
  }, [dispatch]);

  const handleBack = useCallback(() => {
    navigate('/corporations');
  }, [navigate]);

  const handleTabChange = useCallback(
    (value) => {
      dispatch(setCompanyConfigActiveTab(value));
    },
    [dispatch]
  );

  const handleEditCompany = useCallback(() => {
    const formData = mapCompanyToEditFormData(company);
    dispatch(setCompanyEditFormData(formData));
    dispatch(setCompanyBeingEditedId(companyId));
    dispatch(openEditCompanyModal());
  }, [company, companyId, dispatch]);

  const handleDeleteClick = useCallback(() => {
    dispatch(setCompanyToDelete({ id: companyId, name: company?.name ?? '' }));
    dispatch(openDeleteCompanyModal());
  }, [companyId, company?.name, dispatch]);

  const handleDeleteModalClose = useCallback(() => {
    dispatch(closeDeleteCompanyModal());
    dispatch(clearCompanyToDelete());
  }, [dispatch]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!companyToDeleteId) return;
    try {
      await dispatch(deleteCompanyRequest(companyToDeleteId)).unwrap();
      dispatch(closeDeleteCompanyModal());
      dispatch(clearCompanyToDelete());
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Company deleted successfully',
          body: 'The company has been removed.',
          severity: 'info',
        })
      );
      dispatch(clearCurrentCompany());
      navigate('/corporations');
    } catch {
      // Error is in deleteCompanyError state; modal stays open
    }
  }, [companyToDeleteId, dispatch, navigate]);

  const handleEditCompanyModalClose = useCallback(() => {
    dispatch(closeEditCompanyModal());
    dispatch(resetCompanyEditFormState());
  }, [dispatch]);

  const handleEditCompanyModalFieldChange = useCallback(
    (field, value) => {
      dispatch(
        setCompanyEditFormData({
          ...companyEditFormData,
          [field]: value,
        })
      );
    },
    [companyEditFormData, dispatch]
  );

  const handleEditCompanyModalSubmit = useCallback(
    async (payload) => {
      const companyBeingEditedId = companyId;
      if (!companyBeingEditedId) return;
      try {
        await dispatch(
          updateCompanyBasicAndAccessInfoRequest({
            companyId: companyBeingEditedId,
            formData: payload,
          })
        ).unwrap();
        dispatch(closeEditCompanyModal());
        dispatch(resetCompanyEditFormState());
        dispatch(
          setToastMessage({
            id: `toast-${Date.now()}`,
            title: 'Company updated',
            body: 'Company details have been saved.',
            severity: 'info',
          })
        );
      } catch {
        // Error is in companyEditSaveError; modal stays open
      }
    },
    [companyId, dispatch]
  );

  if (loading || !company) {
    return (
      <SuperAdminLayout>
        <Box sx={{ py: 4 }}>
          <Typography sx={{ color: 'var(--color-secondary-blue)' }}>Loading...</Typography>
        </Box>
      </SuperAdminLayout>
    );
  }

  const config = company.configuration || {};

  return (
    <SuperAdminLayout>
      <Box sx={{ maxWidth: 1200 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <BackButton onClick={handleBack} ariaLabel="Back to company directory" />
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                fontWeight: 600,
                fontSize: '20px',
                color: 'rgba(47, 65, 74, 1)',
              }}
            >
              {company.name}
            </Typography>
            <CompanyBadges badges={company.statusBadges ?? []} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <DeleteCompanyButton
              onClick={handleDeleteClick}
              aria-label={company?.name ? `Delete company ${company.name}` : 'Delete company'}
            />
            <EditCompanyButton onClick={handleEditCompany} />
          </Box>
        </Box>
        <ProfileTabs tabs={PROFILE_TABS} activeTab={activeTab} onTabChange={handleTabChange} />
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: '0 0 8px 8px',
            p: 3,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          {activeTab === 'basic-info' && (
            <Box id="basic-info-tabpanel" role="tabpanel" aria-labelledby="basic-info-tab">
              <CompanyBasicInfoView basicInfoData={basicInfoData ?? {}} />
            </Box>
          )}
          {activeTab === 'configuration' && (
            <Box id="configuration-tabpanel" role="tabpanel" aria-labelledby="configuration-tab">
              <CompanyConfigView configurationData={config} companyName={company.name} />
            </Box>
          )}
          {activeTab === 'key-contacts' && (
            <CompanyKeyContactsView formData={keyContactsFormData ?? {}} />
          )}
          {activeTab === 'plan-and-seats' && (
            <CompanyPlanAndSeatsView
              formData={planAndSeatsFormData ?? {}}
              achDetails={achDetailsFormData ?? {}}
            />
          )}
          {activeTab !== 'basic-info' && activeTab !== 'configuration' && activeTab !== 'key-contacts' && activeTab !== 'plan-and-seats' && (
            <Typography sx={{ color: 'var(--color-secondary-blue)', py: 4 }}>
              Content for {PROFILE_TABS.find((t) => t.value === activeTab)?.label ?? activeTab} will appear here.
            </Typography>
          )}
        </Box>
      </Box>
      <DeleteCompanyConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteConfirm}
        companyId={companyToDeleteId}
        companyName={companyToDeleteName}
        isDeleting={isDeletingCompany}
        deleteError={deleteCompanyError}
      />

      {isEditCompanyModalOpen && (
        <AddCorporationCompanyModal
          isOpen={isEditCompanyModalOpen}
          onClose={handleEditCompanyModalClose}
          onSubmit={handleEditCompanyModalSubmit}
          formData={companyEditFormData}
          validationErrors={companyEditValidation}
          onFieldChange={handleEditCompanyModalFieldChange}
          isFormValid={isCompanyEditFormValid}
          onValidate={() => {}}
          editMode
          isLoading={companyEditSaveStatus === 'pending'}
        />
      )}
    </SuperAdminLayout>
  );
}
