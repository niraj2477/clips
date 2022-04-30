import { Router } from "express";
import HistoryModel from "../models/History.js";

import User from "../models/User.js";
const HistoryRouter = Router();

function retrieveUser(id, callback) {
    User.find({ googleId: id }, function (err, user) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }
    });
  }

  HistoryRouter.route("/getHistory").get((req, res, next) => {
    console.log(req.query.id)
    retrieveUser(req.query.id, function (err, user) {

    HistoryModel.find({userId:user[0]._id})
    .populate({path : 'videoId', populate : {path : 'channelId'}})
    .exec((err, history) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(history);
        //console.log(videos[0].channelId);
      }
    });


  });

});

  export default HistoryRouter;