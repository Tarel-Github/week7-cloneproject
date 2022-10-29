const express = require('express');
const router = express.Router();

const PostController = require('./post.controller');
const postController = new PostController;

router.get('/', postController.getPost);



module.exports = router;
