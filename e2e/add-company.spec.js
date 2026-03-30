import { test, expect } from '@playwright/test';

async function fillStep1RequiredFields(page) {
  await page.goto('/companies/add');
  await expect(page.getByText('Parent Corporation').first()).toBeVisible({ timeout: 10000 });
  await page.getByRole('combobox', { name: /Ownership Type/i }).click();
  await page.getByRole('option', { name: 'Wholly Owned' }).first().click();
  await page.getByRole('textbox', { name: /Company Legal Name/i }).fill('Test Company Inc.');
  await page.getByRole('combobox', { name: /Company Type/i }).click();
  await page.getByRole('option', { name: 'Operating Company' }).first().click();
  await page.getByRole('combobox', { name: /Office Type/i }).click();
  await page.getByRole('option', { name: 'Headquarters' }).first().click();
  await page.getByRole('combobox', { name: /Region \(Data Residency\)/i }).click();
  await page.getByRole('option', { name: 'North America' }).first().click();
  await page.getByRole('combobox', { name: /Industry/i }).click();
  await page.getByRole('option', { name: 'Technology' }).first().click();
  await page.getByRole('textbox', { name: /Address Line/i }).fill('123 Main St');
  await page.getByRole('combobox', { name: /State \/ Province/i }).click();
  await page.getByRole('option', { name: 'New York' }).first().click();
  await page.getByRole('combobox', { name: /^City$/i }).click();
  await page.getByRole('option', { name: 'New York' }).first().click();
  await page.getByRole('combobox', { name: /Country/i }).first().click();
  await page.getByRole('option', { name: 'United States' }).first().click();
}

