import {test as baseTest} from '@playwright/test';
import {LandingPage} from '../tests/pages/landingPage';
import {HomePage} from '../tests/pages/homePage';
import {SignInPage} from '../tests/pages/signinPage';
import {SettingsPage} from '../tests/pages/settingsPage';
import { HeaderPage } from '../tests/pages/headerPage';
import { allure } from 'allure-playwright';

type pages = {
    landingPage: LandingPage,
    homePage: HomePage,
    signinPage: SignInPage,
    settingsPage: SettingsPage,
    headerPage: HeaderPage
}

const testPages = baseTest.extend<pages>({
    landingPage: async({page}, use)=>{
        await use(new LandingPage(page));
    },
    homePage: async({page}, use)=>{
        await use(new HomePage(page));
    },
    signinPage: async({page}, use)=>{
        await use(new SignInPage(page));
    },
    headerPage: async({page}, use)=>{
        await use(new HeaderPage(page));
    },
    settingsPage: async({page}, use)=>{
        await use(new SettingsPage(page));
    }
})

testPages.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    // Screenshot
    const screenshot = await page.screenshot();
    allure.attachment('Screenshot', screenshot, 'image/png');

    // Page source
    const html = await page.content();
    allure.attachment('Page Source', html, 'text/html');
  }
});

export const test = testPages;
export const expect = testPages.expect;