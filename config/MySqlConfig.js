const mysql = require("mysql");
 connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "flipkart"
})
connection.connect(function(error){
    if(error){
        console.log("unable to connect")
    } else {
        console.log("database connect ::::::::::")
    }
});

module.exports.connection = connection;