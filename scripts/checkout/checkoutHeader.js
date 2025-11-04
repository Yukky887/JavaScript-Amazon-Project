import {calculateCartQuantity} from "../../data/cart.js";

export function renderCheckoutHeader() {
	const html = `
		Checkout (<a class="return-to-home-link js-return-to-home-link"
			href="amazon.html">${calculateCartQuantity()}</a>)
	`;

	document.querySelector('.js-checkout-header')
		.innerHTML = html;

}