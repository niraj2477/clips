const express=require('express')
const mainRouter = express.Router();
const categoryRouter =require('./category.cjs')
 // To Get List Of students
 mainRouter.route('/').get(function (req,res) {
   res.json("hello world");
});

mainRouter.use('/category',categoryRouter)

module.exports = mainRouter;