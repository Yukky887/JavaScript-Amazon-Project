class Cart {
	cartItems;
	#localStorageKey;

	constructor(localStorageKey) {
		this.#localStorageKey = localStorageKey;
		this.#loadFromStorage(); 
	}

	#loadFromStorage() {
		this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

		if (!this.cartItems) {
			this.cartItems =	[{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 2,
				deliveryOptionId: "1"
			}, {
				productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
				quantity: 1,
				deliveryOptionId: "2"
			}];
		}
	}

	saveToStorage() {
		localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
	}

	addToCartLogic(productId, quantity) {
		let matchingItem;

		this.cartItems.forEach((cartItem) => {
			if (productId === cartItem.productId) {
				matchingItem = cartItem;
			}
		});

		if (matchingItem) {
			matchingItem.quantity++;
		} else {
			this.cartItems.push({
				productId,
				quantity: Number(quantity),
				deliveryOptionId: "1"
			});
		}

		this.saveToStorage();
		return matchingItem ? 'updated' : 'added'
	}

	addedTimer = null

	addToCart(productId) {
		const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`)
		const selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`)

		addedToCart.classList.add('added-message');

		clearTimeout(this.addedTimer);

		this.addedTimer = setTimeout(() => {
			addedToCart.classList.remove('added-message');
		}, 2000);

		const quantity = Number(selectedQuantity.value);
		return this.addToCartLogic(productId, quantity)
	}

	removeFromCart(productId) {
		const newCart = [];

		this.cartItems.forEach((cartItem) => {
			if (cartItem.productId !== productId) {
				newCart.push(cartItem);
			}
		});

		this.cartItems = newCart;

		this.saveToStorage();
	}

	calculateCartQuantity() {
		let cartQuantity = 0;

		this.cartItems.forEach((cartItem) => {
			cartQuantity += cartItem.quantity;
		});

		return cartQuantity;
	}

	updateQuantity(productId, newQuantity) {

		if (newQuantity <= 0 || newQuantity >= 1000) return console.log("Invalid quantity")

		this.cartItems.forEach((cartItem) => {
			if ( cartItem.productId == productId) {
				cartItem.quantity = Number(newQuantity);
			}

			this.cartItems.quantity = cartItem.quantity;
		});
		
		this.saveToStorage();
	}

	updateDeliveryOption(productId, deliveryOptionId) {
		let matchingItem;

		this.cartItems.forEach((cartItem) => {
			if (productId === cartItem.productId) {
				matchingItem = cartItem;
			}
		});

		matchingItem.deliveryOptionId = deliveryOptionId;

		this.saveToStorage();
	}
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);