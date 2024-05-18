const express = require('express');
const { FollowOtherUser } = require('../controllers/Follow/FollowOtherUser');
const { GetFollowed } = require('../controllers/Follow/GetFollowed');
const router = express.Router();
router.post('/FollowOtherUser', FollowOtherUser);
router.get('/GetFollowed', GetFollowed)

module.exports = router;