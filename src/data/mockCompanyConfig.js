/**
 * Mock company profile and configuration for "Company Directory / Edit Details - Configuration" page.
 */

export const defaultCompanyConfig = {
  authenticationMethod: 'email_password',
  passwordPolicy: 'standard',
  sessionTimeout: 60,
  tfaRequirement: 'off',
  logoUrl: '/images/Logo 1-c24ca4a3.png',
  logoFile: null,
  defaultDashboard: 'Standard',
  dataExportPermission: false,
  userDataAnonymization: false,
};

const defaultPlanAndSeats = {
  planType: 'trial',
  trialLength: '14_days',
  trialEndDate: '01-20-2026',
  trialSeats: '25',
  autoExpireTrial: true,
  planId: '50_100',
  totalSeats: '100',
  billingCycleId: 'monthly',
  paymentType: 'ach',
  billingCurrencyId: 'usd',
  achDetails: {
    accountHolderName: 'Jacob Samuel Teach',
    bankName: 'U.S. BANK N.A.',
    accountNumber: '987654321',
    accountType: 'saving',
    paymentDirection: 'ach_credit',
    routingNumber: '021000322',
  },
};

/** Basic info fields for Company Profile - Basic Info. tab and Edit Company modal */
const defaultBasicInfo = {
  parentCorporationLegalName: 'Acme Corporation',
  parentName: 'Acme Corporation',
  ownershipType: 'wholly_owned',
  companyLegalName: 'Acme Inc.',
  dbaTradeName: 'Acme Co.',
  websiteUrl: 'www.acmecompany.com',
  companyType: 'operating',
  officeType: 'regional',
  regionDataResidency: 'na',
  region: 'na',
  industry: 'tech-saas',
  companyPhoneNo: '+1 (555) 449-4567',
  primaryLanguage: 'english_us',
  companyAddress: '123 Maple Street, Springfield, IL 62704, USA',
  addressLine: '123 Maple Street',
  stateProvince: 'il',
  city: 'springfield',
  country: 'us',
  zipPostalCode: '62704',
  timeZone: 'est',
  adminName: 'Martin Morgan',
  companyAdminEmail: 'martin_morgan@email.com',
  numEmployees: '50',
  numberOfEmployees: '50',
  securityPosture: 'Standard',
};

export const mockCompanyProfile = {
  id: 'company_001',
  name: 'New York HQ',
  statusBadges: [
    { label: 'Assigned', color: 'rgba(47, 143, 107, 1)' },
    { label: 'Enterprise', color: 'rgba(48, 95, 161, 1)' },
  ],
  ...defaultBasicInfo,
  configuration: { ...defaultCompanyConfig },
  primaryCompanyAdminId: 'ethan_carter',
  secondaryCompanyAdminId: 'sophia_martinez',
  executiveSponsorId: 'james_anderson',
  hrPeopleOpsContactId: 'lara_croft',
  itSecurityContactId: 'david_smith',
  rosterFile: null,
  ...defaultPlanAndSeats,
};

export function getMockCompanyConfig(companyId) {
  const planAndSeats = {
    ...defaultPlanAndSeats,
    achDetails: { ...defaultPlanAndSeats.achDetails },
  };
  const basicInfo = { ...defaultBasicInfo };
  return {
    ...mockCompanyProfile,
    id: companyId,
    name: mockCompanyProfile.name,
    statusBadges: mockCompanyProfile.statusBadges,
    ...basicInfo,
    configuration: { ...defaultCompanyConfig },
    primaryCompanyAdminId: mockCompanyProfile.primaryCompanyAdminId,
    secondaryCompanyAdminId: mockCompanyProfile.secondaryCompanyAdminId,
    executiveSponsorId: mockCompanyProfile.executiveSponsorId,
    hrPeopleOpsContactId: mockCompanyProfile.hrPeopleOpsContactId,
    itSecurityContactId: mockCompanyProfile.itSecurityContactId,
    rosterFile: mockCompanyProfile.rosterFile,
    planType: planAndSeats.planType,
    trialLength: planAndSeats.trialLength,
    trialEndDate: planAndSeats.trialEndDate,
    trialSeats: planAndSeats.trialSeats,
    autoExpireTrial: planAndSeats.autoExpireTrial,
    planId: planAndSeats.planId,
    totalSeats: planAndSeats.totalSeats,
    billingCycleId: planAndSeats.billingCycleId,
    paymentType: planAndSeats.paymentType,
    billingCurrencyId: planAndSeats.billingCurrencyId,
    achDetails: { ...planAndSeats.achDetails },
    _initialPlanAndSeats: {
      ...planAndSeats,
      achDetails: { ...planAndSeats.achDetails },
    },
    _initialBasicInfo: { ...basicInfo },
  };
}
