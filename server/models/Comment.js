const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  UserCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  SongId: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
  Content: { type: String, required: true },
  CreatedAt: { type: Date, required: true },
  UpdatedAt: { type: Date, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
