import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockRegions } from '../../data/mockRegions';
import { mockIndustries } from '../../data/mockIndustries';
import { mockStates } from '../../data/mockStates';
import { mockCities } from '../../data/mockCities';
import { mockCorporationCountries } from '../../data/mockCorporationCountries';
import { mockTimeZones } from '../../data/mockTimeZones';
import { mockCompanyTypes } from '../../data/mockCompanyTypes';
import { mockOfficeTypes } from '../../data/mockOfficeTypes';

export const CORPORATION_STEPS = [
  { id: 1, title: 'Basic Info.', subtitle: 'Corporation-based details', path: 'basic-info' },
  { id: 2, title: 'Company Setup', subtitle: 'Company assignment', path: 'company-setup' },
  { id: 3, title: 'Branding & Domains', subtitle: 'Identity configuration', path: 'branding' },
  { id: 4, title: 'Governance & Permissions', subtitle: 'Structure & access', path: 'key-contacts' },
  { id: 5, title: 'Confirmation', subtitle: 'Review all details', path: 'confirmation' },
];

export const QUICK_SETUP_STEPS = [
  { id: 1, title: 'Basic Info.', subtitle: 'Organization details', path: 'basic-info' },
  { id: 2, title: 'Company Info.', subtitle: 'Set up first operating unit', path: 'company-info' },
  { id: 3, title: 'Confirmation', subtitle: 'Review & confirm', path: 'confirmation' },
];

const initialStep1 = {
  corporationLegalName: '',
  dbaName: '',
  regionDataResidency: '',
  industry: '',
  corporatePhoneNo: '',
  websiteUrl: '',
  addressLine: '',
  stateProvince: '',
  city: '',
  country: '',
  zipPostalCode: '',
  timeZone: '',
  executiveSponsorName: '',
  executiveSponsorRole: '',
  executiveSponsorEmail: '',
  executiveSponsorWorkPhoneNo: '',
  executiveSponsorCellPhoneNo: '',
};

// Company shape for Step 2: id, name, type ('Operating Company' | 'Subsidiary' | 'Franchise'), location
const defaultStep2Companies = [
  { id: '1', name: 'TechVentures Digital', type: 'Operating Company', location: 'North America' },
  { id: '2', name: 'Innovation Labs', type: 'Subsidiary', location: 'Europe' },
  { id: '3', name: 'Marit Inc.', type: 'Franchise', location: 'United Kingdom' },
];

const initialStep2 = {
  companies: [...defaultStep2Companies],
  isStep2Valid: true, // derived: at least one company
};

