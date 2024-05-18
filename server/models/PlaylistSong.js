const mongoose = require("mongoose");

const PlaylistSongSchema = new mongoose.Schema({
  PlaylistID: {type: mongoose.Schema.Types.ObjectId, ref: "Playlist", required: true},
  SongID: {type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true},
  CreatedAt: {type: Date, required: true},
  UpdatedAt: {type: Date}
});

module.exports = mongoose.model("PlaylistSong", PlaylistSongSchema);
