import { test, expect } from '../../fixtures/pomFixtures';
import loginData from '../testData/orangeHRMCredentials.json';




test.describe('Login Logout Flow', () => {

  test.beforeEach(async ({ page, signinPage }) => {
    await page.context().clearCookies();
    await signinPage.navigateTo('login');
  });

  test('Test login valid credentials', async ({ signinPage, dashboardPage }) => {
    expect(await dashboardPage.headerPage.getHeaderText()).toContain('Dashboard');
    await dashboardPage.headerPage.selectDropdownOption('Logout');
    await signinPage.isForgotPasswordLinkVisible();
  });

  test('Test login invalid credentials - Displays invalid credentials message', async ({ page, signinPage }) => {
    await signinPage.loginToApplication(loginData[1].username, loginData[1].password);
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});
