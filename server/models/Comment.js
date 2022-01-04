import mongoose from "mongoose";
const Comment = new mongoose.Schema(
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

export default new mongoose.model("Comment", Comment);
