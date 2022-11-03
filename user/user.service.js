const UserRepository = require('./user.repository');
const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserService {
  userRepository = new UserRepository();

  signup = async (locationId, nickname, password, email, profileImage) => {
    password = await bcript.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    );
    return await this.userRepository.signup({
      locationId,
      nickname,
      password,
      email,
      profileImage,
      createdAt: String(Date.now()),
      updatedAt: String(Date.now()),
    });
  };

  login = async (email, password) => {
    const loginUser = await this.userRepository.userFindEmail(email);
    if (
      !loginUser ||
      !(await bcript.compare(password, loginUser.get().password))
    )
      throw new Error('아이디 혹은 비밀번호가 일치하지 않습니다');

    // 토큰 만들기
    return jwt.sign(
      {
        userId: loginUser.userId,
        nickname: loginUser.nickname,
        profileImage: loginUser.profileImage,
        locationId: loginUser.locationId,
        createdAt: loginUser.createdAt,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );
  };

  dupCheckEmail = async (email) => {
    const result = await this.userRepository.userFindEmail(email);
    return Boolean(result);
  };

  dupCheckNickname = async (nickname) => {
    const result = await this.userRepository.userFindNickname(nickname);
    return Boolean(result);
  };
}

module.exports = UserService;
