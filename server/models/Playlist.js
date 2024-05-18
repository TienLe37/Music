const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  Name: { type: "String", required: true },
  AuthorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Thumbnail: { type: "String", required: true },
  CreatedAt: { type: "Date", required: true },
  UpdatedAt: { type: "Date" }
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
