const express = require("express");
const validateId = require("../middleware/validateId");
const Action = require("../models/Action");

const router = express.Router();

router.get("/", async (req, res) => {
  const action_movie = await Action.find().sort("title");
  res.send(action_movie);
});

router.get("/:id", validateId, async (req, res) => {
  const action_movie = await Action.findById(req.params.id);
  if (!action_movie) return res.status(404).send();
  res.send(action_movie);
});

router.post("/", async (req, res) => {
  if (!req.body.title) return res.status(400).send("Title is required.");

  const action_movie = new Action({ title: req.body.title });
  await action_movie.save();
  res.status(201).send(action_movie);
});

router.delete("/:id", async (req, res) => {
  const action_movie = await Action.findByIdAndDelete(req.params.id);

  if (!action_movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.status(204).send();
});

module.exports = router;
