const ModelCategory = require(".././model/ModelCategory");
const joi = require("joi")
class CategoryController {
    constructor() { }

    async Categorypage(req, res) {
        try {
            let page = {
                title: "allCategory",
                pageName: "allCategory",
                allcategory: ""

            };
            let allcategory = await ModelCategory.getAllCategory()
            page.allcategory = allcategory;
            res.render('admin/template', page);
        } catch (error) {
            console.log("allcategory page error", error)
        };
    };
    async createCategory(req, res) {
        try {
            console.log("req.body", req.body)
            const title = req.body.title;
            const description = req.body.description;
            const parentId = req.body.parentId;
            let category = {
                title: title,
                description: description,
                parentId: parentId,
            }
            await ModelCategory.insertcategory(category);
            res.redirect('/admin/allCategory');
        } catch (error) {
            console.log("Error ", error);
        };
    };
    async editCategory(req, res) {
        try {
            let page = {
                title: "editCategory",
                pageName: "editCategory",
                category: "",
                status: "",
                message: "",
                user: "",
                allcategory: "",
            }
            if (req.session.status && req.session.message) {
                page.status = req.session.status;
                page.message = req.session.message;
                delete req.session.status, req.session.message;
            }
            let categoryId = req.query.categoryId;
            let categoryDeta = await ModelCategory.getcategoryById(categoryId);
            let categories = await ModelCategory.getAllCategory(categoryDeta.id);
            page.allcategory = categories;
            page.category = categoryDeta[0];
            res.render('admin/template', page)
        } catch (error) {
            console.log("editCategory", error)
        };
    };
    async UpdateCategory(req, res) {
        try {

            let schema = joi.object({
                hdnUserID: joi.string().required(),
                title: joi.string().required(),
                description: joi.string().required(),
                categoryId: joi.number().required()
            });
            const valResponse = schema.validate(req.body)
            if (valResponse && valResponse.error && valResponse.error.details && valResponse.error.details) {
                req.session.status = "Error"
                req.session.message = valResponse.error.details[0].message
                res.redirect("/admin/editCategory?categoryId=" + req.body.hdnUserID);
            }
            const catgoryId = req.query.catgoryId;
            const catgorDrpId = req.body.categoryId;
            const title = req.body.title;
            const description = req.body.description;
            let categoryDeta = {
                title: title,
                description: description,
                parentId: catgorDrpId
            }
            await ModelCategory.UpdateCategoryDeta(catgoryId, categoryDeta)

            res.redirect('/admin/allCategory');
        } catch (error) {
            console.log("Update Category : Error ---- ", error);
        };
    };
    async deleteCategory(req, res) {
        try {
            console.log("req.body", req.query)
            let getcategory = req.query.categoryId;
            await ModelCategory.deleteCategoryById(getcategory);
            res.redirect('/admin/allCategory');
        } catch (error) {
            console.log("/n/n Delete Category :: ", error);
        };
    };
};
module.exports = new CategoryController();