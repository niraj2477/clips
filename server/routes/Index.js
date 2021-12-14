const express = require('express')

const app=express()
const mainRouter = express.Router();

 // To Get List Of students
 mainRouter.route('/').get(function (req,res) {
   res.json("hello world");
});
module.exports = mainRouter;