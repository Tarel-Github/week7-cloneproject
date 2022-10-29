const express = require('express');
const router = express.Router();

const user = require('./user/user.route'); //지현님
const post = require('./post/post.route'); //정환님
const wish = require('./wish/wish.route'); //정환님
const mypage = require('./mypage/mypage.route'); //준혁님
const chat = require('./chat/chat.route'); //민성

router.use('/user', user);
router.use('/post', post);
router.use('/wish', wish);
router.use('/mypage', mypage);
router.use('/chat', chat);

module.exports = router;