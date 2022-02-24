import mongoose from "mongoose";
const Review = new mongoose.Schema(
  {
    videoId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Video",
    },
    message: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export default new mongoose.model("Review", Review);
