const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Song } = require("../models/Song.js");

const songSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión");

    // Borrar datos
    await Song.collection.drop();
    console.log("Canciones eliminadas");

    const songList = [
      { title: "Cooling Dreams", duration: "2:30", releaseYear: 1976 },
      { title: "Need Difference", duration: "4:25", releaseYear: 2011 },
      { title: "Cooling Dreams", duration: "3:40", releaseYear: 1993 },
      { title: "Cooling Hero", duration: "2:45", releaseYear: 1998 },
      { title: "Not Beginning", duration: "4:05", releaseYear: 2011 },
      { title: "Bass Motion", duration: "5:01", releaseYear: 2008 },
      { title: "Overused Sunday Morning", duration: "4:05", releaseYear: 1996 },
      { title: "Love Reflections", duration: "2:50", releaseYear: 1994 },
      { title: "Me And You In View", duration: "2:50", releaseYear: 1993 },
      { title: "Need Difference", duration: "2:58", releaseYear: 1997 },
      { title: "Me And You In View", duration: "6:10", releaseYear: 2011 },
      { title: "Going Talk", duration: "3:10", releaseYear: 1993 },
      { title: "Cool Porch Sitter", duration: "5:30", releaseYear: 1998 },
      { title: "Overused Sunday Morning", duration: "4:30", releaseYear: 2004 },
      { title: "Soul Of Impulse", duration: "4:05", releaseYear: 1990 },
      { title: "Overused Sunday Morning", duration: "2:50", releaseYear: 2004 },
      { title: "Dirt Swag", duration: "2:30", releaseYear: 1999 },
      { title: "Cooling Hero", duration: "3:45", releaseYear: 1992 },
      { title: "Love Reflections", duration: "3:55", releaseYear: 1996 },
      { title: "First Hounds", duration: "4:25", releaseYear: 1995 },
    ];

    const documents = songList.map((song) => new Song(song));
    await Song.insertMany(documents);

    console.log("Canciones creadas correctamente!");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

songSeed();
