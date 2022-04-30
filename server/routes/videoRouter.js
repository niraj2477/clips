import { Router } from "express";
import express from "express";
// import videoModel from '../models/Video.js';
import Video from "../models/Video.js";
import Channel from "../models/Channel.js";
import mongoose from "mongoose";
import path from "path";
import User from "../models/User.js";
import crypto from "crypto";
import request from "request";
import fs from "fs";
import mime from "mime";
import http from "http";
import HistoryModel from "../models/History.js";
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
function retrieveUser(id, callback) {
  User.find({ googleId: id }, function (err, user) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, user);
    }
  });
}

videoRouter
  .route("/videoUpload")
  .post(
    videoUpload.fields([{ name: "file" }, { name: "thumbnail" }]),
    function (req, res) {
      var data = req.body;
      // console.log(data);
      var file = req.files.file[0].filename;
      var thumbnail = req.files.thumbnail[0].filename;
      retrieveUser(data.id, function (err, user) {
        if (err) {
          console.log(err);
        }

        console.log(user[0]);

        if (user[0].channel == null || user[0].channel == "") {
          let channel = new Channel({
            name: user[0].name,
            channelImage: user[0].avatar,
          });
          channel.save().then((channelResult) => {
            const url = "http://127.0.0.1:7000/checkVideo?name=" + file;
            request(url, function (error, response, body) {
              body = JSON.parse(body);
              // console.log(body);
              // console.log(error);
              let video = new Video({
                title: data.title,
                description: data.description,
                categoryId: data.category,
                thumbnail: "http://localhost:5000/uploads/" + thumbnail,
                status: data.type == 1 ? "private" : "public",
                file: "http://localhost:5000/uploads/" + file,
                score: body.result,
                flag: body.flag,
                channelId: channelResult._id,
              });

              video
                .save()
                .then((result) => {
                  Channel.findOneAndUpdate(
                    { _id: channelResult._id },
                    {
                      $inc: { numOfVideo: 1 },
                    },
                    { new: true },
                    (error, data) => {
                      if (error) {
                        res.json({ error: error });
                      } else {
                        User.findOneAndUpdate(
                          { _id: user[0]._id },
                          { $set: { channel: channelResult._id } },
                          { new: true },
                          (error, data) => {
                            if (error) {
                              res.json({ error: error });
                            } else {
                              res.status(400).json({
                                video: "video Added Successfully",
                                flag: result.flag,
                              });
                            }
                          }
                        );
                      }
                    }
                  );
                })
                .catch((err) => {
                  //console.log(err);
                  res.status(400).send(err);
                });
            });
            // channelData = result._id;
          });
        } else {
          const url = "http://127.0.0.1:7000/checkVideo?name=" + file;
          request(url, function (error, response, body) {
            body = JSON.parse(body);
            console.log(body);
            // console.log(error);
            let video = new Video({
              title: data.title,
              description: data.description,
              categoryId: data.category,
              thumbnail: "http://localhost:5000/uploads/" + thumbnail,
              status: data.type == 1 ? "private" : "public",
              file: "http://localhost:5000/uploads/" + file,
              score: body.result,
              flag: body.flag,
              channelId: user[0].channel,
            });

            video
              .save()
              .then((result) => {
                Channel.findOneAndUpdate(
                  { _id: user[0].channel },
                  {
                    $inc: { numOfVideo: 1 },
                  },
                  { new: true },
                  (error, data) => {
                    if (error) {
                      res.json({ error: error });
                    } else {
                      res.status(400).json({
                        video: "video Added Successfully",
                        flag: result.flag,
                      });
                    }
                  }
                );
              })
              .catch((err) => {
                //console.log(err);
                res.status(400).send(err);
              });
          });
        }
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

    Video.find({ isDisabled: false }, null, {
      sort: { createdAt: -1 },
      limit: 20,
    })
      .populate("channelId")
      .exec((err, videos) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(videos);
          //console.log(videos[0].channelId);
        }
      });
  } else {
    Video.find({ isDisabled: false, _id: { $gt: req.body.v } }, null, {
      sort: { createdAt: -1 },
      limit: 20,
    })
      .populate("channelId")
      .exec((err, videos) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(videos);
          //console.log(videos[0].channelId);
        }
      });
  }
});

videoRouter.route("/withCat").get((req, res, next) => {
  if (req.query.v != null) {
    Video.find(
      {
        isDisabled: false,
        categoryId: { $eq: req.query.v },
      },
      null,
      { sort: { createdAt: -1, views: -1 }, limit: 20 }
    )
      .populate("channelId")
      .exec((err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(data);
          //console.log(videos[0].channelId);
        }
      });
  } else {
    Video.find({ isDisabled: false }, null, {
      sort: { createdAt: -1 },
      limit: 20,
    })
      .populate("channelId")
      .exec((err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(data);
          //console.log(videos[0].channelId);
        }
      });
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
  retrieveUser(req.query.id, function (err, user) {
    
    HistoryModel.find({userId:user[0]._id,videoId: req.query.v},function(err, History){
        if(History.length == 0){
          let h = new HistoryModel({userId:user[0]._id,videoId: req.query.v});
          h.save();
      
        }
  
  });
});
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

videoRouter.route("/disLike").get((req, res, next) => {
  Video.findOneAndUpdate(
    { _id: req.query.v },
    { $inc: { disLike: 1 } },
    function (err, data) {
      if (err) {
        res.status(500).send(err);
      } else {
      }
      res.status(200).send(data);
    }
  );
});

videoRouter.route("/trending").get((req, res, next) => {
  Video.find({}, null, { sort: { views: -1, like: -1 }, limit: 10 })
    .populate("channelId")
    .exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(data);
        //console.log(videos[0].channelId);
      }
    });
});

videoRouter.route("/suscribe").get((req, res, next) => {
  retrieveUser(req.query.user, function (err, user) {
    if (err) {
      res.status(400).send(err);
    } else {
      Channel.findOneAndUpdate(
        { _id: req.query.channel },
        {
          $push: { subscriber: user[0]._id },
          $inc: { numOfSub: 1 },
        },
        function (err, data) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).json({ Video: "Subscribed!!" });
          }
        }
      );
    }
  });
});

videoRouter.route("/checkSuscribe").get((req, res, next) => {
  retrieveUser(req.query.user, function (err, user) {
    if (err) {
      res.status(400).send(err);
    } else {
      Channel.findOne(
        {
          _id: req.query.channel,
          subscriber: { $in: [mongoose.Types.ObjectId(user[0]._id)] },
        },
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            if (data != null) {
              res.send(true);
            } else {
              res.send(false);
            }
          }
          // res.status(200).json({ Video: "Subscribed!!" });
        }
      );
    }
  });
});
export default videoRouter;
