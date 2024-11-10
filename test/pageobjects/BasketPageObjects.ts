import { $ } from '@wdio/globals';

class BasketPageObjects {
	basket = {
		addToBasketButton(productName: string) {
			return $(
				`//mat-card//div[@class="item-name" and contains(text(),'${productName}')]/../../..//button`
			);
		},

		addToBasketSuccessMessage(productName: string) {
			return $(`//span[contains(text(),"Placed ${productName} into basket.")]`);
		},

		get cartCount() {
			return $('//mat-icon[contains(text(),"shopping_cart")]/../span[2]');
		},

		get openBasketButton() {
			return $('span*=Your Basket');
		},

		reduceQuantityButton(productName: string) {
			return $(`(//mat-cell[contains(text(),"${productName}")]/..//button)[1]`);
		},

		increaseQuantityButton(productName: string) {
			return $(`(//mat-cell[contains(text(),"${productName}")]/..//button)[2]`);
		},

		deleteQuantityButton(productName: string) {
			return $(`(//mat-cell[contains(text(),"${productName}")]/..//button)[3]`);
		},

		productPrice(productName: string) {
			return $(`//mat-cell[contains(text(),"${productName}")]/../mat-cell[4]`);
		},

		get cartPrice() {
			return $('#price');
		},

		get checkoutButton() {
			return $('#checkoutButton');
		},
	};

	address = {
		get newAddressButton() {
			return $('span=Add New Address');
		},

		get country() {
			return $('[data-placeholder="Please provide a country."]');
		},

		get name() {
			return $('[data-placeholder="Please provide a name."]');
		},

		get mbNumber() {
			return $('[data-placeholder="Please provide a mobile number."]');
		},

		get zipCode() {
			return $('[data-placeholder="Please provide a ZIP code."]');
		},

		get address() {
			return $('[placeholder="Please provide an address."]');
		},

		get city() {
			return $('[data-placeholder="Please provide a city."]');
		},

		get state() {
			return $('[data-placeholder="Please provide a state."]');
		},

		get submitButton() {
			return $('#submitButton');
		},

		selectAddress(name: string) {
			return $(`//mat-cell[contains(text(),"${name}")]`);
		},

		get continueButton() {
			return $('span=Continue');
		},

		speedOfDelivery(speedOfDelivery: string = 'One Day Delivery') {
			return $(`//mat-cell[contains(text(),'${speedOfDelivery}')]`);
		},

		get walletBalance() {
			return $("//span[text()='Wallet Balance']/../span[2]");
		},
	};

	card = {
		get addNewCardButton() {
			return $('mat-panel-title*=Add new card');
		},

		get name() {
			return $("//mat-label[text()='Name']/../../..//input");
		},

		get cardNumber() {
			return $("//mat-label[text()='Card Number']/../../..//input");
		},

		get expiryMonth() {
			return $("//mat-label[text()='Expiry Month']/../../..//select");
		},

		get expiryYear() {
			return $("//mat-label[text()='Expiry Year']/../../..//select");
		},

		get submitButton() {
			return $('#submitButton');
		},

		selectCard(name: string) {
			return $(`//mat-cell[text()='${name}']/..//label`);
		},

		successMessage(cardNumber: string) {
			return $(
				`span*=Your card ending with ${cardNumber} has been saved for your convenience.`
			);
		},
	};

	checkout = {
		get checkoutButton() {
			return $('#checkoutButton');
		},

		get successMessage() {
			return $('h1=Thank you for your purchase!');
		},
	};
}

export default new BasketPageObjects();
