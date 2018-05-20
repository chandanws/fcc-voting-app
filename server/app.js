const express = require("express");
require("dotenv").config();
const app = express();
const mountRoutes = require("./api");

//setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
mountRoutes(app);

module.exports = app;
