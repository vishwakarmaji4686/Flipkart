const ModelCategory = require("../model/ModelCategory");
const ModelProduct = require("../model/ModelProduct");
const CategoryController = require("./CategoryController")
const commonSarvice = require("../sarvice/commonSarvice");
const Joi = require("joi");
const AllUserModel = require("../model/AllUserModel");

class productController {
    constructor() { }


    async ProductPage(req, res) {
        try {
            let page = {
                title: "product",
                pageName: "product",
                categories: [],
                product: [],
                status: "",
                message: "",
            }
            if (req.session.status && req.session.message) {
                page.status = req.session.status;
                page.message = req.session.message;
                delete req.session.status, req.session.message;
            }
            let category = await ModelCategory.getAllCategory();
            let product = await ModelProduct.getAllProducts();
            console.log("product", product);
            page.categories = category
            page.product = product
            res.render("admin/template", page)
        } catch (error) {
            console.log("Product pagr error", error);
        };
    };

    async createProduct(req, res) {
        try {
            let schema = Joi.object({
                categoryId: Joi.number().required(),
                title: Joi.string().required(),
                description: Joi.string().required(),
                price: Joi.number().required(),
                quantity: Joi.number().required(),
            })
            const valResponse = schema.validate(req.body)
            if (valResponse && valResponse.error && valResponse.error.details && valResponse.error.details) {
                req.session.status = "Error"
                req.session.message = valResponse.error.details[0].message
                res.redirect("/admin/product")
            }
            console.log("req.body", req.body)
            const title = req.body.title;
            const price = req.body.price;
            const quantity = req.body.quantity;
            const description = req.body.description;
            const categoryId = req.body.categoryId;
            let product = {
                title: title,
                price: price,
                description: description,
                quantity: quantity,
                categoryId: categoryId,
                images: ''
            }
            const allImages = req.files.productImages;
            let allImageNames = [];
            console.log("allImages", allImages)
            if (allImages) {
                for (let i = 0; i < allImages.length; i++) {
                    let singleImage = allImages[i]
                    console.log("Before singleImage", singleImage)
                    const imageNewName = await commonSarvice.generateImageName(singleImage.name)
                    singleImage.name = imageNewName
                    console.log("After singleImage", singleImage)
                    await commonSarvice.uplodeImage(singleImage)
                    allImageNames.push(imageNewName)
                }
                console.log("allImageNames", allImageNames);
                product.images = allImageNames.toString(",")
            }
            await ModelProduct.insertProduct(product);
            res.redirect('/admin/product');
        } catch (error) {
            console.log("create product page error", error)
        };
    };

    async editProduct(req, res) {
        try {
            let page = {
                title: "editProduct",
                pageName: "editProduct",
                products: "",
                status: "",
                user: "",
            }
            if (req.session.status && req.session.message) {
                page.status = req.session.status;
                page.message = req.session.message;
                delete req.session.status, req.session.message;
            }
            const producId = req.query.productId;
            const product = await ModelProduct.getProductDetaById(producId)
            console.log("product", product)
            page.products = product;
            res.render("admin/template", page)
        } catch (error) {
            console.log("edit product page error", error)
        };
    };

