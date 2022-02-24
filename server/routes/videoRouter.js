import { Router } from "express";
import express from "express";
// import videoModel from '../models/Video.js';
import Video from "../models/Video.js";
import mongoose from "mongoose";
import path from "path";
import crypto from "crypto";
import request from "request";
import fs from "fs";
import mime from "mime";
import http from "http";
// const {GridFsStorage} = require('multer-gridfs-storage');
import multer from "multer";
// MongoDB Databse url
const mongoURI = "mongodb://localhost:27017/clips";
const conn = mongoose.createConnection(mongoURI);

// Init gfs
// let gfs;
let app = express();
// conn.once("open", () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("uploads");
// });

// Create storage engine
// Create storage engine
// const storage = new GridFsStorage({
//   url: mongoURI,
//   chunkSize: 8 * 1024 * 1024,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const chunkSize = 1024 * 1024;
//         const fileInfo = {
//           filename: filename,
//           chunkSize: chunkSize,
//           bucketName: "uploads",
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });
// const upload = multer({ storage }).single("file");

const videoRouter = Router();
const videoStorage = multer.diskStorage({
  destination: "uploads", // Destination to store video
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const videoUpload = multer({
  storage: videoStorage,
  // limits: {
  // fileSize: 10000000 // 10000000 Bytes = 10 MB
  // },
  // fileFilter(req, file, cb) {
  //   // upload only mp4 and mkv format
  //   if (!file.originalname.match(/\.(mp4|MPEG-4|mkv|webm)$/)) {
  //     return cb(new Error("Please upload a video"));
  //   }

  //   cb(undefined, true);
  // },
});

videoRouter
  .route("/videoUpload")
  .post(
    videoUpload.fields([{ name: "file" }, { name: "thumbnail" }]),
    function (req, res) {
      var data = req.body;
      console.log(data);
      var file = req.files.file[0].filename;
      var thumbnail = req.files.thumbnail[0].filename;

      //console.log(req.files.file[0].filename);
      const url = "http://127.0.0.1:7000/checkVideo?name=" + file;
      request(url, function (error, response, body) {
        body = JSON.parse(body);
        console.log(body);
        console.log(error);
        let video = new Video({
          title: data.title,
          description: data.description,
          categoryId: data.category,
          thumbnail: "http://localhost:5000/uploads/" + thumbnail,
          status: data.type == 1 ? "private" : "public",
          file: "http://localhost:5000/uploads/" + file,
          score: body.result,
          flag: body.flag,
        });

        video
          .save()
          .then((result) => {
            res
              .status(200)
              .json({ video: "video Added Successfully", flag: result.flag });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send(err);
          });
      });
    }
  );

videoRouter.route("/deleteVideo").post((req, res, next) => {
  Video.findByIdAndRemove(req.query.id, (error, data) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).json({ Video: "Video Deleted Successfully" });
    }
  });
});

videoRouter.route("/").post((req, res, next) => {
  if (req.body.v == null) {
    Video.find(
      { isDisabled: false },
      null,
      { sort: { createdAt: -1 }, limit: 20 },
      function (err, data) {
        res.status(200).send(data);
      }
    );
  } else {
    Video.find(
      { isDisabled: false, _id: { $gt: req.body.v } },
      null,
      { sort: { createdAt: -1 }, limit: 20 },
      function (err, data) {
        res.status(200).send(data);
      }
    );
  }
});

videoRouter.route("/watch").post((req, res, next) => {
  Video.findOne(
    { isDisabled: false, _id: req.body.v },
    null,
    function (err, data) {
      res.status(200).send(data);
    }
  );
});

videoRouter.route("/watchComplete").get((req, res, next) => {
  Video.findOneAndUpdate(
    { _id: req.query.v },
    { $inc: { views: 1 } },
    function (err, data) {
      if (err) {
        res.status(500).send(err);
      } else {
      }
      res.status(200).send(data);
    }
  );
});

videoRouter.route("/like").get((req, res, next) => {
  Video.findOneAndUpdate(
    { _id: req.query.v },
    { $inc: { like: 1 } },
    function (err, data) {
      if (err) {
        res.status(500).send(err);
      } else {
      }
      res.status(200).send(data);
    }
  );
});

videoRouter.route("/fetchVideo").get((req, res, next) => {
  // const movieStream = fs.createReadStream(req.query.filePath);
  console.log(req.headers);
  //  var range = req.headers.range;
  //   if (!range) {
  //     // 416 Wrong range
  //     return res.sendStatus(416);
  //   }
  //   var positions = range.replace(/bytes=/, "").split("-");
  //   var start = parseInt(positions[0], 10);
  //   var total = start.size;
  //   var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
  //   var chunksize = end - start + 1;
  //   res.writeHead(206, {
  //     "Content-Range": "bytes " + start + "-" + end + "/" + total,
  //     "Accept-Ranges": "bytes",
  //     "Content-Length": chunksize,
  //     "Content-Type": "video/mp4",
  //   });
  //   var stream = fs
  //     .createReadStream(req.query.filePath, { start: start, end: end })
  //     .on("open", function () {
  //       stream.pipe(res);
  //     })
  //     .on("error", function (err) {
  //       res.end(err);
  //     });
});

export default videoRouter;
