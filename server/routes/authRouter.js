import { Router } from "express";
import User from "../models/User.js";
const authRouter = Router();

authRouter.route("/").post(function (req, res) {
  const data = JSON.parse(req.body.data);
  User.findOne({ googleId: data.googleId },function (err, user) {
    if (err) {
      res.json(err);
    } else {
      if (user) {
        User.update(
          { googleId: data.googleId },
          { $set: { accessToken: data.accessToken } },
          { new: true },
          (err, doc) => {
            if (err) {
              res.status(400).json(err);
            }
            res.status(200).json({ message: "authenticated",flag:0 });
          }
        );
      } else {
        const user = new User(data);
        user
          .save()
          .then(() => {
            res.status(200).json({ user:user, message: "user has been added",flag:1 });
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    }
  });
});

export default authRouter;
