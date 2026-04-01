import { useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import { VerticalStepper } from '../components/company-creation/VerticalStepper';
import { ProgressBar } from '../components/company-creation/ProgressBar';
import { CardLayout } from '../components/common/CardLayout';
import { FormInput } from '../components/common/FormInput';
import { FormSelect } from '../components/common/FormSelect';
import { SummaryCard } from '../components/company-creation/SummaryCard';
import { DataDisplayRow } from '../components/company-creation/DataDisplayRow';
import { InfoAlertCard } from '../components/company-creation/InfoAlertCard';
import { FileUploadInput } from '../components/company-creation/FileUploadInput';
import { CustomSelect } from '../components/company-creation/CustomSelect';
import { ActionButtonsGroup } from '../components/company-creation/ActionButtonsGroup';
import { FormCard } from '../components/company-creation/FormCard';
import { TextInput } from '../components/company-creation/TextInput';
import { RichCheckboxGroup } from '../components/company-creation/RichCheckboxGroup';
import { TrialPeriodSwitchGroup } from '../components/company-creation/TrialPeriodSwitchGroup';
import { RadioGroupField } from '../components/company-creation/RadioGroupField';
import { AchBankTransferDetailsCard } from '../components/company-creation/AchBankTransferDetailsCard';
import {
  STEPS_CONFIG,
  setCurrentStep,
  markStepCompleted,
  updateBasicInfo,
  updateKeyContacts,
  updateStep3Field,
  updateStep4Field,
  setStep4LogoFile,
  startFileUpload,
  fileUploadSuccess,
  fileUploadError,
  submitCurrentStepRequest,
  submitCurrentStepSuccess,
  resetCompanyCreation,
  selectCurrentStep,
  selectFormData,
  selectCompletedSteps,
  selectCurrentFileUpload,
  selectAvailableRosters,
  selectIsSubmittingStep,
  selectStep1FormData,
  selectStep1ValidationStatus,
  selectStep3FormData,
  selectStep3ValidationStatus,
  selectStep4FormData,
  selectSubmissionStatus,
  submitCompanyCreation,
} from '../store/slices/companyCreationSlice';
import { setToastMessage } from '../store/slices/authSlice';
import { mockAuthMethods } from '../data/mockAuthMethods';
import { mockPasswordPolicies } from '../data/mockPasswordPolicies';
import { mockTFARequirements } from '../data/mockTFARequirements';
import { mockDashboardOptions } from '../data/mockDashboardOptions';
import { mockPilotLengths } from '../data/mockPilotLengths';
import { mockPilotSeats } from '../data/mockPilotSeats';
import { mockPlans } from '../data/mockPlans';
import { mockBillingCycles } from '../data/mockBillingCycles';
import { mockPaymentTypes } from '../data/mockPaymentTypes';
import { mockBillingCurrencies } from '../data/mockBillingCurrencies';
import { mockCountries } from '../data/mockCountries';
import { mockAccountTypes } from '../data/mockAccountTypes';
import { mockPaymentDirections } from '../data/mockPaymentDirections';
import { mockOwnershipTypes } from '../data/mockOwnershipTypes';
import { mockCompanyTypes } from '../data/mockCompanyTypes';
import { mockOfficeTypes } from '../data/mockOfficeTypes';
import { mockRegions } from '../data/mockRegions';
import { mockIndustries } from '../data/mockIndustries';
import { mockPrimaryLanguages } from '../data/mockPrimaryLanguages';
import { mockStates } from '../data/mockStates';
import { mockCities } from '../data/mockCities';

const KEY_CONTACT_FIELDS = [
  { key: 'primaryAdminRosterId', label: 'Primary Company Admin' },
  { key: 'secondaryAdminRosterId', label: 'Secondary Company Admin' },
  { key: 'executiveSponsorRosterId', label: 'Executive Sponsor' },
  { key: 'hrContactRosterId', label: 'HR/People Ops Contact' },
  { key: 'itSecurityContactRosterId', label: 'IT/Security Contact' },
];

const STEPPER_STEPS = STEPS_CONFIG.map((s) => ({
  id: s.id,
  label: s.title,
  subLabel: s.subtitle,
}));

function BasicInfoStep() {
  const dispatch = useDispatch();
  const basicInfo = useSelector(selectStep1FormData);

  const handleChange = useCallback(
    (field) => (e) => {
      const value = e?.target?.value ?? e;
      dispatch(updateBasicInfo({ [field]: value }));
    },
    [dispatch]
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <CardLayout title="Parent Corporation">
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <FormInput
              label="Parent Corporation Legal Name"
              placeholder="Acme Corporation"
              value={basicInfo.parentCorporationLegalName}
              onChange={handleChange('parentCorporationLegalName')}
              required
              readOnly
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <FormSelect
              label="Ownership Type"
              placeholder="Select ownership type"
              value={basicInfo.ownershipType}
              onChange={(e) => dispatch(updateBasicInfo({ ownershipType: e.target.value }))}
              options={mockOwnershipTypes}
              required
            />
          </Box>
        </Box>
      </CardLayout>
      <CardLayout title="Company Info.">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormInput
            label="Company Legal Name"
            placeholder="e.g., Acme Inc."
            value={basicInfo.companyLegalName}
            onChange={handleChange('companyLegalName')}
            required
          />
          <FormInput
            label="DBA/ Trade Name"
            placeholder="e.g., Acme Co."
            value={basicInfo.dbaTradeName}
            onChange={handleChange('dbaTradeName')}
            required
          />
          <FormInput
            label="Website URL"
            placeholder="e.g., https://www.acme.com"
            value={basicInfo.websiteURL}
            onChange={handleChange('websiteURL')}
            required
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <FormSelect
                label="Company Type"
                placeholder="Operating Company"
                value={basicInfo.companyType}
                onChange={(e) => dispatch(updateBasicInfo({ companyType: e.target.value }))}
                options={mockCompanyTypes}
                required
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormSelect
                label="Office Type"
                placeholder="Regional"
                value={basicInfo.officeType}
                onChange={(e) => dispatch(updateBasicInfo({ officeType: e.target.value }))}
                options={mockOfficeTypes}
                required
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <FormSelect
                label="Region (Data Residency)"
                placeholder="Select region"
                value={basicInfo.regionDataResidency}
                onChange={(e) => dispatch(updateBasicInfo({ regionDataResidency: e.target.value }))}
                options={mockRegions}
                required
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormSelect
                label="Industry"
                placeholder="Select industry"
                value={basicInfo.industry}
                onChange={(e) => dispatch(updateBasicInfo({ industry: e.target.value }))}
                options={mockIndustries}
                required
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <FormInput
                label="Company Phone No."
                placeholder="e.g., +1 555 123 4567"
                value={basicInfo.companyPhoneNumber}
                onChange={handleChange('companyPhoneNumber')}
                type="tel"
                required
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormSelect
                label="Primary Language"
                placeholder="English (US)"
                value={basicInfo.primaryLanguage}
                onChange={(e) => dispatch(updateBasicInfo({ primaryLanguage: e.target.value }))}
                options={mockPrimaryLanguages}
              />
            </Box>
          </Box>
        </Box>
      </CardLayout>
      <CardLayout title="Company Address">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormInput
            label="Address Line"
            placeholder="Address line"
            value={basicInfo.addressLine}
            onChange={handleChange('addressLine')}
            required
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <FormSelect
                label="State/ Province"
                placeholder="Select state/ province"
                value={basicInfo.stateProvince}
                onChange={(e) => dispatch(updateBasicInfo({ stateProvince: e.target.value }))}
                options={mockStates}
                required
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormSelect
                label="City"
                placeholder="Select city"
                value={basicInfo.city}
                onChange={(e) => dispatch(updateBasicInfo({ city: e.target.value }))}
                options={mockCities}
                required
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <FormSelect
                label="Country"
                placeholder="Select country"
                value={basicInfo.country}
                onChange={(e) => dispatch(updateBasicInfo({ country: e.target.value }))}
                options={mockCountries}
                required
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormInput
                label="ZIP/ Postal Code"
                placeholder="Enter zip/ postal code"
                value={basicInfo.zipPostalCode}
                onChange={handleChange('zipPostalCode')}
                type="tel"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
            </Box>
          </Box>
        </Box>
      </CardLayout>
    </Box>
  );
}

function KeyContactsStepContent() {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const keyContacts = formData.keyContacts || {};
  const rosters = useSelector(selectAvailableRosters);
  const currentFileUpload = useSelector(selectCurrentFileUpload);

  const [uploadError, setUploadError] = useState('');

  const handleFileChange = useCallback(
    (file) => {
      if (!file) return;
      setUploadError('');
      dispatch(startFileUpload(file));
      const allowed = /\.(csv|xls|xlsx)$/i.test(file.name);
      const maxBytes = 20 * 1024 * 1024;
      if (!allowed) {
        setUploadError('Invalid file type. Use CSV or XLS.');
        dispatch(fileUploadError('Invalid file type'));
        return;
      }
      if (file.size > maxBytes) {
        setUploadError('File too large. Max 20MB.');
        dispatch(fileUploadError('File too large'));
        return;
      }
      setTimeout(() => {
        dispatch(fileUploadSuccess({ name: file.name }));
      }, 600);
    },
    [dispatch]
  );

  const handleRosterChange = useCallback(
    (role, value) => {
      dispatch(updateKeyContacts({ [role]: value }));
    },
    [dispatch]
  );

  const uploadedFile = keyContacts.uploadedRosterFile
    ? { name: keyContacts.uploadedRosterFile.name ?? 'rosters_final_file.csv' }
    : currentFileUpload?.status === 'success'
      ? { name: currentFileUpload.fileName }
      : null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
        <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(73, 130, 145, 1)' }}>
          Setup the operating unit for the company.
        </Typography>
      </Box>

      <InfoAlertCard
        title="Roster Note"
        description="Upload the rosters via CSV or XLS files & later on select them for specific roles."
      />

      <FormCard title="Rosters">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FileUploadInput
            label="Upload Roster"
            instructionText="Click to upload or drag-&-drop file"
            supportedFormatsText="Supported file formats are CSV & XLS up to 20MB"
            allowedFormats="CSV, XLS"
            maxSize="20MB"
            onFileChange={handleFileChange}
            isLoading={currentFileUpload?.status === 'uploading'}
            currentFile={uploadedFile}
            errorMessage={uploadError}
            isRequired
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Primary Company Admin"
                placeholder="Select roster"
                options={rosters}
                value={keyContacts.primaryAdminRosterId ?? ''}
                onChange={(value) => handleRosterChange('primaryAdminRosterId', value)}
                isRequired
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Secondary Company Admin"
                placeholder="Select roster"
                options={rosters}
                value={keyContacts.secondaryAdminRosterId ?? ''}
                onChange={(value) => handleRosterChange('secondaryAdminRosterId', value)}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Executive Sponsor"
                placeholder="Select roster"
                options={rosters}
                value={keyContacts.executiveSponsorRosterId ?? ''}
                onChange={(value) => handleRosterChange('executiveSponsorRosterId', value)}
                isRequired
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="HR/ People Ops Contact"
                placeholder="Select roster"
                options={rosters}
                value={keyContacts.hrContactRosterId ?? ''}
                onChange={(value) => handleRosterChange('hrContactRosterId', value)}
                isRequired
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="IT/ Security Contact"
                placeholder="Select roster"
                options={rosters}
                value={keyContacts.itSecurityContactRosterId ?? ''}
                onChange={(value) => handleRosterChange('itSecurityContactRosterId', value)}
                isRequired
              />
            </Box>
            <Box sx={{ flex: 1 }} />
          </Box>
        </Box>
      </FormCard>
    </Box>
  );
}

