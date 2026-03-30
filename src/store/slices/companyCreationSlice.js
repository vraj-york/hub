import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const STEPS = [
  { id: 1, title: 'Basic Info.', subtitle: 'Company-based details', path: 'basic-info' },
  { id: 2, title: 'Key Contacts', subtitle: 'Operating unit setup', path: 'key-contacts' },
  { id: 3, title: 'Plan & Seats', subtitle: 'Subscription setup', path: 'plan-seats' },
  { id: 4, title: 'Configuration', subtitle: 'Basic property settings', path: 'configuration' },
  { id: 5, title: 'Confirmation', subtitle: 'Review & submit details', path: 'confirmation' },
];

const defaultBasicInfo = {
  parentCorporationLegalName: 'Acme Corporation',
  ownershipType: '',
  companyLegalName: '',
  dbaTradeName: '',
  websiteURL: '',
  companyType: '',
  officeType: '',
  regionDataResidency: '',
  industry: '',
  companyPhoneNumber: '',
  primaryLanguage: '',
  addressLine: '',
  stateProvince: '',
  city: '',
  country: '',
  zipPostalCode: '',
};

const initialState = {
  currentStep: 1,
  completedSteps: [],
  formData: {
    basicInfo: { ...defaultBasicInfo },
    keyContacts: {
      primaryAdminRosterId: null,
      secondaryAdminRosterId: null,
      executiveSponsorRosterId: null,
      hrContactRosterId: null,
      itSecurityContactRosterId: null,
      uploadedRosterFile: null,
    },
    planAndSeats: {
      planType: 'pilot',
      pilotLength: null,
      pilotEndDate: '01-20-2026',
      pilotSeats: null,
      autoExpirePilot: true,
      trialLength: null,
      trialEndDate: '01-20-2026',
      trialSeats: null,
      autoExpireTrial: true,
      plan: null,
      totalSeats: '100',
      billingCycle: null,
      paymentType: 'cc',
      billingCurrency: 'usd',
      cardholderName: '',
      cardNumber: '',
      cvv: '',
      expirationDate: '',
      billingZipPostalCode: '',
      country: null,
      wiringDetails: {
        beneficiaryName: '',
        bankName: '',
        bankAccountNumber: '',
        bankCountry: '',
        swiftBicCode: '',
      },
      achDetails: {
        accountHolderName: '',
        bankName: '',
        accountNo: '',
        accountType: '',
        paymentDirection: '',
        routingNo: '',
      },
    },
    configuration: {
      authenticationMethod: 'email_password',
      passwordPolicy: 'standard',
      sessionTimeoutMinutes: 60,
      twoFactorAuthRequirement: 'off',
      logoFile: null,
      defaultDashboardOption: 'Standard',
      dataExportPermission: false,
      userDataAnonymization: false,
    },
    confirmation: {},
  },
  currentFileUpload: null,
  availableRosters: [
    { value: 'r1', label: 'John Doe' },
    { value: 'r2', label: 'Jane Smith' },
    { value: 'r3', label: 'Bob Wilson' },
  ],
  isSubmittingStep: false,
  stepError: null,
  submissionStatus: 'idle', // 'idle' | 'pending' | 'success' | 'error'
  submissionError: null,
};

/** Async thunk: submit full company creation form (Step 5). */
export const submitCompanyCreation = createAsyncThunk(
  'companyCreation/submitCompanyCreation',
  async (formData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { ok: true };
    } catch (err) {
      return rejectWithValue(err?.message ?? 'Failed to create company.');
    }
  }
);

