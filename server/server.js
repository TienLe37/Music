const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { error } = require('console');
require("dotenv").config();

const authRoutes = require('./routes/authRoutes')
const songRoutes = require('./routes/songRoutes')
const likedSongRoutes = require('./routes/LikedSongRoutes')
const commentRoutes = require('./routes/commentRoutes')
const PlaylistRoutes = require('./routes/PlaylistRoutes')
const FollowRoutes = require('./routes/FollowRoutes')

const PORT = process.env.PORT || process.env.API_PORT

const app = express();
app.use(express.json());
app.use(cors())

//register routes

app.use('/auth', authRoutes)
app.use('/song', songRoutes);
app.use('/LikedSong', likedSongRoutes)
app.use('/comment', commentRoutes)
app.use('/Playlist', PlaylistRoutes)
app.use('/Follow', FollowRoutes)
const server = http.createServer(app);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    server.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    });
})
.catch((error) => {
    console.log(error)
})