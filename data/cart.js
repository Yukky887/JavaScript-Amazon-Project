export const cart = [];

export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`)
    const selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`)
    

    addedToCart.classList.add('added-message');

    clearTimeout(addedTimer);

    addedTimer = setTimeout(() => {
        addedToCart.classList.remove('added-message');
    }, 2000);

    if(matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId,
            quantity: Number(selectedQuantity.value)
        });
    }
}