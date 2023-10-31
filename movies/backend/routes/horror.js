const express = require("express");
const validateId = require("../middleware/validateId");
const Horror = require("../models/Horror");

const router = express.Router();

router.get("/", async (req, res) => {
  const horror_movies = await Horror.find().sort("title");
  res.send(horror_movies);
});

router.get("/:id", validateId, async (req, res) => {
  const horror_movie = await Horror.findById(req.params.id);
  if (!horror_movie) return res.status(404).send();
  res.send(horror_movie);
});

router.post("/", async (req, res) => {
  if (!req.body.title) return res.status(400).send("Title is required.");

  const horror_movie = new Horror({ title: req.body.title });
  await horror_movie.save();
  res.status(201).send(horror_movie);
});

router.delete("/:id", async (req, res) => {
  const horror_movie = await Horror.findByIdAndDelete(req.params.id);

  if (!horror_movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.status(204).send();
});

module.exports = router;
