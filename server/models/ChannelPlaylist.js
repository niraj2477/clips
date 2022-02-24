import mongoose from "mongoose";
const ChannelPlaylist = new mongoose.Schema(
  {
    channelId: { type: Schema.Types.ObjectId, required: true, ref: "Channel" },
    name: { type: String, required: true, index: true },
    description: { type: String },
    videoId: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true, strict: true }
);

export default new mongoose.model("ChannelPlaylist", ChannelPlaylist);
