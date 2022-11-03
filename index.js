const express = require('express');
const router = express.Router();

const post = require('./post/post.route'); //정환님
const mypage = require('./mypage/mypage.route'); //준혁님
const chat = require('./chat/chat.route'); //민성
const user = require('./user/user.route'); //지현님

router.use('/post', post);
router.use('/mypage', mypage);
router.use('/chat', chat);
router.use('/', user);

module.exports = router;
