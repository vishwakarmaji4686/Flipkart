const joi = require("joi")
const AuthenticateModel = require("../model/AuthenticateModel")
class AuthenticateController {
    constructor(){}

    singUpPage(req, res) {
       try {
        let page = {
            title: "singUp",
            pageName: "singUp",
            status: "",
            message: "",
        }
        if (req.session.status && req.session.message) {
            page.status = req.session.status;
            page.message = req.session.message; 
            delete req.session.status, req.session.message;
        }
        res.render('user/template', page);
       } catch (error) {
        console.log("singUp page error", error);
       }
    }
   async userSingUp(req, res){
        try {
            const schema = joi.object({
                fname: joi.string().required(),
                lname: joi.string().required(),
                email: joi.string().required(),
                contact: joi.string().required(),
                address: joi.string().required(),
                lendMark: joi.string().required(),
                city: joi.string().required(),
                pincode: joi.number().required(),
                password: joi.string().required(),
            })
            const valResponse = schema.validate(req.body)
            if(valResponse && valResponse.error && valResponse.error.details && valResponse.error.details){
                req.session.status = "Error";
                req.session.message = valResponse.error.details[0].message
                res.redirect("/singUp");
            }
            const firstName = req.body.fname;
                const lastName = req.body.lname;
                const contact = req.body.contact;
                const email = req.body.email;
                const address = req.body.address;
                const lendMark = req.body.lendMark;
                const pincode = req.body.pincode;
                const city = req.body.city;
                const password = req.body.password;
                let userDeta = {
                    firstName: firstName,
                    lastName: lastName,
                    contact: contact,
                    email: email,
                    address: address,
                    lendMark: lendMark,
                    pincode: pincode,
                    city: city,
                    password: password,
                }
               const singleUser= await AuthenticateModel.insertUser(userDeta)
               res.redirect("/login")
        } catch (error) {
            console.log("singUP page error")
        }
    }
    login(req, res) {
        try {
            let page = {
                title: "login",
                pageName: "login",
                status: "",
                message: ""
            }
            if (req.session.status && req.session.message) {
                page.status = req.session.status;
                page.message = req.session.message; 
                delete req.session.status, req.session.message;
            }
            res.render('user/template', page);
        } catch (error) {
            console.log("login page error", error)
        }
    }
    async loginUser(req, res){
        console.log("req.body", req.body);
        const email = req.body.email;
        const password = req.body.password;
        let userInfo = await AuthenticateModel.getUserByEmail(email)
        console.log("userInfo", userInfo)
        if(userInfo && userInfo.length > 0){
            let user = userInfo[0];
            if(user.password == password){
                res.cookie('token', user.id)
                res.redirect("/")
            }else{
                req.session.status = "Error";
                req.session.message = "Worong Password :::::::";
                res.redirect('/login')
            }
        }else{
            req.session.status = "error";
            req.session.message = "Wrong Email Address"
            res.redirect('/login')
        };
    }

}
module.exports = new AuthenticateController;