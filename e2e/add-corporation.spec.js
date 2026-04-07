import { test, expect } from '@playwright/test';

test.describe('Corporation Setup Selection Page (Choose Setup Type)', () => {
  test('navigates to /corporations/add and shows Choose Setup Type page', async ({ page }) => {
    await page.goto('/corporations/add', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'Choose Setup Type' }).first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('heading', { name: 'Quick Setup' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Advanced Setup' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start Quick Setup' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start Advanced Setup' })).toBeVisible();
  });

  test('header breadcrumbs show Corporation Directory > Choose Setup on selection page', async ({ page }) => {
    await page.goto('/corporations/add');
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Corporation Directory')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Choose Setup')).toBeVisible();
  });

  test('Start Quick Setup navigates to Quick Setup flow', async ({ page }) => {
    await page.goto('/corporations/add', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Start Quick Setup for new corporation onboarding' }).click();
    await expect(page).toHaveURL(/\/corporations\/add\?flow=quick/, { timeout: 5000 });
    await expect(page.getByRole('heading', { name: 'Add New Corporation' }).first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Basic Info.').first()).toBeVisible();
  });

  test('Start Advanced Setup navigates to Advance Setup flow', async ({ page }) => {
    await page.goto('/corporations/add', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Start Advanced Setup for new corporation onboarding' }).click();
    await expect(page).toHaveURL(/\/corporations\/add\?flow=advance/, { timeout: 5000 });
    await expect(page.getByRole('heading', { name: 'Add New Corporation' }).first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Advance Setup')).toBeVisible();
  });

  test('Back button navigates to /corporations', async ({ page }) => {
    await page.goto('/corporations/add');
    await page.getByRole('link', { name: 'Back to Corporation Directory' }).click();
    await expect(page).toHaveURL('/corporations', { timeout: 5000 });
  });
});

test.describe('Add New Corporation Onboarding - Quick Setup - Step 1', () => {
  test('navigates via Choose Setup to Quick Setup and shows initial page content', async ({ page }) => {
    await goToQuickSetupStep1(page);
    await expect(page.getByText(/Set up a new corporation with its plan, region, and initial admin access/)).toBeVisible();
    await expect(page.getByText('Quick Setup')).toBeVisible();
    await expect(page.getByText('Basic Info.').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Step 2: Company Info/ })).toBeVisible();
  });

  test('header breadcrumbs show Corporation Directory > Add New Corporation when on stepper', async ({ page }) => {
    await goToQuickSetupStep1(page);
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Corporation Directory')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Add New Corporation')).toBeVisible();
  });

  test('sidebar displays group labels and menu items', async ({ page }) => {
    await goToQuickSetupStep1(page);
    await expect(page.getByText('Main').first()).toBeVisible();
    await expect(page.getByText('Administration').first()).toBeVisible();
    await expect(page.getByText('Corporation Directory').first()).toBeVisible();
    await expect(page.getByText('Company Directory').first()).toBeVisible();
    await expect(page.getByText('Notifications').first()).toBeVisible();
  });

  test('stepper shows Quick Setup step titles and sub-descriptions (3 steps)', async ({ page }) => {
    await goToQuickSetupStep1(page);
    await expect(page.getByText('Basic Info.').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Step 2: Company Info/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Step 3: Confirmation/ })).toBeVisible();
    await expect(page.getByText('Organization details')).toBeVisible();
    await expect(page.getByRole('button', { name: /Step 1: Basic Info/ })).toBeVisible();
  });

  test('progress tracker shows 0% Complete', async ({ page }) => {
    await goToQuickSetupStep1(page);
    await expect(page.getByText('0% Complete')).toBeVisible();
  });

  test('section description shows Enter the core details for the new corporation', async ({ page }) => {
    await goToQuickSetupStep1(page);
    await expect(page.getByText('Enter the core details for the new corporation.')).toBeVisible();
  });

  test('Corporation Basics card has expected fields', async ({ page }) => {
    await goToQuickSetupStep1(page);
    await expect(page.getByText('Corporation Basics')).toBeVisible();
    await expect(page.getByPlaceholder('e.g., Acme Corporation')).toBeVisible();
    await expect(page.getByPlaceholder('e.g., Acme Inc.')).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Region \(Data Residency\)/ })).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Industry/ })).toBeVisible();
    await expect(page.getByPlaceholder('e.g., +1 555 123 4567').first()).toBeVisible();
    await expect(page.getByPlaceholder('e.g., https://www.acme.com')).toBeVisible();
  });

  test('Corporation Address card has expected fields', async ({ page }) => {
    await goToQuickSetupStep1(page);
    await expect(page.getByText('Corporation Address')).toBeVisible();
    await expect(page.getByPlaceholder('Address line')).toBeVisible();
    await expect(page.getByRole('combobox', { name: /State\/ Province/ })).toBeVisible();
    await expect(page.getByRole('combobox', { name: /^City$/ })).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Country/ })).toBeVisible();
    await expect(page.getByPlaceholder('Enter zip/ postal code')).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Time Zone/ })).toBeVisible();
  });

  test('Executive Sponsor card has expected fields', async ({ page }) => {
    await goToQuickSetupStep1(page);
    await expect(page.getByText('Executive Sponsor')).toBeVisible();
    await expect(page.getByPlaceholder('e.g., Mike Davis')).toBeVisible();
    await expect(page.getByPlaceholder('e.g., CEO, Corporate Admin')).toBeVisible();
    await expect(page.getByPlaceholder('e.g., mike_davis@email.com')).toBeVisible();
    await expect(page.getByPlaceholder('e.g., +1 555 123 4567').nth(1)).toBeVisible();
    await expect(page.getByPlaceholder('e.g., +1 555 123 4567').nth(2)).toBeVisible();
  });

  test('Cancel button navigates to /corporations when confirmed', async ({ page }) => {
    await goToQuickSetupStep1(page);
    page.on('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL('/corporations', { timeout: 5000 });
  });

  test('Previous button is visible but disabled on step 1', async ({ page }) => {
    await goToQuickSetupStep1(page);
    const prevButton = page.getByRole('button', { name: 'Previous' });
    await expect(prevButton).toBeVisible();
    await expect(prevButton).toBeDisabled();
  });

  test('Next button is disabled until required fields are valid', async ({ page }) => {
    await goToQuickSetupStep1(page);
    const nextButton = page.getByRole('button', { name: 'Next' });
    await expect(nextButton).toBeDisabled();
    await page.getByPlaceholder('e.g., Acme Corporation').fill('Acme Corporation');
    await page.getByRole('combobox', { name: /Region \(Data Residency\)/ }).click();
    await page.getByRole('option', { name: 'North America' }).click();
    await page.getByRole('combobox', { name: /Industry/ }).click();
    await page.getByRole('option', { name: 'Technology', exact: true }).click();
    await page.getByPlaceholder('e.g., +1 555 123 4567').first().fill('+1 555 123 4567');
    await page.getByPlaceholder('e.g., https://www.acme.com').fill('https://www.acme.com');
    await page.getByPlaceholder('Address line').fill('123 Main St');
    await page.getByRole('combobox', { name: /State\/ Province/ }).click();
    await page.getByRole('option', { name: 'New York' }).click();
    await page.getByRole('combobox', { name: /^City$/ }).click();
    await page.getByRole('option', { name: 'New York' }).click();
    await page.getByRole('combobox', { name: /Country/ }).click();
    await page.getByRole('option', { name: 'United States' }).click();
    await page.getByRole('combobox', { name: /Time Zone/ }).click();
    await page.getByRole('option', { name: 'EST (Eastern Time)' }).click();
    await page.getByPlaceholder('e.g., Mike Davis').fill('Mike Davis');
    await page.getByPlaceholder('e.g., CEO, Corporate Admin').fill('CEO');
    await page.getByPlaceholder('e.g., mike_davis@email.com').fill('mike@example.com');
    await page.getByPlaceholder('e.g., +1 555 123 4567').nth(1).fill('+1 555 987 6543');
    await expect(nextButton).toBeEnabled();
  });
});

