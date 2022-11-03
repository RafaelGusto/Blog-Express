const express = require('express');
const router = express.Router();
const Category = require("./Category");
const slugify = require('slugify');
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json());

router.get("/admin/categories/new", (req, res) => {
    res.render('../views/admin/categories/new');
})

router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if (title != undefined) {
        
        Category.create({
            title: title,
            slug : slugify(title)
        }).then(() => {
            res.redirect("/");
        })

    } else {
        res.redirect("admin/categories/new");
    }
})

module.exports = router;