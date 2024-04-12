const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creamos el schema del artista
const artistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    activeSince: {
      type: Number,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Artist = mongoose.model("Artist", artistSchema);
module.exports = { Artist };
