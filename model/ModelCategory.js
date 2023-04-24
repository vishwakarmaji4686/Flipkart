const { connection } = require("../config/MySqlConfig")
class ModelCategory {
    constructor() { }

    async insertcategory(data) {
        return new Promise((resolve, reject) => {
            let insertQuery = `INSERT INTO category (title, description, parentId) VALUES ('${data.title}','${data.description}','${data.parentId}')`;
            connection.query(insertQuery, function (error, result) {
                if (error) {
                    reject(error)
                    console.log("query error", error)
                } else {
                    resolve(true)
                }
            })
        })
    }


    async getAllCategory(categoryId = null) {
        return new Promise(function (resolve, reject) {
            let getQuery = "";
            if(categoryId){
                getQuery = `SELECT * FROM category WHERE id!='${categoryId}'`;
            }else{
                getQuery = `SELECT * FROM category`;
            }
            connection.query(getQuery, function (error, result) {
                if (error) {
                    reject(error);
                    console.log("error", error)
                } else {
                    resolve(result);
                    console.log("result dfbhsfbsjdbdsbdsj", resolve)
                }
            })
        })
    }
    async getcategoryById(id) {
        return new Promise(function (resolve, reject) {
            connection.query(`SELECT * FROM category WHERE id='${id}'`, function (error, result) {
                if (error) {
                    reject(error);
                    console.log("error", error)
                } else {
                    resolve(result);
                    console.log("result dfbhsfbsjdbdsbdsj", resolve)
                }
            })
        })
    }

    UpdateCategoryDeta(catgoryId, categoryDeta){
        return new Promise(function (resolve, reject) {
            let addNewQry = `UPDATE category SET title='${categoryDeta.title}', description='${categoryDeta.description}', parentId='${categoryDeta.parentId}' WHERE id=${catgoryId};`
            connection.query(addNewQry, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    }

    async deleteCategoryById(categoryId) {
        return new Promise(function (resolve, reject) {
            let insertQry = `DELETE FROM category WHERE id='${categoryId}'`;
            connection.query(insertQry, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })
    }

}

module.exports = new ModelCategory();