const companyCreationSlice = createSlice({
  name: 'companyCreation',
  initialState,
  reducers: {
    setCurrentStep(state, action) {
      state.currentStep = action.payload;
    },
    markStepCompleted(state, action) {
      const stepId = action.payload;
      if (!state.completedSteps.includes(stepId)) {
        state.completedSteps.push(stepId);
      }
    },
    updateBasicInfo(state, action) {
      state.formData.basicInfo = { ...state.formData.basicInfo, ...action.payload };
    },
    updateKeyContacts(state, action) {
      state.formData.keyContacts = { ...state.formData.keyContacts, ...action.payload };
    },
    updatePlanAndSeats(state, action) {
      state.formData.planAndSeats = { ...state.formData.planAndSeats, ...action.payload };
    },
    updateStep3Field(state, action) {
      const { field, value } = action.payload;
      if (!state.formData.planAndSeats) return;
      if (field.startsWith('wiringDetails.')) {
        const key = field.slice('wiringDetails.'.length);
        if (!state.formData.planAndSeats.wiringDetails) {
          state.formData.planAndSeats.wiringDetails = {
            beneficiaryName: '',
            bankName: '',
            bankAccountNumber: '',
            bankCountry: '',
            swiftBicCode: '',
          };
        }
        if (key in state.formData.planAndSeats.wiringDetails) {
          state.formData.planAndSeats.wiringDetails[key] = value;
        }
      } else if (field.startsWith('achDetails.')) {
        const key = field.slice('achDetails.'.length);
        if (!state.formData.planAndSeats.achDetails) {
          state.formData.planAndSeats.achDetails = {
            accountHolderName: '',
            bankName: '',
            accountNo: '',
            accountType: '',
            paymentDirection: '',
            routingNo: '',
          };
        }
        if (key in state.formData.planAndSeats.achDetails) {
          state.formData.planAndSeats.achDetails[key] = value;
        }
      } else if (field in state.formData.planAndSeats) {
        state.formData.planAndSeats[field] = value;
      }
    },
    updateConfiguration(state, action) {
      state.formData.configuration = { ...state.formData.configuration, ...action.payload };
    },
    updateStep4Field(state, action) {
      const { field, value } = action.payload;
      if (state.formData.configuration && field in state.formData.configuration) {
        state.formData.configuration[field] = value;
      }
    },
    setStep4LogoFile(state, action) {
      if (state.formData.configuration) {
        state.formData.configuration.logoFile = action.payload ?? null;
      }
    },
    startFileUpload(state, action) {
      const file = action.payload;
      state.currentFileUpload = {
        fileName: file?.name ?? 'file',
        progress: 0,
        status: 'uploading',
        errorMessage: null,
      };
    },
    updateFileUploadProgress(state, action) {
      if (state.currentFileUpload) {
        state.currentFileUpload.progress = action.payload;
      }
    },
    fileUploadSuccess(state, action) {
      if (state.currentFileUpload) {
        state.currentFileUpload.status = 'success';
        state.currentFileUpload.progress = 100;
      }
      state.formData.keyContacts.uploadedRosterFile = action.payload ?? null;
    },
    fileUploadError(state, action) {
      if (state.currentFileUpload) {
        state.currentFileUpload.status = 'error';
        state.currentFileUpload.errorMessage = action.payload ?? 'Upload failed';
      }
    },
    clearFileUpload(state) {
      state.currentFileUpload = null;
    },
    setSelectedRoster(state, action) {
      const { role, rosterId } = action.payload;
      if (state.formData.keyContacts[role] !== undefined) {
        state.formData.keyContacts[role] = rosterId;
      }
    },
    submitCurrentStepRequest(state) {
      state.isSubmittingStep = true;
      state.stepError = null;
    },
    submitCurrentStepSuccess(state) {
      state.isSubmittingStep = false;
      state.stepError = null;
      if (!state.completedSteps.includes(state.currentStep)) {
        state.completedSteps.push(state.currentStep);
      }
    },
    submitCurrentStepFailure(state, action) {
      state.isSubmittingStep = false;
      state.stepError = action.payload ?? 'Step submission failed';
    },
    resetCompanyCreation(_state) {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCompanyCreation.pending, (state) => {
        state.submissionStatus = 'pending';
        state.submissionError = null;
      })
      .addCase(submitCompanyCreation.fulfilled, (state) => {
        state.submissionStatus = 'success';
        state.submissionError = null;
      })
      .addCase(submitCompanyCreation.rejected, (state, action) => {
        state.submissionStatus = 'error';
        state.submissionError = action.payload ?? action.error?.message ?? 'Submission failed';
      });
  },
});

export const {
  setCurrentStep,
  markStepCompleted,
  updateBasicInfo,
  updateKeyContacts,
  updatePlanAndSeats,
  updateStep3Field,
  updateConfiguration,
  updateStep4Field,
  setStep4LogoFile,
  startFileUpload,
  updateFileUploadProgress,
  fileUploadSuccess,
  fileUploadError,
  clearFileUpload,
  setSelectedRoster,
  submitCurrentStepRequest,
  submitCurrentStepSuccess,
  submitCurrentStepFailure,
  resetCompanyCreation,
} = companyCreationSlice.actions;

