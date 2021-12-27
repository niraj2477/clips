var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var VideoPopularity = new Schema(
  {
    videoId: { type: Schema.Types.ObjectId, required: true, ref: "Video" },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    action: { type: String, enum: ["liked", "disliked"] },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model('VideoPopularity', VideoPopularity);