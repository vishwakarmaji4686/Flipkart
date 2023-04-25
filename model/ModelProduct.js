const { connection } = require("../config/MySqlConfig")


class ModelProduct{
    async insertProduct(product){
        return new Promise(function(resolve, reject) {
             let addNewQuery = `INSERT INTO products(title, price, quantity, description, categoryId, images) VALUES ('${product.title}','${product.price}','${product.quantity}','${product.description}','${product.categoryId}','${product.images}')`;
             connection.query(addNewQuery, function(error, result){
                if(error){
                    reject(error)
                } else {
                    resolve(result)
                }
             })
        })
    };


    async getAllProducts(data) {
        return new Promise(function (resolve, reject) {
            let insertQry = `SELECT products.*, category.title AS category_title FROM products INNER JOIN category ON  products.categoryId=category.id`;
            connection.query(insertQry, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })
    }

    async deleteProductById(productId) {
        return new Promise(function (resolve, reject) {
            let insertQry = `DELETE FROM products WHERE id='${productId}'`;
            connection.query(insertQry, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })
    }

    async getProductDetaById(productId){
        return new Promise(function(resolve, reject) {
            const addNewQuery = `SELECT *FROM products WHERE id='${productId}'`;
            connection.query(addNewQuery, function(error, result){
                if(error){
                    reject(error)
                } else {
                    resolve(result)
                }
            })
            
        })
    }

    async updateProduct (productId, product){
        return new Promise(function(resolve, reject) {
            const addNewProQry = `UPDATE products SET title='${product.title}', price='${product.price}', quantity='${product.quantity}', description='${product.description}', images='${product.images}' WHERE id=${productId};`
           connection.query(addNewProQry,function(error, result){
            if(error){
                reject(error)
            } else {
                resolve(result)
            };
           });
        });
    };

    async getProductDetaByIds(productIds){
        return new Promise(function(resolve, reject) {
            const addNewQuery = `SELECT *FROM products WHERE id IN (${productIds})`;
            connection.query(addNewQuery, function(error, result){
                if(error){
                    reject(error)
                } else {
                    resolve(result)
                }
            })
            
        })
    }

}
module.exports = new ModelProduct();