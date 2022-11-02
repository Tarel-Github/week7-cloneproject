const MypageService = require('./mypage.service');

class MypageController {
  mypageService = new MypageService();

  // getSaleslist 판매기록 조회
  getSaleslist = async (req, res, next) => {
    try {
      const result = await this.mypageService.getSaleslist(req, res);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // getBuyslist 구매기록 조회
  getBuyslist = async (req, res, next) => {
    try {
      const result = await this.mypageService.getBuyslist(req, res);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // getWishlist 찜 목록 조회
  getWishlist = async (req, res, next) => {
    try {
      const result = await this.mypageService.getWishlist(req, res);
      res.status(200).send({ deta: result });
    } catch (error) {
      next(error);
    }
  };

  // getMyHistory 당근 가계부
  getMyHistory = async (req, res, next) => {
    try {
      const result = await this.mypageService.getMyHistory(req, res);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  // changeProfileImg 프로필 이미지 변경
  changeProfileImg = async (req, res, next) => {
    try {
      await this.mypageService.changeProfileImg(req, res);
      res
        .status(200)
        .json({ ok: 'true', msg: '프로필 이미지를 변경했습니다!' });
    } catch (error) {
      next(error);
    }
  };

  // changeNickname 닉네임 변경
  changeNickname = async (req, res, next) => {
    try {
      await this.mypageService.changeNickname(req, res);
      res.status(200).json({ ok: 'true', msg: '닉네임을 변경했습니다!' });
    } catch (error) {
      next(error);
    }
  };

  // changePassword 비밀번호 변경
  changePassword = async (req, res, next) => {
    try {
      await this.mypageService.changePassword(req, res);
      res.status(200).json({ ok: 'true', msg: '비밀번호를 변경했습니다!' });
    } catch (error) {
      next(error);
    }
  };

  // getMypage 내 정보 조회
  getMypage = async (req, res, next) => {
    try {
      const myDetail = await this.mypageService.getMypage(req, res);
      res.send(myDetail);
    } catch (error) {
      next(error);
    }
  };

  // getDetailByUserId 유저 정보 조회
  getDetailByUserId = async (req, res, next) => {
    try {
      const detail = await this.mypageService.getDetailByUserId(req, res);
      res.send(detail);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = MypageController;
