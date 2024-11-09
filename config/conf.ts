const environments = {
	local: 'http://localhost:3000',
	staging: 'https://juice-shop-staging.herokuapp.com',
	prod: 'https://juice-shop.herokuapp.com',
} as const;

type Environment = keyof typeof environments; // 'local' | 'staging' | 'prod'

const ENV: Environment = (process.env.ENV as Environment) || 'staging';

const URL = environments[ENV];
const API_HOST = environments[ENV]; // Same as URL, you can use just one if they are identical

const elementTimeout = 10000;

export { URL, API_HOST, elementTimeout };
