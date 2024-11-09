import Page from './page';
import RegistrationPageObjects from '../pageobjects/RegistrationPageObjects';

class LoginPage extends Page {
	open() {
		return super.open('#/login');
	}

	async login(email: string, password: string) {
		this.logStep(
			`Logining to the application with email: ${email} and password: ${password}`
		);
		await this.setValue(RegistrationPageObjects.login.email, email);
		await this.setValue(RegistrationPageObjects.login.password, password);
		await this.clickElement(RegistrationPageObjects.login.loginButton);
	}
	async verifyUserIsLoggedIn() {
		this.logStep('Verifying user is logged in');
		await this.waitForElementToBeDisplayed(
			RegistrationPageObjects.login.account
		);
	}
}
export default new LoginPage();
