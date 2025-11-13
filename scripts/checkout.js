import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummery} from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import '../data/car.js';
//import '../data/backend-practice.js';

loadProducts(() => {
	renderOrderSummary();
	renderPaymentSummery();
});