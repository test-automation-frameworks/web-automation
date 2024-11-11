const { config } = require('./wdio.conf');
const GRID_HOST = process.env.GRID_HOST;

const commonArgs = [
	'--headless',
	'--disable-gpu',
	'--window-size=1920,1080',
	'--disable-notifications',
	'--disable-default-apps',
];
// config.services.push('docker');
config.protocol = 'https';
config.hostname = GRID_HOST;
config.port = 443;
config.maxInstances = 20;
config.capabilities = [
	{
		maxInstances: 20,
		browserName: 'chrome',
		'goog:chromeOptions': {
			args: [...commonArgs],
		},
	},
];
exports.config = config;