async function goToQuickSetupStep1(page) {
  await page.goto('/corporations/add', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Start Quick Setup for new corporation onboarding' }).click();
  await expect(page).toHaveURL(/flow=quick/);
  await expect(page.getByRole('heading', { name: 'Add New Corporation' }).first()).toBeVisible({ timeout: 20000 });
}

async function goToAdvanceSetupStep1(page) {
  await page.goto('/corporations/add', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Start Advanced Setup for new corporation onboarding' }).click();
  await expect(page).toHaveURL(/flow=advance/);
  await expect(page.getByRole('heading', { name: 'Add New Corporation' }).first()).toBeVisible({ timeout: 20000 });
}

async function fillQuickStep1AndGoToStep2(page) {
  await goToQuickSetupStep1(page);
  await page.getByPlaceholder('e.g., Acme Corporation').fill('Acme Corporation');
  await page.getByRole('combobox', { name: /Region \(Data Residency\)/ }).click();
  await page.getByRole('option', { name: 'North America' }).click();
  await page.getByRole('combobox', { name: /Industry/ }).click();
  await page.getByRole('option', { name: 'Technology', exact: true }).click();
  await page.getByPlaceholder('e.g., +1 555 123 4567').first().fill('+1 555 123 4567');
  await page.getByPlaceholder('e.g., https://www.acme.com').fill('https://www.acme.com');
  await page.getByPlaceholder('Address line').fill('123 Main St');
  await page.getByRole('combobox', { name: /State\/ Province/ }).click();
  await page.getByRole('option', { name: 'New York' }).click();
  await page.getByRole('combobox', { name: /^City$/ }).click();
  await page.getByRole('option', { name: 'New York' }).click();
  await page.getByRole('combobox', { name: /Country/ }).click();
  await page.getByRole('option', { name: 'United States' }).click();
  await page.getByRole('combobox', { name: /Time Zone/ }).click();
  await page.getByRole('option', { name: 'EST (Eastern Time)' }).click();
  await page.getByPlaceholder('e.g., Mike Davis').fill('Mike Davis');
  await page.getByPlaceholder('e.g., CEO, Corporate Admin').fill('CEO');
  await page.getByPlaceholder('e.g., mike_davis@email.com').fill('mike@example.com');
  await page.getByPlaceholder('e.g., +1 555 123 4567').nth(1).fill('+1 555 987 6543');
  await page.getByRole('button', { name: 'Next' }).click();
}

async function fillStep1AndGoToStep2(page) {
  await goToAdvanceSetupStep1(page);
  await page.getByPlaceholder('e.g., Acme Corporation').fill('Acme Corporation');
  await page.getByRole('combobox', { name: /Region \(Data Residency\)/ }).click();
  await page.getByRole('option', { name: 'North America' }).click();
  await page.getByRole('combobox', { name: /Industry/ }).click();
  await page.getByRole('option', { name: 'Technology', exact: true }).click();
  await page.getByPlaceholder('e.g., +1 555 123 4567').first().fill('+1 555 123 4567');
  await page.getByPlaceholder('e.g., https://www.acme.com').fill('https://www.acme.com');
  await page.getByPlaceholder('Address line').fill('123 Main St');
  await page.getByRole('combobox', { name: /State\/ Province/ }).click();
  await page.getByRole('option', { name: 'New York' }).click();
  await page.getByRole('combobox', { name: /^City$/ }).click();
  await page.getByRole('option', { name: 'New York' }).click();
  await page.getByRole('combobox', { name: /Country/ }).click();
  await page.getByRole('option', { name: 'United States' }).click();
  await page.getByRole('combobox', { name: /Time Zone/ }).click();
  await page.getByRole('option', { name: 'EST (Eastern Time)' }).click();
  await page.getByPlaceholder('e.g., Mike Davis').fill('Mike Davis');
  await page.getByPlaceholder('e.g., CEO, Corporate Admin').fill('CEO');
  await page.getByPlaceholder('e.g., mike_davis@email.com').fill('mike@example.com');
  await page.getByPlaceholder('e.g., +1 555 123 4567').nth(1).fill('+1 555 987 6543');
  await page.getByRole('button', { name: 'Next' }).click();
}

test.describe('Add New Corporation Onboarding - Quick Setup - Step 2: Company Info.', () => {
  test('step 2 shows Company Info. and simplified company form', async ({ page }) => {
    await fillQuickStep1AndGoToStep2(page);
    await expect(page.getByRole('heading', { name: 'Company Info.', level: 2 })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Each corporation must have at least one company before continuing.')).toBeVisible();
    await expect(page.getByText('33% Complete')).toBeVisible();
    await expect(page.getByText('Company Info.')).toBeVisible();
    await expect(page.getByPlaceholder('e.g., Acme India Pvt Ltd')).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Company Type/ })).toBeVisible();
    await expect(page.getByPlaceholder('e.g., Martin Morgan')).toBeVisible();
  });

  test('Previous from Quick Step 2 returns to step 1', async ({ page }) => {
    await fillQuickStep1AndGoToStep2(page);
    await expect(page.getByText('33% Complete')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByText('0% Complete')).toBeVisible({ timeout: 5000 });
  });

  test('Next from Quick Step 2 is disabled until required company fields are valid', async ({ page }) => {
    await fillQuickStep1AndGoToStep2(page);
    const nextButton = page.getByRole('button', { name: 'Next' });
    await expect(nextButton).toBeDisabled();
    await page.getByPlaceholder('e.g., Acme India Pvt Ltd').fill('Acme India Pvt Ltd');
    await page.getByRole('combobox', { name: /Company Type/ }).click();
    await page.getByRole('option', { name: 'Operating Company' }).click();
    await page.getByRole('combobox', { name: /Office Type/ }).click();
    await page.getByRole('option', { name: 'Regional' }).click();
    await page.getByRole('combobox', { name: /State\/ Province/ }).first().click();
    await page.getByRole('option', { name: 'New York' }).click();
    await page.getByRole('combobox', { name: /^City$/ }).first().click();
    await page.getByRole('option', { name: 'New York' }).click();
    await page.getByPlaceholder('100202').fill('10001');
    await page.getByPlaceholder('e.g., Martin Morgan').fill('Martin Morgan');
    await page.getByPlaceholder('e.g., admin@acmcare.com').fill('admin@acme.com');
    await page.getByPlaceholder('e.g., 25, 50, etc.').fill('50');
    await expect(nextButton).toBeEnabled();
  });
});

