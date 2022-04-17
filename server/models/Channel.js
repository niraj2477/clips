import mongoose from "mongoose";
const Channel = new mongoose.Schema(
  {
    channelImage: { type: String },
    name: { type: String, required: true, trim: true, index: true },
    description: {
      type: String,

      trim: true,
      maxlength: [255, "maximum limit reached"],
      index: true,
    },
    numOfSub: { type: Number, default: 0 },
    numOfVideo: { type: Number, default: 0 },
    strikeCount: { type: Number, default: 0 },
    totalView: { type: Number, default: 0 },
    subscriber: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, strict: true }
);

export default new mongoose.model("Channel", Channel);
