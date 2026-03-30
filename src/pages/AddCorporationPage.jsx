import { useCallback, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import { VerticalStepper } from '../components/company-creation/VerticalStepper';
import { ProgressBar } from '../components/company-creation/ProgressBar';
import { ActionButtonsGroup } from '../components/company-creation/ActionButtonsGroup';
import { FileUploadInput } from '../components/company-creation/FileUploadInput';
import { SetupTag } from '../components/common/SetupTag';
import { CorporationBasicsCard } from '../components/corporation-creation/CorporationBasicsCard';
import { CorporationAddressCard } from '../components/corporation-creation/CorporationAddressCard';
import { ExecutiveSponsorCard } from '../components/corporation-creation/ExecutiveSponsorCard';
import { PrimaryCorporateAdminCard } from '../components/corporation-creation/PrimaryCorporateAdminCard';
import { BillingFinanceContactCard } from '../components/corporation-creation/BillingFinanceContactCard';
import { LegalComplianceContactCard } from '../components/corporation-creation/LegalComplianceContactCard';
import { CorporationConfirmationStep } from '../components/corporation-creation/CorporationConfirmationStep';
import { AddCorporationCompanyModal } from '../components/corporation-creation/AddCorporationCompanyModal';
import { CompanyAssignmentList } from '../components/corporation-creation/CompanyAssignmentList';
import { QuickCompanyInfoStep } from '../components/corporation-creation/QuickCompanyInfoStep';
import {
  CORPORATION_STEPS,
  QUICK_SETUP_STEPS,
  updateCorporationField,
  setCurrentCorporationStep,
  setCorporationFlowType,
  validateCorporationStep1,
  setCorporationStep3LogoFile,
  updateCorporationStep4Field,
  validateCorporationStep4,
  resetCorporationCreation,
  submitCorporationCreation,
  submitQuickSetupCorporation,
  updateQuickSetupStep2Field,
  validateQuickSetupStep2,
  openAddCompanyModal,
  closeAddCompanyModal,
  updateNewCompanyFormField,
  validateNewCompanyForm,
  addCompanyToCorporationStep2,
  deleteCompanyFromCorporation,
  updateCompanyInCorporation,
  selectCorporationFlowType,
  selectCurrentCorporationStep,
  selectStepsConfig,
  selectCorporationStep1FormData,
  selectCorporationStep1Errors,
  selectCorporationStep1ValidationStatus,
  selectCorporationStep3FormData,
  selectCorporationStep4FormData,
  selectCorporationStep4Errors,
  selectCorporationStep4IsValidDerived,
  selectAllCorporationStepStatuses,
  selectCorporationConfirmationData,
  selectSubmissionLoading,
  selectIsAddCompanyModalOpen,
  selectNewCompanyFormData,
  selectNewCompanyFormValidation,
  selectIsNewCompanyFormValid,
  selectCorporationStep2Companies,
  selectCorporationStep2ValidationStatus,
  selectQuickSetupStep2FormData,
  selectQuickSetupStep2Errors,
  selectIsQuickSetupStep2Valid,
} from '../store/slices/corporationCreationSlice';
import { openDeleteCompanyModal, closeDeleteCompanyModal, selectIsDeleteCompanyModalOpen } from '../store/slices/uiSlice';
import { setCompanyToDelete, clearCompanyToDelete, selectCompanyToDeleteId, selectCompanyToDeleteName } from '../store/slices/companyConfigSlice';
import { setToastMessage } from '../store/slices/authSlice';
import { DeleteCompanyConfirmationModal } from '../components/company-profile-config/DeleteCompanyConfirmationModal';

export function AddCorporationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const flowType = useSelector(selectCorporationFlowType);
  const stepsConfig = useSelector(selectStepsConfig);
  const currentStep = useSelector(selectCurrentCorporationStep);
  const step1FormData = useSelector(selectCorporationStep1FormData);
  const step1Errors = useSelector(selectCorporationStep1Errors);
  const step1Valid = useSelector(selectCorporationStep1ValidationStatus);
  const step3FormData = useSelector(selectCorporationStep3FormData);
  const step4FormData = useSelector(selectCorporationStep4FormData);
  const step4Errors = useSelector(selectCorporationStep4Errors);
  const step4Valid = useSelector(selectCorporationStep4IsValidDerived);
  const stepStatuses = useSelector(selectAllCorporationStepStatuses);
  const confirmationData = useSelector(selectCorporationConfirmationData);
  const isSubmitting = useSelector(selectSubmissionLoading);
  const isAddCompanyModalOpen = useSelector(selectIsAddCompanyModalOpen);
  const newCompanyFormData = useSelector(selectNewCompanyFormData);
  const newCompanyFormValidation = useSelector(selectNewCompanyFormValidation);
  const isNewCompanyFormValid = useSelector(selectIsNewCompanyFormValid);
  const step2Companies = useSelector(selectCorporationStep2Companies);
  const step2Valid = useSelector(selectCorporationStep2ValidationStatus);
  const isDeleteCompanyModalOpen = useSelector(selectIsDeleteCompanyModalOpen);
  const companyToDeleteId = useSelector(selectCompanyToDeleteId);
  const companyToDeleteName = useSelector(selectCompanyToDeleteName);
  const quickSetupStep2FormData = useSelector(selectQuickSetupStep2FormData);
  const quickSetupStep2Errors = useSelector(selectQuickSetupStep2Errors);
  const quickSetupStep2Valid = useSelector(selectIsQuickSetupStep2Valid);

  useEffect(() => {
    const flow = searchParams.get('flow');
    if (flow === 'quick') dispatch(setCorporationFlowType('quick'));
    else if (flow === 'advance') dispatch(setCorporationFlowType('advance'));
  }, [searchParams, dispatch]);

  const totalSteps = stepsConfig.length;
  const isLastStep = currentStep === totalSteps;

  const handleFieldChange = useCallback(
    (field, value) => {
      dispatch(updateCorporationField({ step: 'step1', field, value }));
    },
    [dispatch]
  );

  const handleStepClick = useCallback(
    (stepId) => {
      if (stepId <= currentStep && stepId <= totalSteps) {
        dispatch(setCurrentCorporationStep(stepId));
      }
    },
    [dispatch, currentStep, totalSteps]
  );

  const handleQuickSetupStep2FieldChange = useCallback(
    (field, value) => {
      dispatch(updateQuickSetupStep2Field({ field, value }));
    },
    [dispatch]
  );

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) dispatch(setCurrentCorporationStep(currentStep - 1));
  }, [dispatch, currentStep]);

  const handleNext = useCallback(() => {
    if (currentStep === 1) {
      dispatch(validateCorporationStep1());
      if (!step1Valid) {
        dispatch(setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Required fields missing',
          body: 'Please fill in all required fields before proceeding.',
          severity: 'error',
        }));
        return;
      }
    }
    if (flowType === 'quick' && currentStep === 2) {
      dispatch(validateQuickSetupStep2());
      if (!quickSetupStep2Valid) {
        dispatch(setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Required fields missing',
          body: 'Please fill in all required fields before proceeding.',
          severity: 'error',
        }));
        return;
      }
    }
    if (flowType === 'advance' && currentStep === 2) {
      if (!step2Valid) {
        dispatch(setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Company required',
          body: 'Please add at least one company before proceeding.',
          severity: 'error',
        }));
        return;
      }
    }
    if (flowType === 'advance' && currentStep === 4) {
      dispatch(validateCorporationStep4());
      if (!step4Valid) {
        dispatch(setToastMessage({
          id: `toast-${Date.now()}`,
          title: 'Required fields missing',
          body: 'Please fill in all required fields before proceeding.',
          severity: 'error',
        }));
        return;
      }
    }
    if (!isLastStep) {
      dispatch(setCurrentCorporationStep(currentStep + 1));
    } else {
      const submitAction = flowType === 'quick' ? submitQuickSetupCorporation : submitCorporationCreation;
      dispatch(submitAction())
        .unwrap()
        .then(() => {
          dispatch(resetCorporationCreation());
          navigate('/corporations');
        })
        .catch(() => {
          // Error feedback could use GlobalToast here
        });
    }
  }, [dispatch, currentStep, totalSteps, isLastStep, flowType, step1Valid, step2Valid, step4Valid, quickSetupStep2Valid, navigate]);

  const handleCancel = useCallback(() => {
    if (window.confirm('Discard changes and leave?')) {
      dispatch(resetCorporationCreation());
      navigate('/corporations');
    }
  }, [dispatch, navigate]);

  const isFirstStep = currentStep === 1;
  const progressPercent =
    currentStep === 1 ? 0 : Math.round(((currentStep - 1) / totalSteps) * 100);
  const isNextDisabled = isLastStep && isSubmitting;

  const handleLogoFileChange = useCallback(
    (file) => {
      dispatch(setCorporationStep3LogoFile(file));
    },
    [dispatch]
  );

  const handleStep4FieldChange = useCallback(
    (field, value) => {
      dispatch(updateCorporationStep4Field({ field, value }));
    },
    [dispatch]
  );

  const handleOpenAddCompanyModal = useCallback(() => {
    dispatch(openAddCompanyModal());
  }, [dispatch]);

  const handleCloseAddCompanyModal = useCallback(() => {
    dispatch(closeAddCompanyModal());
  }, [dispatch]);

  const handleNewCompanyFieldChange = useCallback(
    (field, value) => {
      dispatch(updateNewCompanyFormField({ field, value }));
    },
    [dispatch]
  );

  const handleAddCompanySubmit = useCallback(
    (companyData) => {
      dispatch(addCompanyToCorporationStep2(companyData));
    },
    [dispatch]
  );

  const handleDeleteCompany = useCallback(
    (companyId) => {
      const company = step2Companies?.find((c) => c.id === companyId);
      dispatch(setCompanyToDelete({ id: companyId, name: company?.name ?? '' }));
      dispatch(openDeleteCompanyModal());
    },
    [dispatch, step2Companies]
  );

  const handleDeleteCompanyConfirm = useCallback(
    (id) => {
      dispatch(deleteCompanyFromCorporation(id));
      dispatch(closeDeleteCompanyModal());
      dispatch(clearCompanyToDelete());
    },
    [dispatch]
  );

  const handleDeleteCompanyModalClose = useCallback(() => {
    dispatch(closeDeleteCompanyModal());
    dispatch(clearCompanyToDelete());
  }, [dispatch]);

  const handleEditCompany = useCallback(
    (companyId) => {
      // TODO: Open edit modal with company data; for now no-op or reuse add modal in edit mode
      // dispatch(openEditCompanyModal(companyId));
    },
    []
  );

  const handleBillingFinanceContactClick = useCallback(() => {
    // Placeholder: future navigation or modal for Billing/Finance contact
  }, []);

  const handleLegalComplianceContactClick = useCallback(() => {
    // Placeholder: future navigation or modal for Legal/Compliance contact
  }, []);

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: '8px',
            border: '1px solid rgba(221, 217, 235, 1)',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <ProgressBar
            progress={progressPercent}
            labelText={`${progressPercent}% Complete`}
            trackBackground="rgba(248, 247, 251, 1)"
          />
          <Box>
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
              Basic Info.
            </Typography>
            <Typography sx={{ fontSize: '14px', color: 'rgba(73, 130, 145, 1)' }}>
              Enter the core details for the new corporation.
            </Typography>
          </Box>
          <CorporationBasicsCard
            formData={step1FormData}
            onFieldChange={handleFieldChange}
            errors={step1Errors}
          />
          <CorporationAddressCard
            formData={step1FormData}
            onFieldChange={handleFieldChange}
            errors={step1Errors}
          />
          <ExecutiveSponsorCard
            formData={step1FormData}
            onFieldChange={handleFieldChange}
            errors={step1Errors}
          />
        </Box>
      );
    }
    if (flowType === 'quick' && currentStep === 2) {
      return (
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: '8px',
            border: '1px solid rgba(221, 217, 235, 1)',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <ProgressBar
            progress={progressPercent}
            labelText={`${progressPercent}% Complete`}
            trackBackground="rgba(248, 247, 251, 1)"
          />
          <Box>
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
              Company Info.
            </Typography>
            <Typography sx={{ fontSize: '14px', color: 'rgba(73, 130, 145, 1)' }}>
              Each corporation must have at least one company before continuing.
            </Typography>
          </Box>
          <QuickCompanyInfoStep
            formData={quickSetupStep2FormData}
            onFieldChange={handleQuickSetupStep2FieldChange}
            errors={quickSetupStep2Errors}
          />
        </Box>
      );
    }
    if (flowType === 'quick' && currentStep === 3) {
      return (
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: '8px',
            border: '1px solid rgba(221, 217, 235, 1)',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <CorporationConfirmationStep confirmationData={confirmationData} isQuickSetup />
        </Box>
      );
    }
    if (flowType === 'advance' && currentStep === 3) {
      return (
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: '8px',
            border: '1px solid rgba(221, 217, 235, 1)',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <ProgressBar progress={progressPercent} labelText={`${progressPercent}% Complete`} />
          <Box>
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
              Branding
            </Typography>
            <Typography sx={{ fontSize: '14px', color: 'rgba(56, 89, 102, 1)' }}>
              Configure corporation identity.
            </Typography>
          </Box>
          <FileUploadInput
            label="Upload Logo"
            instructionText="Click to upload or drag-&-drop file"
            supportedFormatsText="SVG, PNG & JPG up to 10MB"
            allowedFormats="SVG, PNG, JPG"
            maxSize="10MB"
            maxFileSizeMB={10}
            accept=".svg,.png,.jpg,.jpeg"
            onFileChange={handleLogoFileChange}
            currentFile={step3FormData?.logoFile ?? null}
            isRequired={false}
            ariaLabel="Upload corporation logo file"
          />
        </Box>
      );
    }
    if (flowType === 'advance' && currentStep === 4) {
      return (
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: '8px',
            border: '1px solid rgba(221, 217, 235, 1)',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <ProgressBar progress={progressPercent} labelText={`${progressPercent}% Complete`} />
          <Box>
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
            <Typography sx={{ fontSize: '14px', color: 'rgba(73, 130, 145, 1)' }}>
              Define governance and key contact details for the corporation.
            </Typography>
          </Box>
          <PrimaryCorporateAdminCard
            initialData={step4FormData}
            onChange={handleStep4FieldChange}
            validationErrors={step4Errors}
          />
          <BillingFinanceContactCard onClick={handleBillingFinanceContactClick} />
          <LegalComplianceContactCard onClick={handleLegalComplianceContactClick} />
        </Box>
      );
    }
    if (flowType === 'advance' && currentStep === 2) {
      return (
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: '8px',
            border: '1px solid rgba(221, 217, 235, 1)',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <ProgressBar progress={progressPercent} labelText={`${progressPercent}% Complete`} />
          <Box>
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
              Company Setup
            </Typography>
            <Typography sx={{ fontSize: '14px', color: 'rgba(73, 130, 145, 1)' }}>
              Each corporation must have at least one Company before continuing.
            </Typography>
          </Box>
          <CompanyAssignmentList
            companies={step2Companies}
            onAddCompany={handleOpenAddCompanyModal}
            onEditCompany={handleEditCompany}
            onDeleteCompany={handleDeleteCompany}
            infoCardTitle="Company Assignment & Modification"
            infoCardDescription="Created companies will be assigned to the corporation in the subsequent steps."
          />
        </Box>
      );
    }
    if (flowType === 'advance' && currentStep === 5) {
      return (
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: '8px',
            border: '1px solid rgba(221, 217, 235, 1)',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <CorporationConfirmationStep confirmationData={confirmationData} />
        </Box>
      );
    }
    return (
      <Box sx={{ py: 2 }}>
        <ProgressBar progress={progressPercent} labelText={`${progressPercent}% Complete`} />
        <Typography sx={{ fontSize: '14px', color: 'rgba(56, 89, 102, 1)', mt: 2 }}>
          Step {currentStep} content (placeholder).
        </Typography>
      </Box>
    );
  };

  return (
    <SuperAdminLayout>
      {/* Header row with title and setup tag */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
              fontSize: '20px',
              fontWeight: 600,
              color: 'rgba(47, 65, 74, 1)',
              mb: 0.5,
            }}
          >
            Add New Corporation
          </Typography>
          <Typography sx={{ fontSize: '14px', color: 'rgba(56, 89, 102, 1)' }}>
            {flowType === 'quick'
              ? 'Set up a new corporation with its plan, region, and initial admin access.'
              : 'Set up a new corporation with its basic details, company, branding, and governance.'}
          </Typography>
        </Box>
        <SetupTag
          type={flowType}
          icon={flowType === 'quick' ? 'zap' : 'sliders-vertical'}
          text={flowType === 'quick' ? 'Quick Setup' : 'Advance Setup'}
        />
      </Box>

      {/* Main content with stepper and form */}
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        <VerticalStepper
          stepsConfig={stepsConfig}
          stepStatuses={stepStatuses}
          onStepClick={handleStepClick}
          ariaLabel={flowType === 'quick' ? 'Corporation Onboarding Steps: Quick Setup Flow' : 'Corporation Onboarding Steps'}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {renderStepContent()}
          {flowType === 'advance' && (
            <AddCorporationCompanyModal
              isOpen={isAddCompanyModalOpen}
              onClose={handleCloseAddCompanyModal}
              onSubmit={handleAddCompanySubmit}
              formData={newCompanyFormData}
              validationErrors={newCompanyFormValidation}
              onFieldChange={handleNewCompanyFieldChange}
              isFormValid={isNewCompanyFormValid}
              onValidate={() => dispatch(validateNewCompanyForm())}
            />
          )}
          <ActionButtonsGroup
            onCancel={handleCancel}
            onPrevious={handlePrevious}
            onNext={handleNext}
            nextLabel={isLastStep ? 'Confirm & Add' : 'Next'}
            previousLabel="Previous"
            cancelLabel="Cancel"
            isNextDisabled={isNextDisabled}
            isPreviousDisabled={isFirstStep}
            isNextLoading={isLastStep && isSubmitting}
            loadingLabel={isLastStep ? 'Submitting...' : undefined}
          />
        </Box>
      </Box>
      <DeleteCompanyConfirmationModal
        isOpen={isDeleteCompanyModalOpen}
        onClose={handleDeleteCompanyModalClose}
        onConfirm={handleDeleteCompanyConfirm}
        companyId={companyToDeleteId}
        companyName={companyToDeleteName}
        isDeleting={false}
        deleteError={null}
      />
    </SuperAdminLayout>
  );
}
