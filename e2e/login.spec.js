import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('navigates to /login and shows page content (logo, footer, login card)', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL('/login');
    await expect(page.getByAltText('BSPBlueprint')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Version 1.0')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Terms of Use' })).toBeVisible();
  });

  test('shows LoginCard with title Welcome back! and description', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Welcome back!', level: 1 })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Enter your email and password to sign in.')).toBeVisible();
  });

  test('shows Email and Password labels and inputs', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByLabel(/Email/)).toBeVisible({ timeout: 10000 });
    await expect(page.getByPlaceholder('Enter email')).toBeVisible();
    await expect(page.getByLabel(/Password/)).toBeVisible();
    await expect(page.getByPlaceholder('Enter password')).toBeVisible();
  });

  test('password visibility toggle toggles input type', async ({ page }) => {
    await page.goto('/login');
    const passwordInput = page.getByPlaceholder('Enter password');
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await page.getByRole('button', { name: 'Show password' }).click();
    await expect(passwordInput).toHaveAttribute('type', 'text');
    await page.getByRole('button', { name: 'Hide password' }).click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('Remember me switch toggles', async ({ page }) => {
    await page.goto('/login');
    const switchEl = page.getByRole('switch', { name: 'Remember me' });
    await expect(switchEl).toBeVisible({ timeout: 10000 });
    await expect(switchEl).not.toBeChecked();
    await switchEl.click();
    await expect(switchEl).toBeChecked();
    await switchEl.click();
    await expect(switchEl).not.toBeChecked();
  });

  test('Forgot Password? link navigates to /forgot-password', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Forgot password? Navigate to account recovery page' }).click();
    await expect(page).toHaveURL('/forgot-password', { timeout: 5000 });
  });

  test('Login button is initially disabled', async ({ page }) => {
    await page.goto('/login');
    const loginBtn = page.getByRole('button', { name: 'Login' });
    await expect(loginBtn).toBeVisible({ timeout: 10000 });
    await expect(loginBtn).toBeDisabled();
  });

  test('Login button becomes enabled when valid email and password are entered', async ({ page }) => {
    await page.goto('/login');
    const loginBtn = page.getByRole('button', { name: 'Login' });
    await expect(loginBtn).toBeDisabled();
    await page.getByPlaceholder('Enter email').fill('admin@pcsglobal.com');
    await page.getByPlaceholder('Enter password').fill('password123');
    await expect(loginBtn).toBeEnabled();
  });

  test('client-side validation keeps Login disabled for invalid email', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('Enter email').fill('invalid');
    await page.getByPlaceholder('Enter password').fill('password123');
    const loginBtn = page.getByRole('button', { name: 'Login' });
    await expect(loginBtn).toBeDisabled();
  });

  test('invalid email shows inline error message and Login button remains disabled', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('Enter email').fill('invalid-email');
    await page.getByPlaceholder('Enter password').click();
    await expect(page.getByText('Your email address is invalid.')).toBeVisible({ timeout: 3000 });
    const loginBtn = page.getByRole('button', { name: 'Login' });
    await expect(loginBtn).toBeDisabled();
  });

  test('invalid email with blur shows inline error and Login stays disabled', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('Enter email').fill('notanemail');
    await page.getByPlaceholder('Enter password').click();
    await expect(page.getByText('Your email address is invalid.')).toBeVisible({ timeout: 3000 });
    const loginBtn = page.getByRole('button', { name: 'Login' });
    await expect(loginBtn).toBeDisabled();
  });

  test('email error message has id login-email-error for accessibility', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('Enter email').fill('invalid-email');
    await page.getByPlaceholder('Enter password').click();
    const errorEl = page.locator('#login-email-error');
    await expect(errorEl).toBeVisible({ timeout: 3000 });
    await expect(errorEl).toHaveText('Your email address is invalid.');
  });

  test('Mobile Login - Details Filled: filled inputs and Remember me on show enabled Login', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/login');
    await page.getByPlaceholder('Enter email').fill('admin@pcsglobal.com');
    await page.getByPlaceholder('Enter password').fill('password123');
    await page.getByRole('switch', { name: 'Remember me' }).click();
    const loginBtn = page.getByRole('button', { name: 'Login' });
    await expect(loginBtn).toBeEnabled();
    await expect(page.getByRole('heading', { name: 'Welcome back!', level: 1 })).toBeVisible();
    await expect(page.getByText('Enter your email and password to sign in.')).toBeVisible();
    await expect(page.getByText('Need help?')).toBeVisible();
    await expect(page.getByAltText('BSPBlueprint')).toBeVisible();
  });

  test('empty password with blur shows validation error and Login stays disabled', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('Enter email').fill('valid@example.com');
    const passwordInput = page.getByPlaceholder('Enter password');
    await passwordInput.click();
    await page.getByLabel(/Email/).click();
    await expect(page.getByText('Please enter your password.')).toBeVisible({ timeout: 2000 });
    const loginBtn = page.getByRole('button', { name: 'Login' });
    await expect(loginBtn).toBeDisabled();
  });

  test('successful login shows loading state then redirects to /dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('Enter email').fill('admin@pcsglobal.com');
    await page.getByPlaceholder('Enter password').fill('anypassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('button', { name: 'Logging In...' })).toBeVisible({ timeout: 4000 });
    await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
  });

  test('failed login displays GlobalToast error', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('Enter email').fill('fail@test.com');
    await page.getByPlaceholder('Enter password').fill('wrong');
    await page.getByRole('button', { name: 'Login' }).click();
    const toast = page.getByRole('alert');
    await expect(toast).toBeVisible({ timeout: 10000 });
    await expect(toast).toContainText('Login failed');
  });

  test('shows Need help? text and Contact Us link', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByText('Need help?')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: 'Contact support for assistance' })).toBeVisible();
  });

  test('AuthPageFooter shows Version 1.0 and Privacy Policy | Terms of Use', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByText('Version 1.0')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Terms of Use' })).toBeVisible();
  });
});
