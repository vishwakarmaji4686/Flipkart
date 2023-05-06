class odearModel{
    constructor(){}
    insertbillingInformation(bill){
        return new Promise(function (resolve, reject) {
            let addNewQuery = `INSERT INTO billinginformation (customerId, CustomerFullname, CustomerContact, CustomerPincode, billingFullname, billingContact, billingPincode, billingAdress, ShipingAdress, ShipingCity, ShipingPincode, ShipingLendmark, paymentMethod) VALUES
             ('${bill.customerId}','${bill.CustomerFullname}','${bill.CustomerContact}','${bill.CustomerPincode}','${bill.billingFullname}','${bill.billingContact}','${bill.billingPincode}','${bill.billingAdress}','${bill.ShipingAdress}','${bill.ShipingCity}','${bill.ShipingPincode}','${bill.ShipingLendmark}','${bill.paymentMethod}')`;
            connection.query(addNewQuery, function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }
    myodear(id){
        return new Promise(function (resolve, reject) {
            let addNewQuery = `SELECT * FROM  order_items  WHERE customerId='${id}'` 
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
            let addNewQuery = `INSERT INTO order_items (customerId, title, price, quantity, total_amt) VALUES
             ('${item.customerId}','${item.title}','${item.price}','${item.quantity}','${item.totalAmt}')`;
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