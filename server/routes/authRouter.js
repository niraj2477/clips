import { Router } from "express";
const authRouter = Router();

authRouter.route("/").post(function (req, res) {
  res.json(JSON.parse(req.body.data));
});

export default authRouter;
