import { Page, Locator } from "@playwright/test";
import BasePage from './basePage';
import { HeaderPage } from "./headerPage";
import { LeftMenuPage } from "./leftMenuPage";

export class BuzzPage extends BasePage {
    private readonly header: HeaderPage;
    private readonly leftMenu: LeftMenuPage;
    private readonly postInput: Locator;
    private readonly submitPostButton: Locator;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderPage(page);
        this.leftMenu = new LeftMenuPage(page);
        this.postInput = page.getByPlaceholder('What\'s on your mind?');
        this.submitPostButton = page.locator('button[type="submit"]');
    }

    get headerPage(): HeaderPage {
        return this.header;
    }

    get leftMenuPage(): LeftMenuPage {
        return this.leftMenu;
    }
    
    async fillPostInput(postContent: string): Promise<void> {
        await this.fillFormField(this.postInput, postContent);
    }

    async clickSubmitPostButton(): Promise<void> {
        await this.clickElement(this.submitPostButton);
    }

    async createNewPost(postContent: string): Promise<void> {
        await this.fillPostInput(postContent);
        await this.clickSubmitPostButton();
    }
}