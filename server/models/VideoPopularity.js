import { Schema, model } from "mongoose";

const VideoPopularity = new Schema(
  {
    videoId: { type: Schema.Types.ObjectId, required: true, ref: "Video" },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    action: { type: String, enum: ["liked", "disliked"] },
  },
  { timestamps: true, strict: true }
);

export default model("VideoPopularity", VideoPopularity);
