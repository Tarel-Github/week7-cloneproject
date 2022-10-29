const UserRepository = require("./user.repository");//리포지토리의 내용을 가져와야한다.

class UserService {
    userRepository = new UserRepository();

}

module.exports = UserService;