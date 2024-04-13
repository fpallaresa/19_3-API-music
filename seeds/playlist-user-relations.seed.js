const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { User } = require("../models/User.js");
const { Playlist } = require("../models/Playlist.js");
const { generateRandom } = require("../utils.js");

const playlistUserRelationsSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión!");

    // Recuperamos usuarios y playlist
    const users = await User.find();
    const playlists = await Playlist.find();

    // Comprobar que existen usuarios y playlists
    if (!users.length) {
      console.error("No hay usuarios para relacionar en la base de datos");
      return;
    }

    if (!playlists.length) {
      console.error("No hay playlists para relacionar en la base de datos");
      return;
    }

    for (let i = 0; i < playlists.length; i++) {
      const playlist = playlists[i];
      const randomUser = users[generateRandom(0, users.length - 1)];
      playlist.creator = randomUser.id;
      await playlist.save();
    }

    console.log("Relaciones entre usuarios-playlist creadas correctamente.");
  } catch (error) {
  } finally {
    mongoose.disconnect();
  }
};

playlistUserRelationsSeed();
