const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mail: {type: String, unique: true},
    username: {type: String, unique: true},
    password: {type: String, unique: true},
    role: {type: String}
})

module.exports = mongoose.model("User", userSchema)