// Imported required packages
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mainRouter from "./routes/Index.js";
import mongoose from "mongoose";
import fs from "fs";
import mime from "mime";
import http from "http";
import methodOverride from "method-override";

// MongoDB Databse url
const mongoDatabase = "mongodb://localhost:27017/clips";

// Created express server
const app = express();
app.use("/uploads", express.static("uploads"));
mongoose.Promise = global.Promise;
app.use(methodOverride("_method"));
// Connect Mongodb Database
mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("There is problem while connecting database " + err);
  }
);

// Conver incoming data to JSON format
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(fileUpload());
// Enabled CORS
app.use(cors());

// const routes = require("./routes/Index");

app.use("/", mainRouter);
// Setup for the server port number
const port = process.env.PORT || 5000;

// Staring our express server
const server = app.listen(port, function () {
  console.log("Server Lisening On Port : " + port);
});

http
  .createServer(function (req, res) {
   
    // var url = req.url;
    // fs.stat(url, function (err, stat) {
    //   if (err) {
    //     res.writeHead(404, { "Content-Type": "text/html" });
    //     res.end(
    //       "Your requested URI(" + req.url + ") wasn't found on our server"
    //     );
    //   } else {
    //     var type = mime.getType(url);
    //     var fileSize = stat.size;
    //     var range = req.headers.range;
    //     if (range) {
    //       var parts = range.replace(/bytes=/, "").split("-");
    //       var start = parseInt(parts[0], 10);
    //       var end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    //       var chunksize = end - start + 1;
    //       var file = fs.createReadStream(url, { start, end });
    //       var head = {
    //         "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    //         "Accept-Ranges": "bytes",
    //         "Content-Length": chunksize,
    //         "Content-Type": type,
    //       };
    //       res.writeHead(206, head);
    //       file.pipe(res);
    //     } else {
    //       var head = {
    //         "Content-Length": fileSize,
    //         "Content-Type": type,
    //       };
    //       res.writeHead(200, head);
    //       fs.createReadStream(url).pipe(res);
    //     }
    //   }
    // });
  })
  .listen(8000);
