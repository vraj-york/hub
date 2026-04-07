import { test, expect } from '@playwright/test';

async function waitForCompanyDirectoryReady(page) {
  await page.goto('/companies');
  await expect(page).toHaveURL('/companies');
  await expect(page.getByText('View and manage all companies across the platform')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('COMP-001')).toBeVisible({ timeout: 20000 });
}

test.describe('Company Directory Page', () => {
  test('navigates to /companies and shows page title and description', async ({ page }) => {
    await waitForCompanyDirectoryReady(page);
    await expect(page.getByText('View and manage all companies across the platform')).toBeVisible();
  });

  test('Add New Company button is visible and navigates to /companies/add', async ({ page }) => {
    await waitForCompanyDirectoryReady(page);
    const addLink = page.getByRole('link', { name: 'Add a new company' });
    await expect(addLink).toBeVisible();
    await addLink.click();
    await expect(page).toHaveURL('/companies/add');
  });

  test('SearchInput with placeholder and filters are visible', async ({ page }) => {
    await waitForCompanyDirectoryReady(page);
    await expect(page.getByPlaceholder('Search here...')).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Filter by company status/i })).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Filter by company plan/i })).toBeVisible();
    await expect(page.getByRole('combobox', { name: /Filter by assigned corporation/i })).toBeVisible();
  });

  test('Table headers are visible: Company ID, Company Name, Status, Assigned Corporation, Plan, Seat Usage, Created On, Last Updated On, Actions', async ({ page }) => {
    await waitForCompanyDirectoryReady(page);
    await expect(page.getByText('Company ID').first()).toBeVisible();
    await expect(page.getByText('Company Name').first()).toBeVisible();
    await expect(page.getByText('Status').first()).toBeVisible();
    await expect(page.getByText('Assigned Corporation').first()).toBeVisible();
    await expect(page.getByText('Plan').first()).toBeVisible();
    await expect(page.getByText('Seat Usage').first()).toBeVisible();
    await expect(page.getByText('Created On').first()).toBeVisible();
    await expect(page.getByText('Last Updated On').first()).toBeVisible();
    await expect(page.getByText('Actions').first()).toBeVisible();
  });

  test('Table displays company rows with data including seat usage and dates', async ({ page }) => {
    await waitForCompanyDirectoryReady(page);
    await expect(page.getByText('New York HQ')).toBeVisible();
    await expect(page.getByText('US East').first()).toBeVisible();
    await expect(page.getByText('Assigned').first()).toBeVisible();
    await expect(page.getByText('Acme Corporation').first()).toBeVisible();
    await expect(page.getByText('Enterprise').first()).toBeVisible();
    await expect(page.getByText('250 / 300')).toBeVisible();
    await expect(page.getByText('01-15-2025').first()).toBeVisible();
    await expect(page.getByText('01-20-2025').first()).toBeVisible();
  });

  test('View (eye) action navigates to company details', async ({ page }) => {
    await waitForCompanyDirectoryReady(page);
    const viewBtn = page.getByRole('button', { name: 'View details for New York HQ' });
    await expect(viewBtn).toBeVisible();
    await viewBtn.click();
    await expect(page).toHaveURL(/\/companies\/COMP-001/);
    await expect(page.getByText('New York HQ').first()).toBeVisible({ timeout: 10000 });
  });

  test('Edit (square-pen) action navigates to company edit page', async ({ page }) => {
    await waitForCompanyDirectoryReady(page);
    const editBtn = page.getByRole('button', { name: 'Edit New York HQ details' });
    await expect(editBtn).toBeVisible();
    await editBtn.click();
    await expect(page).toHaveURL(/\/companies\/COMP-001\/edit/);
  });

  test('Delete (trash) action opens DeleteCompanyConfirmationModal', async ({ page }) => {
    await waitForCompanyDirectoryReady(page);
    const deleteBtn = page.getByRole('button', { name: 'Delete New York HQ' });
    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();
    await expect(page.getByRole('dialog', { name: 'Are you sure you want to delete this company?' })).toBeVisible();
    await expect(page.getByText('Are you sure you want to delete this company?')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel company deletion process' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Confirm and permanently delete company/ })).toBeVisible();
  });

  test('TablePagination shows "Showing N entries" and Previous/Next buttons', async ({ page }) => {
    await waitForCompanyDirectoryReady(page);
    await expect(page.getByText(/Showing \d+ entries/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Previous page' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next page' })).toBeVisible();
  });

  test('Pagination: clicking Next updates table content', async ({ page }) => {
    await waitForCompanyDirectoryReady(page);
    await page.getByRole('button', { name: 'Next page' }).click();
    await expect(page).toHaveURL('/companies');
    await expect(page.getByText(/Showing \d+ entries/)).toBeVisible();
  });

  test('Search input filters table data', async ({ page }) => {
    await waitForCompanyDirectoryReady(page);
    const searchInput = page.getByPlaceholder('Search here...');
    await searchInput.fill('New York');
    await expect(page.getByText('New York HQ')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('COMP-001')).toBeVisible();
  });

  test('Breadcrumb shows Company Directory when on /companies', async ({ page }) => {
    await waitForCompanyDirectoryReady(page);
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' }).getByText('Company Directory')).toBeVisible();
  });
});
