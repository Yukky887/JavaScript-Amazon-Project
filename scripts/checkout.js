import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummery} from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import '../data/car.js';
//import '../data/backend-practice.js';
import { loadCart } from '../data/cart.js';

Promise.all([
		new Promise((resolve) => {	
		loadProducts(() => {
			resolve('value1');   
		});
	}),
	new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	})

]).then((values) => {
	console.log(values)
	renderOrderSummary();
	renderPaymentSummery();
});

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