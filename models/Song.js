const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creamos el schema de la canción
const songSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: false,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Song", songSchema);
module.exports = { Song };
