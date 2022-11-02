const { SalePosts, Wishes, TransactionList } = require('../models');
const { Op } = require('sequelize');
const UserService = require('../user/user.service');
const WishService = require('../wish/wish.service');

class PostRepository {
  // 위치별 거래글 조회
  findPostByLoc = async (locationId) => {
    const locationPost = await SalePosts.findAll({
      where: { locationId },
      order: [['updatedAt', 'DESC']],
    });

    return locationPost;
  };

  // 카테고리별 거래글 조회
  findPostByCat = async (categoryId) => {
    const categoryPost = await SalePosts.findAll({
      where: { categoryId },
      order: [['createdAt', 'DESC']],
    });
    console.log('repo find by category', categoryPost);

    return categoryPost;
  };

  // 제목검색 거래글 조회
  findPostByTitle = async (title) => {
    const titlePost = await SalePosts.findAll({
      where: { title: { [Op.like]: `%${title}%` } },
      order: [['createdAt', 'DESC']],
    });

    return titlePost;
  };

  // 거래글 상세 조회
  findOnePost = async (postId) => {
    const findOnePost = await SalePosts.findOne({
      where: { postId: postId },
      // include: {
      //     model: UserService,
      //     attributes: [],
      // },
    });
    console.log('repo detail post', findOnePost);

    return findOnePost;
  };

  // 찜 여부 확인
  isWish = async (postId) => {
    const isWish = await Wishes.findOne({ where: { postId } });

    console.log('repo isWish', isWish);

    return isWish;
  };

  // 거래글 생성
  createPost = async (post) => {
    const createPost = await SalePosts.create({
      ...post,
      createdAt: String(Date.now()),
      updatedAt: String(Date.now()),
    });

    return createPost;
  };

  // 거래글 수정
  updatePost = async (
    postId,
    userId,
    categoryId,
    locationId,
    title,
    content,
    postImgUrl,
    price
  ) => {
    const updatePost = await SalePosts.update(
      {
        categoryId,
        title,
        content,
        postImgUrl,
        price,
        updatedAt: Date.now() + '',
      },
      { where: { postId: postId } }
    );

    console.log('repo update', updatePost);

    return updatePost;
  };

  // 거래글 status 수정
  updateStatus = async (postId, userId, status) => {
    const updateStatus = await SalePosts.update(
      {
        status,
        updatedAt: Date.now(),
      },
      { where: { postId: postId } }
    );

    console.log('repo update status', updateStatus);

    return updateStatus;
  };

  // 판매글 삭제
  deletePost = async (userId, postId) => {
    const deletePost = await SalePosts.destroy({ where: { userId, postId } });

    console.log('repo delete');

    return deletePost;
  };
}

// 찜목록
wishList = async (userId) => {
  const wishList = await Wishes.findAll({
    where: { userId: userId },
  });

  console.log('repo wishList');

  return wishList;
};

// findWish
findWish = async (userId, postId) => {
  const updateWish = await Wishes.findOne({
    where: { userId: userId, postId: postId },
  });

  console.log('repo findWish');

  return updateWish;
};

// 찜하기
createWish = async (postId, userId) => {
  const createWish = await Wishes.create(postId, userId);

  console.log('repo createWish');

  return createWish;
};

// 찜하기 취소
deleteWish = async (postId, userId) => {
  const deleteWish = await Wishes.destroy({
    where: postId,
    userId,
  });

  console.log('repo deleteWish');

  return deleteWish;
};

// wishCount 증가
increment = async (postId) => {
  const increment = await SalePosts.increment(
    { wishCount: 1 },
    { where: postId }
  );

  console.log('repo increment');

  return increment;
};

// wishCount 감소
decrement = async (postId) => {
  const decrement = await SalePosts.decrement(
    { wishCount: 1 },
    { where: postId }
  );

  console.log('repo decrement');

  return decrement;
};

// 거래내역 추가
createTransaction = async (postId, userId) => {
  const createTransaction = await TransactionList.create(postId, userId);

  console.log('repo create transaction');

  return createTransaction;
};
module.exports = PostRepository;
