const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment/commentController')



router.post('/CreateComment', commentController.CreateComment)
router.post('/GetComment', commentController.GetComment)
router.put('/UpdateComment', commentController.UpdateComment)
router.delete('/DeleteComment', commentController.DeleteComment)

module.exports = router;