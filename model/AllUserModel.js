const { connection } = require("../config/MySqlConfig");
class AllUserModel{
    constructor(){}
    async getAllUserData() {
        return new Promise(function (resolve, reject) {
            connection.query("SELECT * FROM users", function (error, result) {
                if (error) {
                    reject(error);
                    console.log("error", error)
                } else {
                    resolve(result);
                    console.log("result dfbhsfbsjdbdsbdsj", resolve)
                };
            });
        });
    };
    async getuserById(id){
        return new Promise(function (resolve, reject) {
            let addNewQry = `SELECT * FROM users WHERE id='${id}'`;
            connection.query(addNewQry, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result[0])
                }
            });
        });
    };
    async deleteUserById(id){
        return new Promise(function(resolve, reject) {
            let query =` DELETE FROM users WHERE id='${id}'` 
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    }
    async updateDetaUserById(userId, userDeta){
        return new Promise(function (resolve, reject) {
            let addNewQry =   `UPDATE users SET firstname='${userDeta.firstName}',lastName='${userDeta.lastName}',contact='${userDeta.contact}',address='${userDeta.address}',lendMark='${userDeta.lendMark}',pincode='${userDeta.pincode}',city='${userDeta.city}',password='${userDeta.password}' WHERE id='${userId}'`
            connection.query(addNewQry, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                };
            });
        });
    }
}
module.exports = new AllUserModel;