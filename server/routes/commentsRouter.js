import { Router } from 'express';
import commentModel from '../models/Comment.js';
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

commentsRouter.route('/addComment').post(function (req, res) {
    console.log(req.query);
      let comment = new commentModel({userId: req.query.userId,videoId: req.query.videoId,description: req.query.description});
      console.log(comment)
      comment.save()
      .then(result => {
      res.status(200).json({ 'comment': 'comment Added Successfully' });
      })
      .catch(err => {
      res.status(400).send(err);
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