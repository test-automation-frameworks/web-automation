import { URI } from '../../config/conf';
import CommonUtil from './CommonUtil';
import axios from 'axios';
import ReporterUtil from './ReporterUtil';

const reporter = new ReporterUtil();

export default class ApiUtil {
	static async getCardsCount(): Promise<any> {
		let response = await axios.get(`${URI}/rest/products/search?q=`);
		return response.data.length;
	}

	static async createUser(): Promise<any> {
		reporter.logStep('Creating user using API');
		let email = CommonUtil.randomEmailId();
		let password = CommonUtil.randomPassword();
		let response = await axios.post(
			`${URI}/api/Users/`,
			{
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
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
				timeout: 10000,
			}
		);

		if (response.status !== 201) {
			throw new Error(`Unexpected status code: ${response.status}`);
		}

		reporter.logStep(
			`created user with email: ${email} and password: ${password}`
		);

		return { email, password };
	}
}
