const express = require('express');
const router = express.Router();
const LikedSong = require('.././controllers/song/LikedSong')



router.post('/getLikedSong', LikedSong.getLikedSong)
router.post('/LikedSong', LikedSong.LikedSong)
router.post('/disLikeSong', LikedSong.disLikedSong);
module.exports = router;