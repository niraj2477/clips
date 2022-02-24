import mongoose from "mongoose";
var History = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    video: [
      {
        videoId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        timeStamp: {
          type: String,
        },
        isLiked: {
          type: Boolean,
          default: false,
        },
        isDisliked: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
    strict: true,
  }
);

export default new mongoose.model("history", History);
