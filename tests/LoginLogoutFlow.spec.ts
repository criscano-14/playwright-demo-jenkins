import { test, expect } from '../fixtures/pomFixtures';
import loginData from './testData/orangeHRMCredentials.json';


// test('Login Conduit test using POM', async ({ page }) => {
//   // const landingPage = new LandingPage(page);
//   const headerPage = new HeaderPage(page);
//   const signInPage = new SignInPage(page);

//   await signInPage.navigateTo('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
//   await signInPage.enterEmailId("Admin");
//   await signInPage.enterPassword("admin123");
//   await signInPage.clickSignInButton();
//   expect(await headerPage.getHeaderText()).toContain('Dashboard');
//   await headerPage.selectDropdownOption('Logout');
//   await page.close();
// });




test.describe('Login tests', () => {
  for (const element of loginData) {
    test(`login with ${element.valid}`, async ({ page, signinPage, headerPage }) => {
      await signinPage.navigateTo('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      await signinPage.enterEmailId(element.username);
      await signinPage.enterPassword(element.password);
      await signinPage.clickSignInButton();
      if (element.valid) {
        expect(await headerPage.getHeaderText()).toContain('Dashboard');
        await headerPage.selectDropdownOption('Logout');
        await signinPage.isForgotPasswordLinkVisible();
      } else {
        await expect(page.getByText('kk')).toBeVisible();
      }
      await page.close();
    });
  }
});
