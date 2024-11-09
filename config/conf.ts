const url = {
	local: 'http://localhost:3000',
	staging: 'https://juice-shop-staging.herokuapp.com',
	prod: 'https://juice-shop.herokuapp.com',
};

const uri = {
	local: 'http://localhost:3000',
	staging: 'https://juice-shop-staging.herokuapp.com',
	prod: 'https://juice-shop.herokuapp.com',
};
const ENV = (process.env.ENV as 'local' | 'staging' | 'prod') || 'local';
const URL = url[ENV];
const URI = uri[ENV];
const elementTimeut = 10000;
export { URL, elementTimeut, URI };
