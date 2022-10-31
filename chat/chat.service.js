const ChatsRepository = require("./chat.repository");//리포지토리의 내용을 가져와야한다.

class ChatsService{
    chatsRepository = new ChatsRepository();

    //새로운 채팅룸을 만듦
    createRoom =async (userId, postId) => {
        const createChattingRoom = await this.chatsRepository.createRoom(userId, postId);
        return createChattingRoom;
    }

    //채팅 내용을 가져옴
    getChats =async (chatListId) => {
        const getChats = await this.chatsRepository.getChats(chatListId);
        return getChats;
    }

    //채팅치기
    createChats = async (message, userId, chatListId) => {
        const createChats = await this.chatsRepository.createChats(message, userId, chatListId);
        return createChats
    }

    //채팅룸 찾기
    findRoom = async (chatListId) => {
        const findRoom = await this.chatsRepository.findChatListById(chatListId);
        return findRoom;
    }
}

module.exports = ChatsService;