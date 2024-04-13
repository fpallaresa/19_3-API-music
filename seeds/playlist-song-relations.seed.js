const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Song } = require("../models/Song.js");
const { Playlist } = require("../models/Playlist.js");
const { generateRandom } = require("../utils.js");

const playlistSongRelationsSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión!");

    // Recuperamos canciones y playlist
    const songs = await Song.find();
    const playlists = await Playlist.find();

    // Comprobar que existen canciones y playlists
    if (!songs.length) {
      console.error("No hay canciones para relacionar en la base de datos");
      return;
    }

    if (!playlists.length) {
      console.error("No hay playlists para relacionar en la base de datos");
      return;
    }

    for (let i = 0; i < playlists.length; i++) {
      const playlist = playlists[i];
      const randomSongIds = [];
      for (let j = 0; j < 3; j++) {
        const randomIndex = generateRandom(0, songs.length - 1);
        randomSongIds.push(songs[randomIndex].id);
      }
      playlist.songs = randomSongIds;
      await playlist.save();
    }

    console.log("Relaciones entre canciones-playlist creadas correctamente.");
  } catch (error) {
  } finally {
    mongoose.disconnect();
  }
};

playlistSongRelationsSeed();
