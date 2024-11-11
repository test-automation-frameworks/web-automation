const environments = {
	local: 'http://localhost:3000',
	staging: 'https://juice-shop-staging.herokuapp.com',
	prod: 'https://juice-shop.herokuapp.com',
} as const;

type Environment = keyof typeof environments; // 'local' | 'staging' | 'prod'

const ENV: Environment = (process.env.ENV as Environment) || 'staging';

const URL = environments[ENV];
const API_HOST = environments[ENV]; // Same as URL, you can use just one if they are identical

const elementTimeout = 20000;

const BROWSER = process.env.BROWSER || 'chrome';
const isHeadless = process.env.HEADLESS === 'true';

const capabilities = () => {
	switch (BROWSER) {
		case 'chrome': {
			return {
				browserName: 'chrome',
				browserVersion: 'stable',
				'goog:chromeOptions': {
					args: isHeadless
						? [
								'--headless=true',
								'--disable-gpu',
								'--window-size=1440,900',
								'--disable-infobars',
								'--disable-notifications',
								'--disable-default-apps',
						  ]
						: [
								'--start-maximized',
								'--disable-infobars',
								'--disable-notifications',
								'--disable-default-apps',
								'--start-fullscreen',
						  ],
				},
			};
		}
		case 'firefox': {
			return {
				browserName: 'firefox',
				browserVersion: 'stable',
				'moz:firefoxOptions': {
					args: isHeadless
						? ['-headless', '-width=1440', '-height=900']
						: ['-width=1440', '-height=900'],
				},
			};
		}
		case 'safari': {
			return {
				browserName: 'safari technology preview',
			};
		}

		case 'edge': {
			return {
				browserName: 'msedge',
				browserVersion: 'stable',
				'ms:edgeOptions': {
					args: isHeadless
						? [
								'--headless',
								'--disable-gpu',
								'--window-size=1440,900',
								'--disable-infobars',
								'--disable-notifications',
								'--disable-default-apps',
						  ]
						: [
								'--start-maximized',
								'--disable-infobars',
								'--disable-notifications',
								'--disable-default-apps',
								'--start-fullscreen',
						  ],
				},
			};
		}

		default: {
			return {
				browserName: 'chrome',
				browserVersion: 'stable',
				'goog:chromeOptions': {
					args: isHeadless
						? [
								'--headless=true',
								'--disable-gpu',
								'--window-size=1440,900',
								'--disable-infobars',
								'--disable-notifications',
								'--disable-default-apps',
						  ]
						: [
								'--start-maximized',
								'--disable-infobars',
								'--disable-notifications',
								'--disable-default-apps',
								'--start-fullscreen',
						  ],
				},
			};
		}
	}
};

export { URL, API_HOST, elementTimeout, capabilities };
