const mongoose = require("mongoose")
const {horrorDB} = require("../db");

const Horror = horrorDB.model('Horror', new mongoose.Schema({
  title: {
    type: String, 
    required: true
  }
}));

module.exports = Horror; 