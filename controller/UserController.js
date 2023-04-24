const AllUserModel = require("../model/AllUserModel")
const joi = require("joi")

class AllUser {
    constructor() { }

    async getAllUserData(req, res) {
        try {
            let page = {
                title: "AllUser",
                pageName: "allUser",
                user: "",
                status: "",
                message: ""
            }
            if (req.session.status && req.session.message) {
                page.status = req.session.status;
                page.message = req.session.message;
                delete req.session.status, req.session.message;
            }
            const allUser = await AllUserModel.getAllUserData();
          //  console.log("allUser", allUser)
            page.user = allUser;
            res.render("admin/template", page);
        } catch (error) {
            console.log("get all User Data", error)
        }
    };

    async edituser(req, res) {
       // console.log("req.query", req.query)
        let id = req.query.userId;
        try {
            let page = {
                title: "edit-user",
                pageName: "edit-user",
                message: "",
                status:"",
                user: "",
            }
            if (req.session.status && req.session.message) {
                page.status = req.session.status;
                page.message = req.session.message;
                delete req.session.status, req.session.message;
            }
            let getUser = await AllUserModel.getuserById(id);
            page.user = getUser;
            res.render("admin/template", page);
        } catch (error) {
            console.log("get all User Data", error)
        };
    };
    async deleteUserById(req, res) {
        try {
        //console.log("req.query", req.query)
        let id = req.query.userId;
        await AllUserModel.deleteUserById(id);
            res.redirect("/admin/allUser")
        } catch (error) {
            console.log("get all User Data", error)
        };
    };
    async updateUserById(req, res){
        
        console.log()
        let schema = joi.object({
            hdnUserID: joi.string().required(),
            fname: joi.string().required(),
            lname: joi.string().required(),
            email: joi.string().required(),
            contact: joi.number().required(),
            address: joi.string().required(),
            lendMark: joi.string().required(),
            pincode: joi.number().required(),
            city: joi.string().required(),
            password: joi.string().required(),
        })
        const valResponse = schema.validate(req.body)
        if(valResponse && valResponse.error && valResponse.error.details && valResponse.error.details){
            req.session.status = "Error"
            req.session.message = valResponse.error.details[0].message
            res.redirect("/admin/edit-user?userId="+req.body.hdnUserID);
            return false
        }
        const userId = req.body.hdnUserID;
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
        await AllUserModel.updateDetaUserById( userId ,userDeta)
        res.redirect("/admin/allUser")
    }
    
}
module.exports = new AllUser()