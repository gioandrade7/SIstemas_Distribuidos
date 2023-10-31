const mongoose = require("mongoose")
const {actionDB} = require("../db2");

const Action = actionDB.model('Action', new mongoose.Schema({
  title: {
    type: String, 
    required: true
  }
}));

module.exports = Action; 