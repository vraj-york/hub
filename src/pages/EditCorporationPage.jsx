import { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentCorporation,
  setLoading,
  setSelectedTab,
  updateCorporationBasicInfoRequest,
  resetCorporationEditSaveStatus,
  resetEditingCorporationBrandingState,
  fetchCorporationCompaniesRequest,
  updateCorporationCompaniesRequest,
  setCorporationCompanies,
  resetUpdatingCorporationCompaniesState,
  updateCorporationSecurityConfigRequest,
  resetCorporationSecurityConfigEditState,
  resetUpdateCorporationKeyContactsState,
  selectCurrentCorporation,
  selectSelectedTab,
  selectCurrentCorporationLoading,
  selectCorporationEditSaveStatus,
  selectCorporationEditSaveError,
  selectEditingCorporationBrandingStatus,
  selectEditingCorporationBrandingError,
  selectEditCorporationCompanies,
  selectIsUpdatingCorporationCompanies,
  selectUpdateCorporationCompaniesError,
  selectUpdateCorporationSecurityConfigStatus,
  selectUpdateCorporationSecurityConfigError,
  selectUpdateCorporationKeyContactsStatus,
  selectUpdateCorporationKeyContactsError,
} from '../store/slices/corporationsSlice';
import { setToastMessage } from '../store/slices/authSlice';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import { BackButton } from '../components/common/BackButton';
import { Badge } from '../components/common/Badge';
import { ProfileTabs } from '../components/ProfileTabs';
import { CorporationBasicInfoEditForm } from '../components/corporation-profile/CorporationBasicInfoEditForm';
import { CorporationBrandingEditForm } from '../components/corporation-profile/CorporationBrandingEditForm';
import { CorporationEditCompaniesTabContent } from '../components/corporation-profile/CorporationEditCompaniesTabContent';
import { CorporationKeyContactsEditForm } from '../components/corporation-profile/CorporationKeyContactsEditForm';
import { CorporationSecurityConfigForm } from '../components/corporation-profile/CorporationSecurityConfigForm';
import { ActionButtonsGroup } from '../components/company-creation/ActionButtonsGroup';
import { mockCorporationProfile } from '../data/mockCorporation';

const EDIT_TABS = [
  { label: 'Basic Info.', value: 'basic-info' },
  { label: 'Companies', value: 'companies' },
  { label: 'Branding', value: 'branding' },
  { label: 'Key Contacts', value: 'key-contacts' },
  { label: 'Configuration', value: 'configuration' },
];

