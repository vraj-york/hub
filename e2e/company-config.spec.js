import { test, expect } from '@playwright/test';

test.describe('Company Profile - View Details Page (/companies/:id)', () => {
  test('navigates to company config and shows view mode', async ({ page }) => {
    await page.goto('/companies/company_001');
    await expect(page).toHaveURL(/\/companies\/company_001/);
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Assigned')).toBeVisible();
    await expect(page.getByText('Enterprise')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Edit Company' })).toBeVisible();
  });

  test('Edit Company button opens Edit Company modal', async ({ page }) => {
    await page.goto('/companies/company_001');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    const editBtn = page.getByRole('button', { name: 'Edit company basic information' });
    await expect(editBtn).toBeVisible();
    await editBtn.click();
    const dialog = page.getByRole('dialog', { name: /Edit Company/ });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Modify company details')).toBeVisible();
    await expect(dialog.getByText('Company Info.')).toBeVisible();
    await expect(dialog.getByText('Access Setup')).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Save and update company details' })).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Close edit company form' })).toBeVisible();
    await page.getByRole('button', { name: 'Close edit company form' }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('Edit Company modal: Save & Update submits and shows success toast', async ({ page }) => {
    await page.goto('/companies/company_001');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Edit company basic information' }).click();
    const dialog = page.getByRole('dialog', { name: /Edit Company/ });
    await expect(dialog).toBeVisible();
    const legalNameInput = dialog.getByLabel(/Company legal name/i);
    await legalNameInput.clear();
    await legalNameInput.fill('Acme Inc. Updated');
    const saveBtn = dialog.getByRole('button', { name: 'Save and update company details' });
    await expect(saveBtn).toBeEnabled({ timeout: 2000 });
    await saveBtn.click();
    await expect(page.getByText('Saving Company...')).toBeVisible({ timeout: 3000 });
    await expect(page.getByRole('alert').filter({ hasText: /Company updated|details have been saved/i })).toBeVisible({ timeout: 10000 });
    await expect(dialog).not.toBeVisible();
  });

  test('breadcrumb shows Company Directory > company name', async ({ page }) => {
    await page.goto('/companies/company_001');
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Company Directory')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('New York HQ')).toBeVisible();
  });

  test('Basic Info. tab (default) shows Company Basics and Parent Corporation Info. cards', async ({ page }) => {
    await page.goto('/companies/company_001');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('tab', { name: 'Basic Info.' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('heading', { name: 'Basic Info.' })).toBeVisible();
    await expect(page.getByText('View and manage core company details.')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Company Basics' })).toBeVisible();
    await expect(page.getByText('Company Legal Name')).toBeVisible();
    await expect(page.getByText('DBA/ Trade Name')).toBeVisible();
    await expect(page.getByText('Company Address')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Parent Corporation Info.' })).toBeVisible();
    await expect(page.getByText('Parent Corporation Legal Name')).toBeVisible();
    await expect(page.getByText('Ownership Type')).toBeVisible();
  });

  test('Configuration tab shows read-only Security, Branding, Reporting sections', async ({ page }) => {
    await page.goto('/companies/company_001');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await page.getByRole('tab', { name: 'Configuration' }).click();
    await expect(page.getByRole('tab', { name: 'Configuration' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('General settings for security, branding, reports & license.')).toBeVisible();
    await expect(page.getByText('Security Settings')).toBeVisible();
    await expect(page.getByText('Branding & Experience')).toBeVisible();
    await expect(page.getByText('Reporting Preferences')).toBeVisible();
    await expect(page.getByText('Authentication Method')).toBeVisible();
    await expect(page.getByText('Email & Password')).toBeVisible();
    await expect(page.getByText('Password Policy')).toBeVisible();
    await expect(page.getByText('Session Timeout (In minutes)')).toBeVisible();
    await expect(page.getByText('2FA Requirement (Inherited)')).toBeVisible();
    await expect(page.getByText('Default Dashboard')).toBeVisible();
    await expect(page.getByText('Data Export Permission')).toBeVisible();
    await expect(page.getByText('User Data Anonymization')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Save & Update' })).not.toBeVisible();
  });

  test('Configuration tab Branding shows logo (view mode)', async ({ page }) => {
    await page.goto('/companies/company_001');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await page.getByRole('tab', { name: 'Configuration' }).click();
    await expect(page.getByText('Branding & Experience')).toBeVisible({ timeout: 10000 });
    await expect(page.getByAltText('New York HQ logo')).toBeVisible();
  });

  test('Back button navigates to corporations', async ({ page }) => {
    await page.goto('/companies/company_001');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: /Back to company directory/i }).click();
    await expect(page).toHaveURL('/corporations');
  });

  test('Key Contacts tab: view mode shows read-only content', async ({ page }) => {
    await page.goto('/companies/company_001');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await page.getByRole('tab', { name: 'Key Contacts' }).click();
    await expect(page.getByRole('tab', { name: 'Key Contacts' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('Key Contacts').first()).toBeVisible();
    await expect(page.getByText('Setup the operating unit for the company.')).toBeVisible();
    await expect(page.getByText('Roster Details')).toBeVisible();
    await expect(page.getByText('Primary Company Admin')).toBeVisible();
    await expect(page.getByText('Ethan Carter')).toBeVisible();
  });

  test('Plan & Seats tab: view mode shows read-only content', async ({ page }) => {
    await page.goto('/companies/company_001');
    await page.getByRole('tab', { name: 'Plan & Seats' }).click();
    await expect(page.getByRole('tab', { name: 'Plan & Seats' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('Plan & Seats').first()).toBeVisible();
    await expect(page.getByText('Manage your plan allocations and seats assignments.')).toBeVisible();
    await expect(page.getByText('Plan Allocation & Seats Management')).toBeVisible();
    await expect(page.getByText('Trial Configuration')).toBeVisible();
    await expect(page.getByText('Trial Status')).toBeVisible();
    await expect(page.getByText('Active', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('14 days (Auto-expire)')).toBeVisible();
    await expect(page.getByText('ACH (Bank Transfer) Details')).toBeVisible();
  });

  test('Delete button opens DeleteCompanyConfirmationModal', async ({ page }) => {
    await page.goto('/companies/company_001');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Delete' }).click();
    const deleteDialog = page.getByRole('dialog', { name: 'Are you sure you want to delete this company?' });
    await expect(deleteDialog).toBeVisible();
    await expect(page.getByText('Are you sure you want to delete this company?')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel company deletion process' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Confirm and permanently delete company/ })).toBeVisible();
  });

  test('DeleteCompanyConfirmationModal: Cancel closes modal', async ({ page }) => {
    await page.goto('/companies/company_001');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Delete' }).click();
    const deleteDialog = page.getByRole('dialog', { name: 'Are you sure you want to delete this company?' });
    await expect(deleteDialog).toBeVisible();
    await page.getByRole('button', { name: 'Cancel company deletion process' }).click();
    await expect(deleteDialog).not.toBeVisible();
    await expect(page).toHaveURL(/\/companies\/company_001/);
  });

  test('DeleteCompanyConfirmationModal: Delete Company closes modal and redirects to /corporations', async ({ page }) => {
    await page.goto('/companies/company_001');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Delete' }).click();
    const deleteDialog = page.getByRole('dialog', { name: 'Are you sure you want to delete this company?' });
    await expect(deleteDialog).toBeVisible();
    await page.getByRole('button', { name: /Confirm and permanently delete company/ }).click();
    await expect(page.getByRole('button', { name: 'Deleting Company...' })).toBeVisible({ timeout: 2000 }).catch(() => {});
    await expect(page).toHaveURL('/corporations', { timeout: 10000 });
    await expect(page.getByText('Company deleted successfully')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Company Profile - Edit Details Page (/companies/:id/edit)', () => {
  test('navigating to edit URL shows edit form', async ({ page }) => {
    await page.goto('/companies/company_001/edit');
    await expect(page).toHaveURL(/\/companies\/company_001\/edit/);
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: 'Edit Company' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Save & Update' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  });

  test('Basic Info. tab (edit): shows form and Save & Update', async ({ page }) => {
    await page.goto('/companies/company_001/edit');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('tab', { name: 'Basic Info.' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('View and edit core company details.')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Parent Corporation' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Company Info.' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Company Address' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save & Update' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  });

  test('Basic Info. tab: Save & Update shows success toast', async ({ page }) => {
    await page.goto('/companies/company_001/edit');
    await expect(page.getByRole('tab', { name: 'Basic Info.' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('button', { name: 'Save & Update' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Save & Update' }).click();
    await expect(page.getByText('Basic Info. saved')).toBeVisible({ timeout: 5000 });
  });

  test('Configuration tab shows Security Settings, Branding, Reporting forms', async ({ page }) => {
    await page.goto('/companies/company_001/edit');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await page.getByRole('tab', { name: 'Configuration' }).click();
    await expect(page.getByRole('tab', { name: 'Configuration' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('General settings for security, branding, reports & license.')).toBeVisible();
    await expect(page.getByText('Security Settings')).toBeVisible();
    await expect(page.getByText('Branding & Experience')).toBeVisible();
    await expect(page.getByText('Branding Note')).toBeVisible();
    await expect(page.getByText('Display settings remain consistent with BSP Branding.')).toBeVisible();
    await expect(page.getByText('Upload Logo')).toBeVisible();
    await expect(page.getByText('Logo Preview')).toBeVisible();
    await expect(page.getByText('Reporting Preferences')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save & Update' })).toBeVisible();
  });

  test('Back button on edit page navigates to view page', async ({ page }) => {
    await page.goto('/companies/company_001/edit');
    await expect(page.getByText('Save & Update')).toBeVisible({ timeout: 10000 });
    const backControl = page.getByRole('button', { name: /Back to company view/i }).or(page.getByRole('link', { name: /Back to company view/i }));
    await expect(backControl).toBeVisible();
    await backControl.click();
    await expect(page).toHaveURL(/\/companies\/company_001$/);
  });

  test('Save & Update shows toast on Configuration tab', async ({ page }) => {
    await page.goto('/companies/company_001/edit');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await page.getByRole('tab', { name: 'Configuration' }).click();
    await expect(page.getByRole('button', { name: 'Save & Update' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Save & Update' }).click();
    await expect(page.getByText('Configuration saved')).toBeVisible({ timeout: 5000 });
  });

  test('breadcrumb on edit page shows Company Directory > company name > Edit', async ({ page }) => {
    await page.goto('/companies/company_001/edit');
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Company Directory')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('New York HQ')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Edit')).toBeVisible();
  });

  test('Key Contacts tab: click tab shows form content', async ({ page }) => {
    await page.goto('/companies/company_001/edit');
    await page.getByRole('tab', { name: 'Key Contacts' }).click();
    await expect(page.getByRole('tab', { name: 'Key Contacts' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('Key Contacts').first()).toBeVisible();
    await expect(page.getByText('Setup the operating unit for the company.')).toBeVisible();
    await expect(page.getByText('Roster Note')).toBeVisible();
    await expect(page.getByText(/Upload the rosters via CSV or/)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Rosters' })).toBeVisible();
    await expect(page.getByText('Upload Roster')).toBeVisible();
    await expect(page.getByText('Primary Company Admin')).toBeVisible();
    await expect(page.getByText('Secondary Company Admin')).toBeVisible();
    await expect(page.getByText('Executive Sponsor')).toBeVisible();
    await expect(page.getByText('HR/ People Ops Contact')).toBeVisible();
    await expect(page.getByText('IT/ Security Contact')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save & Update' })).toBeVisible();
  });

  test('Key Contacts tab: Save & Update shows success toast', async ({ page }) => {
    await page.goto('/companies/company_001/edit');
    await page.getByRole('tab', { name: 'Key Contacts' }).click();
    await expect(page.getByRole('button', { name: 'Save & Update' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Save & Update' }).click();
    await expect(page.getByText('Key Contacts saved')).toBeVisible({ timeout: 5000 });
  });

  test('Plan & Seats tab: click tab shows form content', async ({ page }) => {
    await page.goto('/companies/company_001/edit');
    await page.getByRole('tab', { name: 'Plan & Seats' }).click();
    await expect(page.getByRole('tab', { name: 'Plan & Seats' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('Plan & Seats').first()).toBeVisible();
    await expect(page.getByText('Manage your plan allocations and seats assignments.')).toBeVisible();
    await expect(page.getByText('Plan Allocation & Seats Management')).toBeVisible();
    await expect(page.getByText('Trial Configuration')).toBeVisible();
    await expect(page.getByText('Trial Length')).toBeVisible();
    await expect(page.getByText('Trial End Date')).toBeVisible();
    await expect(page.getByText('Trial Seats')).toBeVisible();
    await expect(page.getByText('Auto-expire Trial')).toBeVisible();
    await expect(page.getByText('ACH (Bank Transfer) Details')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save & Update' })).toBeVisible();
  });

  test('Plan & Seats tab: Save & Update shows success toast', async ({ page }) => {
    await page.goto('/companies/company_001/edit');
    await page.getByRole('tab', { name: 'Plan & Seats' }).click();
    await expect(page.getByRole('button', { name: 'Save & Update' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Save & Update' }).click();
    await expect(page.getByText('Plan & Seats saved')).toBeVisible({ timeout: 5000 });
  });

  test('Delete button opens DeleteCompanyConfirmationModal on Edit Details', async ({ page }) => {
    await page.goto('/companies/company_001/edit');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Delete' }).click();
    const deleteDialog = page.getByRole('dialog', { name: 'Are you sure you want to delete this company?' });
    await expect(deleteDialog).toBeVisible();
    await expect(page.getByText('Are you sure you want to delete this company?')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel company deletion process' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Confirm and permanently delete company/ })).toBeVisible();
  });

  test('DeleteCompanyConfirmationModal on Edit: Delete Company redirects to /corporations', async ({ page }) => {
    await page.goto('/companies/company_001/edit');
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'Delete' }).click();
    const deleteDialog = page.getByRole('dialog', { name: 'Are you sure you want to delete this company?' });
    await expect(deleteDialog).toBeVisible();
    await page.getByRole('button', { name: /Confirm and permanently delete company/ }).click();
    await expect(page).toHaveURL('/corporations', { timeout: 10000 });
    await expect(page.getByText('Company deleted successfully')).toBeVisible({ timeout: 5000 });
  });
});
