import { Router } from "express";
import Channel from "../models/Channel.js";
import User from "../models/User.js";
const channelRouter = Router();

function retrieveUser(id, callback) {
  User.findOne({ googleId: id }, function (err, user) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, user);
    }
  });
}

channelRouter.route("/getChannel").get((req, res, next) => {
  retrieveUser(req.query.user, function (err, user) {
    if (err) {
      res.status(400).send(err);
    } else {
      Channel.findOne({ _id: user.channel }, null, function (err, data) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
    }
  });
});

export default channelRouter;
