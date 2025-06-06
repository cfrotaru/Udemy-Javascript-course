//Importing module

//import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

console.log('Importing module');

//addToCart('bread', 5);
//console.log(price, tq);

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread, 5');
// console.log(ShoppingCart.totalPrice);

//import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
//console.log(price);

import add from './shoppingCart.js';
add('pizza', 2);

// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   };

//   const orderStock = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };
//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('pizza', 2);
// console.log(ShoppingCart2);
// console.log(ShoppingCart2.shippingCost);

import cloneDeep from 'lodash';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}
