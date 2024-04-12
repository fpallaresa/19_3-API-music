const express = require("express");

// Modelos
const { Song } = require("../models/Song.js");

// Router propio de Canciones
const router = express.Router();

// CRUD: READ - devuelve todos las canciones (params opcionales http://localhost:3000/song?page=1&limit=10)
router.get("/", async (req, res) => {
  try {
    // Asi leemos query params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const song = await Song.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .populate(["artist"]);

    // Num total de elementos
    const totalElements = await Song.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: song,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: CREATE - crea nueva canción
router.post("/", async (req, res) => {
  try {
    const song = new Song(req.body);
    const createdSong = await song.save();
    return res.status(201).json(createdSong);
  } catch (error) {
    res.status(500).json(error);
  }
});

// NO CRUD - Busca canción por nombre
router.get("/title/:title", async (req, res) => {
  const title = req.params.title;

  try {
    const song = await Song.find({ title: new RegExp("^" + title.toLowerCase(), "i") }).populate(["artist"]);

    if (song?.length) {
      res.json(song);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: DELETE - Elimina canción
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const songDeleted = await Song.findByIdAndDelete(id);
    if (songDeleted) {
      res.json(songDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: UPDATE - modifica canción
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const songUpdated = await Song.findByIdAndUpdate(id, req.body, { new: true });
    if (songUpdated) {
      res.json(songUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: READ - busca canción por id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const song = await Song.findById(id).populate(["artist"]);
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { songRouter: router };
