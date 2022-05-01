import { Router } from "express";
const mainRouter = Router();
import categoryRouter from "./categoryRouter.js";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import videoRouter from "./videoRouter.js";
import commentsRouter from './commentsRouter.js';
import complaintRouter from './complaintRouter.js';
import channelRouter from './channelRouter.js';
import HistoryRouter from './HistoryRouter.js';
import playlistRouter from './userPlaylist.js';
// To Get List Of students
mainRouter.route("/").get(function (req, res) {
  res.json("hello world");
});

mainRouter.use("/category", categoryRouter);
mainRouter.use("/authenticate", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/video", videoRouter);
mainRouter.use("/comment", commentsRouter);
mainRouter.use("/complaint", complaintRouter);
mainRouter.use("/channel", channelRouter);
mainRouter.use("/history", HistoryRouter);
mainRouter.use("/playlist", playlistRouter);
export default mainRouter;
