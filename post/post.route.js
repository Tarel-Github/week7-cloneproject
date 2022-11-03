const express = require('express');
const router = express.Router();

const Auth = require('../middlewares/authMiddleware');
const multerS3 = require('../middlewares/imageUploadMiddleware');
const PostController = require('./post.controller');
const multer = new multerS3();
const postController = new PostController();

// 위치별 조회 ㅇ
router.get('/loc', Auth, Auth, postController.findPostByLoc);
// 카테고리별 조회 ㅇ
router.get('/cat/:categoryId', Auth, postController.findPostByCat);
// 타이틀 검색
router.get('/search', Auth, postController.findPostByTitle);
// 상세 조회
router.get('/:postId', Auth, postController.findOnePost);
// 거래글 생성
router.post(
  '/',
  Auth,
  multer.upload.single('postImgUrl'),
  postController.createPost
);
// 거래글 수정 ㅇ
router.put(
  '/:postId',
  Auth,
  multer.upload.single('postImgUrl'),
  postController.updatePost
);
// 거래글 상태 수정 ㅇ
router.put('/status/:postId', Auth, Auth, postController.updateStatus);
// 거래글 삭제 ㅇ
router.delete('/:postId', Auth, Auth, postController.deletePost);
// 찜 추가, 삭제 ㅇ
router.put('/wish/:postId', Auth, Auth, postController.updateWish);

module.exports = router;
