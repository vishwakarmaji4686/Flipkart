const express = require("express");
const app = express();
const productController = require("../../controller/productController");


app.post('/add-to-cart', productController.addProuctInCart);

app.get('/cart', productController.cartPage);

app.post('/checkout', isUserLoggedIn, productController.checkout)

app.get('/checkout', isUserLoggedIn, productController.checkoutpage);

app.get('/search', productController.searchProductsByKeyword)

function isUserLoggedIn(req, res, next){
    if(!req.cookies.token){
        req.session.status = "Error";
        req.session.message = "Login Expired";
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = app;