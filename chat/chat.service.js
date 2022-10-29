const ChatRepository = require("./chat.repository");//리포지토리의 내용을 가져와야한다.

class ChatService {
    chatList = new ChatRepository();

}

module.exports = ChatService;