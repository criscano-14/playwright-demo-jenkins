import { Page, Locator } from "@playwright/test";
import BasePage from './basePage';
import { HeaderPage } from "./headerPage";
import { LeftMenuPage } from "./leftMenuPage";

export class DashboardPage extends BasePage {
    private readonly header: HeaderPage;
    private readonly leftMenu: LeftMenuPage;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderPage(page);
        this.leftMenu = new LeftMenuPage(page);
    }

    get headerPage(): HeaderPage {
        return this.header;
    }

    get leftMenuPage(): LeftMenuPage {
        return this.leftMenu;
    }


}