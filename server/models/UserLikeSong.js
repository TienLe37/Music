const mongoose = require('mongoose');

const UserLikeSongSchema = new mongoose.Schema({
    UserID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    SongID: {type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true},
    CreateAt: { type: "Date", required: true },
    UpdateAt: { type: "Date" },
})

module.exports = mongoose.model("UserLikeSong", UserLikeSongSchema)