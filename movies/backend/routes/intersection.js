const express = require("express");
const Action = require("../models/Action");
const Horror = require("../models/Horror");

const router = express.Router();

router.get("/:title", async (req, res) => {
  const {title} = req.params;
  const horror_movie = await Horror.findOne({title: title});
  const action_movie = await Action.findOne({title: title});

  res.send({
    horror_movie,
    action_movie
  });
});


module.exports = router;