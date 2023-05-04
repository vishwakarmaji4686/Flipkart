const odearModel = require("../model/odearModel")
const ModelProduct = require("../model/ModelProduct");
class CategoryController {
    constructor() { }
    async placeOdear(req, res) {
        console.log("req.body", req.body);
        let customerId = req.body.customerId;
        let CustomerFullname = req.body.CustomerFullname;
        let CustomerContact = req.body.CustomerContact;
        let CustomerPincode = req.body.CustomerPincode;
        let billingFullname = req.body.billingFullname;
        let billingContact = req.body.billingContact;
        let billingPincode = req.body.billingPincode;
        let billingAdress = req.body.billingAdress;
        let ShipingAdress = req.body.ShipingAdress;
        let ShipingCity = req.body.ShipingCity;
        let ShipingPincode = req.body.ShipingPincode;
        let ShipingLendmark = req.body.ShipingLendmark;

        let title = req.body.title;
        let price = req.body.price;
        let productIds = req.body.productId;
        let quantity = req.body.quantity;
        console.log("title", title);
        console.log("price", price);
        console.log("productIds", productIds);



        let total = req.body.total;
        let grandTotal = req.body.grandTotal;
        let paymentMethod = req.body.paymentMethod;

        let billingInformation = {
            customerId: customerId,
            CustomerFullname: CustomerFullname,
            CustomerContact: CustomerContact,
            CustomerPincode: CustomerPincode,
            billingFullname: billingFullname,
            billingContact: billingContact,
            billingPincode: billingPincode,
            billingAdress: billingAdress,
            ShipingAdress: ShipingAdress,
            ShipingCity: ShipingCity,
            ShipingPincode: ShipingPincode,
            ShipingLendmark: ShipingLendmark,
        }
        let odears = {
            customerId: customerId,
            title: title,
            price: price,
            quantity: quantity,
            total: total,
            grandTotal: grandTotal,
            paymentMethod: paymentMethod,
        }
        const orderDetails = await odearModel.insertOdear(odears);
        console.log("orderDetails", orderDetails);
        for (let index = 0; index < productIds.length; index++) {
            const productId = productIds[index];
            let item = {
                productId: productId,
                price: price[index],
                title: title[index],
                quantity: quantity[index],
                totalAmt: parseInt(price[index]) * parseInt(quantity[index]),
                orderId: orderDetails.insertId
            }
            await odearModel.insertOrderItem(item);
            console.log("item", item);
        }
        return false;
        await odearModel.insertbillingInformation(billingInformation);
        res.redirect("/myOdear")
    }
    async myOdear(req, res) {
        try {
            let page = {
                title: "myOdear",
                pageName: "myOdear",
                odears: "",
                login: false
            }
            if (req.cookies.token) {
                page.login = true
            }
            let id = req.cookies.token
            let odear = await odearModel.myodear(id);
            page.odears = odear
            res.render('user/template', page);
        } catch (error) {
            console.log("myodear page error", error);
        }
    }

}
module.exports = new CategoryController();
