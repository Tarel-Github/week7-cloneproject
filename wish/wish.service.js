const WishRepository = require("./wish.repository");//리포지토리의 내용을 가져와야한다.

class WishService {
    wishRepository = new WishRepository();

}

module.exports = WishService;