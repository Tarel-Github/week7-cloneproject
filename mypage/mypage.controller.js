const MypageService = require('./mypage.service');

class MypageController {
    mypageService = new MypageService();

}

module.exports = MypageController;