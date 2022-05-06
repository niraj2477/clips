import { Router } from 'express';

import User from "../models/User.js";
const feedbackRouter = Router(); 
import multer from "multer";
import Feedback from '../models/Feedback.js';
import path from "path";
const imageStorage = multer.diskStorage({
    destination: "FeedbackUploads", // Destination to store video
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now()+ path.extname(file.originalname)
      );
    },
  });

  
const imageUpload = multer({
    storage: imageStorage,
  });
function retrieveUser(id, callback) {
    User.find({ googleId: id }, function (err, user) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }
    });
  }

  feedbackRouter
  .route("/addFeedback")
  .post(
    imageUpload.fields([{ name: "report" }]),
   function(req,res){
    var file = req.files.report[0].filename;
    retrieveUser(req.body.id, function (err, user) {
        let feedback = new Feedback({userId: user[0]._id,title: req.body.title,description: req.body.description,report:"http://localhost:5000/FeedbackUploads/"+file});
       
        feedback.save()
        .then(result => {
        res.status(200).json({ 'feedback': 'feedback Added Successfully' });
        //console.log(result);
        })
        .catch(err => {
       res.status(400).send(err);
      // console.log(err);
        });
       
      });
   }
  );

  feedbackRouter.route("/getFeedback").get((req, res, next) => {
   
   
    Feedback.find()
    .populate('userId')
    .exec((err, Feedback) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(Feedback);
        //console.log(videos[0].channelId);
      }
    });


});

  

export default feedbackRouter;