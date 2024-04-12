const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creamos el schema de la playlist
const playlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: false,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = { Playlist };
