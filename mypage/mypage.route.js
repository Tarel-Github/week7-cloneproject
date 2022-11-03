const express = require('express');
const router = express.Router();

const MypageController = require('./mypage.controller');
const Auth = require('../middlewares/authMiddleware');
const multerS3 = require('../middlewares/imageUploadMiddleware');
const multer = new multerS3();
const mypageController = new MypageController();

// 내 판매기록 조회
router.get('/sale', Auth, mypageController.getSaleslist);
// 내 구매기록 조회
router.get('/buy', Auth, mypageController.getBuyslist);
// 내 찜 목록 조회
router.get('/wish', Auth, mypageController.getWishlist);
// 당근 가계부
router.get('/history', Auth, mypageController.getMyHistory);
// 프로필 이미지 변경
router.put(
  '/img',
  Auth,
  multer.upload.single('profileImage'),
  mypageController.changeProfileImg
);
// 닉네임 변경
router.put('/nickname', Auth, mypageController.changeNickname);
// 비밀번호 변경
router.put('/password', Auth, mypageController.changePassword);
// locationId 변경
router.put('/locationId', Auth, mypageController.changeLocationId);
// 유저 정보 조회
router.get('/:userId', Auth, mypageController.getDetailByUserId);
// 내 정보 조회
router.get('', Auth, mypageController.getMypage);

module.exports = router;
