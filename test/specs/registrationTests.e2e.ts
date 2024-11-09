import RegistrationPage from '../pages/RegistrationPage';
import CommonUtil from '../utility/CommonUtil';
import LoginPage from '../pages/LoginPage';

describe('Juice shop registration page tests', () => {
	it('verify field validation error messages', async () => {
		await RegistrationPage.open();
		await RegistrationPage.dismissWelcomePopup();

		await RegistrationPage.verifyRegistrationPageIsDisplayed();

		await RegistrationPage.enterEmail('');
		await RegistrationPage.enterPassword('');
		await RegistrationPage.enterRepeatPassword('');
		await RegistrationPage.enterSecurityAnswer('');
		await RegistrationPage.clickOnSecurityQuestion();
		await RegistrationPage.closeSecurityQuestionDropdown();
		await RegistrationPage.clickOnRegisterButton();

		await RegistrationPage.verifyErrorMessage(
			'Please provide an email address.'
		);

		await RegistrationPage.verifyErrorMessage('Please provide a password.');

		await RegistrationPage.verifyErrorMessage('Please repeat your password.');

		await RegistrationPage.verifyErrorMessage(
			'Please select a security question.'
		);

		await RegistrationPage.verifyErrorMessage(
			'Please provide an answer to your security question.'
		);
	});
	it('verify registration success and login', async () => {
		let email = CommonUtil.randomEmailId();
		let password = CommonUtil.randomPassword();

		await RegistrationPage.enterEmail(email);
		await RegistrationPage.enterPassword(password);
		await RegistrationPage.enterRepeatPassword(password);
		await RegistrationPage.clickOnShowPassword();
		await RegistrationPage.enterSecurityQuestion("Mother's maiden name?");
		await RegistrationPage.enterSecurityAnswer(CommonUtil.randomString());
		await RegistrationPage.clickOnRegisterButton();
		await RegistrationPage.verifyRegistrationSuccessMessage();

		await LoginPage.login(email, password);
		await LoginPage.verifyUserIsLoggedIn();
	});
});
