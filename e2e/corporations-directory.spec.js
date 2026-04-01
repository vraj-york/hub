import { test, expect } from '@playwright/test';

test.describe('Corporation Directory Page', () => {
  test('shows page title, description, and Add New Corporation button', async ({ page }) => {
    await page.goto('/corporations');
    await expect(page.getByRole('heading', { name: 'Corporations', level: 1 })).toBeVisible();
    await expect(page.getByText('View and manage all corporations across the platform')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add a new corporation' })).toBeVisible();
  });

  test('Add New Corporation button navigates to /corporations/add', async ({ page }) => {
    await page.goto('/corporations');
    await page.getByRole('button', { name: 'Add a new corporation' }).click();
    await expect(page).toHaveURL('/corporations/add');
  });

  test('shows SearchInput and filter CustomSelects', async ({ page }) => {
    await page.goto('/corporations');
    await expect(page.getByPlaceholder('Search here...')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('searchbox', { name: 'Search corporation directory' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Filter by corporation status' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Filter by creation time range' })).toBeVisible();
  });

  test('shows table with expected column headers', async ({ page }) => {
    await page.goto('/corporations');
    await expect(page.getByRole('columnheader', { name: 'Corp. ID' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('columnheader', { name: 'Corporation Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Executive Sponsor' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Companies' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Created On' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Actions' })).toBeVisible();
  });

  test('table shows corporation data and status badges', async ({ page }) => {
    await page.goto('/corporations');
    await expect(page.getByText(/Showing \d+ corporations/)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Acme Corporation')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Active').first()).toBeVisible();
    await expect(page.getByText('North America').first()).toBeVisible();
    await expect(page.getByText('Alice Johnson')).toBeVisible();
  });

  test('pagination shows corporations count and controls', async ({ page }) => {
    await page.goto('/corporations');
    await expect(page.getByText(/Showing \d+ corporations/)).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('navigation', { name: 'Corporation list pagination' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Previous page' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next page' })).toBeVisible();
  });

  test('View details action navigates to corporation profile', async ({ page }) => {
    await page.goto('/corporations');
    await expect(page.getByText(/Showing \d+ corporations/)).toBeVisible({ timeout: 10000 });
    const viewButton = page.getByRole('button', { name: /View details for Acme Corporation/i });
    await expect(viewButton).toBeVisible({ timeout: 5000 });
    await viewButton.click();
    await expect(page).toHaveURL(/\/corporations\/corp_001\/profile/);
  });
});
