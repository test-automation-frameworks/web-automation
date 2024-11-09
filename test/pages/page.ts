import { browser } from '@wdio/globals';
import { URL } from '../../config/conf';
import ElementUtil from '../utility/ElementUtil';
import HomePageObjects from '../pageobjects/HomePageObjects';

export default class Page extends ElementUtil {
	/**
	 * Opens a sub page of the page
	 * @param path path of the sub page (e.g. /path/to/page.html)
	 */
	public open(path: string) {
		this.log(`Opening ${URL}/${path}...`);
		this.logStep(`Opening ${URL}/${path}...`);
		return browser.url(`${URL}/${path}`);
	}

	async dismissWelcomePopup() {
		this.logStep(`Dismiss welcome popup...`);
		await this.clickElement(HomePageObjects.dismissPopup);
		await this.clickElement(HomePageObjects.cookiePopup);
	}
}
