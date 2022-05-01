import mongoose from "mongoose";
const UserPlaylistVideo = new mongoose.Schema(
  {
    playlistId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserPlaylist",
    },
    videoId: {
      type: String,
      required: true,
      ref: "Video",
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export default new mongoose.model("UserPlaylistVideo", UserPlaylistVideo);
