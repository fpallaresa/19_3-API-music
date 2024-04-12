const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Playlist } = require("../models/Playlist.js");

const playlistSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión");

    // Borrar datos
    await Playlist.collection.drop();
    console.log("Playlist eliminadas");

    const playlistList = [
    ];

    const documents = playlistList.map((playlist) => new Playlist(playlist));
    await Playlist.insertMany(documents);

    console.log("Playlist creadas correctamente!");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

playlistSeed();
