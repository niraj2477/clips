import { Schema, model } from "mongoose";

const Comment = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Video",
    },
    description: {
      type: String,
      required: true,
      maxlength: 255,
      trim: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export default model("Comment", Comment);
