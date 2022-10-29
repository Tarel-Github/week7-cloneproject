const express = require('express');
const router = express.Router();

const MypageController = require('./mypage.controller');
const mypageController = new MypageController();

//router.get('/:postId', mypageController.???);                   //회원가입 하기

module.exports = router;