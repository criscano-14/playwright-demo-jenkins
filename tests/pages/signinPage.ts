import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

export class SignInPage extends BasePage{
    private readonly emailIdTextBox:Locator;
    private readonly passwordTextBox:Locator;
    private readonly signInButton:Locator;
    private readonly forgotPasswordLink:Locator;

    constructor(page:Page){
        super(page);
        this.emailIdTextBox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextBox = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole('button', { name: 'Login' });
        this.forgotPasswordLink = page.getByText('Forgot your password?');
    }

    async isForgotPasswordLinkVisible():Promise<boolean>{
        return this.isElementVisible(this.forgotPasswordLink);
    }

    async enterEmailId(emailId:string){
        await this.fillFormField(this.emailIdTextBox,emailId);
    }

    async enterPassword(password:string){
        await this.fillFormField(this.passwordTextBox,password);
    }
    
    async clickSignInButton(){
        await this.clickElement(this.signInButton);
    }
}