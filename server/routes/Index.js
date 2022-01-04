import { Router } from "express";
const mainRouter = Router();
import categoryRouter from "./categoryRouter.js";
import authRouter from "./authRouter.js";
// To Get List Of students
mainRouter.route("/").get(function (req, res) {
  res.json("hello world");
});

mainRouter.use("/category", categoryRouter);
mainRouter.use("/authenticate", authRouter);

export default mainRouter;
