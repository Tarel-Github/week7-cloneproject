const express = require('express');
const router = express.Router();

const ChatsController = require('./chat.controller');
const chatsController = new ChatsController();
const auth = require('../middlewares/authMiddleware') //미들웨어는 아직 보류

// /chat
router.post('/',/*auth,*/ chatsController.startChat);                    //새로운 채팅룸 만들기
router.get('/',/*auth,*/ chatsController.myRoom);                       //나의 채팅 목록 가져오기
//router.get('/:chatListId',/*auth ,*/chatsController.getChats);            //채팅 내용 가져오기
router.post('/:chatListId',/*auth ,*/chatsController.createChats);        //채팅 작성하기
router.get('/:chatListId',/*auth ,*/chatsController.enteringRoom);        //채팅룸 입장

module.exports = router;