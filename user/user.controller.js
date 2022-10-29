const UserService = require('./user.service');

class UserController {
    userService = new UserService();

    signUp = async (req, res, next) =>{

    }

    signIn = async (req, res, next) =>{

    }


}

module.exports = UserController;