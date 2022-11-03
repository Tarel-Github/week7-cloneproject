const ChatsService = require('./chat.service');
const { Users, Chats, ChatList, SalePosts } = require('../models'); //모델 데이터를 가져오고

class ChatsController {
  chatsService = new ChatsService();

  //새로운 채팅룸을 만든다. 정확히는 채팅하기 버튼을 누른 경우에 대한 것
  startChat = async (req, res, next) => {
    try {
      //################################임시 데이터 영역 (로그인 기능이 구현되면 이부분을 수정)
      const { userId } = res.locals.user; //채팅룸을 만들 사람의 id를 가져오고
      console.log(`userId = ${userId}`);
      const { postId } = req.body;
      // const userId = 3
      // const postId = 1
      //################################임시 데이터 영역 (로그인 기능이 구현되면 이부분을 수정)
      const dup = await ChatList.findAll({ where: { userId, postId } });
      let CLID = 0;

      if (dup[0]) {
        //이미 채팅방이 있다면 그 채팅방의 아이디를 가져온다
        const dup_leng = dup.length;
        CLID = dup[dup_leng - 1].dataValues.chatListId;
      } else {
        //채팅방이 없다면 만든 다음 그 아이디를 가져온다.
        // postId의 소유주인지 확인
        const targetPost = await SalePosts.findOne({ where: { postId } });
        if (targetPost.dataValues.userId === userId)
          throw new Error('본인의 게시글에 구매요청을 보낼 수 없습니다.');

        const createChattingRoomData = await this.chatsService.createRoom(
          userId,
          postId
        );
        CLID = createChattingRoomData.dataValues.chatListId;
      }
      res.status(201).send({ data: CLID });
      return CLID;
    } catch (error) {
      next(error);
    }
  };

  //내가 가진 채팅 목록을 가져온다.
  myRoom = async (req, res, next) => {
    try {
      const { userId } = res.locals.user; //유저 아이디를 가져오고

      const myChat = await ChatList.findAll({ where: { userId } });

      return res.status(201).send({ data: myChat });
    } catch (error) {
      next(error);
    }
  };

  enteringRoom = async (req, res, next) => {
    //바디에선 입장하고자한 채팅룸 아이디를 건네준다. 그리고 그곳에서 postId를 가져오고
    try {
      const { userId } = res.locals.user;
      const { chatListId } = req.params;

      const myInfo = await Users.findAll({ where: { userId } }); //로그인 한 사람(채팅시작 버튼을 누른 사람)의 ID
      const roomInfo = await ChatList.findAll({ where: { chatListId } }); //채팅방 정보를 가져옴
      const post = roomInfo[0].dataValues.postId;
      const postInfo = await SalePosts.findAll({ where: { postId: post } }); //게시글의 데이터
      const postInfoData = postInfo[0].dataValues;
      const auth_user = postInfoData.userId;
      const authorInfo = await Users.findAll({ where: { userId: auth_user } });
      const authorInfoData = authorInfo[0].dataValues;

      const chatData = await Chats.findAll({
        where: { chatlistId: chatListId },
      }); //채팅데이터

      chatData.forEach((chat) => {
        let isMine = false;
        if (userId === chat.dataValues.userId) isMine = true;
        Object.assign(chat.dataValues, { isMine: isMine });
      });

      const data = {
        chatListId: chatListId,
        title: postInfoData.title,
        postImgUrl: postInfoData.postImgUrl,
        price: postInfoData.price,
        authorId: postInfoData.userId, //포스트를 작성한 사람의 ID
        authorName: authorInfoData.nickname,
        authorProfileImage: authorInfoData.profileImage,
      };

      return res.status(201).send({ data: data, chatData: chatData });
    } catch (error) {
      next(error);
    }
  };

  // //특정 채팅룸에서, 채팅룸에 있는 대화의 내용을 가져온다.
  getChats = async (req, res, next) => {
    try {
      const { chatListId } = req.params; //포스트의 아이디를 가져와야 함
      const chats = await this.chatsService.getChats(chatListId); //포스트서비스의 findAllPost를 사용
      res.status(200).json({ data: chats }); //컨트롤러는 요청과 응답에 관여하니 응답만
    } catch (error) {
      next(error);
    }
  };

  //채팅을 친다.
  createChats = async (req, res, next) => {
    try {
      const { chatListId } = req.params; //채팅을 작성할 채팅리스트
      const { message } = req.body; //채팅의 내용

      if (!message) {
        res.status(400).send({ errorMessage: '채팅 내용 입력' }); //채팅 내용이 없다면 채팅을 입력해달라는 메시지 출력
        return;
      }

      const { userId } = res.locals.user; //로그인중인 유저의 정보를 가져온다.

      const chatsRoom = await this.chatsService.findRoom(chatListId); //채팅을 추가할 채팅리스트를 찾는다.
      const cLId = chatsRoom.chatListId;
      const createChatData = await this.chatsService.createChats(
        message,
        userId,
        cLId
      );

      await this.chatsService.updateLastChat(chatListId, message);
      res.status(201).send({ data: createChatData });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = ChatsController;
