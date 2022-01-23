import { Router } from 'express';
// import videoModel from '../models/Video.js';

import  mongoose  from 'mongoose';
import Grid from 'gridfs-stream';
import crypto from "crypto";
import path from 'path';
import { GridFsStorage } from 'multer-gridfs-storage';
// const {GridFsStorage} = require('multer-gridfs-storage');
import multer from 'multer';
// MongoDB Databse url
const mongoURI = "mongodb://localhost:27017/clips";
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

const videoRouter = Router();


videoRouter.route("/videoUpload").post( upload.single('file'),function (req, res) {
    // console.log(req)
 
   console.log(req.file)
});

export default videoRouter;