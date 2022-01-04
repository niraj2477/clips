import mongoose from "mongoose";
const Category = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export default new mongoose.model("Category", Category);
