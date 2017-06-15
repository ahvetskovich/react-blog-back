const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const {isAuth} = require('../controllers/auth');


router.get('/postStream', postController.getPostStream);
router.get('/postPage/:postId', isAuth, postController.getPostPage);

module.exports = router;