const initialNewCompanyFormData = {
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

const initialNewCompanyFormValidation = {
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

const initialStep3 = {
  logoFile: null,
};

const initialStep4 = {
  primaryCorporateAdminName: '',
  primaryCorporateAdminRole: '',
  primaryCorporateAdminEmail: '',
  primaryCorporateAdminWorkPhone: '',
  primaryCorporateAdminCellPhone: '',
};

const initialQuickSetupStep2 = {
  companyLegalName: '',
  companyType: '',
  officeType: '',
  region: '',
  industry: '',
  stateProvince: '',
  city: '',
  zipPostalCode: '',
  adminName: '',
  companyAdminEmail: '',
  numberOfEmployees: '',
  securityPosture: 'Standard',
};

const initialState = {
  flowType: 'quick', // 'quick' | 'advance'
  currentStep: 1,
  completedSteps: [],
  quickSetupStep2: { ...initialQuickSetupStep2 },
  formData: {
    step1: { ...initialStep1 },
    step2: { ...initialStep2 },
    step3: { ...initialStep3 },
    step4: { ...initialStep4 },
    step5: {},
  },
  stepErrors: { step1: {}, step3: {}, step4: {}, quickSetupStep2: {} },
  step4Validation: { isValid: false, errors: {} },
  submissionStatus: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  isAddCompanyModalOpen: false,
  newCompanyFormData: { ...initialNewCompanyFormData },
  newCompanyFormValidation: { ...initialNewCompanyFormValidation },
};

function isValidEmail(s) {
  if (!s || typeof s !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(s.trim());
}

function findLabel(options, value) {
  if (value == null || value === '') return '';
  const opt = (options ?? []).find((o) => o.value === value || o.label === value);
  return opt ? opt.label : String(value);
}

export const submitCorporationCreation = createAsyncThunk(
  'corporationCreation/submitCorporation',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { formData } = state.corporationCreation;
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In real app: POST /corporations with aggregated formData
    if (formData?.step1?.corporationLegalName) {
      return { success: true };
    }
    return rejectWithValue({ message: 'Submission failed' });
  }
);

export const submitQuickSetupCorporation = createAsyncThunk(
  'corporationCreation/submitQuickSetup',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { formData, quickSetupStep2 } = state.corporationCreation;
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (formData?.step1?.corporationLegalName && quickSetupStep2?.companyLegalName) {
      return { success: true };
    }
    return rejectWithValue({ message: 'Quick setup submission failed' });
  }
);

const corporationCreationSlice = createSlice({
  name: 'corporationCreation',
  initialState,
  reducers: {
    setCorporationFlowType(state, action) {
      const flow = action.payload;
      if (flow === 'quick' || flow === 'advance') {
        state.flowType = flow;
        state.currentStep = 1;
        state.completedSteps = [];
      }
    },
    updateCorporationField(state, action) {
      const { step, field, value } = action.payload;
      if (state.formData[step] && field in state.formData[step]) {
        state.formData[step][field] = value;
      }
    },
    setCurrentCorporationStep(state, action) {
      const nextStep = action.payload;
      if (nextStep > state.currentStep && !state.completedSteps.includes(state.currentStep)) {
        state.completedSteps.push(state.currentStep);
      }
      state.currentStep = nextStep;
    },
    setCorporationStep3LogoFile(state, action) {
      if (state.formData.step3) {
        state.formData.step3.logoFile = action.payload;
      }
    },
    updateCorporationStep2Field(state, action) {
      const { field, value, companyId } = action.payload;
      if (field === 'companies' && Array.isArray(value)) {
        state.formData.step2.companies = value;
        return;
      }
      if (companyId && state.formData.step2?.companies) {
        const company = state.formData.step2.companies.find((c) => c.id === companyId);
        if (company && field in company) company[field] = value;
      }
    },
    updateCorporationStep4Field(state, action) {
      const { field, value } = action.payload;
      if (state.formData.step4 && field in state.formData.step4) {
        state.formData.step4[field] = value;
      }
    },
    setCorporationStep4ValidationStatus(state, action) {
      const { isValid, errors } = action.payload;
      state.step4Validation.isValid = isValid;
      state.step4Validation.errors = errors ?? {};
    },
    validateCorporationStep1(state) {
      const s1 = state.formData.step1 ?? {};
      const errors = {};
      if (!(s1.corporationLegalName ?? '').trim()) errors.corporationLegalName = 'Required';
      if (!(s1.regionDataResidency ?? '')) errors.regionDataResidency = 'Required';
      if (!(s1.industry ?? '')) errors.industry = 'Required';
      if (!(s1.corporatePhoneNo ?? '').trim()) errors.corporatePhoneNo = 'Required';
      if (!(s1.websiteUrl ?? '').trim()) errors.websiteUrl = 'Required';
      if (!(s1.addressLine ?? '').trim()) errors.addressLine = 'Required';
      if (!(s1.stateProvince ?? '')) errors.stateProvince = 'Required';
      if (!(s1.city ?? '')) errors.city = 'Required';
      if (!(s1.country ?? '')) errors.country = 'Required';
      if (!(s1.timeZone ?? '')) errors.timeZone = 'Required';
      if (!(s1.executiveSponsorName ?? '').trim()) errors.executiveSponsorName = 'Required';
      if (!(s1.executiveSponsorRole ?? '').trim()) errors.executiveSponsorRole = 'Required';
      if (!(s1.executiveSponsorEmail ?? '').trim()) errors.executiveSponsorEmail = 'Required';
      else if (!isValidEmail(s1.executiveSponsorEmail)) errors.executiveSponsorEmail = 'Invalid email';
      if (!(s1.executiveSponsorWorkPhoneNo ?? '').trim()) errors.executiveSponsorWorkPhoneNo = 'Required';
      state.stepErrors.step1 = errors;
    },
    validateCorporationStep4(state) {
      const s4 = state.formData.step4 ?? {};
      const errors = {};
      if (!(s4.primaryCorporateAdminName ?? '').trim()) errors.primaryCorporateAdminName = 'Required';
      if (!(s4.primaryCorporateAdminRole ?? '').trim()) errors.primaryCorporateAdminRole = 'Required';
      if (!(s4.primaryCorporateAdminEmail ?? '').trim()) errors.primaryCorporateAdminEmail = 'Required';
      else if (!isValidEmail(s4.primaryCorporateAdminEmail)) errors.primaryCorporateAdminEmail = 'Invalid email';
      if (!(s4.primaryCorporateAdminWorkPhone ?? '').trim()) errors.primaryCorporateAdminWorkPhone = 'Required';
      state.stepErrors.step4 = errors;
      state.step4Validation.errors = errors;
      state.step4Validation.isValid = Object.keys(errors).length === 0;
    },
    updateQuickSetupStep2Field(state, action) {
      const { field, value } = action.payload;
      if (state.quickSetupStep2 && field in state.quickSetupStep2) {
        state.quickSetupStep2[field] = value;
      }
    },
    validateQuickSetupStep2(state) {
      const d = state.quickSetupStep2 ?? {};
      const errors = {};
      if (!(d.companyLegalName ?? '').trim()) errors.companyLegalName = 'Required';
      if (!(d.companyType ?? '')) errors.companyType = 'Required';
      if (!(d.officeType ?? '')) errors.officeType = 'Required';
      if (!(d.stateProvince ?? '')) errors.stateProvince = 'Required';
      if (!(d.city ?? '')) errors.city = 'Required';
      if (!(d.zipPostalCode ?? '').toString().trim()) errors.zipPostalCode = 'Required';
      if (!(d.adminName ?? '').trim()) errors.adminName = 'Required';
      if (!(d.companyAdminEmail ?? '').trim()) errors.companyAdminEmail = 'Required';
      else if (!isValidEmail(d.companyAdminEmail)) errors.companyAdminEmail = 'Invalid email';
      const numEmp = (d.numberOfEmployees ?? '').toString().trim();
      if (!numEmp) errors.numberOfEmployees = 'Required';
      else if (isNaN(Number(numEmp)) || Number(numEmp) < 0) errors.numberOfEmployees = 'Invalid number';
      if (!state.stepErrors.quickSetupStep2) state.stepErrors.quickSetupStep2 = {};
      state.stepErrors.quickSetupStep2 = errors;
    },
    resetCorporationCreation() {
      return {
        ...initialState,
        flowType: initialState.flowType,
        quickSetupStep2: { ...initialQuickSetupStep2 },
        formData: {
          step1: { ...initialStep1 },
          step2: { ...initialStep2 },
          step3: { ...initialStep3 },
          step4: { ...initialStep4 },
          step5: {},
        },
      };
    },
    openAddCompanyModal(state) {
      state.isAddCompanyModalOpen = true;
      state.newCompanyFormData = { ...initialNewCompanyFormData };
      state.newCompanyFormValidation = { ...initialNewCompanyFormValidation };
    },
    closeAddCompanyModal(state) {
      state.isAddCompanyModalOpen = false;
      state.newCompanyFormData = { ...initialNewCompanyFormData };
      state.newCompanyFormValidation = { ...initialNewCompanyFormValidation };
    },
    updateNewCompanyFormField(state, action) {
      const { field, value } = action.payload;
      if (field in state.newCompanyFormData) {
        state.newCompanyFormData[field] = value;
      }
    },
    validateNewCompanyForm(state) {
      const d = state.newCompanyFormData;
      const errors = {};
      if (!(d.companyLegalName ?? '').trim()) errors.companyLegalName = 'Required';
      if (!(d.companyType ?? '')) errors.companyType = 'Required';
      if (!(d.officeType ?? '')) errors.officeType = 'Required';
      if (!(d.stateProvince ?? '')) errors.stateProvince = 'Required';
      if (!(d.city ?? '')) errors.city = 'Required';
      if (!(d.zipPostalCode ?? '').toString().trim()) errors.zipPostalCode = 'Required';
      if (!(d.adminName ?? '').trim()) errors.adminName = 'Required';
      if (!(d.companyAdminEmail ?? '').trim()) errors.companyAdminEmail = 'Required';
      else if (!isValidEmail(d.companyAdminEmail)) errors.companyAdminEmail = 'Invalid email';
      const numEmp = (d.numberOfEmployees ?? '').toString().trim();
      if (!numEmp) errors.numberOfEmployees = 'Required';
      else if (isNaN(Number(numEmp)) || Number(numEmp) < 0) errors.numberOfEmployees = 'Invalid number';
      state.newCompanyFormValidation = errors;
    },
    addCompanyToCorporationStep2(state, action) {
      const companyData = action.payload;
      const d = state.newCompanyFormData;
      const typeMap = { operating: 'Operating Company', subsidiary: 'Subsidiary', franchise: 'Franchise', holding: 'Operating Company', other: 'Operating Company' };
      const companyTypeValue = companyData.companyType ?? d.companyType ?? 'operating';
      const typeLabel = typeMap[companyTypeValue] ?? 'Operating Company';
      const regionLabel = findLabel(mockRegions, companyData.region ?? d.region ?? 'na') || 'North America';
      const toAdd = {
        id: `company-${Date.now()}`,
        name: (companyData.companyLegalName ?? d.companyLegalName ?? '').trim() || 'New Company',
        type: typeLabel,
        location: regionLabel,
        timeZone: companyData.timeZone ?? d.timeZone ?? '',
      };
      if (!state.formData.step2.companies) state.formData.step2.companies = [];
      state.formData.step2.companies.push(toAdd);
      state.formData.step2.isStep2Valid = state.formData.step2.companies.length > 0;
      state.isAddCompanyModalOpen = false;
      state.newCompanyFormData = { ...initialNewCompanyFormData };
      state.newCompanyFormValidation = { ...initialNewCompanyFormValidation };
    },
    deleteCompanyFromCorporation(state, action) {
      const id = action.payload;
      if (state.formData.step2?.companies) {
        state.formData.step2.companies = state.formData.step2.companies.filter((c) => c.id !== id);
        state.formData.step2.isStep2Valid = (state.formData.step2.companies?.length ?? 0) > 0;
      }
    },
    updateCompanyInCorporation(state, action) {
      const { id, ...updates } = action.payload;
      const list = state.formData.step2?.companies ?? [];
      const idx = list.findIndex((c) => c.id === id);
      if (idx !== -1 && (updates.name != null || updates.type != null || updates.location != null)) {
        state.formData.step2.companies[idx] = { ...list[idx], ...updates };
      }
    },
    resetCorporationCreationStep2(state) {
      state.formData.step2 = { ...initialStep2 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCorporationCreation.pending, (state) => {
        state.submissionStatus = 'loading';
      })
      .addCase(submitCorporationCreation.fulfilled, (state) => {
        state.submissionStatus = 'success';
      })
      .addCase(submitCorporationCreation.rejected, (state) => {
        state.submissionStatus = 'error';
      })
      .addCase(submitQuickSetupCorporation.pending, (state) => {
        state.submissionStatus = 'loading';
      })
      .addCase(submitQuickSetupCorporation.fulfilled, (state) => {
        state.submissionStatus = 'success';
      })
      .addCase(submitQuickSetupCorporation.rejected, (state) => {
        state.submissionStatus = 'error';
      });
  },
});

export const {
  setCorporationFlowType,
  updateCorporationField,
  setCurrentCorporationStep,
  validateCorporationStep1,
  setCorporationStep3LogoFile,
  updateCorporationStep2Field,
  updateCorporationStep4Field,
  setCorporationStep4ValidationStatus,
  validateCorporationStep4,
  resetCorporationCreation,
  updateQuickSetupStep2Field,
  validateQuickSetupStep2,
  openAddCompanyModal,
  closeAddCompanyModal,
  updateNewCompanyFormField,
  validateNewCompanyForm,
  addCompanyToCorporationStep2,
  deleteCompanyFromCorporation,
  updateCompanyInCorporation,
  resetCorporationCreationStep2,
} = corporationCreationSlice.actions;

export const selectCorporationFlowType = (state) => state.corporationCreation.flowType ?? 'quick';
export const selectCurrentCorporationStep = (state) => state.corporationCreation.currentStep;
export const selectStepsConfig = (state) =>
  (state.corporationCreation.flowType === 'advance' ? CORPORATION_STEPS : QUICK_SETUP_STEPS);
export const selectCorporationStep1FormData = (state) => state.corporationCreation.formData.step1 ?? {};
export const selectCorporationStep1Errors = (state) => state.corporationCreation.stepErrors.step1 ?? {};
export const selectCorporationStep1ValidationStatus = (state) => {
  const s1 = state.corporationCreation.formData.step1 ?? {};
  if (!(s1.corporationLegalName ?? '').trim()) return false;
  if (!(s1.regionDataResidency ?? '')) return false;
  if (!(s1.industry ?? '')) return false;
  if (!(s1.corporatePhoneNo ?? '').trim()) return false;
  if (!(s1.websiteUrl ?? '').trim()) return false;
  if (!(s1.addressLine ?? '').trim()) return false;
  if (!(s1.stateProvince ?? '')) return false;
  if (!(s1.city ?? '')) return false;
  if (!(s1.country ?? '')) return false;
  if (!(s1.timeZone ?? '')) return false;
  if (!(s1.executiveSponsorName ?? '').trim()) return false;
  if (!(s1.executiveSponsorRole ?? '').trim()) return false;
  if (!(s1.executiveSponsorEmail ?? '').trim()) return false;
  if (!isValidEmail(s1.executiveSponsorEmail)) return false;
  if (!(s1.executiveSponsorWorkPhoneNo ?? '').trim()) return false;
  return true;
};
export const selectCorporationCompletedSteps = (state) => state.corporationCreation.completedSteps ?? [];
export const selectCorporationStep2FormData = (state) => state.corporationCreation.formData.step2 ?? { companies: [], isStep2Valid: false };
export const selectCorporationStep2Companies = (state) => state.corporationCreation.formData.step2?.companies ?? [];
export const selectCorporationStep2ValidationStatus = (state) => (state.corporationCreation.formData.step2?.companies?.length ?? 0) > 0;
export const selectIsAddCompanyModalOpen = (state) => state.corporationCreation.isAddCompanyModalOpen ?? false;
export const selectNewCompanyFormData = (state) => state.corporationCreation.newCompanyFormData ?? { ...initialNewCompanyFormData };
export const selectNewCompanyFormValidation = (state) => state.corporationCreation.newCompanyFormValidation ?? {};
export const selectIsNewCompanyFormValid = (state) => {
  const d = state.corporationCreation.newCompanyFormData ?? {};
  if (!(d.companyLegalName ?? '').trim()) return false;
  if (!(d.companyType ?? '')) return false;
  if (!(d.officeType ?? '')) return false;
  if (!(d.stateProvince ?? '')) return false;
  if (!(d.city ?? '')) return false;
  if (!(d.zipPostalCode ?? '').toString().trim()) return false;
  if (!(d.adminName ?? '').trim()) return false;
  if (!(d.companyAdminEmail ?? '').trim()) return false;
  if (!isValidEmail(d.companyAdminEmail)) return false;
  const numEmp = (d.numberOfEmployees ?? '').toString().trim();
  if (!numEmp) return false;
  if (isNaN(Number(numEmp)) || Number(numEmp) < 0) return false;
  return true;
};
export const selectCorporationStep3FormData = (state) => state.corporationCreation.formData.step3 ?? {};
export const selectCorporationStep3ValidationStatus = (state) => true; // Logo optional for Step 3
export const selectSubmissionLoading = (state) => state.corporationCreation.submissionStatus === 'loading';

export const selectCorporationStep4FormData = (state) => state.corporationCreation.formData.step4 ?? {};
export const selectCorporationStep4ValidationStatus = (state) => state.corporationCreation.step4Validation?.isValid ?? false;
export const selectCorporationStep4Errors = (state) => state.corporationCreation.step4Validation?.errors ?? state.corporationCreation.stepErrors?.step4 ?? {};

export const selectCorporationStep4IsValidDerived = (state) => {
  const s4 = state.corporationCreation.formData.step4 ?? {};
  if (!(s4.primaryCorporateAdminName ?? '').trim()) return false;
  if (!(s4.primaryCorporateAdminRole ?? '').trim()) return false;
  if (!(s4.primaryCorporateAdminEmail ?? '').trim()) return false;
  if (!isValidEmail(s4.primaryCorporateAdminEmail)) return false;
  if (!(s4.primaryCorporateAdminWorkPhone ?? '').trim()) return false;
  return true;
};

export const selectAllCorporationStepStatuses = (state) => {
  const { currentStep, completedSteps, flowType } = state.corporationCreation;
  const steps = flowType === 'advance' ? CORPORATION_STEPS : QUICK_SETUP_STEPS;
  return steps.map((step) => {
    if (completedSteps.includes(step.id)) return 'completed';
    if (step.id === currentStep) return 'active';
    return 'inactive';
  });
};

export const selectQuickSetupStep2FormData = (state) => state.corporationCreation.quickSetupStep2 ?? { ...initialQuickSetupStep2 };
export const selectQuickSetupStep2Errors = (state) => state.corporationCreation.stepErrors?.quickSetupStep2 ?? {};
export const selectIsQuickSetupStep2Valid = (state) => {
  const d = state.corporationCreation.quickSetupStep2 ?? {};
  if (!(d.companyLegalName ?? '').trim()) return false;
  if (!(d.companyType ?? '')) return false;
  if (!(d.officeType ?? '')) return false;
  if (!(d.stateProvince ?? '')) return false;
  if (!(d.city ?? '')) return false;
  if (!(d.zipPostalCode ?? '').toString().trim()) return false;
  if (!(d.adminName ?? '').trim()) return false;
  if (!(d.companyAdminEmail ?? '').trim()) return false;
  if (!isValidEmail(d.companyAdminEmail)) return false;
  const numEmp = (d.numberOfEmployees ?? '').toString().trim();
  if (!numEmp) return false;
  if (isNaN(Number(numEmp)) || Number(numEmp) < 0) return false;
  return true;
};

export const selectCorporationConfirmationData = (state) => {
  const { formData, quickSetupStep2, flowType } = state.corporationCreation;
  const s1 = formData.step1 ?? {};
  const s2 = formData.step2 ?? { companies: [] };
  const s3 = formData.step3 ?? {};
  const s4 = formData.step4 ?? {};
  const addressParts = [
    (s1.addressLine ?? '').trim(),
    findLabel(mockStates, s1.stateProvince),
    findLabel(mockCities, s1.city),
    findLabel(mockCorporationCountries, s1.country),
    (s1.zipPostalCode ?? '').trim(),
  ].filter(Boolean);
  const address = addressParts.length ? addressParts.join(', ') : 'N/A';
  return {
    corporation: {
      legalName: (s1.corporationLegalName ?? '').trim() || 'N/A',
      dbaName: (s1.dbaName ?? '').trim() || 'N/A',
      region: findLabel(mockRegions, s1.regionDataResidency) || 'N/A',
      industry: findLabel(mockIndustries, s1.industry) || 'N/A',
      phone: (s1.corporatePhoneNo ?? '').trim() || 'N/A',
      website: (s1.websiteUrl ?? '').trim() || 'N/A',
      address,
      timeZone: findLabel(mockTimeZones, s1.timeZone) || 'N/A',
    },
    executiveSponsor: {
      name: (s1.executiveSponsorName ?? '').trim() || 'N/A',
      role: (s1.executiveSponsorRole ?? '').trim() || 'N/A',
      email: (s1.executiveSponsorEmail ?? '').trim() || 'N/A',
      workPhone: (s1.executiveSponsorWorkPhoneNo ?? '').trim() || 'N/A',
      cellPhone: (s1.executiveSponsorCellPhoneNo ?? '').trim() || 'N/A',
    },
    companies:
      flowType === 'quick'
        ? (() => {
            const q = quickSetupStep2 ?? {};
            const name = (q.companyLegalName ?? '').trim() || 'N/A';
            const type = q.companyType ? findLabel(mockCompanyTypes, q.companyType) : 'N/A';
            const locationParts = [
              q.region ? findLabel(mockRegions, q.region) : '',
              q.stateProvince ? findLabel(mockStates, q.stateProvince) : '',
              q.city ? findLabel(mockCities, q.city) : '',
            ].filter(Boolean);
            const location = locationParts.length ? locationParts.join(', ') : 'N/A';
            return name !== 'N/A' ? [{ name, type, location }] : [];
          })()
        : (s2.companies ?? []).map((c) => {
            const name = c.companyLegalName ?? c.name ?? 'N/A';
            const type = c.companyType ? findLabel(mockCompanyTypes, c.companyType) : (c.type ?? 'N/A');
            let location = c.location;
            if (!location && (c.region || c.stateProvince || c.city)) {
              const parts = [
                c.region ? findLabel(mockRegions, c.region) : '',
                c.stateProvince ? findLabel(mockStates, c.stateProvince) : '',
                c.city ? findLabel(mockCities, c.city) : '',
              ].filter(Boolean);
              location = parts.length ? parts.join(', ') : 'N/A';
            }
            return { name, type, location: location ?? 'N/A' };
          }),
    branding: {
      logoFile: s3.logoFile ?? null,
    },
    keyContacts: {
      primaryAdminName: (s4.primaryCorporateAdminName ?? '').trim() || 'N/A',
      billingFinanceName: 'Billing/ Finance Contact',
      legalComplianceName: 'Legal/ Compliance Contact',
    },
    // Company Details (Quick Setup only): from quickSetupStep2 for Confirmation Step 3
    companyDetails:
      flowType === 'quick' && quickSetupStep2
        ? {
            companyLegalName: (quickSetupStep2.companyLegalName ?? '').trim() || 'N/A',
            companyType: quickSetupStep2.companyType ? findLabel(mockCompanyTypes, quickSetupStep2.companyType) : 'N/A',
            officeType: quickSetupStep2.officeType ? findLabel(mockOfficeTypes, quickSetupStep2.officeType) : 'N/A',
            stateProvince: quickSetupStep2.stateProvince ? findLabel(mockStates, quickSetupStep2.stateProvince) : 'N/A',
            city: quickSetupStep2.city ? findLabel(mockCities, quickSetupStep2.city) : 'N/A',
            zipPostalCode: (quickSetupStep2.zipPostalCode ?? '').trim() || 'N/A',
          }
        : {},
    // Admin User (Quick Setup only): from quickSetupStep2 for Confirmation Step 3
    adminUser:
      flowType === 'quick' && quickSetupStep2
        ? {
            adminName: (quickSetupStep2.adminName ?? '').trim() || 'N/A',
            companyAdminEmail: (quickSetupStep2.companyAdminEmail ?? '').trim() || 'N/A',
            numberOfEmployees: (quickSetupStep2.numberOfEmployees ?? '').toString().trim() || 'N/A',
            securityPosture: (quickSetupStep2.securityPosture ?? 'Standard').toString().trim() || 'Standard',
          }
        : undefined,
  };
};

export default corporationCreationSlice.reducer;
