const ChatsService = require('./chat.service');

class ChatsController {
    chatsService = new ChatsService();

    //새로운 채팅룸을 만든다.
    createRoom= async(req, res, next) =>{
        try{

            //################################################################
            //const { userId } = req.app.locals.user;     //채팅룸을 만들 사람의 id를 가져오고
            const userId = 2;//여기서 유저 아이디는 구매자 id다.
            //################################################################

            const postId = 1;//여기서 포스트 아이디는 상품id이며 이게 있으면 판매자 id도 쉽게 가져올 수 있다.

            const createChattingRoomData = await this.chatsService.createRoom(userId, postId);
            res.status(201).send({data: createChattingRoomData});          
        }catch(error){
            return res.status(500).send({ errorMessage:error.message});
        }
    };

    // //특정 채팅룸에서, 채팅룸에 있는 대화의 내용을 가져온다.
    getChats = async(req, res, next) => {
        try{
        const {chatListId} = req.params;//포스트의 아이디를 가져와야 함
        const chats = await this.chatsService.getChats(chatListId);//포스트서비스의 findAllPost를 사용
        res.status(200).json({data:chats});//컨트롤러는 요청과 응답에 관여하니 응답만
        }catch(error){
            return res.status(500).send({ errorMessage:error.message});
        }
    }

    //채팅을 친다.
    createChats = async(req, res, next) =>{

        try{
            const { chatListId } = req.params;  //채팅을 작성할 채팅리스트
            const {message} =req.body;          //채팅의 내용

            if (!message){
                res.status(400).send({errorMessage: '채팅 내용 입력'});//채팅 내용이 없다면 채팅을 입력해달라는 메시지 출력
                return;
            }   
            //################################################################
            //const user=req.app.locals.user;                     //로그인중인 유저의 정보를 가져온다.
            //const userId = user.userId                          //로그인 유저의 아이디를 가져옴
            const userId = 1;
            //################################################################

            const chatsRoom = await this.chatsService.findRoom(chatListId)//채팅을 추가할 채팅리스트를 찾는다.
            const cLId = chatsRoom.chatListId  
            const createChatData = await this.chatsService.createChats(message, userId, cLId )
            res.status(201).send({data: createChatData});  
       
        }catch(error){
            return res.status(500).send({ errorMessage:error.message});
        }

    }

}
module.exports = ChatsController;