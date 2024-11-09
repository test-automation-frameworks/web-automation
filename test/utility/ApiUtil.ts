import { URI } from '../../config/conf';
import CommonUtil from './CommonUtil';
export default class ApiUtil {
	static async getCardsCount(): Promise<any> {
		const response = await fetch(`${URI}/rest/products/search?q=`);
		let respone = await response.json();
		return respone.data.length;
	}

	static async createUser(): Promise<any> {
		let email = CommonUtil.randomEmailId();
		let password = CommonUtil.randomPassword();
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

		return { email, password };
	}
}
