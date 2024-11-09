import Page from './page';
import RegistrationPageObjects from '../pageobjects/RegistrationPageObjects';

class RegistrationPage extends Page {
	open() {
		return super.open('#/register');
	}

	async verifyRegistrationPageIsDisplayed() {
		this.log('verifyRegistrationPageIsDisplayed');
		await this.waitForElementToBeDisplayed(RegistrationPageObjects.email);
	}

	async enterEmail(email: string) {
		this.logStep(`Enter email: ${email}`);
		await this.setValue(RegistrationPageObjects.email, email);
	}

	async enterPassword(password: string) {
		this.logStep(`Enter password: ${password}`);
		await this.setValue(RegistrationPageObjects.password, password);
	}

	async enterRepeatPassword(password: string) {
		this.logStep(`Enter repeat password: ${password}`);
		await this.setValue(RegistrationPageObjects.repeatPassword, password);
	}

	async clickOnShowPassword() {
		this.logStep('Click on show password');
		await this.clickElement(RegistrationPageObjects.showPasswordAdvice);
	}

	async clickOnSecurityQuestion() {
		this.logStep('Click on security question');
		await this.clickElement(RegistrationPageObjects.securityQuestionsInput);
	}
	async closeSecurityQuestionDropdown() {
		this.logStep('Close security question dropdown');
		await browser.keys('Escape');
	}

	async enterSecurityQuestion(question: string) {
		this.logStep(`Enter security question: ${question}`);
		await this.clickElement(RegistrationPageObjects.securityQuestionsInput);
		await this.clickElement(
			RegistrationPageObjects.securityQuestions(question)
		);
	}

	async enterSecurityAnswer(answer: string) {
		this.logStep(`Enter security answer: ${answer}`);
		await this.setValue(RegistrationPageObjects.answer, answer);
	}

	async clickOnRegisterButton() {
		this.logStep('Click on register button');
		await this.clickElement(RegistrationPageObjects.registerButton);
	}

	async verifyRegistrationSuccessMessage() {
		this.logStep('Verify registration success message');
		await this.waitForElementToBeDisplayed(
			RegistrationPageObjects.successMessage
		);
	}

	async verifyErrorMessage(errorMessage: string) {
		this.logStep(`Verify error message: ${errorMessage}`);
		let status = await this.isElementDisplayed(
			RegistrationPageObjects.errorMessage(errorMessage)
		);
		expect(status).toBe(true);
	}
}
export default new RegistrationPage();
