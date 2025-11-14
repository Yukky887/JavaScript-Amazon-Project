export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')); 

    if (!cart) {
        cart =	[{
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


function saveToStorage() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

let addedTimer;

export function addToCartLogic(productId, quantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity++;
    } else {
        cart.push({
            productId,
            quantity: Number(quantity),
            deliveryOptionId: "1"
        });
    }

	saveToStorage();
    return matchingItem ? 'updated' : 'added'
}

export function addToCart(productId) {
    const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`)
    const selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`)

    addedToCart.classList.add('added-message');

    clearTimeout(addedTimer);

    addedTimer = setTimeout(() => {
        addedToCart.classList.remove('added-message');
    }, 2000);

    const quantity = Number(selectedQuantity.value);
    return addToCartLogic(productId, quantity)
}

export function removeFromCart(productId) {
	const newCart = [];

	cart.forEach((cartItem) => {
		if (cartItem.productId !== productId) {
			newCart.push(cartItem);
		}
	});

	cart = newCart

	saveToStorage();
}

export function calculateCartQuantity() {
    let cartQuantity = 0;
    
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {

    if (newQuantity <= 0 || newQuantity >= 1000) return console.log("Invalid quantity")

    cart.forEach((cartItem) => {
        if ( cartItem.productId == productId) {
            cartItem.quantity = Number(newQuantity);
        }

        cart.quantity = cartItem.quantity;
    });
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response)
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}