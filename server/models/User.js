import mongoose from "mongoose";
const User = new mongoose.Schema(
  {
    avatar: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
    },
    mobile: {
      type: String,
    },
    country: {
      type: String,
      
    },
    address: [
      {
        line1: {
          type: String,
        },
        line2: {
          type: String,
        },
        landmark: {
          type: String,
        },
      },
    ],
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    channel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
    region: {
      type: String,
    },
    dob: {
      type: Date,
    },
    googleId: {
      type: String,
      unique: true,
    },
    accessToken: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export default new  mongoose.model("User", User);
