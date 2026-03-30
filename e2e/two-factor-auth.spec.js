import { test, expect } from '@playwright/test';

test.describe('Two-Factor Authentication (2FA)', () => {
  test('navigates to /2fa/verify and shows page content (logo, dialog, footer)', async ({ page }) => {
    await page.goto('/2fa/verify');
    await expect(page.getByAltText('BSPBlueprint')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'Password Reset' })).toBeVisible();
    await expect(page.getByText(/We've sent a 6-digit code/)).toBeVisible();
    await expect(page.getByText(/ad\*\*\*@pcsglobal\.com/)).toBeVisible();
    await expect(page.getByText("Didn't receive a code?")).toBeVisible();
    await expect(page.getByText('Version 1.0')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Terms of Use' })).toBeVisible();
  });

  test('Enter code label and Resend Code link are present', async ({ page }) => {
    await page.goto('/2fa/verify');
    await expect(page.getByText(/Enter code/)).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: 'Resend verification code' })).toBeVisible();
  });

  test('Enter code label and countdown timer are on same row above OTP inputs', async ({ page }) => {
    await page.goto('/2fa/verify');
    await expect(page.getByText(/Enter code/)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/\d{2}:\d{2}/)).toBeVisible();
  });

  test('OTP inputs show placeholder 0 and Verify Account button state', async ({ page }) => {
    await page.goto('/2fa/verify');
    const firstInput = page.getByLabel(/Verification code digit 1/);
    await expect(firstInput).toHaveAttribute('placeholder', '0');
    const verifyBtn = page.getByRole('button', { name: 'Verify Account' });
    await expect(verifyBtn).toBeDisabled();
  });

  test('dialog has accessible title and label associated with OTP group', async ({ page }) => {
    await page.goto('/2fa/verify');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('aria-labelledby', '2fa-dialog-title');
    await expect(page.getByRole('heading', { name: 'Password Reset' })).toHaveAttribute('id', '2fa-dialog-title');
    const otpGroup = page.getByRole('group', { name: /Enter code|Verification/ });
    await expect(otpGroup).toHaveAttribute('aria-labelledby', 'otp-input-label');
  });

  test('Verify Account button is disabled until 6 digits entered', async ({ page }) => {
    await page.goto('/2fa/verify');
    const verifyBtn = page.getByRole('button', { name: 'Verify Account' });
    await expect(verifyBtn).toBeDisabled();
    const firstInput = page.getByLabel(/Verification code digit 1/);
    await firstInput.fill('1');
    await expect(verifyBtn).toBeDisabled();
    for (let i = 2; i <= 6; i++) {
      await page.getByLabel(new RegExp(`Verification code digit ${i}`)).fill(String(i));
    }
    await expect(verifyBtn).toBeEnabled();
  });

  test('entering correct code (123456) redirects to corporations', async ({ page }) => {
    await page.goto('/2fa/verify');
    const digits = ['1', '2', '3', '4', '5', '6'];
    for (let i = 0; i < 6; i++) {
      await page.getByLabel(new RegExp(`Verification code digit ${i + 1}`)).fill(digits[i]);
    }
    await page.getByRole('button', { name: 'Verify Account' }).click();
    await expect(page).toHaveURL('/corporations', { timeout: 5000 });
  });

  test('entering incorrect code shows GlobalToast with error message', async ({ page }) => {
    await page.goto('/2fa/verify');
    for (let i = 1; i <= 6; i++) {
      await page.getByLabel(new RegExp(`Verification code digit ${i}`)).fill('0');
    }
    await page.getByRole('button', { name: 'Verify Account' }).click();
    const toast = page.getByRole('alert').filter({ hasText: "We couldn't verify your credentials." });
    await expect(toast).toBeVisible({ timeout: 5000 });
    await expect(toast.getByText("We couldn't verify your credentials.")).toBeVisible();
    await expect(toast.getByText('Kindly get a new code & try again.')).toBeVisible();
  });

  test('GlobalToast is dismissible via close button', async ({ page }) => {
    await page.goto('/2fa/verify');
    for (let i = 1; i <= 6; i++) {
      await page.getByLabel(new RegExp(`Verification code digit ${i}`)).fill('0');
    }
    await page.getByRole('button', { name: 'Verify Account' }).click();
    const toast = page.getByRole('alert').filter({ hasText: "We couldn't verify your credentials." });
    await expect(toast).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: 'Dismiss error message' }).click();
    await expect(toast).not.toBeVisible();
  });

  test('Resend Code link is present', async ({ page }) => {
    await page.goto('/2fa/verify');
    await expect(page.getByRole('button', { name: 'Resend verification code' })).toBeVisible();
  });

  test('Back to Login button navigates to /login', async ({ page }) => {
    await page.goto('/2fa/verify');
    await expect(page.getByRole('button', { name: 'Back to login page' })).toBeVisible();
    await page.getByRole('button', { name: 'Back to login page' }).click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('OTP paste populates all fields', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/2fa/verify');
    const firstInput = page.getByLabel(/Verification code digit 1/);
    await firstInput.click();
    await page.evaluate(() => navigator.clipboard.writeText('123456'));
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+v' : 'Control+v');
    await expect(page.getByRole('button', { name: 'Verify Account' })).toBeEnabled({ timeout: 3000 });
  });

  test('email template preview shows verification code layout (logo, content, code)', async ({ page }) => {
    await page.goto('/2fa/email-preview');
    await expect(page.getByAltText('BSPBlueprint')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('document', { name: 'Verification code email' })).toBeVisible();
    await expect(page.getByText('Your verification code')).toBeVisible();
    await expect(page.getByText('123456')).toBeVisible();
    await expect(page.getByText(/ad\*\*\*@pcsglobal\.com/)).toBeVisible();
  });

  test('error state: Enter code label above OTP inputs, inline error and entered digits visible', async ({ page }) => {
    await page.goto('/2fa/verify');
    await expect(page.getByText(/Enter code/)).toBeVisible({ timeout: 10000 });
    const digits = ['2', '3', '4', '5', '6', '7'];
    for (let i = 0; i < 6; i++) {
      await page.getByLabel(new RegExp(`Verification code digit ${i + 1}`)).fill(digits[i]);
    }
    await page.getByRole('button', { name: 'Verify Account' }).click();
    await expect(page.getByText('The verification code is invalid.')).toBeVisible({ timeout: 5000 });
    const errorEl = page.getByText('The verification code is invalid.');
    await expect(errorEl).toHaveAttribute('id', 'otp-error-message');
    await expect(errorEl).toHaveAttribute('role', 'alert');
    for (let i = 0; i < 6; i++) {
      const input = page.getByLabel(new RegExp(`Verification code digit ${i + 1}`));
      await expect(input).toHaveValue(digits[i]);
    }
    // CountdownTimer is hidden in error state (per Mobile 2FA/ Code - Toast Message spec)
    await expect(page.getByText(/\d{2}:\d{2}/)).not.toBeVisible();
  });
});
