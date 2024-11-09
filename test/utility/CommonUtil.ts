import randomstring from 'randomstring';

export default class CommonUtil {
	/**
	 * Verifies if an image URL returns a successful response
	 * @param url The URL of the image to verify
	 * @returns Promise that resolves if image loads successfully, rejects if broken
	 */
	static async verifyBrokenImage(url: string): Promise<void> {
		try {
			const response = await fetch(
				`https://juice-shop-staging.herokuapp.com/${url}`
			);
			if (!response.ok) {
				throw new Error(
					`Failed to load image: ${response.status} ${response.statusText}`
				);
			}
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to load image: ${error.message}`);
			} else {
				throw new Error('Failed to load image: Unknown error');
			}
		}
	}

	static randomEmailId(domainName: string = 'mailinator.com'): string {
		const emailId = `${randomstring.generate(14)}@${domainName}`;
		return emailId.toLowerCase();
	}

	static randomAlphanumeric(length: number): string {
		return randomstring.generate({
			length,
			charset: '234567ABCDEFGHIJKLMNOPQRSTUVWXYZabcd',
		}) as string;
	}

	static randomPassword(length: number = 6): string {
		return this.randomAlphanumeric(length);
	}
	static randomString(length: number = 6): string {
		return randomstring.generate(length);
	}
}
