const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema({
  FollowUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  FollowedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  CreatedAt: { type: Date, required: true }
});

module.exports = mongoose.model("Follow", FollowSchema);
