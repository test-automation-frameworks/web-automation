import { elementTimeout } from '../../config/conf';
import ReporterUtil from './ReporterUtil';

export default class ElementUtil extends ReporterUtil {
	async clickElement(element: ChainablePromiseElement) {
		this.log(`Clicking on element: ${await element.selector}`);
		await this.waitForElementToBeDisplayed(element);
		await element.click();
	}

	async jsClick(element: ChainablePromiseElement) {
		this.log(`Clicking on element: ${await element.selector}`);
		await browser.execute(async (element) => {
			await arguments[0].click();
		}, element);
	}

	async setValue(element: ChainablePromiseElement, value: string) {
		this.log(`Setting value: ${value} on element: ${await element.selector}`);
		await this.waitForElementToBeDisplayed(element);
		await element.setValue(value);
	}

	async waitForElementToBeDisplayed(
		element: ChainablePromiseElement,
		timeOut: number = elementTimeout
	) {
		this.log(`Waiting for element to be displayed: ${await element.selector}`);
		await element.waitForDisplayed({ timeout: timeOut });
	}

	async isElementDisplayed(element: ChainablePromiseElement) {
		return await element.isDisplayed();
	}

	async getText(element: ChainablePromiseElement) {
		this.log(`Getting text from element: ${await element.selector}`);
		await this.waitForElementToBeDisplayed(element);
		return await element.getText();
	}

	async wait(time: number) {
		this.log(`Waiting for ${time} milliseconds`);
		await browser.pause(time);
	}

	async getAttributeValue(
		element: ChainablePromiseElement,
		attributeName: string
	) {
		this.log(
			`Getting attribute value: ${attributeName} from element: ${await element.selector}`
		);
		await this.waitForElementToBeDisplayed(element);
		return await element.getAttribute(attributeName);
	}
}
