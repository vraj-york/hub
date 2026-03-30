import { useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentCompany,
  setCompanyConfigLoading,
  setCompanyConfigSaving,
  setCompanyConfigActiveTab,
  updateCompanyConfigField,
  setCompanyConfigLogoFile,
  updateCompanyKeyContactField,
  setCompanyRosterFile,
  updateCompanyPlanAndSeatsField,
  updateCompanyAchDetailsField,
  resetCompanyPlanAndSeatsForm,
  updateCompanyBasicInfoField,
  clearCurrentCompany,
  setCompanyToDelete,
  clearCompanyToDelete,
  deleteCompanyRequest,
  selectCurrentCompany,
  selectCompanyConfigLoading,
  selectCompanyConfigSaving,
  selectCompanyConfigActiveTab,
  selectCompanyKeyContactsFormData,
  selectCompanyRosterFile,
  selectCompanyPlanAndSeatsFormData,
  selectCompanyAchDetailsFormData,
  selectCompanyPlanAndSeatsValidationStatus,
  selectIsCompanyPlanAndSeatsFormValid,
  selectCompanyBasicInfoFormData,
  selectCompanyBasicInfoValidationStatus,
  selectIsCompanyBasicInfoFormValid,
  selectCompanyToDeleteId,
  selectCompanyToDeleteName,
  selectIsDeletingCompany,
  selectDeleteCompanyError,
} from '../store/slices/companyConfigSlice';
import { setToastMessage } from '../store/slices/authSlice';
import { openDeleteCompanyModal, closeDeleteCompanyModal, selectIsDeleteCompanyModalOpen } from '../store/slices/uiSlice';
import { getMockCompanyConfig } from '../data/mockCompanyConfig';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import { BackButton } from '../components/common/BackButton';
import { CompanyBadges } from '../components/company-profile-config/CompanyBadges';
import { DeleteCompanyButton } from '../components/company-profile-config/DeleteCompanyButton';
import { ProfileTabs } from '../components/ProfileTabs';
import { CompanyConfigForm } from '../components/company-profile-config/CompanyConfigForm';
import { CompanyKeyContactsForm } from '../components/company-profile-config/CompanyKeyContactsForm';
import { CompanyPlanAndSeatsForm } from '../components/company-profile-config/CompanyPlanAndSeatsForm';
import { CompanyBasicInfoForm } from '../components/company-profile-config/CompanyBasicInfoForm';
import { DeleteCompanyConfirmationModal } from '../components/company-profile-config/DeleteCompanyConfirmationModal';

const PROFILE_TABS = [
  { label: 'Basic Info.', value: 'basic-info' },
  { label: 'Key Contacts', value: 'key-contacts' },
  { label: 'Plan & Seats', value: 'plan-and-seats' },
  { label: 'Configuration', value: 'configuration' },
];

