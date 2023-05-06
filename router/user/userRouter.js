const express = require("express")
const app = express();
const ModelProduct = require("../../model/ModelProduct")
const AuthenticateController = require("../../controller/AuthenticateController");
const ProductRouter = require("./ProductRouter");
const OdearController = require("../../controller/OdearController")
const AllUserModel = require("../../model/AllUserModel")


app.get('/', async function (req, res) {
    try {
        let page = {
            title: "home",
            pageName: "home",
            product: "",
            totalPages: 0,
        }
        let pageNumber = 1;
        let limit = process.env.PAGINATION_LIMIT;
        if (req.query.page) {
            pageNumber = req.query.page;
        };
        let offset = (pageNumber - 1) * limit;
        console.log("limit", limit);
        console.log("pageNumber", pageNumber);
        console.log("offset", offset);
        let product = await ModelProduct.getAllProductsByFilters(offset, limit);
        let productCount = await ModelProduct.getProductCount();
        let totalPages = Math.ceil(productCount / limit);
        page.totalPages = totalPages;
        console.log("productCount", productCount);
        console.log("totalPages", totalPages);
        // console.log("all Product", product);
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

app.get('/profile', async function (req, res) {
    try {
        let page = {
            title: "profile",
            pageName: "profile",
            user: "",
            login: false
        }
        if (req.cookies.token) {
            page.login = true
        }
        let userId = req.cookies.token
        let users = await AllUserModel.getuserById(userId)
        page.user = users
        console.log("userId", users);
        res.render('user/template', page);
    } catch (error) {
        console.log("my profile page error", error)
    }
});

app.get('/singUp', AuthenticateController.singUpPage);

app.post('/singUp', AuthenticateController.userSingUp);

app.use('/product', ProductRouter);
app.post('/placeOdear', OdearController.placeOdear)
app.get('/myOdear', OdearController.myOdear);

module.exports = app;