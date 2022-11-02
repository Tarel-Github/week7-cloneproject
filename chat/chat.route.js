const express = require('express');
const router = express.Router();

const ChatsController = require('./chat.controller');
const chatsController = new ChatsController();
//const auth = require('../middlewares/authMiddleware') //미들웨어는 아직 보류

// router.use('/chat', chat);요기서 내려왔음
router.post('/', chatsController.createRoom);                   //새로운 채팅룸 만들기
router.get('/:chatListId', chatsController.getChats);            //채팅 내용 가져오기
router.post('/:chatListId', chatsController.createChats);        //채팅 작성하기


module.exports = router;