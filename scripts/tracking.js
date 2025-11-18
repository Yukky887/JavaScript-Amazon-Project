import { orders } from '../data/orders.js';
import {getProduct, loadProductsFetch} from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

async function renderTrackingInfo() {

	await loadProductsFetch();

	const url = new URL(window.location.href);
	const orderId = url.searchParams.get('orderId');
	const productId = url.searchParams.get('productId');
	const product = getProduct(productId);

	const order = orders.find(order => order.id === orderId);
	const productInOrder = order.products.find(p => p.productId === productId);

	const orderTime = order.orderTime;
	
	const quantity = productInOrder.quantity;
	
	const estimatedDeliveryTime = productInOrder.estimatedDeliveryTime;

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

		<div class="progress-bar-container" >
			<div class="progress-bar"></div>
		</div>
	`

	document.querySelector('.js-order-tracking')
		.innerHTML = trackingInfoHTML;

	renderProgressBar(orderTime, estimatedDeliveryTime)
}

renderTrackingInfo();

function renderProgressBar(orderTime, estimatedDeliveryTime) {
	const progressBar = document.querySelector('.progress-bar');

	const progressBarPercentage = ((dayjs() - dayjs(orderTime)) / (dayjs(estimatedDeliveryTime) - dayjs(orderTime))) * 100;
	
	progressBar.style.width = `${progressBarPercentage}%`;

	updateDeliveryStatus(progressBarPercentage);
}

function updateDeliveryStatus(progressBarPercentage) {
	const deliveryStatus = document.querySelectorAll('.progress-label');

	deliveryStatus.forEach((label) => {
		label.classList.remove('current-status');
	});

	if (progressBarPercentage < 50) {
		deliveryStatus[0].classList.add('current-status');
	} else if (progressBarPercentage >= 50 && progressBarPercentage < 100) {
		deliveryStatus[1].classList.add('current-status');
	} else if (progressBarPercentage >= 100) {
		deliveryStatus[2].classList.add('current-status');
	}
}