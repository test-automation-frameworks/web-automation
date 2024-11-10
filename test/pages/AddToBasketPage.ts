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
		return parseFloat(price.toFixed(2));
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

	async addNewCard(cardNumber: string = '4536546323254526') {
		this.logStep('Adding new card');
		await this.clickElement(BasketPageObjects.card.addNewCardButton);
		await this.wait(2000);
		await this.setValue(BasketPageObjects.card.name, 'Test Card');
		await this.setValue(BasketPageObjects.card.cardNumber, cardNumber);
		await this.selectMonth();
		await this.selectYear();
		await this.clickElement(BasketPageObjects.card.submitButton);
	}
	async verifyCardAddedSuccessMessage(cardLast4Digits: string = '4526') {
		this.logStep('Verifying card added success message');
		await this.waitForElementToBeDisplayed(
			BasketPageObjects.card.successMessage(cardLast4Digits)
		);
	}

	async checkout() {
		this.logStep('Checking out');
		await this.clickElement(BasketPageObjects.card.selectCard('Test Card'));
		await this.clickElement(BasketPageObjects.address.continueButton);
		await this.clickElement(BasketPageObjects.checkout.checkoutButton);
	}

	async verifyOrderSuccessMessage() {
		this.logStep('Verifying order success message');
		await this.waitForElementToBeDisplayed(
			BasketPageObjects.checkout.successMessage
		);
	}

	async selectYear(year: string = '2088') {
		this.logStep('Selecting year');
		await BasketPageObjects.card.expiryYear.selectByAttribute('value', year);
	}

	async selectMonth(month = '2') {
		this.logStep('Selecting month');
		await BasketPageObjects.card.expiryMonth.selectByAttribute('value', month);
	}
}

export default new AddToBasketPage();
