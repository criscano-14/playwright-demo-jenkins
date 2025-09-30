import { Page, Locator } from "@playwright/test";
import leftMenuOptions from '../testData/leftMenuOptions.json';
import BasePage from './basePage';

export class LeftMenuPage extends BasePage {

    private readonly options: Record<string, Locator>;

    constructor(page: Page) {
        super(page);
        this.options = {};
        for (const key of Object.keys(leftMenuOptions) as (keyof typeof leftMenuOptions)[]) {
            this.options[key] = page.getByRole('link', { name: leftMenuOptions[key] });
        }
    }

    async clickOption(optionName: string) {
        const option = this.options[optionName];
        await option.waitFor({ state: 'visible', timeout: 10000 });
        if (!option) throw new Error(`Menu option '${optionName}' does not exist`);
        
        await this.clickElement(option);
    }
}