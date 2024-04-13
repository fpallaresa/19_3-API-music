const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Song } = require("../models/Song.js");
const { Artist } = require("../models/Artist.js");
const { generateRandom } = require("../utils.js");

const songRelationsSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión!");

    // Recuperamos canciones y artistas
    const songs = await Song.find();
    const artists = await Artist.find();

    // Comprobar que existen canciones y artistas
    if (!songs.length) {
      console.error("No hay canciones para relacionar en la base de datos");
      return;
    }

    if (!artists.length) {
      console.error("No hay artistas para relacionar en la base de datos");
      return;
    }

    for (let i = 0; i < songs.length; i++) {
      const song = songs[i];
      const randomArtist = artists[generateRandom(0, artists.length - 1)];
      song.artist = randomArtist.id;
      await song.save();
    }

    console.log("Relaciones entre canciones-artistas creadas correctamente.");
  } catch (error) {
  } finally {
    mongoose.disconnect();
  }
};

songRelationsSeed();