export function EditCorporationPage() {
  const { corporationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const corporation = useSelector(selectCurrentCorporation);
  const loading = useSelector(selectCurrentCorporationLoading);
  const activeTab = useSelector(selectSelectedTab);
  const saveStatus = useSelector(selectCorporationEditSaveStatus);
  const saveError = useSelector(selectCorporationEditSaveError);
  const brandingSaveStatus = useSelector(selectEditingCorporationBrandingStatus);
  const brandingSaveError = useSelector(selectEditingCorporationBrandingError);
  const corporationCompanies = useSelector(selectEditCorporationCompanies);
  const companiesUpdateStatus = useSelector(selectIsUpdatingCorporationCompanies);
  const companiesUpdateError = useSelector(selectUpdateCorporationCompaniesError);
  const securityConfigSaveStatus = useSelector(selectUpdateCorporationSecurityConfigStatus);
  const securityConfigSaveError = useSelector(selectUpdateCorporationSecurityConfigError);
  const keyContactsSaveStatus = useSelector(selectUpdateCorporationKeyContactsStatus);
  const keyContactsSaveError = useSelector(selectUpdateCorporationKeyContactsError);
  const [isCompanyListValid, setCompanyListValid] = useState(false);

  useEffect(() => {
    dispatch(setSelectedTab('basic-info'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoading(true));
    const timer = setTimeout(() => {
      const profile = { ...mockCorporationProfile, id: corporationId };
      dispatch(setCurrentCorporation(profile));
      dispatch(setCorporationCompanies(profile.companies ?? []));
      dispatch(setLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [corporationId, dispatch]);

  useEffect(() => {
    if (activeTab === 'companies' && corporationId) {
      dispatch(fetchCorporationCompaniesRequest(corporationId));
    }
  }, [activeTab, corporationId, dispatch]);

  useEffect(() => {
    if (saveStatus === 'success') {
      dispatch(resetCorporationEditSaveStatus());
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Basic Info. saved',
          body: 'Corporation basic details have been updated successfully.',
          severity: 'success',
        })
      );
    }
  }, [saveStatus, dispatch]);

  useEffect(() => {
    if (saveStatus === 'error' && saveError) {
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Failed to save',
          body: saveError,
          severity: 'error',
        })
      );
      dispatch(resetCorporationEditSaveStatus());
    }
  }, [saveStatus, saveError, dispatch]);

  useEffect(() => {
    if (brandingSaveStatus === 'success') {
      dispatch(resetEditingCorporationBrandingState());
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Branding saved',
          body: 'Corporation branding has been updated successfully.',
          severity: 'success',
        })
      );
    }
  }, [brandingSaveStatus, dispatch]);

  useEffect(() => {
    if (brandingSaveStatus === 'error' && brandingSaveError) {
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Failed to save branding',
          body: brandingSaveError,
          severity: 'error',
        })
      );
      dispatch(resetEditingCorporationBrandingState());
    }
  }, [brandingSaveStatus, brandingSaveError, dispatch]);

  useEffect(() => {
    if (companiesUpdateStatus === 'success') {
      dispatch(resetUpdatingCorporationCompaniesState());
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Companies saved',
          body: 'Corporation companies have been updated successfully.',
          severity: 'success',
        })
      );
    }
  }, [companiesUpdateStatus, dispatch]);

  useEffect(() => {
    if (companiesUpdateStatus === 'error' && companiesUpdateError) {
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Failed to save companies',
          body: companiesUpdateError,
          severity: 'error',
        })
      );
      dispatch(resetUpdatingCorporationCompaniesState());
    }
  }, [companiesUpdateStatus, companiesUpdateError, dispatch]);

  useEffect(() => {
    if (securityConfigSaveStatus === 'success') {
      dispatch(resetCorporationSecurityConfigEditState());
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Configuration saved',
          body: 'Corporation security configuration has been updated successfully.',
          severity: 'success',
        })
      );
    }
  }, [securityConfigSaveStatus, dispatch]);

  useEffect(() => {
    if (securityConfigSaveStatus === 'error' && securityConfigSaveError) {
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Failed to save configuration',
          body: securityConfigSaveError,
          severity: 'error',
        })
      );
      dispatch(resetCorporationSecurityConfigEditState());
    }
  }, [securityConfigSaveStatus, securityConfigSaveError, dispatch]);

  useEffect(() => {
    if (keyContactsSaveStatus === 'success') {
      dispatch(resetUpdateCorporationKeyContactsState());
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Key Contacts saved',
          body: 'Corporation key contacts have been updated successfully.',
          severity: 'success',
        })
      );
    }
  }, [keyContactsSaveStatus, dispatch]);

  useEffect(() => {
    if (keyContactsSaveStatus === 'error' && keyContactsSaveError) {
      dispatch(
        setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Failed to save key contacts',
          body: keyContactsSaveError,
          severity: 'error',
        })
      );
      dispatch(resetUpdateCorporationKeyContactsState());
    }
  }, [keyContactsSaveStatus, keyContactsSaveError, dispatch]);

  const handleTabChange = useCallback(
    (value) => {
      dispatch(setSelectedTab(value));
    },
    [dispatch]
  );

  const handleCancel = useCallback(() => {
    navigate(`/corporations/${corporationId}/profile`);
  }, [navigate, corporationId]);

  const handleCompaniesUpdate = useCallback(
    (updatedCompanies) => {
      dispatch(setCorporationCompanies(updatedCompanies ?? []));
    },
    [dispatch]
  );

  const handleSaveCompanies = useCallback(() => {
    dispatch(updateCorporationCompaniesRequest({ corporationId, companies: corporationCompanies }));
  }, [corporationId, corporationCompanies, dispatch]);

  const handleSaveBasicInfo = useCallback(
    (basicInfoPayload) => {
      dispatch(updateCorporationBasicInfoRequest({ corporationId, basicInfoPayload }));
    },
    [corporationId, dispatch]
  );

  const handleSaveSecurityConfig = useCallback(
    (securityConfigData) => {
      dispatch(
        updateCorporationSecurityConfigRequest({
          corporationId,
          securityConfigData,
        })
      );
    },
    [corporationId, dispatch]
  );

  if (!corporation) {
    return (
      <SuperAdminLayout>
        <Box sx={{ py: 4 }}>
          <Typography>Loading...</Typography>
        </Box>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout>
      <Box sx={{ maxWidth: 1200 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <BackButton to={`/corporations/${corporationId}/profile`} ariaLabel="Back to corporation profile" />
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 600,
              fontSize: '20px',
              color: 'rgba(47, 65, 74, 1)',
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
            }}
          >
            Edit {corporation.name}
          </Typography>
          <Badge label={corporation.code} variant="primary" />
          <Badge label={corporation.status} variant="success" />
        </Box>
        <ProfileTabs tabs={EDIT_TABS} activeTab={activeTab} onTabChange={handleTabChange} />
        <Box
            sx={{
            background: 'rgba(248, 247, 251, 1)',
            borderRadius: '0 0 8px 8px',
            p: activeTab === 'key-contacts' || activeTab === 'configuration' ? 0 : 0,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          {activeTab === 'basic-info' && (
            <Box sx={{ p: 3 }} role="tabpanel" id="basic-info-tabpanel" aria-labelledby="basic-info-tab">
              <CorporationBasicInfoEditForm
                corporation={corporation}
                onSave={handleSaveBasicInfo}
                onCancel={handleCancel}
                isSaving={saveStatus === 'pending'}
              />
            </Box>
          )}
          {activeTab === 'companies' && (
            <Box>
              <CorporationEditCompaniesTabContent
                corporationId={corporationId}
                initialCompanies={corporationCompanies}
                onCompaniesUpdate={handleCompaniesUpdate}
                onValidityChange={setCompanyListValid}
                isParentSaving={companiesUpdateStatus === 'pending'}
              />
              <Box sx={{ px: 3, pb: 3 }}>
                <ActionButtonsGroup
                  onCancel={handleCancel}
                  onNext={handleSaveCompanies}
                  nextLabel={companiesUpdateStatus === 'pending' ? 'Saving Companies...' : 'Save & Update'}
                  cancelLabel="Cancel"
                  isNextDisabled={!isCompanyListValid || companiesUpdateStatus === 'pending'}
                  isPreviousDisabled
                  previousLabel="Previous"
                  onPrevious={undefined}
                />
              </Box>
            </Box>
          )}
          {activeTab === 'branding' && (
            <Box sx={{ p: 3, background: 'rgba(255, 255, 255, 1)', borderRadius: '0 0 8px 8px' }}>
              <CorporationBrandingEditForm
                corporationId={corporationId}
                initialLogoUrl={corporation.logoUrl ?? null}
                corporationName={corporation.name ?? ''}
                isSaving={brandingSaveStatus === 'pending'}
                saveStatus={brandingSaveStatus}
                saveError={brandingSaveError}
                onCancel={handleCancel}
              />
            </Box>
          )}
          {activeTab === 'key-contacts' && (
            <Box
              role="tabpanel"
              id="key-contacts-tabpanel"
              aria-labelledby="key-contacts-tab"
              sx={{ pt: 0 }}
            >
              <CorporationKeyContactsEditForm corporationId={corporationId} />
            </Box>
          )}
          {activeTab === 'configuration' && (
            <Box
              role="tabpanel"
              id="configuration-tabpanel"
              aria-labelledby="configuration-tab"
              sx={{ pt: 0 }}
            >
              <CorporationSecurityConfigForm
                initialData={{
                  passwordPolicy: corporation.securityConfig?.passwordPolicy ?? '',
                  tfaRequirement: corporation.securityConfig?.tfaRequirement ?? '',
                  sessionTimeout: corporation.securityConfig?.sessionTimeout ?? 60,
                }}
                onSave={handleSaveSecurityConfig}
                onCancel={handleCancel}
                isSaving={securityConfigSaveStatus === 'pending'}
                saveError={securityConfigSaveError}
              />
            </Box>
          )}
        </Box>
      </Box>
    </SuperAdminLayout>
  );
}