test.describe('Add New Company Onboarding', () => {
  test('navigates to /companies/add and shows initial page content', async ({ page }) => {
    await page.goto('/companies/add');
    await expect(page.getByRole('heading', { name: 'Add New Company' }).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Set up a new company/)).toBeVisible();
    await expect(page.getByText('Basic Info.').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Step 2: Key Contacts/ })).toBeVisible();
  });

  test('header breadcrumbs show Company Directory > Add New Company', async ({ page }) => {
    await page.goto('/companies/add');
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Company Directory')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Add New Company')).toBeVisible();
  });

  test('sidebar displays group labels and menu items', async ({ page }) => {
    await page.goto('/companies/add');
    await expect(page.getByText('Main').first()).toBeVisible();
    await expect(page.getByText('Administration').first()).toBeVisible();
    await expect(page.getByText('Corporation Directory').first()).toBeVisible();
    await expect(page.getByText('Company Directory').first()).toBeVisible();
    await expect(page.getByText('Notifications').first()).toBeVisible();
  });

  test('stepper shows step titles and Next/Previous/Cancel buttons', async ({ page }) => {
    await page.goto('/companies/add');
    await expect(page.getByText('Basic Info.').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Step 2: Key Contacts/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  });

  test('navigating to step 2 shows Key Contacts content', async ({ page }) => {
    await fillStep1RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Key Contacts', { exact: true }).first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Roster Note')).toBeVisible();
    await expect(page.getByText('Operating unit setup. Assign key contacts from your roster.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
  });

  test('Key Contacts step shows Progress Tracker and Uploader', async ({ page }) => {
    await fillStep1RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText(/% Complete/)).toBeVisible();
    await expect(page.getByText('Click to upload or drag-&-drop file')).toBeVisible();
    await expect(page.getByText('Supported file formats are CSV & XLS up to 20MB')).toBeVisible();
    await expect(page.getByText('Primary Company Admin')).toBeVisible();
    await expect(page.getByText('Select roster').first()).toBeVisible();
  });

  test('ContactSelect dropdowns can be opened and options selected', async ({ page }) => {
    await fillStep1RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Primary Company Admin')).toBeVisible();
    const firstSelect = page.getByRole('combobox', { name: 'Primary Company Admin' });
    await firstSelect.click();
    await expect(page.getByRole('option', { name: 'John Doe' }).first()).toBeVisible({ timeout: 3000 });
    await page.getByRole('option', { name: 'John Doe' }).first().click();
    await expect(page.getByText('John Doe').first()).toBeVisible();
  });

  test('Cancel button shows confirmation and navigates when confirmed', async ({ page }) => {
    await page.goto('/companies/add');
    page.on('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL('/corporations', { timeout: 5000 });
  });

  test('Previous button returns to step 1 from step 2', async ({ page }) => {
    await fillStep1RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Roster Note')).toBeVisible();
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByText('Basic Info.', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Previous' })).not.toBeVisible();
  });

  test('navigating to step 3 shows Plan & Seats content', async ({ page }) => {
    await fillStep1RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Roster Note')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Plan Allocation & Seats Management')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Manage your plan allocations and seats assignments.')).toBeVisible();
    await expect(page.getByText('40% Complete')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
  });

  test('Step 3 shows Plan Allocation card with Pilot selected by default and Pilot Configuration', async ({ page }) => {
    await fillStep1RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Roster Note')).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('heading', { name: 'Key Contacts' })).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click({ force: true });
    await expect(page.getByText('Plan Allocation & Seats Management')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Select Plan Type')).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Trial' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Pilot' })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Pilot' })).toBeChecked();
    await expect(page.getByText('Pilot Configuration')).toBeVisible();
    await expect(page.getByText('Pilot Length')).toBeVisible();
    await expect(page.getByText('Pilot End Date')).toBeVisible();
    await expect(page.getByText('Pilot Seats')).toBeVisible();
    await expect(page.getByText('Auto-expire Pilot')).toBeVisible();
    await expect(page.getByText('Automatically suspend access when pilot period ends.')).toBeVisible();
  });

  test('Step 3 shows CC (Credit Card) Details card by default when Payment Type is CC', async ({ page }) => {
    await fillStep1RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Roster Note')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Plan Allocation & Seats Management')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Plan')).toBeVisible();
    await expect(page.getByText('Total Seats')).toBeVisible();
    await expect(page.getByText('Billing Cycle')).toBeVisible();
    await expect(page.getByText('Payment Type')).toBeVisible();
    await expect(page.getByText('Billing Currency')).toBeVisible();
    await expect(page.getByText('CC (Credit Card) Details')).toBeVisible();
    await expect(page.getByText('Cardholder Name')).toBeVisible();
    await expect(page.getByText('Card Number')).toBeVisible();
    await expect(page.getByText('CVV')).toBeVisible();
    await expect(page.getByText('Expiration Date (MM / YY)')).toBeVisible();
    await expect(page.getByText('Billing ZIP/Postal Code')).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Country' })).toBeVisible();
  });

  test('Step 3 shows CC (Credit Card) Details card when Payment Type is CC', async ({ page }) => {
    await fillStep1RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Roster Note')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Plan Allocation & Seats Management')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Payment Type')).toBeVisible();
    await page.getByRole('combobox', { name: 'Payment Type' }).click();
    await page.getByRole('option', { name: 'CC (Credit Card)' }).click();
    await expect(page.getByText('CC (Credit Card) Details')).toBeVisible();
    await expect(page.getByText('Cardholder Name')).toBeVisible();
    await expect(page.getByText('Card Number')).toBeVisible();
    await expect(page.getByText('CVV')).toBeVisible();
    await expect(page.getByText('Expiration Date (MM / YY)')).toBeVisible();
    await expect(page.getByText('Billing ZIP/Postal Code')).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Country' })).toBeVisible();
  });

  test('Step 3 shows Wiring (Bank) Details card when Payment Type is Wiring', async ({ page }) => {
    await fillStep1RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Roster Note')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Plan Allocation & Seats Management')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Payment Type')).toBeVisible();
    await page.getByRole('combobox', { name: 'Payment Type' }).click();
    await page.getByRole('option', { name: 'Wiring (Bank Details)' }).click();
    await expect(page.getByText('Wiring (Bank) Details')).toBeVisible();
    await expect(page.getByText('Beneficiary Name')).toBeVisible();
    await expect(page.getByText('Bank Name')).toBeVisible();
    await expect(page.getByText('Bank Account No.')).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Bank Country' })).toBeVisible();
    await expect(page.getByText('SWIFT/ BIC Code')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Beneficiary name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Bank account number' })).toBeVisible();
  });

  async function fillStep3RequiredFields(page) {
    await fillStep1RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Roster Note')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Plan Allocation & Seats Management')).toBeVisible({ timeout: 15000 });
    await page.getByRole('combobox', { name: 'Pilot Length' }).click();
    await page.getByRole('option', { name: '14 days' }).first().click();
    await page.getByRole('combobox', { name: 'Pilot Seats' }).click();
    await page.getByRole('option', { name: '10' }).first().click();
    await page.getByRole('combobox', { name: 'Plan' }).click();
    await page.getByRole('option', { name: '50-100 employees' }).first().click();
    await page.getByRole('combobox', { name: 'Total Seats' }).click();
    await page.getByRole('option', { name: '100' }).first().click();
    await page.getByRole('combobox', { name: 'Billing Cycle' }).click();
    await page.getByRole('option', { name: 'Monthly' }).first().click();
    await page.getByRole('textbox', { name: /Cardholder name/i }).fill('Alex Maria Mercer');
    await page.getByRole('textbox', { name: /Card number/i }).fill('1234567890123456');
    await page.getByRole('textbox', { name: /CVV/i }).fill('123');
    await page.getByRole('textbox', { name: /Expiration date/i }).fill('12 / 2025');
    await page.getByRole('textbox', { name: /Billing ZIP/i }).fill('10092');
    await page.getByRole('combobox', { name: 'Country' }).click();
    await page.getByRole('option', { name: 'United States' }).first().click();
  }

  async function fillStep3WiringFields(page) {
    await fillStep1RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Roster Note')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Plan Allocation & Seats Management')).toBeVisible({ timeout: 15000 });
    await page.getByRole('combobox', { name: 'Pilot Length' }).click();
    await page.getByRole('option', { name: '14 days' }).first().click();
    await page.getByRole('combobox', { name: 'Pilot Seats' }).click();
    await page.getByRole('option', { name: '10' }).first().click();
    await page.getByRole('combobox', { name: 'Plan' }).click();
    await page.getByRole('option', { name: '50-100 employees' }).first().click();
    await page.getByRole('combobox', { name: 'Billing Cycle' }).click();
    await page.getByRole('option', { name: 'Monthly' }).first().click();
    await page.getByRole('combobox', { name: 'Payment Type' }).click();
    await page.getByRole('option', { name: 'Wiring (Bank Details)' }).click();
    await expect(page.getByText('Wiring (Bank) Details')).toBeVisible({ timeout: 3000 });
    await page.getByRole('textbox', { name: 'Beneficiary name' }).fill('Test Beneficiary');
    await page.getByRole('textbox', { name: 'Bank name' }).fill('Test Bank N.A.');
    await page.getByRole('textbox', { name: 'Bank account number' }).fill('987654321');
    await page.getByRole('combobox', { name: 'Bank Country' }).click();
    await page.getByRole('option', { name: 'United States' }).first().click();
    await page.getByRole('textbox', { name: 'SWIFT BIC code' }).fill('USBKUS44XXX');
  }

  test('navigating to step 4 shows Configuration content', async ({ page }) => {
    await fillStep3RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Configuration', { exact: true }).first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Basic property settings.')).toBeVisible();
    await expect(page.getByText('60% Complete')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
  });

  test('navigating to step 4 via Wiring (Bank) Details shows Configuration content', async ({ page }) => {
    await fillStep3WiringFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Configuration', { exact: true }).first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('60% Complete')).toBeVisible();
  });

  test('Step 4 shows Security Settings card with fields', async ({ page }) => {
    await fillStep3RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Security Settings')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Authentication Method')).toBeVisible();
    await expect(page.getByText('Password Policy')).toBeVisible();
    await expect(page.getByText('Session Timeout (In minutes)')).toBeVisible();
    await expect(page.getByText('2FA Requirement (Inherited)')).toBeVisible();
  });

  test('Step 4 shows Branding & Experience card with Branding Note and Upload Logo', async ({ page }) => {
    await fillStep3RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Branding & Experience')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Branding Note')).toBeVisible();
    await expect(page.getByText('Display settings remain consistent with BSP Branding.')).toBeVisible();
    await expect(page.getByText('Upload Logo')).toBeVisible();
    await expect(page.getByText('Click to upload or drag-&-drop file')).toBeVisible();
    await expect(page.getByText('Supported file formats are SVG, PNG & JPG up to 10MB')).toBeVisible();
  });

  test('Step 4 shows Reporting Preferences with Default Dashboard and switches', async ({ page }) => {
    await fillStep3RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Reporting Preferences')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Default Dashboard')).toBeVisible();
    await expect(page.getByText('Data Export Permission')).toBeVisible();
    await expect(page.getByText('User Data Anonymization')).toBeVisible();
    await expect(page.getByText('Default: Off').first()).toBeVisible();
  });

  test('Step 4 Previous navigates to step 3', async ({ page }) => {
    await fillStep3RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Configuration', { exact: true }).first()).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByText('Plan & Seats', { exact: true }).first()).toBeVisible({ timeout: 5000 });
  });

  test('Step 3 Previous navigates to step 2', async ({ page }) => {
    await fillStep1RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Roster Note')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Plan & Seats', { exact: true }).first()).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByText('Key Contacts', { exact: true }).first()).toBeVisible({ timeout: 5000 });
  });

  test('Step 4 Cancel navigates to corporations', async ({ page }) => {
    await fillStep3RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Configuration', { exact: true }).first()).toBeVisible({ timeout: 5000 });
    page.on('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL('/corporations', { timeout: 5000 });
  });

  async function navigateToStep5(page) {
    await fillStep3RequiredFields(page);
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Configuration', { exact: true }).first()).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Confirmation', { exact: true }).first()).toBeVisible({ timeout: 5000 });
  }

  test('Step 5 Confirmation shows section title and description', async ({ page }) => {
    await navigateToStep5(page);
    await expect(page.getByRole('heading', { name: 'Confirmation', level: 2 })).toBeVisible();
    await expect(page.getByText('Review all the details that has been added.')).toBeVisible();
  });

  test('Step 5 shows 80% Complete in Progress Tracker', async ({ page }) => {
    await navigateToStep5(page);
    await expect(page.getByText('80% Complete').first()).toBeVisible();
  });

  test('Step 5 shows SummaryCard sections', async ({ page }) => {
    await navigateToStep5(page);
    await expect(page.getByRole('heading', { name: 'Company Info.' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Key Contacts' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Plan Allocation & Seats Management' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Security Settings' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Branding & Experience' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Reporting Preferences' })).toBeVisible();
  });

  test('Step 5 shows DataDisplayRow labels and values from formData', async ({ page }) => {
    await navigateToStep5(page);
    await expect(page.getByText('Parent Corporation Legal Name')).toBeVisible();
    await expect(page.getByText('Company Legal Name')).toBeVisible();
    await expect(page.getByText('Acme Corporation').first()).toBeVisible();
    await expect(page.getByText('Test Company Inc.').first()).toBeVisible();
    await expect(page.getByText('Primary Company Admin')).toBeVisible();
    await expect(page.getByText('Plan', { exact: true })).toBeVisible();
    await expect(page.getByText('Authentication Method')).toBeVisible();
    await expect(page.getByText('Default Dashboard')).toBeVisible();
  });

  test('Step 5 shows action buttons Cancel, Previous, Confirm & Add', async ({ page }) => {
    await navigateToStep5(page);
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirm & Add' })).toBeVisible();
  });

  test('Step 5 Previous navigates to step 4', async ({ page }) => {
    await navigateToStep5(page);
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByText('Configuration', { exact: true }).first()).toBeVisible({ timeout: 5000 });
  });

  test('Step 5 Confirm & Add shows loading then redirects to corporations', async ({ page }) => {
    await navigateToStep5(page);
    await page.getByRole('button', { name: 'Confirm & Add' }).click();
    await expect(page.getByRole('button', { name: 'Submitting...' })).toBeVisible({ timeout: 3000 });
    await expect(page).toHaveURL('/corporations', { timeout: 15000 });
  });
});
