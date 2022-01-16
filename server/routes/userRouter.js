import { Router } from "express";
import User from "../models/User.js";
const userRouter = Router();

userRouter.route("/update").post(function (req, res) {

    const data = JSON.parse(req.body.data);
  
    User.findOneAndUpdate( {email :data.email}, {
      $set: { dob:data.dob, name:data.fullName, gender:data.gender},
     
    },{new:true}, (error, data) => {
      if (error) {
      
        res.json({error:error})
      } else {
        res.json({message:"success",data:data})
        console.log('Student updated successfully !')
      }
    })
});


export default userRouter;