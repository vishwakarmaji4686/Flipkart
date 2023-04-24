const express = require("express");
const app = express();
const CategoryController = require("../../controller/CategoryController")
const productController = require("../../controller/productController");
const UserController = require("../../controller/UserController");



/* admin penal START  */
app.get('/', function (req, res) {
   try {
    let page = {
        title: "home",
        pageName: "home"
    }

    res.render('admin/template', page);
   } catch (error) {
    console.log("admin home page error ", error)
   }
});
app.get('/login', function (req, res) {
   try {
    let page = {
        title: "login", 
        pageName: "login"
    }

    res.render('admin/login', page);
   } catch (error) {
    console.log("admin login page error ", error)
   }
});

app.get('/allCategory', CategoryController.Categorypage);

app.post('/allCategory', CategoryController.createCategory);

app.get('/product', productController.ProductPage);

app.post('/product', productController.createProduct);

app.get('/editProduct', productController.editProduct);

app.post('/updateProduct', productController.updateSingleProduct)

app.get('/deleteProduct', productController.deleteProduct);

app.get('/allUser', UserController.getAllUserData);

app.get('/editCategory', CategoryController.editCategory);

app.post('/UpdateCategory', CategoryController.UpdateCategory);

app.get('/deleteCategory', CategoryController.deleteCategory);

app.get('/edit-user', UserController.edituser);

app.post('/edituser', UserController.updateUserById);

app.get('/deleteuser', UserController.deleteUserById);







/* END : ADMIN PNALE */
module.exports = app;