export function CompanyEditPage() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const company = useSelector(selectCurrentCompany);
  const loading = useSelector(selectCompanyConfigLoading);
  const isSaving = useSelector(selectCompanyConfigSaving);
  const activeTab = useSelector(selectCompanyConfigActiveTab);
  const keyContactsFormData = useSelector(selectCompanyKeyContactsFormData);
  const rosterFile = useSelector(selectCompanyRosterFile);
  const planAndSeatsFormData = useSelector(selectCompanyPlanAndSeatsFormData);
  const achDetailsFormData = useSelector(selectCompanyAchDetailsFormData);
  const planAndSeatsValidation = useSelector(selectCompanyPlanAndSeatsValidationStatus);
  const isPlanAndSeatsFormValid = useSelector(selectIsCompanyPlanAndSeatsFormValid);
  const basicInfoFormData = useSelector(selectCompanyBasicInfoFormData);
  const basicInfoValidation = useSelector(selectCompanyBasicInfoValidationStatus);
  const isBasicInfoFormValid = useSelector(selectIsCompanyBasicInfoFormValid);
  const isDeleteModalOpen = useSelector(selectIsDeleteCompanyModalOpen);
  const companyToDeleteId = useSelector(selectCompanyToDeleteId);
  const companyToDeleteName = useSelector(selectCompanyToDeleteName);
  const isDeletingCompany = useSelector(selectIsDeletingCompany);
  const deleteCompanyError = useSelector(selectDeleteCompanyError);

  useEffect(() => {
    dispatch(setCompanyConfigLoading(true));
    const timer = setTimeout(() => {
      dispatch(setCurrentCompany(getMockCompanyConfig(companyId)));
      dispatch(setCompanyConfigLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [companyId, dispatch]);

  const logoPreviewUrlValue = useMemo(() => {
    const logoFile = company?.configuration?.logoFile;
    if (logoFile && logoFile instanceof File) {
      return URL.createObjectURL(logoFile);
    }
    return null;
  }, [company?.configuration?.logoFile]);

  useEffect(() => {
    if (!logoPreviewUrlValue) return;
    return () => URL.revokeObjectURL(logoPreviewUrlValue);
  }, [logoPreviewUrlValue]);

  const handleBack = useCallback(() => {
    navigate(`/companies/${companyId}`);
  }, [navigate, companyId]);

  const handleTabChange = useCallback(
    (value) => {
      dispatch(setCompanyConfigActiveTab(value));
    },
    [dispatch]
  );

  const handleFieldChange = useCallback(
    (field, value) => {
      dispatch(updateCompanyConfigField({ field, value }));
    },
    [dispatch]
  );

  const handleLogoFileChange = useCallback(
    (file) => {
      dispatch(setCompanyConfigLogoFile(file));
    },
    [dispatch]
  );

  const handleKeyContactFieldChange = useCallback(
    (field, value) => {
      dispatch(updateCompanyKeyContactField({ field, value }));
    },
    [dispatch]
  );

  const handleRosterFileChange = useCallback(
    (file) => {
      dispatch(setCompanyRosterFile(file));
    },
    [dispatch]
  );

  const handleKeyContactsSave = useCallback(() => {
    dispatch(setCompanyConfigSaving(true));
    setTimeout(() => {
      dispatch(setCompanyConfigSaving(false));
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Key Contacts saved',
          body: 'Company key contacts have been updated successfully.',
          severity: 'info',
        })
      );
    }, 600);
  }, [dispatch]);

  const handlePlanAndSeatsFieldChange = useCallback(
    (payload) => {
      dispatch(updateCompanyPlanAndSeatsField(payload));
    },
    [dispatch]
  );

  const handlePlanAndSeatsAchFieldChange = useCallback(
    (payload) => {
      dispatch(updateCompanyAchDetailsField(payload));
    },
    [dispatch]
  );

  const handlePlanAndSeatsSave = useCallback(() => {
    dispatch(setCompanyConfigSaving(true));
    setTimeout(() => {
      dispatch(setCompanyConfigSaving(false));
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Plan & Seats saved',
          body: 'Company plan and seats have been updated successfully.',
          severity: 'info',
        })
      );
    }, 600);
  }, [dispatch]);

  const handlePlanAndSeatsCancel = useCallback(() => {
    dispatch(resetCompanyPlanAndSeatsForm());
  }, [dispatch]);

  const handleSave = useCallback(() => {
    dispatch(setCompanyConfigSaving(true));
    setTimeout(() => {
      dispatch(setCompanyConfigSaving(false));
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Configuration saved',
          body: 'Company configuration has been updated successfully.',
          severity: 'info',
        })
      );
    }, 600);
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    navigate(`/companies/${companyId}`);
  }, [navigate, companyId]);

  const handleBasicInfoFieldChange = useCallback(
    (field, value) => {
      dispatch(updateCompanyBasicInfoField({ field, value }));
    },
    [dispatch]
  );

  const handleBasicInfoSave = useCallback(() => {
    dispatch(setCompanyConfigSaving(true));
    setTimeout(() => {
      dispatch(setCompanyConfigSaving(false));
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Basic Info. saved',
          body: 'Company basic information has been updated successfully.',
          severity: 'info',
        })
      );
    }, 600);
  }, [dispatch]);

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
            <BackButton onClick={handleBack} ariaLabel="Back to company view" />
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
          <DeleteCompanyButton
            onClick={handleDeleteClick}
            aria-label={company?.name ? `Delete company ${company.name}` : 'Delete company'}
          />
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
              <CompanyBasicInfoForm
                formData={basicInfoFormData ?? {}}
                validationErrors={basicInfoValidation?.errors ?? {}}
                onFieldChange={handleBasicInfoFieldChange}
                onSave={handleBasicInfoSave}
                onCancel={handleCancel}
                isSaving={isSaving}
                isFormValid={isBasicInfoFormValid}
              />
            </Box>
          )}
          {activeTab === 'configuration' && (
            <Box id="configuration-tabpanel" role="tabpanel" aria-labelledby="configuration-tab">
              <CompanyConfigForm
                config={config}
                companyName={company.name}
                onSave={handleSave}
                onCancel={handleCancel}
                isSaving={isSaving}
                onFieldChange={handleFieldChange}
                onLogoFileChange={handleLogoFileChange}
                logoPreviewUrl={logoPreviewUrlValue ?? company.configuration?.logoUrl}
              />
            </Box>
          )}
          {activeTab === 'key-contacts' && (
            <CompanyKeyContactsForm
              formData={keyContactsFormData ?? {}}
              rosterFile={rosterFile}
              onFieldChange={handleKeyContactFieldChange}
              onRosterFileChange={handleRosterFileChange}
              onSave={handleKeyContactsSave}
              onCancel={handleCancel}
              isSaving={isSaving}
            />
          )}
          {activeTab === 'plan-and-seats' && (
            <CompanyPlanAndSeatsForm
              formData={planAndSeatsFormData ?? {}}
              achDetails={achDetailsFormData ?? {}}
              validationErrors={planAndSeatsValidation?.errors ?? {}}
              onUpdateField={handlePlanAndSeatsFieldChange}
              onUpdateAchDetailsField={handlePlanAndSeatsAchFieldChange}
              onSave={handlePlanAndSeatsSave}
              onCancel={handlePlanAndSeatsCancel}
              isSaving={isSaving}
              isFormValid={isPlanAndSeatsFormValid}
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
    </SuperAdminLayout>
  );
}
