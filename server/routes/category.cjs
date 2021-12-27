const express=require('express')
const categoryModel=require('../models/Category.cjs')
const categoryRouter = express.Router();

categoryRouter.route('/').get(function (req, res) {
    categoryModel.find(function (err, category) {
        if (err) {
        console.log(err);
        }
        else {
        res.json(category);
        }
    });
});

categoryRouter.route('/addCategory').get(function (req, res) {
    let category = new categoryModel({name:'sports'});
    category.save()
    .then(result => {
    res.status(200).json({ 'category': 'category Added Successfully' });
    })
    .catch(err => {
    res.status(400).send("Something Went Wrong");
    });
    });
    
module.exports = categoryRouter;