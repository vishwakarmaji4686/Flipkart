require("dotenv").config();
const express = require("express");
const app = express()
const bodyparser = require("body-parser");
const mainRouter = require("./router/mainRouter")
const fileUplode = require("express-fileupload")
const expresssession = require("express-session")
const cookieparser = require("cookie-parser")

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(fileUplode())
app.use(expresssession({
    secret: "flikart121212@435341",
    resave: false,
    saveUninitialized: false,
}));
app.use(cookieparser());

app.use('/', mainRouter);

const port = process.env.PORT;
app.listen(port, function (req, res) {
    console.log("server started at port", port);
})