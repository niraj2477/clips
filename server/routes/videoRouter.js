import { Router } from "express";
import express from "express";
// import videoModel from '../models/Video.js';
import Video from "../models/Video.js";
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import crypto from "crypto";
import path from "path";
import request from "request";
import { GridFsStorage } from "multer-gridfs-storage";
// const {GridFsStorage} = require('multer-gridfs-storage');
import multer from "multer";
// MongoDB Databse url
const mongoURI = "mongodb://localhost:27017/clips";
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;
let app=express()
conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  chunkSize: 8 * 1024 * 1024,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const chunkSize = 1024 * 1024;
        const fileInfo = {
          filename: filename,
          chunkSize: chunkSize,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage }).single("file");;

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
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv|webm)$/)) {
      return cb(new Error("Please upload a video"));
    }
    cb(undefined, true);
  },
});

videoRouter
  .route("/videoUploadComplete")
  .post(videoUpload.single("file"), function (req, res) {

    const url = "http://127.0.0.1:5000/checkVideo?name=" + req.file.filename;
    request(url, function (error, response, body) {
      console.error("error:", error); // Print the error
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the data received
      console.log("in rew");
      req.url = 'http://localhost:5000/video/videoUploadComplete'
      app._router.handle(req, res, next)
    });
  });



  videoRouter
  .route("/videoUpload")
  .post(videoUpload.single("file"),function (req, res) {
    var data=req.body;
    var file=req.file;
    console.log(data);
    console.log(req.file.filename);
    const url = "http://127.0.0.1:5000/checkVideo?name=" + req.file.filename;
    request(url, function (error, response, body) {
      console.error("error:", error); // Print the error
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log(body); // Print the data received
      console.log(data);
      let video = new Video({
        title: data.title,
        description: data.description,
        categoryId: data.category,
        status: data.type == 1 ? "private" : "public",
        file: file.filename
      });
  
         video.save()
        .then(result => {
        res.status(200).json({ 'video': 'video Added Successfully' });
        })
        .catch(err => {
          console.log(err);
        res.status(400).send(err);
        });
        
        });

    });
   
  




      // videoRouter
      // .route("/videoUploadComplete")
      // .post(upload.single("file"), function (req, res) {
      //   console.log(req.body);
      //   console.log(req.body.category);
      //   console.log(req.file.filename);
    
       
      //   let video = new Video({
      //     title: req.body.title,
      //     description: req.body.description,
      //     categoryId: req.body.category,
      //     status: req.body.category == 1 ? "private" : "public",
      //     file: req.file.id
      //   });
    
      //      video.save()
      //     .then(result => {
      //     res.status(200).json({ 'video': 'video Added Successfully' });
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     res.status(400).send(err);
      //     });
          
export default videoRouter;
