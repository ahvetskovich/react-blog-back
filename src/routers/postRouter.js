const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const {isAuth} = require('../controllers/auth');


router.get('/postStream', postController.getPostStream);
router.get('/postPage/:postId', isAuth, postController.getPostPage);

// application -------------------------------------------------------------
// routers.get('/', function (req, res) {
//
//     res.render('index', {title: 'node-postgres-promises'}); // load the single view file (angular will handle the page changes on the front-end)
// });

module.exports = router;
