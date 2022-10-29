const MypageRepository = require("./mypage.repository");//리포지토리의 내용을 가져와야한다.

class MypageService {
    mypageRepository = new MypageRepository();

}

module.exports = MypageService;