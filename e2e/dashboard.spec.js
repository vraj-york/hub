import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test('navigates to /dashboard and shows layout', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard Overview', level: 1 })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('navigation').first()).toBeVisible();
  });

  test('shows breadcrumb Dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByText('Dashboard', { exact: true }).first()).toBeVisible({ timeout: 10000 });
  });

  test('shows page title Dashboard Overview and description', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard Overview', level: 1 })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Monitor and manage your entire platform')).toBeVisible();
  });

  test('shows Export Report button with correct label and aria-label', async ({ page }) => {
    await page.goto('/dashboard');
    const exportBtn = page.getByRole('button', { name: 'Export dashboard report' });
    await expect(exportBtn).toBeVisible({ timeout: 10000 });
    await expect(exportBtn).toHaveText('Export Report');
  });

  test('shows empty state messages when no metrics available', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByText('No metrics available')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Metrics will appear here once data is generated.')).toBeVisible();
  });

  test('Dashboard sidebar item is active when on /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    const dashboardNav = page.getByRole('link', { name: 'Navigate to Dashboard' });
    await expect(dashboardNav).toBeVisible({ timeout: 10000 });
    await expect(dashboardNav).toHaveAttribute('aria-current', 'page');
  });

  test('header shows theme toggle (moon) and notifications (bell)', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('button', { name: 'Toggle dark mode' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: 'Notifications' })).toBeVisible();
  });

  test('SuperAdminPersonaDisplay is rendered with correct content and accessibility', async ({ page }) => {
    await page.goto('/dashboard');
    const region = page.getByRole('region', { name: 'Super Admin Persona Details' });
    await expect(region).toBeVisible({ timeout: 10000 });
    await expect(region).toHaveText('Super Admin Persona - Light Theme');
  });

  test('SuperAdminPersonaDisplay has correct visual styles', async ({ page }) => {
    await page.goto('/dashboard');
    const region = page.getByRole('region', { name: 'Super Admin Persona Details' });
    await expect(region).toBeVisible({ timeout: 10000 });
    // Browser may return rgb() for opaque rgba()
    const bgColor = await region.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(bgColor).toMatch(/rgb\(48,\s*95,\s*161\)|rgba\(48,\s*95,\s*161,\s*1\)/);
    const text = region.getByText('Super Admin Persona - Light Theme');
    await expect(text).toBeVisible();
    const textColor = await text.evaluate((el) => window.getComputedStyle(el).color);
    expect(textColor).toMatch(/rgb\(255,\s*255,\s*255\)|rgba\(255,\s*255,\s*255,\s*1\)/);
    await expect(text).toHaveCSS('font-weight', '500');
    await expect(text).toHaveCSS('font-family', /Inter/i);
  });

  test.describe('mobile viewport', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('shows mobile header with Logo Wrapper, panel-left, and ellipsis', async ({ page }) => {
      await page.goto('/dashboard');
      await expect(page.getByRole('banner')).toBeVisible({ timeout: 10000 });
      await expect(page.getByRole('button', { name: 'Toggle navigation menu' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'More options' })).toBeVisible();
      await expect(page.getByAltText('BSPBlueprint')).toBeVisible();
    });

    test('page title and empty state use updated typography', async ({ page }) => {
      await page.goto('/dashboard');
      const heading = page.getByRole('heading', { name: 'Dashboard Overview', level: 1 });
      await expect(heading).toBeVisible({ timeout: 10000 });
      await expect(heading).toHaveCSS('font-size', '16px');
      await expect(page.getByText('No metrics available')).toBeVisible();
      await expect(page.getByText('Metrics will appear here once data is generated.')).toBeVisible();
    });

    test('Toggle navigation menu opens mobile sidebar', async ({ page }) => {
      await page.goto('/dashboard');
      await expect(page.getByRole('button', { name: 'Toggle navigation menu' })).toBeVisible({ timeout: 10000 });
      await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
      await expect(page.getByRole('link', { name: 'Navigate to Dashboard' })).toBeVisible({ timeout: 5000 });
    });
  });
});
