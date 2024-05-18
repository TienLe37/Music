const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  ID: { type: "Number", required: true },
  Name: { type: "String", required: true },
});

module.exports = mongoose.model("Genre", songSchema);
