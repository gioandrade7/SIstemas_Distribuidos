const mongoose = require("mongoose");

const dbUrl = "mongodb://dbh/vol1";

const horrorDB =  mongoose.createConnection(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
console.log("Connected to horror-MongoDB: " + dbUrl);


const close = () => horrorDB.close();

module.exports = { horrorDB, close, url: dbUrl };