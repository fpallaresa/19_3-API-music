const express = require("express");

// Modelos
const { Playlist } = require("../models/Playlist.js");
const { Song } = require("../models/Song.js");
const { User } = require("../models/User.js");

// Router propio de Playlist
const router = express.Router();

// CRUD: READ - devuelve todas las playlist (params opcionales http://localhost:3000/playlist?page=1&limit=10)
router.get("/", async (req, res) => {
  try {
    // Asi leemos query params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const playlist = await Playlist.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .populate({
        path: 'songs',
        populate: { path: 'artist' }
      })
      .populate('creator');

    // Num total de elementos
    const totalElements = await Playlist.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: playlist,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: CREATE - crea nueva playlist
router.post("/", async (req, res) => {
  try {
    const playlist = new Playlist(req.body);
    const createdPlaylist = await playlist.save();
    return res.status(201).json(createdPlaylist);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: CREATE - crea nueva canción en la playlist
router.post("/:id/song", async (req, res) => {
  try {
    const playlistId = req.params.id;
    const songId = req.body.songId;

    if (!songId) {
      return res.status(400).json([]);
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json([]);
    }

    if (playlist.songs.includes(songId)) {
      return res.status(409).json([]);
    }
    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json(error);
  }
});

// NO CRUD - Busca playlist por nombre
router.get("/name/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const playlist = await Playlist.find({ name: new RegExp("^" + name.toLowerCase(), "i") })
    .populate({
      path: 'songs',
      populate: { path: 'artist' }
    })
    .populate('creator');

    if (playlist?.length) {
      res.json(playlist);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: DELETE - Elimina playlist
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const playlistDeleted = await Playlist.findByIdAndDelete(id);
    if (playlistDeleted) {
      res.json(playlistDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: DELETE - Elimina canción en la playlist
router.delete("/:id/song", async (req, res) => {
  try {
    const playlistId = req.params.id;
    const songId = req.body.songId;

    if (!songId) {
      return res.status(400).json([]);
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json([]);
    }

    if (!playlist.songs.includes(songId)) {
      return res.status(404).json([]);
    }
    const index = playlist.songs.indexOf(songId); 
    playlist.songs.splice(index, 1);
    const playlistSave = await playlist.save();

    return res.status(200).json(playlistSave);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: UPDATE - modifica playlist
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const playlistUpdated = await Playlist.findByIdAndUpdate(id, req.body, { new: true });
    if (playlistUpdated) {
      res.json(playlistUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CRUD: READ - busca playlist por id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const playlist = await Playlist.findById(id)
      .populate({
        path: 'songs',
        populate: { path: 'artist' }
      })
      .populate('creator');

    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = { playlistRouter: router };
