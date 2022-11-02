const bcrypt = require('bcrypt');
const MypageRepository = require('./mypage.repository'); //리포지토리의 내용을 가져와야한다.

class MypageService {
  mypageRepository = new MypageRepository();
  constructor() {}

  // getSaleslist 판매기록 조회
  async getSaleslist(req, res) {
    const { userId } = res.locals.user;

    return await this.mypageRepository.getSaleslist(userId);
  }
  // getBuyslist 구매기록 조회
  async getBuyslist(req, res) {
    const { userId } = res.locals.user;
    return await this.mypageRepository.getBuyslist(userId);
  }
  // getWishlist 찜 목록 조회
  async getWishlist(req, res) {
    const { userId } = res.locals.user;

    const result = await this.mypageRepository.getWishlist(userId);
    return result;
  }

  // getMyHistory 당근 가계부
  async getMyHistory(req, res) {
    const { userId } = res.locals.user;

    // 구매정산
    let buyPostIds = [];
    let sumBuyCost = 0;

    const myHistory = await this.mypageRepository.getMyHistory(userId);
    myHistory.forEach((item) => {
      buyPostIds.push(item.postId);
    });

    buyPostIds.forEach(async (postId) => {
      let post = await this.mypageRepository.getSaleslistByPostId(postId);

      sumBuyCost += post.price;
    });

    // 판매 정산
    let saleCount = 0;
    let sumSaleCost = 0;

    const mySalePosts = await this.mypageRepository.getSaleslist(userId);

    // 거래완료 건수 및 합계금액 계산
    mySalePosts.forEach((salePost) => {
      if (salePost.status === 2) {
        saleCount += 1;
        sumSaleCost += salePost.price;
      }
    });

    // return data
    const data = {
      buyCount: buyPostIds.length,
      sumBuyCost,
      saleCount,
      sumSaleCost,
      result: sumSaleCost - sumBuyCost,
    };

    return data;
  }

  // changeProfileImg 프로필 이미지 변경
  async changeProfileImg(req, res) {
    const { userId } = res.locals.user;
    await this.mypageRepository.changeProfileImg(userId);
    return result;
  }

  // changeNickname 닉네임 변경
  async changeNickname(req, res) {
    const { userId } = res.locals.user;
    const { nickname } = req.body;

    // 유효성 검사

    await this.mypageRepository.changeNickname(userId, nickname);
  }

  // changePassword 비밀번호 변경
  async changePassword(req, res) {
    const { userId } = res.locals.user;
    const { password } = req.body;

    const newPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    ); // 임시임시

    await this.mypageRepository.changePassword(userId, newPassword);
  }

  // getMypage 내 정보 조회
  async getMypage(req, res) {
    const { userId } = res.locals.user;
    const result = await this.mypageRepository.getUserDetail(userId);
    return result;
  }

  // getDetailByUserId 유저 정보 조회
  async getDetailByUserId(req, res) {
    const userId = req.params.userId;

    return await this.mypageRepository.getUserDetail(userId);
  }
}

module.exports = MypageService;