const PLAN_TYPE_OPTIONS = [
  { value: 'trial', label: 'Trial' },
  { value: 'pilot', label: 'Pilot' },
];

function PlanSeatsStepContent() {
  const dispatch = useDispatch();
  const step3 = useSelector(selectStep3FormData);

  const handleStep3Change = useCallback(
    (field, value) => {
      dispatch(updateStep3Field({ field, value }));
    },
    [dispatch]
  );

  const isPilot = step3.planType === 'pilot';
  const isTrial = step3.planType === 'trial';
  const isCC = step3.paymentType === 'cc';
  const isWiring = step3.paymentType === 'wiring';
  const isAch = step3.paymentType === 'ach';
  const wiringDetails = step3.wiringDetails ?? {};
  const achDetails = step3.achDetails ?? {};

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
          Plan & Seats
        </Typography>
        <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(73, 130, 145, 1)' }}>
          Manage your plan allocations and seats assignments.
        </Typography>
      </Box>

      <FormCard title="Plan Allocation & Seats Management">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <RadioGroupField
            name="planType"
            label="Select Plan Type"
            options={PLAN_TYPE_OPTIONS}
            value={step3.planType ?? 'pilot'}
            onChange={(value) => handleStep3Change('planType', value)}
            aria-label="Plan type"
          />

          {isPilot && (
            <Box
              sx={{
                border: '1px solid rgba(221, 217, 235, 1)',
                borderRadius: '8px',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography
                component="h4"
                sx={{
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(47, 65, 74, 1)',
                }}
              >
                Pilot Configuration
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    label="Pilot Length"
                    placeholder="14 days"
                    options={mockPilotLengths}
                    value={step3.pilotLength ?? ''}
                    onChange={(v) => handleStep3Change('pilotLength', v)}
                    isRequired
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextInput
                    label="Pilot End Date"
                    value={step3.pilotEndDate ?? '01-20-2026'}
                    onChange={(e) => handleStep3Change('pilotEndDate', e.target.value)}
                    placeholder="01-20-2026"
                    readOnly
                    inputBackground="rgba(248, 247, 251, 1)"
                    aria-label="Pilot end date"
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    label="Pilot Seats"
                    placeholder="Select seats"
                    options={mockPilotSeats}
                    value={step3.pilotSeats ?? ''}
                    onChange={(v) => handleStep3Change('pilotSeats', v)}
                    showInfoIcon
                    infoIconAriaLabel="Information about Pilot Seats"
                  />
                </Box>
                <Box sx={{ flex: 1 }} />
              </Box>
              <TrialPeriodSwitchGroup
                label="Auto-expire Pilot"
                secondaryText="Automatically suspend access when pilot period ends"
                checked={Boolean(step3.autoExpirePilot)}
                onChange={(e) => handleStep3Change('autoExpirePilot', e.target.checked)}
                aria-label="Auto-expire Pilot"
              />
            </Box>
          )}

          {isTrial && (
            <Box
              sx={{
                border: '1px solid rgba(221, 217, 235, 1)',
                borderRadius: '8px',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography
                component="h4"
                sx={{
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(47, 65, 74, 1)',
                }}
              >
                Trial Configuration
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    label="Trial Length"
                    placeholder="14 days"
                    options={mockPilotLengths}
                    value={step3.trialLength ?? ''}
                    onChange={(v) => handleStep3Change('trialLength', v)}
                    isRequired
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextInput
                    label="Trial End Date"
                    value={step3.trialEndDate ?? '01-20-2026'}
                    onChange={(e) => handleStep3Change('trialEndDate', e.target.value)}
                    placeholder="01-20-2026"
                    readOnly
                    inputBackground="rgba(248, 247, 251, 1)"
                    aria-label="Trial end date"
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    label="Trial Seats"
                    placeholder="Select seats"
                    options={mockPilotSeats}
                    value={step3.trialSeats ?? ''}
                    onChange={(v) => handleStep3Change('trialSeats', v)}
                  />
                </Box>
                <Box sx={{ flex: 1 }} />
              </Box>
              <TrialPeriodSwitchGroup
                label="Auto-expire Trial"
                secondaryText="Automatically suspend access when trial period ends"
                checked={Boolean(step3.autoExpireTrial)}
                onChange={(e) => handleStep3Change('autoExpireTrial', e.target.checked)}
                aria-label="Auto-expire Trial"
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Plan"
                placeholder="50-100 employees"
                options={mockPlans}
                value={step3.plan ?? ''}
                onChange={(v) => handleStep3Change('plan', v)}
                isRequired
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Total Seats"
                placeholder="100"
                options={mockTotalSeats}
                value={step3.totalSeats ?? '100'}
                onChange={(v) => handleStep3Change('totalSeats', v)}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Billing Cycle"
                placeholder="Monthly"
                options={mockBillingCycles}
                value={step3.billingCycle ?? ''}
                onChange={(v) => handleStep3Change('billingCycle', v)}
                isRequired
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Payment Type"
                placeholder="ACH (Bank Transfer)"
                options={mockPaymentTypes}
                value={step3.paymentType ?? 'ach'}
                onChange={(v) => handleStep3Change('paymentType', v)}
                isRequired
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Billing Currency"
                placeholder="USD ($)"
                options={mockBillingCurrencies}
                value={step3.billingCurrency ?? ''}
                onChange={(v) => handleStep3Change('billingCurrency', v)}
              />
            </Box>
            <Box sx={{ flex: 1 }} />
          </Box>
        </Box>
      </FormCard>

      {isCC && (
        <FormCard title="CC (Credit Card) Details">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextInput
              label="Cardholder Name"
              placeholder="e.g., Alex Maria Mercer"
              value={step3.cardholderName ?? ''}
              onChange={(e) => handleStep3Change('cardholderName', e.target.value)}
              isRequired
              aria-label="Cardholder name"
            />
            <TextInput
              label="Card Number"
              placeholder="e.g., 1234 4567 7890 0123"
              value={step3.cardNumber ?? ''}
              onChange={(e) => handleStep3Change('cardNumber', e.target.value)}
              isRequired
              inputMode="numeric"
              aria-label="Card number"
            />
            <TextInput
              label="CVV"
              placeholder="e.g., 123"
              value={step3.cvv ?? ''}
              onChange={(e) => handleStep3Change('cvv', e.target.value)}
              isRequired
              inputMode="numeric"
              aria-label="CVV"
            />
            <TextInput
              label="Expiration Date (MM / YY)"
              placeholder="e.g., 12 / 2025"
              value={step3.expirationDate ?? ''}
              onChange={(e) => handleStep3Change('expirationDate', e.target.value)}
              isRequired
              inputMode="numeric"
              aria-label="Expiration date MM YY"
            />
            <TextInput
              label="Billing ZIP/Postal Code"
              placeholder="e.g., 10092"
              value={step3.billingZipPostalCode ?? ''}
              onChange={(e) => handleStep3Change('billingZipPostalCode', e.target.value)}
              isRequired
              inputMode="numeric"
              aria-label="Billing ZIP or postal code"
            />
            <CustomSelect
              label="Country"
              placeholder="Select country"
              options={mockCountries}
              value={step3.country ?? ''}
              onChange={(v) => handleStep3Change('country', v)}
            />
          </Box>
        </FormCard>
      )}

      {isAch && (
        <AchBankTransferDetailsCard
          formData={achDetails}
          onFieldChange={handleStep3Change}
          mockAccountTypes={mockAccountTypes}
          mockPaymentDirections={mockPaymentDirections}
        />
      )}

      {isWiring && (
        <FormCard title="Wiring (Bank) Details">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextInput
              label="Beneficiary Name"
              placeholder="e.g., Alex Maria Mercer"
              value={wiringDetails.beneficiaryName ?? ''}
              onChange={(e) => handleStep3Change('wiringDetails.beneficiaryName', e.target.value)}
              isRequired
              aria-label="Beneficiary name"
            />
            <TextInput
              label="Bank Name"
              placeholder="e.g., U.S. BANK N.A."
              value={wiringDetails.bankName ?? ''}
              onChange={(e) => handleStep3Change('wiringDetails.bankName', e.target.value)}
              isRequired
              aria-label="Bank name"
            />
            <TextInput
              label="Bank Account No."
              placeholder="e.g., 987654321"
              value={wiringDetails.bankAccountNumber ?? ''}
              onChange={(e) => handleStep3Change('wiringDetails.bankAccountNumber', e.target.value)}
              isRequired
              inputMode="numeric"
              aria-label="Bank account number"
            />
            <CustomSelect
              label="Bank Country"
              placeholder="USA"
              options={mockCountries}
              value={wiringDetails.bankCountry ?? ''}
              onChange={(v) => handleStep3Change('wiringDetails.bankCountry', v)}
              isRequired
            />
            <TextInput
              label="SWIFT/ BIC Code"
              placeholder="e.g., USBKUS44XXX"
              value={wiringDetails.swiftBicCode ?? ''}
              onChange={(e) => handleStep3Change('wiringDetails.swiftBicCode', e.target.value)}
              isRequired
              aria-label="SWIFT BIC code"
            />
          </Box>
        </FormCard>
      )}
    </Box>
  );
}

function ConfigurationStepContent() {
  const dispatch = useDispatch();
  const step4 = useSelector(selectStep4FormData);
  const currentFileUpload = useSelector(selectCurrentFileUpload);
  const [logoUploadError, setLogoUploadError] = useState('');

  const handleStep4Change = useCallback(
    (field, value) => {
      dispatch(updateStep4Field({ field, value }));
    },
    [dispatch]
  );

  const handleLogoFileChange = useCallback(
    (file) => {
      if (!file) {
        dispatch(setStep4LogoFile(null));
        setLogoUploadError('');
        return;
      }
      setLogoUploadError('');
      const allowed = /\.(svg|png|jpg|jpeg)$/i.test(file.name);
      const maxBytes = 10 * 1024 * 1024;
      if (!allowed) {
        setLogoUploadError('Invalid file type. Use SVG, PNG or JPG.');
        return;
      }
      if (file.size > maxBytes) {
        setLogoUploadError('File too large. Max 10MB.');
        return;
      }
      dispatch(setStep4LogoFile(file));
      dispatch(startFileUpload(file));
      setTimeout(() => dispatch(fileUploadSuccess({ name: file.name })), 400);
    },
    [dispatch]
  );

  const logoFile = step4.logoFile ? { name: step4.logoFile.name } : currentFileUpload?.status === 'success' ? { name: currentFileUpload.fileName } : null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
          Configuration
        </Typography>
        <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(73, 130, 145, 1)' }}>
          General settings for security, branding, reports & license.
        </Typography>
      </Box>

      <FormCard title="Security Settings">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Authentication Method"
                placeholder="Email & Password"
                options={mockAuthMethods}
                value={step4.authenticationMethod ?? ''}
                onChange={(v) => handleStep4Change('authenticationMethod', v)}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="Password Policy"
                placeholder="Standard (8+ Characters & Mixed case)"
                options={mockPasswordPolicies}
                value={step4.passwordPolicy ?? ''}
                onChange={(v) => handleStep4Change('passwordPolicy', v)}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <TextInput
                label="Session Timeout (In minutes)"
                value={String(step4.sessionTimeoutMinutes ?? 60)}
                onChange={(e) => handleStep4Change('sessionTimeoutMinutes', parseInt(e.target.value, 10) || 60)}
                type="number"
                placeholder="60 min"
                inputBackground="rgba(248, 247, 251, 1)"
                aria-label="Session timeout in minutes"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CustomSelect
                label="2FA Requirement (Inherited)"
                placeholder="Off"
                options={mockTFARequirements}
                value={step4.twoFactorAuthRequirement ?? 'off'}
                onChange={(v) => handleStep4Change('twoFactorAuthRequirement', v)}
              />
            </Box>
          </Box>
        </Box>
      </FormCard>

      <FormCard title="Branding & Experience">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <InfoAlertCard
            title="Branding Note"
            description="Display settings remain consistent with BSP Branding & overall experience."
          />
          <FileUploadInput
            label="Upload Logo"
            instructionText="Click to upload or drag-&-drop file"
            supportedFormatsText="Supported file formats are SVG, PNG & JPG up to 10MB"
            allowedFormats="SVG, PNG, JPG"
            maxSize="10MB"
            accept=".svg,.png,.jpg,.jpeg"
            maxFileSizeMB={10}
            onFileChange={handleLogoFileChange}
            isLoading={currentFileUpload?.status === 'uploading'}
            currentFile={logoFile}
            errorMessage={logoUploadError}
            isRequired={false}
            ariaLabel="Upload company logo file"
          />
        </Box>
      </FormCard>

      <FormCard title="Reporting Preferences">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <RichCheckboxGroup
            label="Default Dashboard"
            options={mockDashboardOptions}
            selectedValue={step4.defaultDashboardOption ?? 'Standard'}
            onChange={(v) => handleStep4Change('defaultDashboardOption', v)}
            aria-label="Default dashboard option"
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <TrialPeriodSwitchGroup
                label="Data Export Permission"
                secondaryText="Default: Off"
                checked={Boolean(step4.dataExportPermission)}
                onChange={(e) => handleStep4Change('dataExportPermission', e.target.checked)}
                aria-label="Data export permission"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TrialPeriodSwitchGroup
                label="User Data Anonymization"
                secondaryText="Default: Off"
                checked={Boolean(step4.userDataAnonymization)}
                onChange={(e) => handleStep4Change('userDataAnonymization', e.target.checked)}
                aria-label="User data anonymization"
              />
            </Box>
          </Box>
        </Box>
      </FormCard>
    </Box>
  );
}

function resolveLabel(options, value) {
  if (value == null || value === '') return '';
  const opt = Array.isArray(options) ? options.find((o) => o.value === value) : null;
  return opt ? opt.label : String(value);
}

function formatAddress(basicInfo) {
  const parts = [
    basicInfo?.addressLine,
    [basicInfo?.city, basicInfo?.stateProvince].filter(Boolean).join(', '),
    basicInfo?.country,
    basicInfo?.zipPostalCode,
  ].filter(Boolean);
  return parts.join(', ') || 'N/A';
}

function ConfirmationStepContent() {
  const formData = useSelector(selectFormData);
  const rosters = useSelector(selectAvailableRosters);
  const basicInfo = formData.basicInfo ?? {};
  const keyContacts = formData.keyContacts ?? {};
  const planAndSeats = formData.planAndSeats ?? {};
  const configuration = formData.configuration ?? {};

  const getRosterLabel = (id) => resolveLabel(rosters, id) || (id ? String(id) : '');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
          Confirmation
        </Typography>
        <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(73, 130, 145, 1)' }}>
          Review all the details that has been added.
        </Typography>
      </Box>

      <SummaryCard title="Company Info." titleId="summary-company-info">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Parent Corporation Legal Name" value={basicInfo.parentCorporationLegalName} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Ownership Type" value={resolveLabel(mockOwnershipTypes, basicInfo.ownershipType)} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Company Legal Name" value={basicInfo.companyLegalName} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="DBA/ Trade Name" value={basicInfo.dbaTradeName} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Website URL" value={basicInfo.websiteURL} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Company Type" value={resolveLabel(mockCompanyTypes, basicInfo.companyType)} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Office Type" value={resolveLabel(mockOfficeTypes, basicInfo.officeType)} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Region (Data Residency)" value={resolveLabel(mockRegions, basicInfo.regionDataResidency)} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Industry" value={resolveLabel(mockIndustries, basicInfo.industry)} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Primary Language" value={resolveLabel(mockPrimaryLanguages, basicInfo.primaryLanguage)} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Company Phone No." value={basicInfo.companyPhoneNumber} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Company Address" value={formatAddress(basicInfo)} />
            </Box>
          </Box>
        </Box>
      </SummaryCard>

      <SummaryCard title="Key Contacts" titleId="summary-key-contacts">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Primary Company Admin" value={getRosterLabel(keyContacts.primaryAdminRosterId)} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Secondary Company Admin" value={getRosterLabel(keyContacts.secondaryAdminRosterId)} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Executive Sponsor" value={getRosterLabel(keyContacts.executiveSponsorRosterId)} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="HR/ People Ops Contact" value={getRosterLabel(keyContacts.hrContactRosterId)} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="IT/ Security Contact" value={getRosterLabel(keyContacts.itSecurityContactRosterId)} />
            </Box>
            <Box sx={{ flex: 1 }} />
          </Box>
        </Box>
      </SummaryCard>

      <SummaryCard title="Plan Allocation & Seats Management" titleId="summary-plan-seats">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label={planAndSeats.planType === 'trial' ? 'Trial' : 'Pilot'} value="Active" />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow
                label={planAndSeats.planType === 'trial' ? 'Trial Length' : 'Pilot Length'}
                value={`${resolveLabel(mockPilotLengths, planAndSeats.planType === 'trial' ? planAndSeats.trialLength : planAndSeats.pilotLength)}${planAndSeats.planType === 'trial' ? (planAndSeats.autoExpireTrial ? ' (Auto-expire enabled)' : '') : (planAndSeats.autoExpirePilot ? ' (Auto-expire enabled)' : '')}`}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Plan" value={resolveLabel(mockPlans, planAndSeats.plan)} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Total Seats" value={planAndSeats.totalSeats} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Billing Cycle" value={resolveLabel(mockBillingCycles, planAndSeats.billingCycle)} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Payment Type" value={resolveLabel(mockPaymentTypes, planAndSeats.paymentType)} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Billing Currency" value={resolveLabel(mockBillingCurrencies, planAndSeats.billingCurrency)} />
            </Box>
            <Box sx={{ flex: 1 }} />
          </Box>
        </Box>
      </SummaryCard>

      <SummaryCard title="Security Settings" titleId="summary-security">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Authentication Method" value={resolveLabel(mockAuthMethods, configuration.authenticationMethod)} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Password Policy" value={resolveLabel(mockPasswordPolicies, configuration.passwordPolicy)} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Session Timeout" value={configuration.sessionTimeoutMinutes != null ? `${configuration.sessionTimeoutMinutes} min` : ''} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="2FA Requirement (Inherited)" value={resolveLabel(mockTFARequirements, configuration.twoFactorAuthRequirement)} />
            </Box>
          </Box>
        </Box>
      </SummaryCard>

      <SummaryCard title="Branding & Experience" titleId="summary-branding">
        <Box sx={{ py: 1 }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 400, color: 'rgba(56, 89, 102, 1)', mb: 1 }}>
            Brand Logo
          </Typography>
          <Box
            sx={{
              width: 200,
              height: 120,
              border: '1px solid rgba(221, 217, 235, 1)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 1)',
            }}
          >
            <Box
              component="img"
              src="/images/Logo 1-c24ca4a3.png"
              alt="Company logo"
              sx={{
                maxWidth: 160,
                maxHeight: 80,
                objectFit: 'contain',
              }}
              onError={(e) => {
                e.target.src = '/images/Logo 1-c24ca4a3.png';
              }}
            />
          </Box>
        </Box>
      </SummaryCard>

      <SummaryCard title="Reporting Preferences" titleId="summary-reporting">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Default Dashboard" value={configuration.defaultDashboardOption ?? 'Standard'} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="Data Export Permission" value={configuration.dataExportPermission ? 'On' : 'Off'} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <DataDisplayRow label="User Data Anonymization" value={configuration.userDataAnonymization ? 'On' : 'Off'} />
            </Box>
            <Box sx={{ flex: 1 }} />
          </Box>
        </Box>
      </SummaryCard>
    </Box>
  );
}

export function AddCompanyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const completedSteps = useSelector(selectCompletedSteps);
  const isSubmittingStep = useSelector(selectIsSubmittingStep);
  const submissionStatus = useSelector(selectSubmissionStatus);
  const formData = useSelector(selectFormData);

  const totalSteps = STEPS_CONFIG.length;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;
  const isSubmitting = currentStep === totalSteps ? submissionStatus === 'pending' : isSubmittingStep;
  const pageDescription =
    currentStep === 4 || currentStep === 3 || currentStep === 5
      ? 'Set up a new company with its basic details, plan, permissions & general configuration settings.'
      : 'Set up a new company and assign key contacts. Complete each step to continue.';

  const completionPercentage = Math.round(((currentStep - 1) / totalSteps) * 100);
  const stepperSteps = STEPPER_STEPS;

  const handleStepClick = useCallback(
    (stepId) => {
      if (completedSteps.includes(stepId) || stepId === currentStep) {
        dispatch(setCurrentStep(stepId));
      }
    },
    [dispatch, completedSteps, currentStep]
  );

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) dispatch(setCurrentStep(currentStep - 1));
  }, [dispatch, currentStep]);

  const handleNext = useCallback(() => {
    if (isLastStep) {
      dispatch(submitCompanyCreation(formData))
        .unwrap()
        .then(() => {
          dispatch(resetCompanyCreation());
          navigate('/corporations');
        })
        .catch((err) => {
          dispatch(
            setToastMessage({
              id: `toast-${Date.now()}`,
              title: 'Submission failed',
              body: err?.message ?? 'Could not create company.',
              severity: 'error',
            })
          );
        });
      return;
    }
    dispatch(markStepCompleted(currentStep));
    dispatch(setCurrentStep(currentStep + 1));
  }, [dispatch, currentStep, isLastStep, navigate, formData]);

  const handleCancel = useCallback(() => {
    if (window.confirm('Discard changes and leave?')) {
      dispatch(resetCompanyCreation());
      navigate('/corporations');
    }
  }, [dispatch, navigate]);

  const step1Valid = useSelector(selectStep1ValidationStatus);
  const step3Valid = useSelector(selectStep3ValidationStatus);
  const isNextDisabled =
    isSubmitting || (currentStep === 1 ? !step1Valid : currentStep === 3 ? !step3Valid : false);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep />;
      case 2:
        return <KeyContactsStepContent />;
      case 3:
        return <PlanSeatsStepContent />;
      case 4:
        return <ConfigurationStepContent />;
      case 5:
        return <ConfirmationStepContent />;
      default:
        return <BasicInfoStep />;
    }
  };

  // Build step statuses for VerticalStepper
  const stepStatuses = stepperSteps.map((step) => {
    if (completedSteps.includes(step.id)) return 'completed';
    if (step.id === currentStep) return 'active';
    return 'inactive';
  });

  return (
    <SuperAdminLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
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
          Add New Company
        </Typography>
        <Typography sx={{ fontSize: '14px', color: 'rgba(56, 89, 102, 1)', mb: 3 }}>
          {pageDescription}
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          {/* Left side - Vertical Stepper */}
          <VerticalStepper
            stepsConfig={stepperSteps.map((s, i) => ({
              id: s.id,
              title: s.label,
              subtitle: s.subLabel,
            }))}
            stepStatuses={stepStatuses}
            onStepClick={handleStepClick}
            ariaLabel="Add New Company steps"
          />

          {/* Right side - Content */}
          <Box
            sx={{
              flex: 1,
              background: 'rgba(255, 255, 255, 1)',
              borderRadius: '8px',
              border: '1px solid rgba(221, 217, 235, 1)',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <ProgressBar progress={completionPercentage} labelText={`${completionPercentage}% Complete`} />

            {currentStep === 1 && (
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
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(73, 130, 145, 1)' }}>
                  Enter the core details for the new company.
                </Typography>
              </Box>
            )}

            {renderStepContent()}

            <ActionButtonsGroup
              onCancel={handleCancel}
              onPrevious={!isFirstStep ? handlePrevious : undefined}
              onNext={handleNext}
              nextLabel={isLastStep ? 'Confirm & Add' : 'Next'}
              loadingLabel={isLastStep ? 'Submitting...' : undefined}
              previousLabel="Previous"
              cancelLabel="Cancel"
              isNextDisabled={isNextDisabled}
              isPreviousDisabled={false}
              isNextLoading={isSubmitting}
            />
          </Box>
        </Box>
      </Box>
    </SuperAdminLayout>
  );
}