    async updateSingleProduct(req, res) {
        try {
            let schema = Joi.object({
                hdnUserID: Joi.string().required(),
                title: Joi.string().required(),
                description: Joi.string().required(),
                price: Joi.number().required(),
                quantity: Joi.number().required(),
            })
            const valResponse = schema.validate(req.body)
            if (valResponse && valResponse.error && valResponse.error.details && valResponse.error.details) {
                req.session.status = "Error"
                req.session.message = valResponse.error.details[0].message
                res.redirect("/admin/editProduct?productId=" + req.body.hdnUserID);
            }
            const producId = req.query.productId;
            const title = req.body.title;
            const description = req.body.description;
            const price = req.body.price;
            const quantity = req.body.quantity;
            let product = {
                title: title,
                description: description,
                price: price,
                quantity: quantity,
                images: "",
            }
            let images = req.files.productImages
            console.log("image", images)
            let allImageNames = [];
            if (images) {
                for (let i = 0; i < images.length; i++) {
                    let singleImage = images[i]
                    // console.log("singleImage", singleImage)
                    let imageName = await commonSarvice.generateImageName(singleImage.name);
                    // console.log("imageName", imageName)
                    singleImage.name = imageName
                    console.log("singleImage", singleImage)
                    await commonSarvice.uplodeImage(singleImage);
                    allImageNames.push(imageName)
                }
                console.log("allImageNames", allImageNames);
                let allImageName = allImageNames.toString(",")
                console.log("allImageName", allImageName);
                product.images = allImageName;
            }
            await ModelProduct.updateProduct(producId, product)
            res.redirect('/admin/product');
        } catch (error) {
            console.log("update single product", error)
        }
    }


    async deleteProduct(req, res) {
        try {
            console.log("req.query", req.query)
            const productId = req.query.productId;
            console.log("productId", productId)
            await ModelProduct.deleteProductById(productId)
            res.redirect('/admin/product');
        } catch (error) {
            console.log("delete Product edit page", error)
        }
    }

    async addProuctInCart(req, res) {
        try {
            console.log("req.body", req.body);
            const producId = req.body.proId;
            let allProductIds = [];
            // console.log("req.cookies.cartProductIds", req.cookies.cartProductIds);
            if (req.cookies.cartProductIds) {
                allProductIds = req.cookies.cartProductIds;
            }
            allProductIds.push(producId);
            allProductIds = [...new Set(allProductIds)];
            res.cookie("cartProductIds", allProductIds);
            let response = {
                status: "Success"
            };
            res.json(response);
        } catch (error) {
            console.log("addProuctInCart page", error)
        }
    }

    async cartPage(req, res) {
        try {
            let items = [];
            if (req.cookies.cartProductIds) {
                let allProductIds = req.cookies.cartProductIds;
                allProductIds = allProductIds.toString(",");
                console.log("allProductIds", allProductIds);
                items = await ModelProduct.getProductDetaByIds(allProductIds)
            }
            let page = {
                title: "Cart Page",
                pageName: "cart",
                products: "",
                status: "",
                user: "",
            }
            page.products = items;
            console.log("page", page);
            res.render("user/template", page)
        } catch (error) {
            console.log("cart page", error)
        }
    }
    checkout(req, res) {
        console.log("req.body", req.body)
        let productId = req.body.productId;
        let productQuantity = req.body.productQuantity;
        let items = {
            productId: productId,
            productQuantity: productQuantity,
        }
        res.cookie('checkoutItem', items)
        res.redirect('/product/checkout')
    }
    async checkoutpage(req, res) {
        let page = {
            title: "checkout",
            pageName: "checkout",
            products: "",
            checkoutItem: false,
            user: null
        };
        const userId = req.cookies.token;
        const userInfo = await AllUserModel.getuserById(userId);
        page.user = userInfo;
        let productIds = req.cookies.checkoutItem.productId
        let Quantity = req.cookies.checkoutItem.productQuantity
        let product = await ModelProduct.getProductDetaByIds(productIds)
        console.log("productIdRahul", product)
        let pro = [];
        product.forEach((singleproduct, index) => {
            let singleItem = {
                productId: singleproduct.id,
                title: singleproduct.title,
                price: singleproduct.price,
                quantity: Quantity[index],
                total: singleproduct.price * Quantity[index]
            }
            pro.push(singleItem);
        });
        page.products = pro
        res.render('user/template', page)
    }

    async searchProductsByKeyword(req, res) {
        try {
            console.log("req", req.query);
            const searchKeyword = req.query.searchKeyword;
            const products = await ModelProduct.getProductByKeyword(searchKeyword);
            let response = {
                status: "Success",
                items: products
            }
            res.json(response);
        } catch (error) {
            console.log("ERROR: searchProductsByKeyword", error);
        }
    }
}


module.exports = new productController()