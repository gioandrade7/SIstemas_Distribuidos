const express = require("express");
const cors = require("cors");
const homeRoutes = require("./routes/index");
const horrorRoutes = require("./routes/horror");
const actionRoutes = require("./routes/action");
const interRoutes = require("./routes/intersection");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/", homeRoutes);
app.use("/api/horror", horrorRoutes);
app.use("/api/action", actionRoutes);
app.use("/api/intersection", interRoutes);

module.exports = app;
