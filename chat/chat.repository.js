const { Users, Chats, ChatList } = require('../models'); //모델 데이터를 가져오고

class ChatsRepository {
  Chat = new Chats();
  // Comment = new Comments()

  //새로운 채팅룸 만들기
  createRoom = async (userId, postId) => {
    const lastMessage = '아직 대화내용이 없습니다.'; //##

    const createdAt = String(Date.now());
    const updatedAt = String(Date.now());

    return await ChatList.create({
      userId,
      postId,
      lastMessage,
      createdAt,
      updatedAt,
    });
  };

  //채팅내용 가져오기
  getChats = async (chatListId) => {
    const chats = await Chats.findAll({
      where: { chatListId },
      include: {
        model: Users,
        attributes: ['nickname'],
      },
      order: [['createdAt', 'DESC']],
    });
    return chats;
  };

  //채팅을 친다.
  createChats = async (message, userId, chatListId) => {
    const createdAt = String(Date.now());

    const createChatData = await Chats.create({
      message,
      userId,
      chatListId,
      createdAt,
    });
    return createChatData;
  };

  //채팅룸 찾기
  findChatListById = async (chatListId) => {
    console.log(chatListId);
    const chatList = await ChatList.findByPk(chatListId);
    return chatList;
  };

  // 마지막 채팅 업데이트
  updateLastChat = async (chatListId, lastMessage) => {
    await ChatList.update(
      {
        lastMessage,
        updatedAt: String(Date.now()),
      },
      { where: { chatListId } }
    );
  };
}

module.exports = ChatsRepository;