test.describe('Add New Corporation Onboarding - Quick Setup - Step 3: Confirmation', () => {
  async function fillQuickStep1And2AndGoToStep3(page) {
    await fillQuickStep1AndGoToStep2(page);
    await page.getByPlaceholder('e.g., Acme India Pvt Ltd').fill('Acme India Pvt Ltd');
    await page.getByRole('combobox', { name: /Company Type/ }).click();
    await page.getByRole('option', { name: 'Operating Company' }).click();
    await page.getByRole('combobox', { name: /Office Type/ }).click();
    await page.getByRole('option', { name: 'Regional' }).click();
    await page.getByRole('combobox', { name: /State\/ Province/ }).first().click();
    await page.getByRole('option', { name: 'New York' }).click();
    await page.getByRole('combobox', { name: /^City$/ }).first().click();
    await page.getByRole('option', { name: 'New York' }).click();
    await page.getByPlaceholder('100202').fill('10001');
    await page.getByPlaceholder('e.g., Martin Morgan').fill('Martin Morgan');
    await page.getByPlaceholder('e.g., admin@acmcare.com').fill('admin@acme.com');
    await page.getByPlaceholder('e.g., 25, 50, etc.').fill('50');
    await page.getByRole('button', { name: 'Next' }).click();
  }

  test('step 3 shows Confirmation and 66% Complete', async ({ page }) => {
    await fillQuickStep1And2AndGoToStep3(page);
    await expect(page.getByRole('heading', { name: 'Confirmation', level: 2 })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Review all the details that has been added.')).toBeVisible();
    await expect(page.getByText('66% Complete')).toBeVisible();
  });

  test('step 3 shows Corporation Info., Executive Sponsor, Company Details, Admin User', async ({ page }) => {
    await fillQuickStep1And2AndGoToStep3(page);
    await expect(page.getByText('Corporation Info.')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Executive Sponsor')).toBeVisible();
    await expect(page.getByText('Company Details')).toBeVisible();
    await expect(page.getByText('Admin User')).toBeVisible();
    await expect(page.getByText('Acme Corporation')).toBeVisible();
    // Admin User section: Admin Name, Company Admin Email, No. of Employees, Security Posture
    await expect(page.getByText('Admin Name')).toBeVisible();
    await expect(page.getByText('Company Admin Email')).toBeVisible();
    await expect(page.getByText('No. of Employees')).toBeVisible();
    await expect(page.getByText('Security Posture')).toBeVisible();
    await expect(page.getByText('Martin Morgan')).toBeVisible();
    await expect(page.getByText('admin@acme.com')).toBeVisible();
    await expect(page.getByText('50')).toBeVisible();
    await expect(page.getByText('Standard')).toBeVisible();
  });

  test('Confirm & Add submits and redirects to /corporations', async ({ page }) => {
    await fillQuickStep1And2AndGoToStep3(page);
    await expect(page.getByRole('button', { name: 'Confirm & Add' })).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Confirm & Add' }).click();
    await expect(page).toHaveURL('/corporations', { timeout: 10000 });
  });
});

async function fillStep1AndGoToStep3(page) {
  await fillStep1AndGoToStep2(page);
  await page.getByRole('button', { name: 'Next' }).click();
}

async function fillStep1AndGoToStep4(page) {
  await fillStep1AndGoToStep3(page);
  await page.getByRole('button', { name: 'Next' }).click();
}

test.describe('Add New Corporation Onboarding - Step 2: Company Setup (Add Company Modal)', () => {
  test('step 2 shows Company Setup and Add New Company button', async ({ page }) => {
    await fillStep1AndGoToStep2(page);
    await expect(page.getByRole('heading', { name: 'Company Setup', level: 2 })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Each corporation must have at least one Company before continuing.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add new company to corporation' })).toBeVisible();
    await expect(page.getByText('20% Complete')).toBeVisible();
  });

  test('Add New Company button opens AddCorporationCompanyModal', async ({ page }) => {
    await fillStep1AndGoToStep2(page);
    await page.getByRole('button', { name: 'Add new company to corporation' }).click();
    const modal = page.getByRole('dialog', { name: /Add New Company/ });
    await expect(modal).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Add a new physical Company to the system')).toBeVisible();
  });

  test('modal has Company Info. section and expected fields', async ({ page }) => {
    await fillStep1AndGoToStep2(page);
    await page.getByRole('button', { name: 'Add new company to corporation' }).click();
    const modal = page.getByRole('dialog', { name: /Add New Company/ });
    await expect(modal).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Company Info.')).toBeVisible();
    await expect(page.getByPlaceholder('e.g., Acme India Pvt Ltd')).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Company Type/ })).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Office Type/ })).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Region \(Data Residency\)/ })).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Industry/ })).toBeVisible();
    await expect(page.getByRole('combobox', { name: /State\/ Province/ })).toBeVisible();
    await expect(page.getByRole('combobox', { name: /^City$/ })).toBeVisible();
    await expect(page.getByPlaceholder('Enter zip/ postal code')).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Time Zone/ })).toBeVisible();
  });

  test('modal has Access Setup section and expected fields', async ({ page }) => {
    await fillStep1AndGoToStep2(page);
    await page.getByRole('button', { name: 'Add new company to corporation' }).click();
    const modal = page.getByRole('dialog', { name: /Add New Company/ });
    await expect(modal).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Access Setup')).toBeVisible();
    await expect(page.getByPlaceholder('e.g., Martin Morgan')).toBeVisible();
    await expect(page.getByPlaceholder('e.g., admin@acmcare.com')).toBeVisible();
    await expect(page.getByPlaceholder('e.g., 25, 50, etc.')).toBeVisible();
    await expect(page.getByPlaceholder('Standard')).toBeVisible();
  });

  test('modal close button closes the modal', async ({ page }) => {
    await fillStep1AndGoToStep2(page);
    await page.getByRole('button', { name: 'Add new company to corporation' }).click();
    const modal = page.getByRole('dialog', { name: /Add New Company/ });
    await expect(modal).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Close add new company form' }).click();
    await expect(modal).not.toBeVisible();
  });

  test('modal Cancel button closes the modal', async ({ page }) => {
    await fillStep1AndGoToStep2(page);
    await page.getByRole('button', { name: 'Add new company to corporation' }).click();
    const modal = page.getByRole('dialog', { name: /Add New Company/ });
    await expect(modal).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Cancel' }).first().click();
    await expect(modal).not.toBeVisible();
  });

  test('Add Company button in modal is disabled until required fields are valid', async ({ page }) => {
    await fillStep1AndGoToStep2(page);
    await page.getByRole('button', { name: 'Add new company to corporation' }).click();
    const modal = page.getByRole('dialog', { name: /Add New Company/ });
    await expect(modal).toBeVisible({ timeout: 5000 });
    await expect(modal.getByRole('button', { name: 'Add Company' })).toBeDisabled();
  });

  test('filling modal and clicking Add Company adds company and closes modal', async ({ page }) => {
    await fillStep1AndGoToStep2(page);
    await page.getByRole('button', { name: 'Add new company to corporation' }).click();
    const modal = page.getByRole('dialog', { name: /Add New Company/ });
    await expect(modal).toBeVisible({ timeout: 5000 });
    await modal.getByPlaceholder('e.g., Acme India Pvt Ltd').fill('Acme India Pvt Ltd');
    await modal.getByRole('combobox', { name: /State\/ Province/ }).click();
    await page.getByRole('option', { name: 'New York' }).click();
    await modal.getByRole('combobox', { name: /^City$/ }).click();
    await page.getByRole('option', { name: 'New York' }).click();
    await modal.getByPlaceholder('Enter zip/ postal code').fill('10001');
    await modal.getByRole('combobox', { name: /Time Zone/ }).click();
    await page.getByRole('option', { name: 'EST (Eastern Time)' }).click();
    await modal.getByPlaceholder('e.g., Martin Morgan').fill('Martin Morgan');
    await modal.getByPlaceholder('e.g., admin@acmcare.com').fill('admin@acme.com');
    await modal.getByPlaceholder('e.g., 25, 50, etc.').fill('50');
    await modal.getByRole('button', { name: 'Add Company' }).click();
    await expect(modal).not.toBeVisible({ timeout: 3000 });
    await expect(page.getByText(/Companies \(\d+\)/)).toBeVisible();
  });
});

