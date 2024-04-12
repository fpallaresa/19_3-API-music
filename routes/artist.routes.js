const express = require("express");

// Modelos
const { Artist } = require("../models/Artist.js");
const { Song } = require("../models/Song.js");

// Router propio de Artistas
const router = express.Router();

// CRUD: READ - devuelve todos los artistaes (params opcionales http://localhost:3000/artist?page=1&limit=10)
router.get("/", async (req, res) => {
  try {
    // Asi leemos query params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const artist = await Artist.find()
      .limit(limit)
      .skip((page - 1) * limit)

    // Num total de elementos
    const totalElements = await Artist.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: artist,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: CREATE - crea nuevo artista
router.post("/", async (req, res) => {
  try {
    const artist = new Artist(req.body);
    const createdArtist = await artist.save();
    return res.status(201).json(createdArtist);
  } catch (error) {
    res.status(500).json(error);
  }
});

// NO CRUD - Busca artista por nombre
router.get("/name/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const artist = await Artist.find({ name: new RegExp("^" + name.toLowerCase(), "i") });

    if (artist?.length) {
      res.json(artist);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: DELETE - Elimina artista
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const artistDeleted = await Artist.findByIdAndDelete(id);
    if (artistDeleted) {
      res.json(artistDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: UPDATE - modifica artista
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const artistUpdated = await Artist.findByIdAndUpdate(id, req.body, { new: true });
    if (artistUpdated) {
      res.json(artistUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: READ - busca artista por id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const artist = await Artist.findById(id);

    if (artist) {
      const temporalArtist = artist.toObject();
      const includeSongs = req.query.includeSongs === "true";
      if (includeSongs) {
        const songs = await Song.find({ artist: id });
        temporalArtist.songs = songs;
      }

      res.json(temporalArtist);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { artistRouter: router };
