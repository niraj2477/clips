import { Router } from 'express';
import commentModel from '../models/Comment.js';
import User from "../models/User.js";
const commentsRouter = Router(); 

commentsRouter.route('/').get(function (req, res) {
    commentModel.find(function (err, comments) {
      if (err) {
        console.log(err);
      } else {
        res.json(comments);
      }
    });
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
commentsRouter.route('/addComment').post(function (req, res) {
    
    retrieveUser(req.body.data.userId, function (err, user) {
      let comment = new commentModel({userId: user[0]._id,videoId: req.body.data.video,description: req.body.data.message});
     
      comment.save()
      .then(result => {
      res.status(200).json({ 'comment': 'comment Added Successfully' });
      //console.log(result);
      })
      .catch(err => {
     res.status(400).send(err);
    // console.log(err);
      });
     
    });

});

commentsRouter.route('/updateComment').post((req, res, next) => {
    commentModel.findByIdAndUpdate(req.query.id, {
      $set: { description: req.query.description}
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.status(200).json({ 'comment': 'comment Updated Successfully' });
      }
    })
  })
  

  commentsRouter.route('/deleteComment').post((req, res, next) => {
    commentModel.findByIdAndRemove(req.query.id, (error, data) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).json({ 'comment': 'comment Deleted Successfully' });
      }
    })
  })


export default commentsRouter;