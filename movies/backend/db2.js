const mongoose = require("mongoose");

const dbUrl = "mongodb://dba/vol2";

const actionDB =  mongoose.createConnection(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
console.log("Connected to action-MongoDB: " + dbUrl);


const close = () => actionDB.close();

module.exports = { actionDB, close, url: dbUrl };
