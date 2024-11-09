import { URI } from '../../config/conf';
import CommonUtil from './CommonUtil';
export default class ApiUtil {
	static async getCardsCount(): Promise<any> {
		let retries = 5;
		let lastError;

		while (retries > 0) {
			try {
				const response = await fetch(`${URI}/rest/products/search?q=`);
				let respone = await response.json();
				return respone.data.length;
			} catch (error) {
				lastError = error;
				retries--;
				if (retries === 0) {
					throw new Error(`Failed after 5 retries. Last error: ${lastError}`);
				}
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
			}
		}
	}

	static async createUser(): Promise<any> {
		let email = CommonUtil.randomEmailId();
		let password = CommonUtil.randomPassword();
		let retries = 5;
		let lastError;

		while (retries > 0) {
			try {
				const response = await fetch(`${URI}/api/Users/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email,
						password,
						passwordRepeat: password,
						securityQuestion: {
							id: 6,
							question: "Paternal grandmother's first name?",
							createdAt: '2024-11-08T08:19:17.492Z',
							updatedAt: '2024-11-08T08:19:17.492Z',
						},
						securityAnswer: 'sdfsdf',
					}),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				return { email, password };
			} catch (error) {
				lastError = error;
				retries--;
				if (retries === 0) {
					throw new Error(`Failed after 5 retries. Last error: ${lastError}`);
				}
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
			}
		}
	}
}
