const express = require('express');
const router = express.Router();

const Auth = require('../middlewares/authMiddleware');
const PostController = require('./post.controller');
const postController = new PostController();

// 불필요한 trycatch, console.log 삭제
// 위치별, 카테고리별 stauts가 2인 게시글 버리기
// 코드 정리

// 위치별 조회 ㅇ
router.get('/loc/:locationId', Auth, postController.findPostByLoc);
// 카테고리별 조회 ㅇ
router.get('/cat/:categoryId', postController.findPostByCat);
// 타이틀 검색
router.get('/search', postController.findPostByTitle);
// 상세 조회
router.get('/:postId', postController.findOnePost);
// 거래글 생성
router.post('/', postController.createPost);
// 거래글 수정 ㅇ
router.put('/:postId', postController.updatePost);
// 거래글 상태 수정 ㅇ
router.put('/status/:postId', postController.updateStatus);
// 거래글 삭제 ㅇ
router.delete('/:postId', postController.deletePost);
// 찜 추가, 삭제 ㅇ
router.put('/wish/:postId', postController.updateWish);

module.exports = router;
