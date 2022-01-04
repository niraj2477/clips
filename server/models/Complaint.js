import { Schema, model } from "mongoose";

const Complaint = new Schema(
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

export default model("Complaint", Complaint);
