import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummery} from './checkout/paymentSummary.js';
import { loadProductsFetch, getRequest, postResponse } from '../data/products.js';
import '../data/car.js';
//import '../data/backend-practice.js';
import { loadCartFetch } from '../data/cart.js';

async function loadPage() {
	try {
		// throw 'error1';

		await loadProductsFetch()
		await loadCartFetch()
	
		// const value = await new Promise((resolve, reject) => {
		// 	// throw 'error2'
		// 	loadCart(() => {
		// 		// reject('error3');
		// 		resolve('value3');
		// 	});
		// });

	} catch (error) {
		console.log('Error. Try again', error);
	}
	
	renderOrderSummary();
	renderPaymentSummery();

	return 'value2';
}
loadPage();

async function getReq() {
	const result = await getRequest();
	const post = await postResponse();
	console.log(result, post);
}
getReq();


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