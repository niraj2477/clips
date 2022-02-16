import { Router } from 'express';
import complaintModel from '../models/Complaint.js';
const complaintRouter = Router();

complaintRouter.route('/').get(function (req, res) {
  complaintModel.find(function (err, complaint) {
      if (err) {
        console.log(err);
      } else {
        res.json(complaint);
      }
    });
  });


  complaintRouter.route('/addComplaint').post(function (req, res) {
    console.log(req.query);
      let complaint = new complaintModel({userId: req.query.userId,videoId: req.query.videoId,type: req.query.type,message: req.query.message});
      console.log(complaint)
      complaint.save()
      .then(result => {
      res.status(200).json({ 'complaint': 'complaint Added Successfully' });
      })
      .catch(err => {
      res.status(400).send(err);
      });
      });

  
      complaintRouter.route('/updateComplaint').post((req, res, next) => {
        complaintModel.findByIdAndUpdate(req.query.id, {
          $set: { type: req.query.type,message: req.query.message}
        }, (error, data) => {
          if (error) {
            return next(error);
            console.log(error)
          } else {
            res.status(200).json({ 'complaint': 'complaint Updated Successfully' });
          }
        })
      })


      complaintRouter.route('/deleteComplaint').post((req, res, next) => {
        complaintModel.findByIdAndRemove(req.query.id, (error, data) => {
          if (error) {
            res.status(400).send(error);
          } else {
            res.status(200).json({ 'complaint': 'complaint Deleted Successfully' });
          }
        })
      })
  export default complaintRouter;
      
  