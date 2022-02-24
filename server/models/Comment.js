import mongoose from "mongoose";
const Comment = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "videos",
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

export default new mongoose.model("Comment", Comment);
