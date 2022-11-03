const UserService = require('./user.service');
const jwt = require('jsonwebtoken');
const { signupSchema, loginSchema, emailDupSchema, nicknameDupSchema } = require('../util/validation');

class UserController {
  userService = new UserService();

  signup = async (req, res, next) => {
    try {
      const { locationId, nickname, password, confirm, email } =
        await signupSchema.validateAsync(req.body);

      if (password !== confirm)
        throw new Error('비밀번호 입력란과 확인란이 일치하지 않습니다');

      // 파일이 있으면 key값으로 이름을 정해주고 없으면 null
      const imageFileName = req.file ? req.file.key : null;

      // imageFileName에 파일명이 들어 갔으면 s3 url주소를 추가
      const profileImage = imageFileName
        ? process.env.S3_STORAGE_URL + imageFileName
        : 'https://d1unjqcospf8gs.cloudfront.net/assets/users/default_profile_80-b61ffca3ea2415f86ca30e1d04c2c480d165fdaf778a82b4ce025b21ac4333a0.png';

      await this.userService.signup(
        locationId,
        nickname,
        password,
        email,
        profileImage
      );

      res.status(201).json({ ok: true, message: '회원가입에 성공하였습니다' });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = await loginSchema.validateAsync(req.body);
      // if(payload instanceof Error) throw Error;
      const loginUser = await this.userService.login(email, password);
      // if(!loginUser){
      //     return res.status(400).json({ ok: false, errorMessage:"이메일 혹은 비밀번호를 확인해 주세요" })
      // }  service에서 했음 프론트랑 얘기해 보고 수정
      res.header('Authorization', loginUser);
      res.cookie('Authorization', loginUser, { Expires: 3600 });
      res.send({ token: loginUser });
    } catch (error) {
      next(error);
    }
  };

  emailDup = async (req, res, next) => {
    try {
      const { email } = await emailDupSchema.validateAsync(req.body);
      if (email == '') throw new Error('이메일을 입력해 주세요');
      const emailDup = await this.userService.dupCheckEmail(email);
      if (emailDup) {
        return res.status(400).json({
          ok: false,
          errorMessage: '이메일이 이미 존재합니다',
        });
      } else {
        await this.userService.dupCheckEmail(email);
        return res.status(200).json({
          ok: true,
          message: '사용 가능한 이메일입니다',
        });
      }
    } catch (error) {
      next(error);
    }
  };

  nicknameDup = async (req, res, next) => {
    try{
      const { nickname } = await nicknameDupSchema.validateAsync(req.body);
      if (nickname == '') throw new Error('닉네임을 입력해 주세요');
      const nicknameDup = await this.userService.dupCheckNickname(nickname);
      if (nicknameDup) {
        return res.status(400).json({
          ok: false,
          errorMessage: '닉네임이 이미 존재합니다',
        });
      } else {
        await this.userService.dupCheckNickname(nickname);
        return res.status(200).json({
          ok: true,
          message: '사용 가능한 닉네임입니다',
        });
      }
    }catch(error){
      next(error)
    }
  };
}

module.exports = UserController;
