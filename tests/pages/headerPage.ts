import { Page, Locator } from "@playwright/test";
import BasePage from './basePage';

export class HeaderPage extends BasePage {
    private readonly header: Locator;
    private readonly upgradeButton: Locator;
    private readonly dropdownOptions: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.locator('header h6');
        this.upgradeButton = page.locator('button', { hasText: 'Upgrade' });
        this.dropdownOptions = page.locator('.oxd-userdropdown-tab');
    }

    async getHeaderText(): Promise<string> {
        await this.header.waitFor({ state: 'visible' });
        return await this.header.innerText();
    }

    async clickUpgradeButton(): Promise<void> {
        await this.clickElement(this.upgradeButton);
    }

    async openDropdown(): Promise<void> {
        await this.clickElement(this.dropdownOptions);
    }

    async selectDropdownOption(option: 'About' | 'Support' | 'Change Password' | 'Logout'): Promise<void> {
        await this.openDropdown();
        const optionLocator = this.page.locator('.oxd-userdropdown-link', { hasText: option });
        await optionLocator.click();
    }
}