import { $ } from '@wdio/globals';

class HomePageObjects {
	get homePage() {
		return $('div=All Products');
	}

	get changePagePerItem() {
		return $('#mat-select-value-1');
	}

	get itemPerPageNumber() {
		return $$(`//div[@aria-label="Items per page:"]//mat-option`);
	}

	get pageRangeLabel() {
		return $('.mat-paginator-range-label');
	}

	get products() {
		return $$('//mat-grid-list//mat-card');
	}
	get dismissPopup() {
		return $('span=Dismiss');
	}

	get cookiePopup() {
		return $('[aria-label="dismiss cookie message"]');
	}

	product = {
		openProduct(productName: string) {
			return $(
				`//mat-card//div[@class="item-name" and contains(text(),'${productName}')]`
			);
		},

		get productHeading() {
			return $('//mat-dialog-content//h1');
		},

		get reviewButton() {
			return $('span=Reviews');
		},

		get closeButton() {
			return $('button[aria-label="Close Dialog"]');
		},

		productImage(productName: string) {
			return $(`//mat-dialog-content//img[@alt="${productName}"]`);
		},
	};
}

export default new HomePageObjects();
