const { Users, TransactionList, Wishes, SalePosts } = require('../models');
class MypageRepository {
  constructor() {}

  // getSaleslist 판매기록 조회
  getSaleslist = async (userId) => {
    return await SalePosts.findAll({
      where: { userId },
    });
  };

  // getBuyslist 구매기록 조회
  getBuyslist = async (userId) => {
    const transactionList = await TransactionList.findAll({
      where: { userId },
    });

    let buyList = [];

    for (let i = 0; i < transactionList.length; i++) {
      let tempPost = await SalePosts.findAll({
        where: { postId: transactionList[i].postId },
      });
      buyList.push(tempPost);
    }

    return buyList;
  };

  // getWishlist 찜 목록 조회
  getWishlist = async (userId) => {
    const wishes = await Wishes.findAll({
      where: { userId },
    });

    let wishPosts = [];

    for (let i = 0; i < wishes.length; i++) {
      let tempPost = await SalePosts.findOne({
        where: { postId: wishes[i].postId },
      });
      wishPosts.push(tempPost);
    }

    return wishPosts;
  };

  // changeProfileImg 프로필 이미지 변경
  async changeProfileImg(userId) {}

  // changeNickname 닉네임 변경
  changeNickname = async (userId, nickname) => {
    await Users.update(
      { nickname, updatedAt: Date.now() },
      { where: { userId } }
    );
  };

  // changePassword 비밀번호 변경
  changePassword = async (userId, password) => {
    await Users.update(
      { password, updatedAt: Date.now() },
      { where: { userId } }
    );
  };

  // getUserDetail 내 정보 조회
  getUserDetail = async (userId) => {
    return await Users.findOne({
      attributes: { exclude: ['email', 'password'] },
      where: { userId },
    });
  };

  // getMyHistory userId로 거래내역 조회
  getMyHistory = async (userId) => {
    return await TransactionList.findAll({
      where: { userId },
    });
  };

  // postId로 판매글 조회
  getSaleslistByPostId = async (postId) => {
    return await SalePosts.findOne({ where: { postId } });
  };
}

module.exports = MypageRepository;
