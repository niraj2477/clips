import mongoose from "mongoose";
const Complaint = new mongoose.Schema(
  {
    videoId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Video",
    },
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export default new mongoose.model("Complaint", Complaint);
