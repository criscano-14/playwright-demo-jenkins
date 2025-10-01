import { test as baseTest } from '@playwright/test';
import { SignInPage } from '../tests/pages/signinPage';
import { DashboardPage } from '../tests/pages/dashboardPage';
import { BuzzPage } from '../tests/pages/buzzPage';
import loginData from '../tests/testData/orangeHRMCredentials.json';
import { allure } from 'allure-playwright';

type Pages = {
    signinPage: SignInPage,
    dashboardPage: DashboardPage,
    buzzPage: BuzzPage,
    login: boolean
}

export const test = baseTest.extend<Pages>({
    signinPage: async ({ page }, use) => {
        await use(new SignInPage(page));
    },
    login: async ({ signinPage }, use) => {
        await signinPage.navigateTo('login');
        await signinPage.loginToApplication(loginData[0].username, loginData[0].password);
        await use(true);
    },
    dashboardPage: async ({ page, login }, use) => {
        await use(new DashboardPage(page));
    },
    buzzPage: async ({ page, dashboardPage }, use) => {
        await dashboardPage.leftMenuPage.clickOption('buzz');
        await use(new BuzzPage(page));
    }
})

export const expect = baseTest.expect;