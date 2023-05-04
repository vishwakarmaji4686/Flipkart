const express = require("express")
const app = express();
const ModelProduct = require("../../model/ModelProduct")
const AuthenticateController = require("../../controller/AuthenticateController");
const ProductRouter = require("./ProductRouter");
const OdearController = require("../../controller/OdearController")


app.get('/', async function (req, res) {
   try {
    let page = {
        title: "home",
        pageName: "home",
        product: ""
    }
    let product = await ModelProduct.getAllProducts();
    console.log("all Product", product);
    page.product = product;
    res.render('user/template', page);
   } catch (error) {
    console.log("home apge  eroor", error)
   }
});

app.get('/login', AuthenticateController.login);
app.post('/login', AuthenticateController.loginUser);

app.get('/myCart', function (req, res) {
    let page = {
        title: "myCart",
        pageName: "myCart"
    }

    res.render('user/template', page);

});

app.get('/profile', function (req, res) {
    try {
        let page = {
            title: "profile",
            pageName: "profile",
            login: false
        }
        if(req.cookies.token){
            page.login = true
        }
    
        res.render('user/template', page);
    } catch (error) {
        console.log("my profile page error", error)
    }
});

app.get('/singUp',AuthenticateController.singUpPage);

app.post('/singUp', AuthenticateController.userSingUp);

app.use('/product', ProductRouter);
app.post('/placeOdear', OdearController.placeOdear)
app.get('/myOdear',OdearController.myOdear);

module.exports = app;