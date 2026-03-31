import { test, expect } from '@playwright/test';

test.describe('Forgot Password Page', () => {
  test('navigates to /forgot-password and shows page content (logo, footer, dialog)', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page).toHaveURL('/forgot-password');
    await expect(page.getByAltText('BSPBlueprint')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Version 1.0')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Terms of Use' })).toBeVisible();
  });

  test('shows Forgot Password title and description', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.getByRole('heading', { name: 'Forgot Password?', level: 2 })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('No worries — we\'ll send you reset instructions.')).toBeVisible();
  });

  test('shows Email label and input with placeholder Enter email', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.getByLabel(/Email/)).toBeVisible({ timeout: 10000 });
    await expect(page.getByPlaceholder('Enter email')).toBeVisible();
  });

  test('Send Instructions button is initially disabled', async ({ page }) => {
    await page.goto('/forgot-password');
    const sendBtn = page.getByRole('button', { name: 'Send password reset instructions' });
    await expect(sendBtn).toBeVisible({ timeout: 10000 });
    await expect(sendBtn).toBeDisabled();
  });

  test('Send Instructions button becomes enabled when valid email is entered', async ({ page }) => {
    await page.goto('/forgot-password');
    const sendBtn = page.getByRole('button', { name: 'Send password reset instructions' });
    await expect(sendBtn).toBeDisabled();
    await page.getByPlaceholder('Enter email').fill('user@example.com');
    await expect(sendBtn).toBeEnabled();
  });

  test('client-side validation shows error for invalid email and button stays disabled', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.getByPlaceholder('Enter email').fill('invalid');
    const sendBtn = page.getByRole('button', { name: 'Send password reset instructions' });
    await expect(sendBtn).toBeDisabled();
    await expect(page.getByText('Your email address is invalid.')).toBeVisible({ timeout: 2000 });
  });

  test('Back to Login button navigates to /login', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.getByRole('button', { name: 'Navigate back to the login page' }).click();
    await expect(page).toHaveURL('/login', { timeout: 5000 });
  });

  test('Send Instructions shows loading state then success toast and redirects to /login', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.getByPlaceholder('Enter email').fill('user@example.com');
    await page.getByRole('button', { name: 'Send password reset instructions' }).click();
    await expect(page.getByRole('button').filter({ hasText: 'Sending instructions...' })).toBeVisible({ timeout: 4000 });
    const toast = page.getByRole('alert');
    await expect(toast).toBeVisible({ timeout: 10000 });
    await expect(toast).toContainText('Password reset instructions sent');
    await expect(page).toHaveURL('/login', { timeout: 5000 });
  });

  test('failed submission displays GlobalToast error', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.getByPlaceholder('Enter email').fill('fail@test.com');
    await page.getByRole('button', { name: 'Send password reset instructions' }).click();
    const toast = page.getByRole('alert');
    await expect(toast).toBeVisible({ timeout: 10000 });
    await expect(toast).toContainText('Failed to send reset instructions');
  });
});
