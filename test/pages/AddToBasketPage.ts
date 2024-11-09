import Page from './page';
import BasketPageObjects from '../pageobjects/BasketPageObjects';
class AddToBasketPage extends Page {
	async open() {
		return super.open('#/login');
	}
	async addProductToBasket(productName: string) {
		this.logStep('Adding product to basket');
		this.clickElement(BasketPageObjects.basket.addToBasketButton(productName));
	}

	async verifyAddToBasketSuccessMessage(productName: string) {
		this.logStep('Verifying add to basket success message');
		await this.waitForElementToBeDisplayed(
			BasketPageObjects.basket.addToBasketSuccessMessage(productName)
		);
	}

	async verifyCartCount(number: string) {
		this.logStep('Verifying cart count');
		let count = await this.getText(BasketPageObjects.basket.cartCount);
		expect(count).toBe(number);
	}

	async openBasket() {
		this.logStep('Opening basket');
		this.clickElement(BasketPageObjects.basket.openBasketButton);
	}

	async increaseProductQuantity(productName: string) {
		this.logStep('Increasing product quantity');
		this.clickElement(
			BasketPageObjects.basket.increaseQuantityButton(productName)
		);
	}

	async reduceProductQuantity(productName: string) {
		this.logStep('Reducing product quantity');
		this.clickElement(
			BasketPageObjects.basket.reduceQuantityButton(productName)
		);
	}

	async getCartPrice() {
		this.logStep('Getting cart price');
		let priceString = await this.getText(BasketPageObjects.basket.cartPrice);
		let price = parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
		return price;
	}

	async getProductPrice(productName: string) {
		this.logStep('Getting product price');
		let priceString = await this.getText(
			BasketPageObjects.basket.productPrice(productName)
		);
		let price = parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
		return price;
	}

	async clickOncheckout() {
		this.logStep('Clicking on checkout');
		await this.clickElement(BasketPageObjects.basket.checkoutButton);
	}
	async addNewAddress() {
		this.logStep('Adding new address');
		await this.clickElement(BasketPageObjects.address.newAddressButton);
		await this.setValue(BasketPageObjects.address.country, 'Germany');
		await this.setValue(BasketPageObjects.address.name, 'Test Address');
		await this.setValue(BasketPageObjects.address.mbNumber, '12345678');
		await this.setValue(BasketPageObjects.address.zipCode, '1234567');
		await this.setValue(BasketPageObjects.address.address, 'dummy address');
		await this.setValue(BasketPageObjects.address.city, 'Berlin');
		await this.setValue(BasketPageObjects.address.state, 'Berlin');
		await this.clickElement(BasketPageObjects.address.submitButton);
	}

	async selectAddress() {
		this.logStep('Selecting address');
		await this.clickElement(
			BasketPageObjects.address.selectAddress('Test Address')
		);
		await this.clickElement(BasketPageObjects.address.continueButton);
	}

	async selectDeliverySpeed(speed: string = 'One Day Delivery') {
		this.logStep('Selecting delivery speed');
		await this.clickElement(BasketPageObjects.address.speedOfDelivery(speed));
		await this.clickElement(BasketPageObjects.address.continueButton);
	}

	async getWalletBalance() {
		this.logStep('Getting wallet balance');
		await this.wait(3000);
		let balanceString = await this.getText(
			BasketPageObjects.address.walletBalance
		);
		let balance = parseFloat(balanceString.replace(/[^0-9.-]+/g, ''));
		return balance;
	}
}

export default new AddToBasketPage();
