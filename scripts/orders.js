import { orders } from '../data/orders.js';
import {getProduct, loadProducts, loadProductsFetch, products} from "../data/products.js";
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../data/deliveryOptions.js';
import {formatCurrency} from './utils/money.js'
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export async function renderOrdersList() {
	let ordersListHTML = '';

	await loadProductsFetch();

	orders.forEach((orderItem) => {
		console.log('Order Item:', orderItem);
		const orderProducts = orderItem.products;
		console.log('Order Products:', orderProducts);
			
		const dateString = dayjs(orderItem.orderTime).format('MMMM D, YYYY');

		ordersListHTML += `
			<div class="order-container">
			
			<div class="order-header">
				<div class="order-header-left-section">
				<div class="order-date">
					<div class="order-header-label">Order Placed:</div>
					<div>${dateString}</div>
				</div>
				<div class="order-total">
					<div class="order-header-label">Total:</div>
					<div>$${formatCurrency(orderItem.totalCostCents)}</div>
				</div>
				</div>

				<div class="order-header-right-section">
				<div class="order-header-label">Order ID:</div>
				<div>${orderItem.id}</div>
				</div>
			</div>

			<div class="order-details-grid">
				${renderProductList(orderProducts, orderItem.id)}
			</div>
			</div>
		`
	});

	document.querySelector('.js-order-container')
		.innerHTML = ordersListHTML;

	addTrackPackageListener();
}

function renderProductList(orderProducts, orderId) {
	let productsListHTML = '';

	orderProducts.forEach((productItem) => {
		const productId = productItem.productId;
		const productInfo = getProduct(productId);
		console.log('Product Info:', productInfo);
		console.log('Product Item:', productItem.estimatedDeliveryTime);
		const dateString = dayjs(productItem.estimatedDeliveryTime).format('MMMM D');
		productsListHTML += `
			<div class="product-image-container">
			<img src="${productInfo.image}">
			</div>

			<div class="product-details">
			<div class="product-name">
				${productInfo.name}
			</div>
			<div class="product-delivery-date">
				Arriving on: ${dateString}
			</div>
			<div class="product-quantity">
				Quantity: ${productItem.quantity}
			</div>
			<button class="buy-again-button button-primary">
				<img class="buy-again-icon" src="images/icons/buy-again.png">
				<span class="buy-again-message">Buy it again</span>
			</button>
			</div>

			<div class="product-actions">
				<button class="track-package-button button-secondary js-track-package-button"
					data-order-id="${orderId}"
					data-product-id="${productId}">
				Track package
				</button>
			</div>
		`;
	})
	
	
	return productsListHTML;
	
}

renderOrdersList();

function addTrackPackageListener() {
	document.querySelectorAll('.js-track-package-button').forEach(button => {
		button.addEventListener('click', () => {
			const orderId = button.dataset.orderId;
			const productId = button.dataset.productId;

			console.log('Tracking package for Order ID:', orderId, 'Product ID:', productId);
			window.location.href = `tracking.html?orderId=${orderId}&productId=${productId}`;
		});
	});
}