test.describe('Add New Corporation Onboarding - Step 3: Branding', () => {
  test('navigates to step 3 and shows Branding content', async ({ page }) => {
    await fillStep1AndGoToStep3(page);
    await expect(page.getByRole('heading', { name: 'Branding', level: 2 })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Configure corporation identity.')).toBeVisible();
  });

  test('step 3 shows 40% Complete progress tracker', async ({ page }) => {
    await fillStep1AndGoToStep3(page);
    await expect(page.getByText('40% Complete')).toBeVisible({ timeout: 5000 });
  });

  test('step 3 shows Upload Logo file upload with correct instructions', async ({ page }) => {
    await fillStep1AndGoToStep3(page);
    await expect(page.getByText('Upload Logo')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Click to upload or drag-&-drop file')).toBeVisible();
    await expect(page.getByText('SVG, PNG & JPG up to 10MB')).toBeVisible();
  });

  test('Previous from step 3 returns to step 2', async ({ page }) => {
    await fillStep1AndGoToStep3(page);
    await expect(page.getByText('40% Complete')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByText('20% Complete')).toBeVisible({ timeout: 5000 });
  });

  test('Cancel from step 3 navigates to /corporations when confirmed', async ({ page }) => {
    await fillStep1AndGoToStep3(page);
    page.on('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL('/corporations', { timeout: 5000 });
  });
});

test.describe('Add New Corporation Onboarding - Step 4: Key Contacts', () => {
  test('navigates to step 4 and shows Key Contacts content', async ({ page }) => {
    await fillStep1AndGoToStep4(page);
    await expect(page.getByRole('heading', { name: 'Key Contacts', level: 2 })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/Define governance and key contact details/)).toBeVisible();
  });

  test('step 4 shows 60% Complete progress tracker', async ({ page }) => {
    await fillStep1AndGoToStep4(page);
    await expect(page.getByText('60% Complete')).toBeVisible({ timeout: 5000 });
  });

  test('step 4 shows Primary Corporate Admin card with expected fields', async ({ page }) => {
    await fillStep1AndGoToStep4(page);
    await expect(page.getByText('Primary Corporate Admin')).toBeVisible({ timeout: 5000 });
    await expect(page.getByPlaceholder('e.g., Mike Davis')).toBeVisible();
    await expect(page.getByPlaceholder('e.g., CEO, Corporate Admin')).toBeVisible();
    await expect(page.getByPlaceholder('e.g., mike_davis@email.com')).toBeVisible();
    await expect(page.getByPlaceholder('e.g., +1 555 123 4567').first()).toBeVisible();
  });

  test('step 4 shows Billing/ Finance and Legal/ Compliance contact cards', async ({ page }) => {
    await fillStep1AndGoToStep4(page);
    await expect(page.getByText('Billing/ Finance Contact')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Legal/ Compliance Contact')).toBeVisible();
  });

  test('Next button on step 4 is disabled until required Primary Corporate Admin fields are valid', async ({ page }) => {
    await fillStep1AndGoToStep4(page);
    const nextButton = page.getByRole('button', { name: 'Next' });
    await expect(nextButton).toBeDisabled();
    await page.getByPlaceholder('e.g., Mike Davis').fill('Jane Smith');
    await page.getByPlaceholder('e.g., CEO, Corporate Admin').fill('Corporate Admin');
    await page.getByPlaceholder('e.g., mike_davis@email.com').fill('jane@example.com');
    await page.getByPlaceholder('e.g., +1 555 123 4567').first().fill('+1 555 111 2222');
    await expect(nextButton).toBeEnabled();
  });

  test('Previous from step 4 returns to step 3', async ({ page }) => {
    await fillStep1AndGoToStep4(page);
    await expect(page.getByText('60% Complete')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByText('40% Complete')).toBeVisible({ timeout: 5000 });
  });
});

async function fillStep1Through4ToReachStep5(page) {
  await fillStep1AndGoToStep4(page);
  await page.getByPlaceholder('e.g., Mike Davis').fill('Jane Smith');
  await page.getByPlaceholder('e.g., CEO, Corporate Admin').fill('Corporate Admin');
  await page.getByPlaceholder('e.g., mike_davis@email.com').fill('jane@example.com');
  await page.getByPlaceholder('e.g., +1 555 123 4567').first().fill('+1 555 111 2222');
  await page.getByRole('button', { name: 'Next' }).click();
}

test.describe('Add New Corporation Onboarding - Step 5: Confirmation', () => {
  test('navigates to step 5 and shows Confirmation content', async ({ page }) => {
    await fillStep1Through4ToReachStep5(page);
    await expect(page.getByRole('heading', { name: 'Confirmation', level: 2 })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Review all the details that has been added.')).toBeVisible();
  });

  test('step 5 shows 80% Complete progress tracker', async ({ page }) => {
    await fillStep1Through4ToReachStep5(page);
    await expect(page.getByText('80% Complete')).toBeVisible({ timeout: 5000 });
  });

  test('step 5 shows Corporation Info. section with review data', async ({ page }) => {
    await fillStep1Through4ToReachStep5(page);
    await expect(page.getByText('Corporation Info.')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Corporation Legal Name')).toBeVisible();
    await expect(page.getByText('Acme Corporation')).toBeVisible();
  });

  test('step 5 shows Executive Sponsor and Company Details sections', async ({ page }) => {
    await fillStep1Through4ToReachStep5(page);
    await expect(page.getByText('Executive Sponsor')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Company Details')).toBeVisible();
    await expect(page.getByText('TechVentures Digital')).toBeVisible();
    await expect(page.getByText('Innovation Labs')).toBeVisible();
    await expect(page.getByText('Marit Inc.')).toBeVisible();
  });

  test('step 5 shows Branding and Key Contacts sections', async ({ page }) => {
    await fillStep1Through4ToReachStep5(page);
    await expect(page.getByText('Branding', { exact: true })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Key Contacts')).toBeVisible();
    await expect(page.getByText('Primary Corporate Admin')).toBeVisible();
  });

  test('Confirm & Add button is present and enabled', async ({ page }) => {
    await fillStep1Through4ToReachStep5(page);
    const confirmButton = page.getByRole('button', { name: 'Confirm & Add' });
    await expect(confirmButton).toBeVisible({ timeout: 5000 });
    await expect(confirmButton).toBeEnabled();
  });

  test('Confirm & Add submits and redirects to /corporations', async ({ page }) => {
    await fillStep1Through4ToReachStep5(page);
    await expect(page.getByRole('button', { name: 'Confirm & Add' })).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Confirm & Add' }).click();
    await expect(page).toHaveURL('/corporations', { timeout: 10000 });
  });

  test('Previous from step 5 returns to step 4', async ({ page }) => {
    await fillStep1Through4ToReachStep5(page);
    await expect(page.getByText('80% Complete')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByText('60% Complete')).toBeVisible({ timeout: 5000 });
  });

  test('Cancel from step 5 navigates to /corporations when confirmed', async ({ page }) => {
    await fillStep1Through4ToReachStep5(page);
    page.on('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL('/corporations', { timeout: 5000 });
  });
});
