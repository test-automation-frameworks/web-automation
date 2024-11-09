import HomePage from '../pages/HomePage';
import APIUtils from '../utility/ApiUtil';

describe('Juice shop home page tests', () => {
	let productName = 'Apple Juice (1000ml)';
	it('verify changing page range is working fine', async () => {
		await HomePage.open();
		await HomePage.dismissWelcomePopup();

		// get all products count from BE
		let totalProducts = await APIUtils.getCardsCount();

		// change the range to max
		await HomePage.verifyHomePageIsDisplayed();
		await HomePage.selectMaxItemsPerPage();

		//verify if page range is updated
		let pageRange = await HomePage.getPageRange();
		expect(pageRange).toBe(`1 – ${totalProducts} of ${totalProducts}`);

		// verify if all cards are displayed
		let productDisplayed = await HomePage.getCountOfProductsDisplayed();
		expect(productDisplayed).toBe(totalProducts);
	});

	it('verify user is able to open the product details page', async () => {
		await HomePage.openProduct(productName);
		await HomePage.verifyProductIsOpened(productName);

		await HomePage.verifyProductImageIsNotBroken(productName);

		await HomePage.openReviews();
		await HomePage.wait(2000);
		await HomePage.closeProduct();
	});
});
