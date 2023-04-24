const express = require("express");
const app = express();
const productController = require("../../controller/productController");


app.post('/add-to-cart', productController.addProuctInCart);

module.exports = app;