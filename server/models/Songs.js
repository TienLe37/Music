const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  titleSong : { type: "String", required: true },
  URL: { type: "String", required: true },
  Thumbnail: { type: "String", default: "" },
  AuthorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: "unknown" },
  PlayCount: { type: "Number", default: 0},
  GenreID: { type: "String", default: "unknown" },
  CreateAt: { type: "Date", required: true },
  UpdateAt: { type: "Date" },
});

module.exports = mongoose.model("Song", songSchema);
