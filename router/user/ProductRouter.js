const express = require("express");
const app = express();
const productController = require("../../controller/productController");


app.post('/add-to-cart', productController.addProuctInCart);

app.get('/cart', productController.cartPage);

app.post('/checkout', productController.checkout)

app.get('/checkout', productController.checkoutpage)

app.get('/search', productController.searchProductsByKeyword)

module.exports = app;