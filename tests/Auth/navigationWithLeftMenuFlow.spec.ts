import { test, expect } from '../../fixtures/pomFixtures';


test('navigation with left menu', async ({ page, login, dashboardPage }) => {
  await dashboardPage.leftMenuPage.clickOption('admin');
  await expect(page.getByText('System Users')).toBeVisible();
  await dashboardPage.leftMenuPage.clickOption('pim');
  await expect(page.getByText('Employee Information')).toBeVisible();
});
