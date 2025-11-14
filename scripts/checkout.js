import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummery} from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import '../data/car.js';
//import '../data/backend-practice.js';
import { loadCart } from '../data/cart.js';

async function loadPage() {
	await loadProductsFetch();

	await new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	})
	
	renderOrderSummary();
	renderPaymentSummery();

	return 'value2';
}
loadPage();

// Promise.all([
// 	loadProductsFetch(),
// 	new Promise((resolve) => {
// 		loadCart(() => {
// 			resolve();
// 		});
// 	})

// ]).then((values) => {
// 	console.log(values)
// });

// new Promise((resolve) => {	
// 	loadProducts(() => {
// 		resolve('value1');   
// 	});

// }).then((value) => {
// 	console.log(value)

// 	return new Promise((resolve) => {
// 		loadCart(() => {
// 			resolve();
// 		});
// 	})

// }).then(() => {
// 	renderOrderSummary();
// 	renderPaymentSummery();
// });

// loadProducts(() => {
// 	loadCart(() => {
// 		renderOrderSummary();
// 		renderPaymentSummery();
// 	});
// });