export { STEPS as STEPS_CONFIG };

export const selectCurrentStep = (state) => state.companyCreation.currentStep;
export const selectCompletedSteps = (state) => state.companyCreation.completedSteps;
export const selectFormData = (state) => state.companyCreation.formData;
export const selectCurrentFileUpload = (state) => state.companyCreation.currentFileUpload;
export const selectAvailableRosters = (state) => state.companyCreation.availableRosters;
export const selectIsSubmittingStep = (state) => state.companyCreation.isSubmittingStep;
export const selectStepError = (state) => state.companyCreation.stepError;
export const selectSubmissionStatus = (state) => state.companyCreation.submissionStatus;
export const selectSubmissionError = (state) => state.companyCreation.submissionError;

export const selectStep3FormData = (state) => state.companyCreation.formData.planAndSeats ?? {};
export const selectStep3ValidationStatus = (state) => {
  const s3 = state.companyCreation.formData.planAndSeats ?? {};
  const baseOk = Boolean(s3.plan && s3.billingCycle && s3.paymentType);
  if (s3.planType === 'pilot') {
    if (!s3.pilotLength || !s3.pilotEndDate?.trim() || !s3.pilotSeats) return false;
  }
  if (s3.planType === 'trial') {
    if (!s3.trialLength || !s3.trialEndDate?.trim() || !s3.trialSeats) return false;
  }
  if (s3.paymentType === 'cc') {
    return (
      baseOk &&
      Boolean(
        s3.cardholderName?.trim() &&
          s3.cardNumber?.trim() &&
          s3.cvv?.trim() &&
          s3.expirationDate?.trim() &&
          s3.billingZipPostalCode?.trim()
      )
    );
  }
  if (s3.paymentType === 'wiring') {
    const w = s3.wiringDetails ?? {};
    return (
      baseOk &&
      Boolean(
        w.beneficiaryName?.trim() &&
          w.bankName?.trim() &&
          w.bankAccountNumber?.trim() &&
          w.bankCountry &&
          w.swiftBicCode?.trim()
      )
    );
  }
  if (s3.paymentType === 'ach') {
    const a = s3.achDetails ?? {};
    return (
      baseOk &&
      Boolean(
        a.accountHolderName?.trim() &&
          a.bankName?.trim() &&
          a.accountNo?.trim() &&
          a.accountType &&
          a.paymentDirection &&
          a.routingNo?.trim()
      )
    );
  }
  return baseOk;
};

export const selectStep1FormData = (state) => state.companyCreation.formData.basicInfo ?? defaultBasicInfo;
export const selectStep1ValidationStatus = (state) => {
  const s1 = state.companyCreation.formData.basicInfo ?? {};
  return Boolean(
    (s1.parentCorporationLegalName ?? '').toString().trim() &&
      (s1.ownershipType ?? '').toString().trim() &&
      (s1.companyLegalName ?? '').toString().trim() &&
      (s1.companyType ?? '').toString().trim() &&
      (s1.officeType ?? '').toString().trim() &&
      (s1.regionDataResidency ?? '').toString().trim() &&
      (s1.industry ?? '').toString().trim() &&
      (s1.addressLine ?? '').toString().trim() &&
      (s1.stateProvince ?? '').toString().trim() &&
      (s1.city ?? '').toString().trim() &&
      (s1.country ?? '').toString().trim()
  );
};

export const selectStep4FormData = (state) => state.companyCreation.formData.configuration ?? {};
export const selectStep4ValidationStatus = (state) => {
  const step4 = state.companyCreation.formData.configuration ?? {};
  return Boolean(step4.authenticationMethod && step4.passwordPolicy != null && step4.sessionTimeoutMinutes != null);
};

export const selectProgressPercent = (state) => {
  const { currentStep } = state.companyCreation;
  return Math.round((currentStep / STEPS.length) * 100);
};

export const selectStepStatus = (state, stepId) => {
  const { currentStep, completedSteps } = state.companyCreation;
  if (completedSteps.includes(stepId)) return 'completed';
  if (stepId === currentStep) return 'active';
  return 'inactive';
};

export const selectAllStepStatuses = (state) => {
  return STEPS.map((step) => selectStepStatus(state, step.id));
};

export default companyCreationSlice.reducer;
