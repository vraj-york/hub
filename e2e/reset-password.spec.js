import { test, expect } from '@playwright/test';

test.describe('Reset Password Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/reset-password/valid-token');
  });

  test('navigates to /reset-password/:token and shows page content (logo, footer)', async ({ page }) => {
    await expect(page).toHaveURL(/\/reset-password\/valid-token/);
    await expect(page.getByAltText('BSPBlueprint')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Version 1.0')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Terms of Use' })).toBeVisible();
  });

  test('shows Set New Password title and description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Set New Password', level: 2 })).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByText('Must be at least 8 characters, with upper & lowercase, a symbol or a number.')
    ).toBeVisible();
  });

  test('shows Password and Confirm Password labels and inputs', async ({ page }) => {
    await expect(page.getByPlaceholder('Enter password')).toBeVisible({ timeout: 10000 });
    await expect(page.getByPlaceholder('Confirm password')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password', exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Confirm Password', exact: true })).toBeVisible();
  });

  test('password visibility toggle works', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('Enter password');
    await passwordInput.fill('Test123!');
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await page.getByRole('button', { name: 'Show password' }).first().click();
    await expect(passwordInput).toHaveAttribute('type', 'text');
    await page.getByRole('button', { name: 'Hide password' }).first().click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('password strength indicator shows Initial then updates as user types', async ({ page }) => {
    await expect(page.getByText('Initial')).toBeVisible({ timeout: 10000 });
    await page.getByPlaceholder('Enter password').fill('a');
    await expect(page.getByText('Poor')).toBeVisible({ timeout: 2000 });
    await page.getByPlaceholder('Enter password').fill('Abcdef1!');
    await expect(page.getByText(/Average|Strong/)).toBeVisible({ timeout: 2000 });
  });

  test('password strength indicator Poor state has correct progress bar fill and label styling', async ({
    page,
  }) => {
    await page.getByPlaceholder('Enter password').fill('a');
    await expect(page.getByText('Poor')).toBeVisible({ timeout: 2000 });
    const poorLabel = page.getByText('Poor');
    await expect(poorLabel).toBeVisible();
    // Spec: Poor state label Inter 500 12px rgba(196, 71, 85, 1)
    const labelColor = await poorLabel.evaluate((el) => window.getComputedStyle(el).color);
    expect(labelColor).toMatch(/rgb\(196,\s*71,\s*85\)|rgba\(196,\s*71,\s*85/);
    const progressBar = page.getByRole('progressbar');
    await expect(progressBar).toHaveAttribute('aria-valuenow', '33');
    await expect(progressBar).toHaveAttribute('aria-valuetext', 'Password strength: Poor');
    // Spec: Poor state progress bar fill rgba(196, 71, 85, 1); track rgba(241, 240, 247, 1)
    const fillColor = await progressBar.evaluate((el) => {
      const fill = el.querySelector('[style*="width"]') || el.firstElementChild;
      return fill ? window.getComputedStyle(fill).backgroundColor : '';
    });
    expect(fillColor).toMatch(/rgb\(196,\s*71,\s*85\)|rgba\(196,\s*71,\s*85/);
  });

  test('password strength indicator shows Average state with correct label and progress bar', async ({
    page,
  }) => {
    // Password with 8+ chars, upper, lower, number but no symbol → average
    await page.getByPlaceholder('Enter password').fill('Abcdef12');
    await expect(page.getByText('Average')).toBeVisible({ timeout: 2000 });
    const averageLabel = page.getByText('Average');
    await expect(averageLabel).toBeVisible();
    const progressBar = page.getByRole('progressbar');
    await expect(progressBar).toHaveAttribute('aria-valuenow', '66');
    await expect(progressBar).toHaveAttribute('aria-valuetext', 'Password strength: Average');
    // Average state: label color rgba(203, 145, 39, 1), progress fill rgba(224, 184, 74, 1)
    const labelColor = await averageLabel.evaluate((el) => window.getComputedStyle(el).color);
    expect(labelColor).toMatch(/rgb\(203,\s*145,\s*39\)|rgba\(203,\s*145,\s*39/);
  });

  test('password strength indicator shows Strong state with correct label when password is strong', async ({
    page,
  }) => {
    await page.getByPlaceholder('Enter password').fill('ValidPass1!');
    await expect(page.getByText('Strong')).toBeVisible({ timeout: 2000 });
    const strongLabel = page.getByText('Strong');
    await expect(strongLabel).toBeVisible();
    const progressBar = page.getByRole('progressbar');
    await expect(progressBar).toHaveAttribute('aria-valuenow', '100');
  });

  test('password strength indicator Strong state has correct progress bar fill and label styling', async ({
    page,
  }) => {
    await page.getByPlaceholder('Enter password').fill('ValidPass1!');
    await expect(page.getByText('Strong')).toBeVisible({ timeout: 2000 });
    const strongLabel = page.getByText('Strong');
    await expect(strongLabel).toBeVisible();
    // Spec: Strong state label Inter 500 12px rgba(47, 143, 107, 1)
    const labelColor = await strongLabel.evaluate((el) => window.getComputedStyle(el).color);
    expect(labelColor).toMatch(/rgb\(47,\s*143,\s*107\)|rgba\(47,\s*143,\s*107/);
    const progressBar = page.getByRole('progressbar');
    await expect(progressBar).toHaveAttribute('aria-valuenow', '100');
    await expect(progressBar).toHaveAttribute('aria-valuetext', 'Password strength: Strong');
    // Spec: Strong state progress bar fill rgba(47, 143, 107, 1)
    const fillColor = await progressBar.evaluate((el) => {
      const fill = el.querySelector('[style*="width"]') || el.firstElementChild;
      return fill ? window.getComputedStyle(fill).backgroundColor : '';
    });
    expect(fillColor).toMatch(/rgb\(47,\s*143,\s*107\)|rgba\(47,\s*143,\s*107/);
  });

  test('Reset Password button is initially disabled', async ({ page }) => {
    const resetBtn = page.getByRole('button', { name: 'Reset password' });
    await expect(resetBtn).toBeVisible({ timeout: 10000 });
    await expect(resetBtn).toBeDisabled();
  });

  test('Reset Password button becomes enabled when passwords meet complexity and match', async ({ page }) => {
    const resetBtn = page.getByRole('button', { name: 'Reset password' });
    await page.getByPlaceholder('Enter password').fill('ValidPass1!');
    await page.getByPlaceholder('Confirm password').fill('ValidPass1!');
    await expect(resetBtn).toBeEnabled({ timeout: 2000 });
  });

  test('Reset Password button has correct background color per structural data', async ({ page }) => {
    const resetBtn = page.getByRole('button', { name: 'Reset password' });
    await expect(resetBtn).toBeVisible({ timeout: 10000 });
    const bgColor = await resetBtn.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.backgroundColor;
    });
    // Spec (structural data): rgba(99, 146, 205, 1) PRIMARY_ACCENT_BLUE for Reset Password button
    expect(bgColor).toMatch(/rgb\(99,\s*146,\s*205\)|rgba\(99,\s*146,\s*205/);
  });

  test('Back to Login navigates to /login', async ({ page }) => {
    await page.getByRole('button', { name: 'Back to login page' }).click();
    await expect(page).toHaveURL('/login', { timeout: 5000 });
  });

  test('client-side validation shows error for short password', async ({ page }) => {
    await page.getByPlaceholder('Enter password').fill('short');
    await page.getByPlaceholder('Confirm password').focus();
    await expect(page.getByText('Password must be at least 8 characters.')).toBeVisible({ timeout: 2000 });
  });

  test('client-side validation shows error when passwords do not match', async ({ page }) => {
    await page.getByPlaceholder('Enter password').fill('ValidPass1!');
    await page.getByPlaceholder('Confirm password').fill('ValidPass2!');
    await expect(page.getByText('Passwords do not match.')).toBeVisible({ timeout: 2000 });
    const resetBtn = page.getByRole('button', { name: 'Reset password' });
    await expect(resetBtn).toBeDisabled();
  });

  test('successful reset shows GlobalToast and redirects to /login', async ({ page }) => {
    await page.getByPlaceholder('Enter password').fill('ValidPass1!');
    await page.getByPlaceholder('Confirm password').fill('ValidPass1!');
    await page.getByRole('button', { name: 'Reset password' }).click();
    await expect(page.getByRole('button').filter({ hasText: 'Resetting Password...' })).toBeVisible({
      timeout: 4000,
    });
    const toast = page.getByRole('alert');
    await expect(toast).toBeVisible({ timeout: 10000 });
    await expect(toast).toContainText('Password reset successfully');
    await expect(page).toHaveURL('/login', { timeout: 5000 });
  });

  test('invalid token shows GlobalToast error', async ({ page }) => {
    await page.goto('/reset-password/invalid-token');
    await page.getByPlaceholder('Enter password').fill('ValidPass1!');
    await page.getByPlaceholder('Confirm password').fill('ValidPass1!');
    await page.getByRole('button', { name: 'Reset password' }).click();
    const toast = page.getByRole('alert');
    await expect(toast).toBeVisible({ timeout: 10000 });
    await expect(toast).toContainText('Failed to reset password');
  });
});
