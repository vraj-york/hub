import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMockCompanyConfig } from '../../data/mockCompanyConfig';

const basicInfoFields = [
  'parentCorporationLegalName',
  'parentName',
  'ownershipType',
  'companyLegalName',
  'dbaTradeName',
  'websiteUrl',
  'companyType',
  'officeType',
  'regionDataResidency',
  'region',
  'industry',
  'companyPhoneNo',
  'primaryLanguage',
  'companyAddress',
  'addressLine',
  'stateProvince',
  'city',
  'country',
  'zipPostalCode',
];

const initialCompanyEditFormData = {
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

const initialState = {
  currentCompany: null,
  loading: false,
  error: null,
  isSaving: false,
  activeTab: 'basic-info',
  companyToDeleteId: null,
  companyToDeleteName: null,
  isDeletingCompany: false,
  deleteCompanyError: null,
  companyBeingEditedId: null,
  companyEditFormData: { ...initialCompanyEditFormData },
  companyEditSaveStatus: 'idle',
  companyEditSaveError: null,
};

const keyContactFields = [
  'primaryCompanyAdminId',
  'secondaryCompanyAdminId',
  'executiveSponsorId',
  'hrPeopleOpsContactId',
  'itSecurityContactId',
];

const planAndSeatsFields = [
  'planType',
  'trialLength',
  'trialEndDate',
  'trialSeats',
  'autoExpireTrial',
  'planId',
  'totalSeats',
  'billingCycleId',
  'paymentType',
  'billingCurrencyId',
];

const achDetailFields = [
  'accountHolderName',
  'bankName',
  'accountNumber',
  'accountType',
  'paymentDirection',
  'routingNumber',
];

export const deleteCompanyRequest = createAsyncThunk(
  'companyConfig/deleteCompanyRequest',
  async (companyId, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (!companyId) return rejectWithValue('Invalid company ID');
    return { companyId };
  }
);

/** Map currentCompany (from getMockCompanyConfig) to Edit Company modal form shape */
function companyToEditFormData(company) {
  if (!company) return { ...initialCompanyEditFormData };
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

export const fetchCompanyForEditModal = createAsyncThunk(
  'companyConfig/fetchCompanyForEditModal',
  async (companyId, { rejectWithValue }) => {
    if (!companyId) return rejectWithValue('Company ID required');
    const company = getMockCompanyConfig(companyId);
    return { company, formData: companyToEditFormData(company) };
  }
);

export const updateCompanyBasicAndAccessInfoRequest = createAsyncThunk(
  'companyConfig/updateCompanyBasicAndAccessInfoRequest',
  async ({ companyId, formData }, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!companyId) return rejectWithValue('Company ID required');
    return { companyId, formData };
  }
);

const companyConfigSlice = createSlice({
  name: 'companyConfig',
  initialState,
  reducers: {
    setCurrentCompany: (state, action) => {
      state.currentCompany = action.payload;
      state.error = null;
    },
    setCompanyConfigLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCompanyConfigError: (state, action) => {
      state.error = action.payload;
    },
    setCompanyConfigSaving: (state, action) => {
      state.isSaving = action.payload;
    },
    setCompanyConfigActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    updateCompanyConfigField: (state, action) => {
      const { field, value } = action.payload;
      if (state.currentCompany?.configuration) {
        state.currentCompany.configuration[field] = value;
      }
    },
    setCompanyConfigLogoFile: (state, action) => {
      if (state.currentCompany?.configuration) {
        state.currentCompany.configuration.logoFile = action.payload;
      }
    },
    updateCompanyKeyContactField: (state, action) => {
      const { field, value } = action.payload;
      if (state.currentCompany && keyContactFields.includes(field)) {
        state.currentCompany[field] = value || null;
      }
    },
    setCompanyRosterFile: (state, action) => {
      if (state.currentCompany) {
        state.currentCompany.rosterFile = action.payload;
      }
    },
    updateCompanyPlanAndSeatsField: (state, action) => {
      const { field, value } = action.payload;
      if (state.currentCompany && planAndSeatsFields.includes(field)) {
        state.currentCompany[field] = value;
      }
    },
    updateCompanyAchDetailsField: (state, action) => {
      const { field, value } = action.payload;
      if (state.currentCompany?.achDetails && achDetailFields.includes(field)) {
        state.currentCompany.achDetails[field] = value ?? '';
      }
    },
    resetCompanyPlanAndSeatsForm: (state) => {
      if (state.currentCompany && state.currentCompany._initialPlanAndSeats) {
        const init = state.currentCompany._initialPlanAndSeats;
        state.currentCompany.planType = init.planType;
        state.currentCompany.trialLength = init.trialLength;
        state.currentCompany.trialEndDate = init.trialEndDate;
        state.currentCompany.trialSeats = init.trialSeats;
        state.currentCompany.autoExpireTrial = init.autoExpireTrial;
        state.currentCompany.planId = init.planId;
        state.currentCompany.totalSeats = init.totalSeats;
        state.currentCompany.billingCycleId = init.billingCycleId;
        state.currentCompany.paymentType = init.paymentType;
        state.currentCompany.billingCurrencyId = init.billingCurrencyId;
        if (init.achDetails) state.currentCompany.achDetails = { ...init.achDetails };
      }
    },
    updateCompanyBasicInfoField: (state, action) => {
      const { field, value } = action.payload;
      if (state.currentCompany && basicInfoFields.includes(field)) {
        state.currentCompany[field] = value ?? '';
      }
    },
    resetCompanyBasicInfoForm: (state) => {
      if (state.currentCompany && state.currentCompany._initialBasicInfo) {
        const init = state.currentCompany._initialBasicInfo;
        basicInfoFields.forEach((f) => {
          state.currentCompany[f] = init[f] ?? '';
        });
      }
    },
    clearCurrentCompany: (state) => {
      state.currentCompany = null;
      state.error = null;
    },
    setCompanyToDelete: (state, action) => {
      const { id, name } = action.payload;
      state.companyToDeleteId = id ?? null;
      state.companyToDeleteName = name ?? null;
      state.deleteCompanyError = null;
    },
    clearCompanyToDelete: (state) => {
      state.companyToDeleteId = null;
      state.companyToDeleteName = null;
      state.deleteCompanyError = null;
    },
    setIsDeletingCompany: (state, action) => {
      state.isDeletingCompany = action.payload;
    },
    setDeleteCompanyError: (state, action) => {
      state.deleteCompanyError = action.payload;
    },
    setCompanyBeingEditedId: (state, action) => {
      state.companyBeingEditedId = action.payload;
    },
    setCompanyEditFormData: (state, action) => {
      state.companyEditFormData = action.payload ?? { ...initialCompanyEditFormData };
    },
    setCompanyEditSaveStatus: (state, action) => {
      state.companyEditSaveStatus = action.payload;
    },
    setCompanyEditSaveError: (state, action) => {
      state.companyEditSaveError = action.payload;
    },
    resetCompanyEditFormState: (state) => {
      state.companyBeingEditedId = null;
      state.companyEditFormData = { ...initialCompanyEditFormData };
      state.companyEditSaveStatus = 'idle';
      state.companyEditSaveError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCompanyRequest.pending, (state) => {
        state.isDeletingCompany = true;
        state.deleteCompanyError = null;
      })
      .addCase(deleteCompanyRequest.fulfilled, (state) => {
        state.isDeletingCompany = false;
        state.companyToDeleteId = null;
        state.companyToDeleteName = null;
        state.deleteCompanyError = null;
      })
      .addCase(deleteCompanyRequest.rejected, (state, action) => {
        state.isDeletingCompany = false;
        state.deleteCompanyError = action.error?.message ?? 'Failed to delete company';
      })
      .addCase(fetchCompanyForEditModal.fulfilled, (state, action) => {
        const { formData } = action.payload;
        state.companyEditFormData = formData ?? { ...initialCompanyEditFormData };
      })
      .addCase(updateCompanyBasicAndAccessInfoRequest.pending, (state) => {
        state.companyEditSaveStatus = 'pending';
        state.companyEditSaveError = null;
      })
      .addCase(updateCompanyBasicAndAccessInfoRequest.fulfilled, (state, action) => {
        state.companyEditSaveStatus = 'success';
        state.companyEditSaveError = null;
        const { formData } = action.payload;
        if (state.currentCompany && formData) {
          state.currentCompany.companyLegalName = formData.companyLegalName ?? state.currentCompany.companyLegalName;
          state.currentCompany.companyType = formData.companyType ?? state.currentCompany.companyType;
          state.currentCompany.officeType = formData.officeType ?? state.currentCompany.officeType;
          state.currentCompany.regionDataResidency = formData.region ?? state.currentCompany.regionDataResidency;
          state.currentCompany.region = formData.region ?? state.currentCompany.region;
          state.currentCompany.industry = formData.industry ?? state.currentCompany.industry;
          state.currentCompany.stateProvince = formData.stateProvince ?? state.currentCompany.stateProvince;
          state.currentCompany.city = formData.city ?? state.currentCompany.city;
          state.currentCompany.zipPostalCode = formData.zipPostalCode ?? state.currentCompany.zipPostalCode;
          state.currentCompany.timeZone = formData.timeZone ?? state.currentCompany.timeZone;
          state.currentCompany.adminName = formData.adminName ?? state.currentCompany.adminName;
          state.currentCompany.companyAdminEmail = formData.companyAdminEmail ?? state.currentCompany.companyAdminEmail;
          state.currentCompany.numEmployees = formData.numberOfEmployees ?? state.currentCompany.numEmployees;
          state.currentCompany.securityPosture = formData.securityPosture ?? state.currentCompany.securityPosture;
        }
      })
      .addCase(updateCompanyBasicAndAccessInfoRequest.rejected, (state, action) => {
        state.companyEditSaveStatus = 'error';
        state.companyEditSaveError = action.error?.message ?? 'Failed to update company';
      });
  },
});

export const {
  setCurrentCompany,
  setCompanyConfigLoading,
  setCompanyConfigError,
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
  resetCompanyBasicInfoForm,
  clearCurrentCompany,
  setCompanyToDelete,
  clearCompanyToDelete,
  setIsDeletingCompany,
  setDeleteCompanyError,
  setCompanyBeingEditedId,
  setCompanyEditFormData,
  setCompanyEditSaveStatus,
  setCompanyEditSaveError,
  resetCompanyEditFormState,
} = companyConfigSlice.actions;

export const selectCurrentCompany = (state) => state.companyConfig.currentCompany;
export const selectCompanyConfig = (state) => state.companyConfig.currentCompany?.configuration ?? null;
export const selectCompanyConfigLoading = (state) => state.companyConfig.loading;
export const selectCompanyConfigSaving = (state) => state.companyConfig.isSaving;
export const selectCompanyConfigActiveTab = (state) => state.companyConfig.activeTab;
export const selectCompanyConfigError = (state) => state.companyConfig.error;
export const selectCompanyToDeleteId = (state) => state.companyConfig.companyToDeleteId;
export const selectCompanyToDeleteName = (state) => state.companyConfig.companyToDeleteName;
export const selectIsDeletingCompany = (state) => state.companyConfig.isDeletingCompany;
export const selectDeleteCompanyError = (state) => state.companyConfig.deleteCompanyError;
export const selectCompanyBeingEditedId = (state) => state.companyConfig.companyBeingEditedId;
export const selectCompanyEditFormData = (state) => state.companyConfig.companyEditFormData;
export const selectCompanyEditSaveStatus = (state) => state.companyConfig.companyEditSaveStatus;
export const selectCompanyEditSaveError = (state) => state.companyConfig.companyEditSaveError;

function validateCompanyEditFormData(d) {
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

export const selectCompanyEditFormValidation = (state) => {
  const formData = state.companyConfig.companyEditFormData;
  return validateCompanyEditFormData(formData);
};

export const selectIsCompanyEditFormValid = (state) => {
  const errors = selectCompanyEditFormValidation(state);
  return Object.keys(errors).length === 0;
};

export const selectCompanyKeyContactsFormData = (state) => {
  const c = state.companyConfig.currentCompany;
  if (!c) return null;
  return {
    primaryCompanyAdminId: c.primaryCompanyAdminId ?? null,
    secondaryCompanyAdminId: c.secondaryCompanyAdminId ?? null,
    executiveSponsorId: c.executiveSponsorId ?? null,
    hrPeopleOpsContactId: c.hrPeopleOpsContactId ?? null,
    itSecurityContactId: c.itSecurityContactId ?? null,
  };
};

export const selectCompanyRosterFile = (state) => state.companyConfig.currentCompany?.rosterFile ?? null;

export const selectCompanyPlanAndSeatsFormData = (state) => {
  const c = state.companyConfig.currentCompany;
  if (!c) return null;
  return {
    planType: c.planType ?? 'trial',
    trialLength: c.trialLength ?? '',
    trialEndDate: c.trialEndDate ?? '',
    trialSeats: c.trialSeats ?? '',
    autoExpireTrial: c.autoExpireTrial !== false,
    planId: c.planId ?? '',
    totalSeats: c.totalSeats ?? '',
    billingCycleId: c.billingCycleId ?? '',
    paymentType: c.paymentType ?? 'ach',
    billingCurrencyId: c.billingCurrencyId ?? '',
  };
};

export const selectCompanyAchDetailsFormData = (state) => {
  const c = state.companyConfig.currentCompany;
  if (!c?.achDetails) return {};
  return { ...c.achDetails };
};

export const selectCompanyPlanAndSeatsValidationStatus = (state) => {
  const c = state.companyConfig.currentCompany;
  if (!c) return { valid: false, errors: {} };
  const errors = {};
  if (!c.planId) errors.planId = 'Plan is required';
  if (!c.billingCycleId) errors.billingCycleId = 'Billing cycle is required';
  if (!c.paymentType) errors.paymentType = 'Payment type is required';
  if (c.planType === 'trial' && !c.trialLength) errors.trialLength = 'Trial length is required';
  if (c.paymentType === 'ach' && c.achDetails) {
    if (!c.achDetails.accountHolderName) errors.accountHolderName = 'Account holder name is required';
    if (!c.achDetails.bankName) errors.bankName = 'Bank name is required';
    if (!c.achDetails.accountNumber) errors.accountNumber = 'Account number is required';
    if (!c.achDetails.accountType) errors.accountType = 'Account type is required';
    if (!c.achDetails.paymentDirection) errors.paymentDirection = 'Payment direction is required';
    if (!c.achDetails.routingNumber) errors.routingNumber = 'Routing number is required';
  }
  const valid = Object.keys(errors).length === 0;
  return { valid, errors };
};

export const selectIsCompanyPlanAndSeatsFormValid = (state) => {
  return selectCompanyPlanAndSeatsValidationStatus(state).valid;
};

export const selectCompanyBasicInfoFormData = (state) => {
  const c = state.companyConfig.currentCompany;
  if (!c) return null;
  const regionVal = c.regionDataResidency ?? c.region ?? '';
  return {
    parentCorporationLegalName: c.parentCorporationLegalName ?? c.parentName ?? '',
    parentName: c.parentName ?? c.parentCorporationLegalName ?? '',
    ownershipType: c.ownershipType ?? '',
    companyLegalName: c.companyLegalName ?? '',
    dbaTradeName: c.dbaTradeName ?? '',
    websiteUrl: c.websiteUrl ?? '',
    companyType: c.companyType ?? '',
    officeType: c.officeType ?? '',
    regionDataResidency: regionVal,
    region: c.region ?? regionVal,
    industry: c.industry ?? '',
    companyPhoneNo: c.companyPhoneNo ?? '',
    primaryLanguage: c.primaryLanguage ?? '',
    companyAddress: c.companyAddress ?? '',
    addressLine: c.addressLine ?? '',
    stateProvince: c.stateProvince ?? '',
    city: c.city ?? '',
    country: c.country ?? '',
    zipPostalCode: c.zipPostalCode ?? '',
  };
};

export const selectCompanyBasicInfoValidationStatus = (state) => {
  const c = state.companyConfig.currentCompany;
  if (!c) return { valid: false, errors: {} };
  const errors = {};
  if (!c.companyLegalName?.trim()) errors.companyLegalName = 'Company Legal Name is required';
  if (!c.dbaTradeName?.trim()) errors.dbaTradeName = 'DBA/ Trade Name is required';
  if (!c.websiteUrl?.trim()) errors.websiteUrl = 'Website URL is required';
  if (!c.companyType) errors.companyType = 'Company Type is required';
  if (!c.officeType) errors.officeType = 'Office Type is required';
  if (!c.region) errors.region = 'Region is required';
  if (!c.industry) errors.industry = 'Industry is required';
  if (!c.companyPhoneNo?.trim()) errors.companyPhoneNo = 'Company Phone No. is required';
  if (!c.primaryLanguage) errors.primaryLanguage = 'Primary Language is required';
  if (!c.ownershipType) errors.ownershipType = 'Ownership Type is required';
  if (!c.addressLine?.trim()) errors.addressLine = 'Address Line is required';
  if (!c.stateProvince) errors.stateProvince = 'State/ Province is required';
  if (!c.city) errors.city = 'City is required';
  if (!c.country) errors.country = 'Country is required';
  if (!c.zipPostalCode?.trim()) errors.zipPostalCode = 'ZIP/ Postal Code is required';
  const valid = Object.keys(errors).length === 0;
  return { valid, errors };
};

export const selectIsCompanyBasicInfoFormValid = (state) => {
  return selectCompanyBasicInfoValidationStatus(state).valid;
};

export default companyConfigSlice.reducer;
