import { Schema, model } from "mongoose";

const Review = new Schema(
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

export default model("Review", Review);
