import mongoose from "mongoose";
var History = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Video",
    },
    time:{
      type: String,
    },
    
  },
  {
    timestamps: true,
    strict: true,
  }
);

export default new mongoose.model("history", History);
