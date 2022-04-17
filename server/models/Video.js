import mongoose from "mongoose";
const Video = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255,
      trim: true,
      index: true,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channels",
    },
    status: {
      type: String,
      required: true,
      enum: ["private", "public"],
      default: "public",
    },
    file: {
      type: String,
      required: true,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    like: {
      type: Number,
      required: true,
      default: 0,
    },
    score: {
      type: Array,
      required: true,
    },
    flag: {
      type: String,
      required: false,
      enum: ["strict", "adult", "safe"],
    },
    disLike: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export default new mongoose.model("Video", Video);
