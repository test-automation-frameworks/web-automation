import Page from './page';
import CommonUtil from '../utility/CommonUtil';
import HomePageObjects from '../pageobjects/HomePageObjects';

class HomePage extends Page {
	open() {
		this.logStep('Opening home page');
		return super.open('');
	}

	async verifyHomePageIsDisplayed() {
		this.logStep('Verifying home page is displayed');
		await this.waitForElementToBeDisplayed(HomePageObjects.homePage);
	}

	async selectMaxItemsPerPage() {
		this.logStep('Selecting maximum items per page');
		await this.clickElement(HomePageObjects.changePagePerItem);
		let pageCounts = await HomePageObjects.itemPerPageNumber;

		await this.clickElement(
			await HomePageObjects.itemPerPageNumber[(await pageCounts.length) - 1]
		);
	}

	async getCountOfProductsDisplayed() {
		this.logStep('Getting count of products displayed');
		return await HomePageObjects.products.length;
	}

	async getPageRange() {
		this.logStep('Getting page range');
		return await this.getText(HomePageObjects.pageRangeLabel);
	}

	async openProduct(productName: string) {
		this.logStep(`Opening product: ${productName}`);
		await this.clickElement(HomePageObjects.product.openProduct(productName));
	}

	async verifyProductIsOpened(productName: string) {
		this.logStep(`Verifying product is opened: ${productName}`);
		let productHeading = await this.getText(
			HomePageObjects.product.productHeading
		);
		expect(productHeading).toBe(productName);
	}

	async openReviews() {
		this.logStep('Opening reviews');
		await this.clickElement(HomePageObjects.product.reviewButton);
	}

	async closeProduct() {
		this.logStep('Closing product');
		await this.clickElement(HomePageObjects.product.closeButton);
	}

	async verifyProductImageIsNotBroken(productName: string) {
		this.logStep(`Verifying product image is not broken: ${productName}`);
		let imageURL = await this.getAttributeValue(
			HomePageObjects.product.productImage(productName),
			'src'
		);
		await CommonUtil.verifyBrokenImage(imageURL);
	}
}

export default new HomePage();
