import { orders } from '../data/orders.js';
import {getProduct, loadProducts, loadProductsFetch, products} from "../data/products.js";
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../data/deliveryOptions.js';
import {formatCurrency} from './utils/money.js'
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

async function renderTrackingInfo() {

	await loadProductsFetch();

	const url = new URL(window.location.href);
	const orderId = url.searchParams.get('orderId');
	const productId = url.searchParams.get('productId');
	console.log(orderId);
	console.log(productId);
	const product = getProduct(productId);
	console.log(product);

	const order = orders.find(order => order.id === orderId);
	const productInOrder = order.products.find(p => p.productId === productId);
	console.log(order);
	
	const quantity = productInOrder.quantity;
	console.log(quantity);
	
	const estimatedDeliveryTime = productInOrder.estimatedDeliveryTime;
	console.log(estimatedDeliveryTime);

	const deliveryDate = dayjs(estimatedDeliveryTime).format('dddd, MMMM D');

	const trackingInfoHTML = `
		<a class="back-to-orders-link link-primary" href="orders.html">
			View all orders
		</a>

		<div class="delivery-date">
			Arriving on ${deliveryDate}
		</div>

		<div class="product-info">
			${product.name}
		</div>

		<div class="product-info">
			Quantity: ${quantity}
		</div>

		<img class="product-image" src="${product.image}">

		<div class="progress-labels-container">
			<div class="progress-label">
				Preparing
			</div>
			<div class="progress-label current-status">
				Shipped
			</div>
			<div class="progress-label">
				Delivered
			</div>
		</div>

		<div class="progress-bar-container">
			<div class="progress-bar"></div>
		</div>
	`

	document.querySelector('.js-order-tracking')
		.innerHTML = trackingInfoHTML;
}

renderTrackingInfo();