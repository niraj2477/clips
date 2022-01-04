import { Schema, model } from "mongoose";

const Category = new Schema(
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

export default model("Category", Category);
