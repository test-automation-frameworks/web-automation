import AddToBasketPage from '../pages/AddToBasketPage';
import LoginPage from '../pages/LoginPage';
import ApiUtil from '../utility/ApiUtil';

describe('Juice Shop Add to Cart Tests', () => {
	const products = [
		'Apple Juice (1000ml)',
		'Apple Pomace',
		'Banana Juice (1000ml)',
		'Best Juice Shop Salesman Artwork',
		'Carrot Juice (1000ml)',
	];
	let updatedPrice = 0;
	let productPrice1 = 0;
	it('verify user is able to add the products to the cart', async () => {
		// Register a new user via API and log in
		const { email, password } = await ApiUtil.createUser();
		await LoginPage.open();
		await LoginPage.dismissWelcomePopup();
		await LoginPage.login(email, password);
		await LoginPage.verifyUserIsLoggedIn();

		// List of products to add to the basket

		// Add each product to the basket and verify the success message
		for (const product of products) {
			await AddToBasketPage.addProductToBasket(product);
			await AddToBasketPage.verifyAddToBasketSuccessMessage(product);
		}

		// Verify the cart count matches the number of added products
		await AddToBasketPage.verifyCartCount(products.length.toString());
	});

	it('verify user is able to increase the product quantity in the cart and verify price change', async () => {
		// Open the basket and get the initial cart price
		await AddToBasketPage.openBasket();
		const initialPrice = await AddToBasketPage.getCartPrice();

		// Increase quantity for the first two products and calculate expected price
		await AddToBasketPage.increaseProductQuantity(products[0]);
		await AddToBasketPage.increaseProductQuantity(products[1]);
		productPrice1 = await AddToBasketPage.getProductPrice(products[0]);
		const productPrice2 = await AddToBasketPage.getProductPrice(products[1]);
		const expectedPriceAfterIncrease =
			initialPrice + productPrice1 + productPrice2;

		// Log and verify the updated cart price after increasing quantities
		console.log(
			'Expected price after increasing quantity:',
			expectedPriceAfterIncrease
		);
		await AddToBasketPage.wait(2000);
		updatedPrice = await AddToBasketPage.getCartPrice();
		expect(updatedPrice).toEqual(expectedPriceAfterIncrease);
	});

	it('verify user is able to reduce the product quantity in the cart and verify price change', async () => {
		// Reduce quantity of the first product and calculate expected price
		await AddToBasketPage.reduceProductQuantity(products[0]);
		const expectedPriceAfterReduction = updatedPrice - productPrice1;

		// Log and verify the updated cart price after reducing quantities
		console.log(
			'Expected price after reducing quantity:',
			expectedPriceAfterReduction
		);
		await AddToBasketPage.wait(2000);
		const finalPrice = await AddToBasketPage.getCartPrice();
		expect(finalPrice).toEqual(expectedPriceAfterReduction);
	});

	it('verify user is able to checkout and place the order', async () => {
		await AddToBasketPage.clickOncheckout();
		await AddToBasketPage.addNewAddress();
		await AddToBasketPage.selectAddress();
		await AddToBasketPage.selectDeliverySpeed();
		let walletBalance = await AddToBasketPage.getWalletBalance();
		expect(walletBalance).toEqual(0.0);
	});
});
