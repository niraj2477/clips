var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Channel = new Schema(
  {
    bannerImage: { type: String },
    name: { type: String, required: true, trim: true, index: true },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [255, "maximum limit reached"],
      index: true,
    },
    numOfSub: { type: Number, default: 0 },
    numOfVideo: { type: Number, default: 0 },
    strikeCount: { type: Number, default: 0 },
    totalView: { type: Number, default: 0 },
    subscriber: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, strict: true },
  
);

module.exports = mongoose.model('Channel', Channel);