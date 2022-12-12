const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const cookieParser = require("cookie-parser")

const User = require('./models/User');
const Song = require("./models/Song")

// Configuring .env
require("dotenv").config({ path: path.join(__dirname, '../.env') });

// Applying middleware
app.use('/', express.json()); // parse requests with JSON payload/body
app.use('/public', express.static(path.join(__dirname, '/public'))); // serve static files
app.use(cookieParser())

// Template engine configuration
app.set("views", path.join(__dirname, "/views")); // where template files are located
app.set("view engine", "ejs"); // default engine, dont need to specify .ejs extension

app.use('/user', routes.UserRouter);
app.use('/songs', routes.SongRouter);
app.use('/artists', routes.ArtistRouter);
app.use('/', routes.FrontEndRouter)

// Catch-all route for unsupported paths
app.all('*', (req, res) => {
    res.status(400).json({ error: "InvalidURI", description: `The URI ${req.url} is not valid.` });
});

module.exports = app;