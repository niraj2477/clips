import { Router } from "express";
import UserPlaylist from "../models/UserPlaylist.js";

import User from "../models/User.js";
import UserPlaylistVideo from "../models/UserPlaylistVideo.js";
const playlistRouter = Router();

function retrieveUser(id, callback) {
    User.find({ googleId: id }, function (err, user) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }
    });
  }


playlistRouter.route("/getPlaylist").get((req, res, next) => {
    console.log(req.query.id)
    retrieveUser(req.query.id, function (err, user) {

        UserPlaylist.find({userId:user[0]._id},function (err, playlist) {
            if (err) {
              console.log(err);
            } else {
              res.json(playlist);
            }
          });


  });

});
playlistRouter.route("/addPlaylist").get((req, res, next) => {
    console.log(req.query.id)
    retrieveUser(req.query.id, function (err, user) {

        let playlist = new UserPlaylist({userId:user[0]._id,name:req.query.name});
        console.log(playlist)
        playlist.save()
        .then(result => {
        res.status(200).json({ 'playlist': 'playlist Added Successfully' });
        })
        .catch(err => {
        res.status(400).send(err);
        });

  });

});

playlistRouter.route("/addVideoToPlaylist").get((req, res, next) => {
    let userPlaylistVideo= new UserPlaylistVideo({playlistId:req.query.playlistId,videoId:req.query.videoId});
    userPlaylistVideo.save()
    .then(result=>{
        res.status(200).json({ 'playlist': 'playlist Added Successfully' });
    })
    .catch(err=>{
        res.status(400).send(err);
    });
});
playlistRouter.route("/fetchVideo").get((req, res, next) => {
  UserPlaylistVideo.find({playlistId:req.query.playlistId})
  .populate({path : 'videoId', populate : {path : 'channelId'}})
  .exec((err, videos) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(videos);
      //console.log(videos[0].channelId);
    }
  });
});
export default playlistRouter;