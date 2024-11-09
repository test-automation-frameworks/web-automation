class RegistrationPageObjects {
	get email() {
		return $('#emailControl');
	}

	get password() {
		return $('#passwordControl');
	}

	get repeatPassword() {
		return $('#repeatPasswordControl');
	}

	get showPasswordAdvice() {
		return $('//input[@id="mat-slide-toggle-1-input"]/..');
	}

	get securityQuestionsInput() {
		return $('[name="securityQuestion"]');
	}

	securityQuestions(securityQuestion: string) {
		return $(`//span[contains(text(),"${securityQuestion}")]`);
	}

	get answer() {
		return $('#securityAnswerControl');
	}

	get registerButton() {
		return $('#registerButton');
	}

	get successMessage() {
		return $(
			'//span[contains(text(),"Registration completed successfully. You can now log in.")]'
		);
	}

	errorMessage(errorMessage: string) {
		return $(`//mat-error[contains(text(),'${errorMessage}')]`);
	}

	login = {
		get email() {
			return $('#email');
		},
		get password() {
			return $('#password');
		},
		get loginButton() {
			return $('#loginButton');
		},
		get errorMessage() {
			return $('//mat-error[contains(text(),"Invalid email or password.")]');
		},
		get account() {
			return $('span*=Account');
		},
	};
}

export default new RegistrationPageObjects();
