class odearModel{
    constructor(){}
    insertbillingInformation(bill){
        return new Promise(function (resolve, reject) {
            let addNewQuery = `INSERT INTO billinginformation (customerId, CustomerFullname, CustomerContact, CustomerPincode, billingFullname, billingContact, billingPincode, billingAdress, ShipingAdress, ShipingCity, ShipingPincode, ShipingLendmark) VALUES
             ('${bill.customerId}','${bill.CustomerFullname}','${bill.CustomerContact}','${bill.CustomerPincode}','${bill.billingFullname}','${bill.billingContact}','${bill.billingPincode}','${bill.billingAdress}','${bill.ShipingAdress}','${bill.ShipingCity}','${bill.ShipingPincode}','${bill.ShipingLendmark}')`;
            connection.query(addNewQuery, function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }
    insertOdear(odear){
        return new Promise(function (resolve, reject) {
            let addNewQuery = `INSERT INTO odears (customerId, title, price, quantity, total, grandTotal, paymentMethod) VALUES
             ('${odear.customerId}','${odear.title}','${odear.price}','${odear.quantity}','${odear.total}','${odear.grandTotal}','${odear.paymentMethod}')`;
            connection.query(addNewQuery, function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    console.log("result", result);
                    resolve(result)
                }
            })
        })
    }
    myodear(id){
        return new Promise(function (resolve, reject) {
            let addNewQuery = `SELECT * FROM odears WHERE customerId='${id}'` 
            connection.query(addNewQuery, function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }

    insertOrderItem(item){
        return new Promise(function (resolve, reject) {
            let addNewQuery = `INSERT INTO order_items (order_id, title, price, quantity, total_amt) VALUES
             ('${item.orderId}','${item.title}','${item.price}','${item.quantity}','${item.totalAmt}')`;
            connection.query(addNewQuery, function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }
}
module.exports = new odearModel();