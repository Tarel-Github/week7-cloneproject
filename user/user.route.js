const express = require('express');
const router = express.Router();

const UserController = require('./user.controller');
const userController = new UserController();
const multerS3 = require('../middlewares/imageUploadMiddleware');
const multer = new multerS3();
const loginMiddleware = require('../middlewares/authLoginUserMiddleware');

router.post(
  '/signup',
  loginMiddleware,
  multer.upload.single('profileImage'),
  userController.signup
);
router.post('/login', loginMiddleware, userController.login);
router.post('/signup/emailDup', userController.emailDup);
router.post('/signup/nicknameDup', userController.nicknameDup);

// env 에 시크릿키 넣어서 숨기기
// condole.log 지우기
// trycatch 작성하기
// User 정보 찾아와서 토큰에 넣어줄 때 password email 제외한 나머지 모두 넣어주기

module.exports = router;
