import { Router } from 'express';
// import videoModel from '../models/Video.js';
import Video from '../models/Video.js';
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
  chunkSize: (8*1024*1024),
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const chunkSize = (1024*1024);
        const fileInfo = {
          filename: filename,
          chunkSize:chunkSize,
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
  console.log(req.body)
  console.log(req.body.category)
  console.log(req.file.id)
    
  

   let video = new Video({
    title: req.body.title,
    description: req.body.description,
    categoryId: req.body.category,
    status: req.body.category == 1 ? "private" : "public",
    file: req.file.id
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

export default videoRouter;