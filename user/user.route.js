const express = require('express');
const router = express.Router();

const UserController = require('./user.controller');
const userController = new UserController();
// const auth = require('../middlewares/authMiddleware')    //미들웨어는 잠시 보류

// 로그인/
router.get('/:postId', userController.signUp);                   //회원가입 하기
router.post('/:postId', userController.signIn);                //로그인 하기

module.exports = router;