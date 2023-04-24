const { connection } = require("../config/MySqlConfig")
class SingUpModel {
    constructor() { }

    async insertUser(deta) {
        return new Promise(function (resolve, reject) {
            let addNewQry = `INSERT INTO users (firstName, lastName, contact, email, address, lendMark, pincode, city, password) VALUES ('${deta.firstName}','${deta.lastName}','${deta.contact}','${deta.email}','${deta.address}','${deta.lendMark}','${deta.pincode}','${deta.city}','${deta.password}')`;
            connection.query(addNewQry, function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                };
            });
        });
    }
    getUserByEmail(email) {
        return new Promise(function (resolve, reject) {
            let query = `SELECT *FROM users WHERE email='${email}'`
            connection.query(query, function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                };
            });
        });
    }


}
module.exports = new SingUpModel;