import { test, expect } from '@playwright/test';

test.describe('Corporation Profile - Configuration', () => {
  test('navigates to corporation profile from directory and shows content', async ({ page }) => {
    await page.goto('/corporations');
    await expect(page.getByRole('heading', { name: 'Corporations', level: 1 })).toBeVisible();
    await expect(page.getByText(/Showing \d+ corporations/)).toBeVisible({ timeout: 10000 });

    const viewButton = page.getByRole('button', { name: /View details for Acme Corporation/i });
    await expect(viewButton).toBeVisible({ timeout: 5000 });
    await viewButton.click();
    await expect(page).toHaveURL(/\/corporations\/corp_001\/profile/);
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('CORP-001')).toBeVisible();
    await expect(page.getByText('Active')).toBeVisible();
  });

  test('Back button navigates to Corporation Directory', async ({ page }) => {
    await page.goto('/corporations/corp_001/profile');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('link', { name: /Back to corporation directory/i }).click();
    await expect(page).toHaveURL('/corporations');
    await expect(page.getByRole('heading', { name: 'Corporations', level: 1 })).toBeVisible();
  });

  test('Basic Info. tab (default) shows Corporation Basics, Executive Sponsor, Key Contacts', async ({ page }) => {
    await page.goto('/corporations/corp_001/profile');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await expect(page.getByRole('tab', { name: 'Basic Info.', selected: true })).toBeVisible();
    const tabPanel = page.locator('#basic-info-tabpanel');
    await expect(tabPanel).toBeVisible();

    await expect(tabPanel.getByRole('heading', { name: 'Corporation Basics', level: 3 })).toBeVisible();
    await expect(tabPanel.getByRole('heading', { name: 'Executive Sponsor', level: 3 })).toBeVisible();
    await expect(tabPanel.getByRole('heading', { name: 'Key Contacts', level: 3 })).toBeVisible();

    await expect(tabPanel.getByText('Corporation Legal Name')).toBeVisible();
    await expect(tabPanel.getByText('Acme Corporation')).toBeVisible();
    await expect(tabPanel.getByText('DBA Name')).toBeVisible();
    await expect(tabPanel.getByText('Acme Inc.')).toBeVisible();
    await expect(tabPanel.getByText('Corporate Phone No.')).toBeVisible();
    await expect(tabPanel.getByText('Region (Data Residency)')).toBeVisible();
    await expect(tabPanel.getByText('Industry')).toBeVisible();
    await expect(tabPanel.getByText('Website URL')).toBeVisible();
    await expect(tabPanel.getByText('Address')).toBeVisible();
    await expect(tabPanel.getByText('Time Zone')).toBeVisible();
    await expect(tabPanel.getByText('Created On')).toBeVisible();

    await expect(tabPanel.getByText('Name', { exact: true }).first()).toBeVisible();
    await expect(tabPanel.getByText('Mike Davis')).toBeVisible();
    await expect(tabPanel.getByText('Role', { exact: true })).toBeVisible();
    await expect(tabPanel.getByText('CEO')).toBeVisible();
    await expect(tabPanel.getByText('Email', { exact: true })).toBeVisible();
    await expect(tabPanel.getByText('Work Phone No.')).toBeVisible();
    await expect(tabPanel.getByText('Cell Phone No.')).toBeVisible();

    await expect(tabPanel.getByText('Primary Corporate Admin')).toBeVisible();
    await expect(tabPanel.getByText('Nathan Drake')).toBeVisible();
    await expect(tabPanel.getByText('Billing/ Finance Contact')).toBeVisible();
    await expect(tabPanel.getByText('Luther Creed')).toBeVisible();
    await expect(tabPanel.getByText('Legal/ Compliance Contact')).toBeVisible();
    await expect(tabPanel.getByText('Layla Hussain')).toBeVisible();
  });

  test('Configuration tab shows audit log table with SearchInput, CustomSelects, Table, TablePagination', async ({ page }) => {
    await page.goto('/corporations/corp_001/profile');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Configuration' }).click();
    await expect(page.getByPlaceholder('Search here...')).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Filter by action types' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Filter by time range' })).toBeVisible();

    const tabPanel = page.locator('#configuration-tabpanel');
    await expect(tabPanel).toBeVisible();
    await expect(tabPanel.getByRole('columnheader', { name: 'Timestamp' })).toBeVisible();
    await expect(tabPanel.getByRole('columnheader', { name: 'Actions' })).toBeVisible();
    await expect(tabPanel.getByRole('columnheader', { name: 'Status' })).toBeVisible();
    await expect(tabPanel.getByRole('columnheader', { name: 'Actor' })).toBeVisible();

    await expect(tabPanel.getByText('User Management').first()).toBeVisible();
    await expect(tabPanel.getByText('Plan & Seats').first()).toBeVisible();
    await expect(tabPanel.getByText('Configuration').first()).toBeVisible();

    await expect(tabPanel.getByText(/Showing \d+ entries/)).toBeVisible();
    await expect(tabPanel.getByRole('button', { name: 'Previous page' })).toBeVisible();
    await expect(tabPanel.getByRole('button', { name: 'Next page' })).toBeVisible();
  });

  test('action buttons are present with correct labels', async ({ page }) => {
    await page.goto('/corporations/corp_001/profile');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await expect(page.getByRole('button', { name: 'Edit corporation details' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Suspend corporation Acme Corporation/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Close corporation Acme Corporation/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Suspend' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close Corporation' })).toBeVisible();
  });

  test('tab switching works', async ({ page }) => {
    await page.goto('/corporations/corp_001/profile');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await expect(page.getByRole('tab', { name: 'Basic Info.', selected: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Corporation Basics', level: 3 })).toBeVisible();
    await page.getByRole('tab', { name: 'Configuration' }).click();
    await expect(page.locator('#configuration-tabpanel').getByRole('columnheader', { name: 'Timestamp' })).toBeVisible();
    await expect(page.getByText(/Showing \d+ entries/)).toBeVisible();
    await page.getByRole('tab', { name: 'Basic Info.' }).click();
    await expect(page.getByRole('heading', { name: 'Corporation Basics', level: 3 })).toBeVisible();
  });

  test('Close Corporation button opens CloseCorporationConfirmationModal', async ({ page }) => {
    await page.goto('/corporations/corp_001/profile');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /Close corporation Acme Corporation/ }).click();
    await expect(page.getByRole('dialog', { name: /Close Corporation/ })).toBeVisible();
    await expect(page.getByText('Close Corporation').first()).toBeVisible();
    await expect(page.getByText(/You are about to permanently close Acme Corporation/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close corporation confirmation dialog' })).toBeVisible();
    await expect(page.getByText(/Close action is permanent delete/)).toBeVisible();
    await expect(page.getByText('Data Security')).toBeVisible();
    await expect(page.getByText('Pre-defined Reasons')).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Pre-defined Reasons' })).toBeVisible();
    await expect(page.getByText('Additional Notes')).toBeVisible();
    await expect(page.getByPlaceholder('Type your notes here...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel corporation closure process' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirm and permanently close corporation' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirm and permanently close corporation' })).toBeDisabled();
  });

  test('Close Corporation modal: select reason enables submit, Cancel closes modal', async ({ page }) => {
    await page.goto('/corporations/corp_001/profile');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /Close corporation Acme Corporation/ }).click();
    const dialog = page.getByRole('dialog', { name: /Close Corporation/ });
    await expect(dialog).toBeVisible();
    await page.getByRole('combobox', { name: 'Pre-defined Reasons' }).click();
    await page.getByRole('option', { name: 'Financial Difficulties' }).click();
    await expect(page.getByRole('button', { name: 'Confirm and permanently close corporation' })).toBeEnabled();
    await page.getByRole('button', { name: 'Cancel corporation closure process' }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('Close Corporation modal: close icon closes modal', async ({ page }) => {
    await page.goto('/corporations/corp_001/profile');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /Close corporation Acme Corporation/ }).click();
    const dialog = page.getByRole('dialog', { name: /Close Corporation/ });
    await expect(dialog).toBeVisible();
    await page.getByRole('button', { name: 'Close corporation confirmation dialog' }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('Close Corporation modal: submit closes modal and redirects on success', async ({ page }) => {
    await page.goto('/corporations/corp_001/profile');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /Close corporation Acme Corporation/ }).click();
    const dialog = page.getByRole('dialog', { name: /Close Corporation/ });
    await expect(dialog).toBeVisible();
    await page.getByRole('combobox', { name: 'Pre-defined Reasons' }).click();
    await page.getByRole('option', { name: 'Financial Difficulties' }).click();
    await page.getByRole('button', { name: 'Confirm and permanently close corporation' }).click();
    await expect(dialog).not.toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL('/corporations');
  });

  test('Suspend button opens SuspendCorporationConfirmationModal', async ({ page }) => {
    await page.goto('/corporations/corp_001/profile');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /Suspend corporation Acme Corporation/ }).click();
    await expect(page.getByRole('dialog', { name: /Suspend Corporation/ })).toBeVisible();
    await expect(page.getByText('Suspend Corporation').first()).toBeVisible();
    await expect(page.getByText(/You are about to suspend Acme Corporation/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close suspend corporation dialog' })).toBeVisible();
    await expect(page.getByText(/Suspend action will have the following impact/)).toBeVisible();
    await expect(page.getByText('Pre-defined Reasons')).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Pre-defined Reasons' })).toBeVisible();
    await expect(page.getByText('Additional Notes')).toBeVisible();
    await expect(page.getByPlaceholder('Type your notes here...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel corporation suspension process' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirm and suspend corporation' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirm and suspend corporation' })).toBeDisabled();
  });

  test('Suspend Corporation modal: select reason enables submit, Cancel closes modal', async ({ page }) => {
    await page.goto('/corporations/corp_001/profile');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /Suspend corporation Acme Corporation/ }).click();
    const dialog = page.getByRole('dialog', { name: /Suspend Corporation/ });
    await expect(dialog).toBeVisible();
    await page.getByRole('combobox', { name: 'Pre-defined Reasons' }).click();
    await page.getByRole('option', { name: 'Compliance Review' }).click();
    await expect(page.getByRole('button', { name: 'Confirm and suspend corporation' })).toBeEnabled();
    await page.getByRole('button', { name: 'Cancel corporation suspension process' }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('Suspend Corporation modal: close icon closes modal', async ({ page }) => {
    await page.goto('/corporations/corp_001/profile');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /Suspend corporation Acme Corporation/ }).click();
    const dialog = page.getByRole('dialog', { name: /Suspend Corporation/ });
    await expect(dialog).toBeVisible();
    await page.getByRole('button', { name: 'Close suspend corporation dialog' }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('Suspend Corporation modal: submit closes modal and shows success toast', async ({ page }) => {
    await page.goto('/corporations/corp_001/profile');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: /Suspend corporation Acme Corporation/ }).click();
    const dialog = page.getByRole('dialog', { name: /Suspend Corporation/ });
    await expect(dialog).toBeVisible();
    await page.getByRole('combobox', { name: 'Pre-defined Reasons' }).click();
    await page.getByRole('option', { name: 'Compliance Review' }).click();
    await page.getByRole('button', { name: 'Confirm and suspend corporation' }).click();
    await expect(dialog).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('alert').filter({ hasText: /Corporation suspended|suspended successfully/ })).toBeVisible({ timeout: 5000 });
  });

  test('Edit button navigates to Edit Corporation page', async ({ page }) => {
    await page.goto('/corporations/corp_001/profile');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: 'Edit corporation details' }).click();
    await expect(page).toHaveURL(/\/corporations\/corp_001\/edit/);
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('tab', { name: 'Basic Info.', selected: true })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Companies' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Branding' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Key Contacts' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Configuration' })).toBeVisible();
    const tabPanel = page.locator('#basic-info-tabpanel');
    await expect(tabPanel).toBeVisible();
    await expect(tabPanel.getByRole('heading', { name: 'Corporation Basics', level: 3 })).toBeVisible();
    await expect(tabPanel.getByRole('heading', { name: 'Corporation Address', level: 3 })).toBeVisible();
    await expect(tabPanel.getByRole('heading', { name: 'Executive Sponsor', level: 3 })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save & Update' })).toBeVisible();
  });

  test('Branding tab shows section title, description, Upload Logo, Logo Preview, and action buttons', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Branding' }).click();
    const tabPanel = page.locator('#branding-tabpanel');
    await expect(tabPanel).toBeVisible();

    await expect(tabPanel.getByRole('heading', { name: 'Branding', level: 2 })).toBeVisible();
    await expect(tabPanel.getByText('Configure corporation identity...')).toBeVisible();
    await expect(tabPanel.getByText('Upload Logo')).toBeVisible();
    await expect(tabPanel.getByText('Click to upload or drag-&-drop file')).toBeVisible();
    await expect(tabPanel.getByText(/Supported file formats are SVG, PNG & JPG up to 10MB/)).toBeVisible();
    await expect(tabPanel.getByText('Logo Preview')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel branding changes and return to corporation profile' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save and update corporation branding' })).toBeVisible();
  });

  test('Branding tab: Save & Update is disabled when no file selected', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Branding' }).click();
    await expect(page.locator('#branding-tabpanel')).toBeVisible();
    const saveBtn = page.getByRole('button', { name: 'Save and update corporation branding' });
    await expect(saveBtn).toBeDisabled();
  });

  test('Branding tab: Cancel navigates back to corporation profile', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Branding' }).click();
    await expect(page.locator('#branding-tabpanel')).toBeVisible();
    await page.getByRole('button', { name: 'Cancel branding changes and return to corporation profile' }).click();
    await expect(page).toHaveURL(/\/corporations\/corp_001\/profile/);
  });

  test('Branding tab: selecting valid file and Save shows success toast', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Branding' }).click();
    await expect(page.locator('#branding-tabpanel')).toBeVisible();

    const fileInput = page.locator('input[type="file"][accept*=".png"]');
    await fileInput.setInputFiles({
      name: 'logo.png',
      mimeType: 'image/png',
      buffer: Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
      ),
    });

    const saveBtn = page.getByRole('button', { name: 'Save and update corporation branding' });
    await expect(saveBtn).toBeEnabled({ timeout: 3000 });
    await saveBtn.click();
    await expect(page.getByText('Saving Branding...')).toBeVisible({ timeout: 2000 });
    await expect(page.getByRole('alert').filter({ hasText: /Branding saved|updated successfully/ })).toBeVisible({ timeout: 10000 });
  });

  test('Companies tab shows Company Setup heading, description, Companies (X) label and info card', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Companies' }).click();
    const tabPanel = page.locator('#companies-tabpanel');
    await expect(tabPanel).toBeVisible();

    await expect(tabPanel.getByRole('heading', { name: 'Company Setup', level: 2 })).toBeVisible();
    await expect(tabPanel.getByText('Each corporation must have at least one Company before continuing.')).toBeVisible();
    await expect(tabPanel.getByText(/Companies \(\d+\)/)).toBeVisible();
    await expect(tabPanel.getByText('Company Assignment & Modification')).toBeVisible();
    await expect(tabPanel.getByText('Created companies will be assigned to the corporation in the subsequent steps.')).toBeVisible();
  });

  test('Companies tab shows company cards and Add New Company button', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Companies' }).click();
    const tabPanel = page.locator('#companies-tabpanel');
    await expect(tabPanel).toBeVisible();

    await expect(tabPanel.getByText('Tech Ventures Digital').first()).toBeVisible();
    await expect(tabPanel.getByText('Innovation Labs').first()).toBeVisible();
    await expect(tabPanel.getByText('Marit Inc.').first()).toBeVisible();
    const addBtn = page.getByRole('button', { name: 'Add a new company to this corporation' });
    await expect(addBtn).toBeVisible();
    await expect(addBtn).toContainText('Add New Company');
  });

  test('Companies tab: Add New Company button opens AddCorporationCompanyModal', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Companies' }).click();
    await expect(page.locator('#companies-tabpanel')).toBeVisible();

    await page.getByRole('button', { name: 'Add a new company to this corporation' }).click();
    const dialog = page.getByRole('dialog', { name: /Add New Company/ });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Add a new physical Company to the system')).toBeVisible();
    await expect(dialog.getByText('Company Info.')).toBeVisible();
    await expect(dialog.getByText('Access Setup')).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Add Company' })).toBeVisible();
    await page.getByRole('button', { name: 'Close add new company form' }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('Companies tab: Save & Update is enabled when companies exist and shows toast on save', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Companies' }).click();
    await expect(page.locator('#companies-tabpanel')).toBeVisible();

    const saveBtn = page.getByRole('button', { name: 'Save & Update' });
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();
    await expect(page.getByText('Saving Companies...').or(page.getByRole('alert').filter({ hasText: /Companies saved|updated successfully/ }))).toBeVisible({ timeout: 10000 });
  });

  test('Companies tab: Edit company opens Edit Company modal with read-only fields and Save & Update', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Companies' }).click();
    await expect(page.locator('#companies-tabpanel')).toBeVisible();

    await page.getByRole('button', { name: /Edit .* details/ }).first().click();
    const dialog = page.getByRole('dialog', { name: /Edit Company/ });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Modify company details')).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Close edit company form' })).toBeVisible();
    await expect(dialog.getByText('Company Info.')).toBeVisible();
    await expect(dialog.getByText('Access Setup')).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Save and update company details' })).toBeVisible();
    const regionField = dialog.getByLabel(/Region \(Data Residency\)/i);
    await expect(regionField).toHaveAttribute('aria-readonly', 'true');
    const industryField = dialog.getByLabel(/Industry/i);
    await expect(industryField).toHaveAttribute('aria-readonly', 'true');
    const securityField = dialog.getByLabel(/Security posture/i);
    await expect(securityField).toHaveAttribute('aria-readonly', 'true');
    const legalNameInput = dialog.getByLabel(/Company legal name/i);
    await legalNameInput.clear();
    await legalNameInput.fill('TechVentures Digital Updated');
    const saveBtn = dialog.getByRole('button', { name: 'Save and update company details' });
    await expect(saveBtn).toBeEnabled({ timeout: 2000 });
    await saveBtn.click();
    await expect(dialog).not.toBeVisible({ timeout: 5000 });
  });

  test('Key Contacts tab displays section title, description, Primary Corporate Admin card and action buttons', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Key Contacts' }).click();
    const tabPanel = page.locator('#key-contacts-tabpanel');
    await expect(tabPanel).toBeVisible();

    await expect(tabPanel.getByRole('heading', { name: 'Key Contacts', level: 2 })).toBeVisible();
    await expect(tabPanel.getByText('Define governance, financial, and compliance ownership at the corporate level.')).toBeVisible();
    await expect(tabPanel.getByRole('heading', { name: 'Primary Corporate Admin', level: 3 })).toBeVisible();
    await expect(tabPanel.getByRole('button', { name: 'Toggle Primary Corporate Admin details', exact: true })).toBeVisible();
    await expect(tabPanel.getByPlaceholder('e.g., Mike Davis')).toBeVisible();
    await expect(tabPanel.getByPlaceholder('e.g., CEO, Corporate Admin')).toBeVisible();
    await expect(tabPanel.getByPlaceholder('e.g., mike_davis@email.com')).toBeVisible();
    await expect(tabPanel.getByLabel(/Primary corporate admin work phone/)).toBeVisible();
    await expect(tabPanel.getByLabel(/Primary corporate admin cell phone/)).toBeVisible();
    await expect(tabPanel.getByPlaceholder('e.g., Mike Davis')).toHaveValue('Nathan Drake');
    await expect(tabPanel.getByPlaceholder('e.g., CEO, Corporate Admin')).toHaveValue('CTO');
    await expect(tabPanel.getByPlaceholder('e.g., mike_davis@email.com')).toHaveValue('nathan_drake@acme.com');
    await expect(tabPanel.getByText('Billing/ Finance Contact')).toBeVisible();
    await expect(tabPanel.getByText('Legal/ Compliance Contact')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel corporation key contact changes' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save and update corporation key contact details' })).toBeVisible();
  });

  test('Key Contacts tab: Save & Update is disabled when no changes', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Key Contacts' }).click();
    await expect(page.locator('#key-contacts-tabpanel')).toBeVisible();

    const saveBtn = page.getByRole('button', { name: 'Save and update corporation key contact details' });
    await expect(saveBtn).toBeDisabled();
  });

  test('Key Contacts tab: Primary Corporate Admin card can collapse and expand', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Key Contacts' }).click();
    const tabPanel = page.locator('#key-contacts-tabpanel');
    await expect(tabPanel).toBeVisible();

    await expect(tabPanel.getByPlaceholder('e.g., Mike Davis')).toBeVisible();
    const toggleBtn = tabPanel.getByRole('button', { name: 'Toggle Primary Corporate Admin details', exact: true });
    await toggleBtn.click();
    await expect(tabPanel.getByPlaceholder('e.g., Mike Davis')).not.toBeVisible();
    await toggleBtn.click();
    await expect(tabPanel.getByPlaceholder('e.g., Mike Davis')).toBeVisible();
  });

  test('Key Contacts tab: modifying field enables Save & Update; save shows loading and success toast', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Key Contacts' }).click();
    await expect(page.locator('#key-contacts-tabpanel')).toBeVisible();

    const nameInput = page.getByPlaceholder('e.g., Mike Davis');
    await nameInput.clear();
    await nameInput.fill('Nathan Drake');
    await nameInput.fill('Nathan Drake Updated');
    const saveBtn = page.getByRole('button', { name: 'Save and update corporation key contact details' });
    await expect(saveBtn).toBeEnabled({ timeout: 3000 });
    await saveBtn.click();
    await expect(page.getByText('Saving Key Contacts...')).toBeVisible({ timeout: 2000 });
    await expect(page.getByRole('alert').filter({ hasText: /Key Contacts saved|updated successfully/ })).toBeVisible({ timeout: 10000 });
  });

  test('Key Contacts tab: clearing required field shows validation error and disables Save', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Key Contacts' }).click();
    await expect(page.locator('#key-contacts-tabpanel')).toBeVisible();

    const nameInput = page.getByPlaceholder('e.g., Mike Davis');
    await nameInput.clear();
    await expect(page.getByText('Required').first()).toBeVisible({ timeout: 3000 });
    const saveBtn = page.getByRole('button', { name: 'Save and update corporation key contact details' });
    await expect(saveBtn).toBeDisabled();
  });

  test('Key Contacts tab: Cancel navigates back to corporation profile', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Key Contacts' }).click();
    await expect(page.locator('#key-contacts-tabpanel')).toBeVisible();
    await page.getByRole('button', { name: 'Cancel corporation key contact changes' }).click();
    await expect(page).toHaveURL(/\/corporations\/corp_001\/profile/);
  });

  test('Configuration tab shows section title, description, Default Security Posture form and action buttons', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Configuration' }).click();
    const tabPanel = page.locator('#configuration-tabpanel');
    await expect(tabPanel).toBeVisible();

    await expect(tabPanel.getByRole('heading', { name: 'Configuration', level: 2 })).toBeVisible();
    await expect(tabPanel.getByText('Edit security posture & related settings')).toBeVisible();
    await expect(tabPanel.getByRole('heading', { name: 'Default Security Posture', level: 3 })).toBeVisible();
    await expect(tabPanel.getByText('Password Policy')).toBeVisible();
    await expect(tabPanel.getByText('2FA Requirement')).toBeVisible();
    await expect(tabPanel.getByText('Session Timeout (In Minutes)')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel corporation security configuration changes' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save and update corporation security configuration' })).toBeVisible();
  });

  test('Configuration tab: Save & Update is enabled when required fields have values and shows toast on save', async ({ page }) => {
    await page.goto('/corporations/corp_001/edit');
    await expect(page.getByRole('heading', { name: 'Acme Corporation' }).first()).toBeVisible({ timeout: 15000 });

    await page.getByRole('tab', { name: 'Configuration' }).click();
    await expect(page.locator('#configuration-tabpanel')).toBeVisible();

    const saveBtn = page.getByRole('button', { name: 'Save and update corporation security configuration' });
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();
    await expect(
      page.getByText('Saving Configuration...').or(page.getByRole('alert').filter({ hasText: /Configuration saved|updated successfully/ }))
    ).toBeVisible({ timeout: 10000 });
  });
});
