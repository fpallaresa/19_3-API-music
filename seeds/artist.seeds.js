const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Artist } = require("../models/Artist.js");

const artistSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión");

    // Borrar datos
    await Artist.collection.drop();
    console.log("Artistas eliminados");

    const artistList = [
      { name: "Mystique Mirage", genre: "punk", activeSince: 1996, country: "Portugal" },
      { name: "Crimson Rosewood", genre: "hip hop", activeSince: 1997, country: "Estonia" },
      { name: "Solar Flare", genre: "pop", activeSince: 2003, country: "Mexico" },
      { name: "Mystique Mirage", genre: "punk", activeSince: 1996, country: "Colombia" },
      { name: "Serenity Skies", genre: "punk", activeSince: 1996, country: "Serbia" },
      { name: "Neon Dreamer", genre: "rock", activeSince: 2006, country: "Vietnam" },
      { name: "Luna Starlight", genre: "rock", activeSince: 1992, country: "United States" },
      { name: "Dusk Demure", genre: "punk", activeSince: 2011, country: "Philippines" },
      { name: "Mystique Mirage", genre: "metal", activeSince: 2012, country: "Tunisia" },
      { name: "Mystique Mirage", genre: "pop", activeSince: 1998, country: "China" },
      { name: "Luna Starlight", genre: "metal", activeSince: 1992, country: "China" },
      { name: "Solar Flare", genre: "folk", activeSince: 2004, country: "Venezuela" },
      { name: "Whispering Willow", genre: "electronic", activeSince: 1986, country: "Indonesia" },
      { name: "Mystique Mirage", genre: "punk", activeSince: 1995, country: "Benin" },
      { name: "Luna Starlight", genre: "rock", activeSince: 2002, country: "Afghanistan" },
      { name: "Astral Nova", genre: "jazz", activeSince: 1998, country: "Dominican Republic" },
      { name: "Solar Flare", genre: "blues", activeSince: 2008, country: "Indonesia" },
      { name: "Astral Nova", genre: "blues", activeSince: 1997, country: "Portugal" },
      { name: "Echo Enigma", genre: "punk", activeSince: 1985, country: "China" },
      { name: "Solar Flare", genre: "blues", activeSince: 2012, country: "China" },
    ];

    const documents = artistList.map((artist) => new Artist(artist));
    await Artist.insertMany(documents);

    console.log("Artistas creados correctamente!");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

artistSeed();
