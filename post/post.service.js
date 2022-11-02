const PostRepository = require('./post.repository'); //리포지토리의 내용을 가져와야한다.

class PostService {
  postRepository = new PostRepository();

  // 위치별 거래글 조회
  findPostByLoc = async (locationId) => {
    const locationPost = await this.postRepository.findPostByLoc(locationId);
    if (locationPost.length < 1)
      throw new Error('해당 지역에는 거래글이 없습니다.');

    let result = [];
    locationPost.forEach((post) => {
      if (post.status < 2) {
        result.push(post);
      }
    });

    return result;
  };

  // 카테고리별 거래글 조회
  findPostByCat = async (categoryId) => {
    try {
      const categoryPost = await this.postRepository.findPostByCat(categoryId);
      if (!categoryPost)
        throw new error('해당 카테고리에는 거래글이 없습니다.');

      const allCategoryPost = categoryPost.map((post) => {
        return {
          postId: post.postId,
          userId: post.userId,
          categoryId: post.categoryId,
          locationId: post.locationId,
          title: post.title,
          content: post.content,
          postImgUrl: post.postImgUrl,
          price: post.price,
          status: post.status,
          wishCount: post.wishCount,
          chatCount: post.chatCount,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        };
      });
      console.log('serv post by cat');

      return allCategoryPost;
    } catch (err) {
      console.log(err);
      return { errorMessage: err.message };
    }
  };

  // 거래글 제목 검색
  findPostByTitle = async (title) => {
    try {
      const titlePost = await this.postRepository.findPostByTitle(title);
      if (!titlePost) throw new error('해당하는 타이틀의 거래글이 없습니다.');

      const allTitlePost = titlePost.map((post) => {
        return {
          postId: post.postId,
          userId: post.userId,
          categoryId: post.categoryId,
          locationId: post.locationId,
          title: post.title,
          content: post.content,
          postImgUrl: post.postImgUrl,
          price: post.price,
          status: post.status,
          wishCount: post.wishCount,
          chatCount: post.chatCount,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        };
      });

      return allTitlePost;
    } catch (err) {
      console.log(err);
      return { errorMessage: err.message };
    }
  };

  // 거래글 상세조회
  findOnePost = async (postId) => {
    try {
      const findOnePost = await this.postRepository.findOnePost(postId);
      if (!findOnePost)
        throw new error('존재하지 않는 거래글입니다. servDetail');
      console.log('serv findOnePost', findOnePost);
      // 찜 여부 확인
      let isWish = await this.postRepository.isWish(postId);
      isWish ? (isWish = true) : (isWish = false);

      console.log('serv isWish');

      const findOnePostResult = findOnePost.map((post) => {
        return {
          postId: post.postId,
          userId: post.userId,
          categoryId: post.categoryId,
          locationId: post.locationId,
          title: post.title,
          content: post.content,
          postImgUrl: post.postImgUrl,
          price: post.price,
          status: post.status,
          wishCount: post.wishCount,
          chatCount: post.chatCount,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        };
      });

      return findOnePostResult, isWish;
    } catch (err) {
      console.log(err);
      return { errorMessage: err.message };
    }
  };

  // 거래글 생성
  createPost = async (req, res) => {
    const { categoryId, title, content, postImgUrl, price } = req.body;

    // const { userId, locationId } = res.locals.user;
    const userId = 1; // 임시
    const locationId = 1; // 임시

    const post = {
      userId,
      categoryId,
      locationId,
      title,
      content,
      postImgUrl,
      price,
    };

    await this.postRepository.createPost(post);
  };

  //거래글 수정
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
    try {
      const findOnePost = await this.postRepository.findOnePost(postId);
      if (!findOnePost)
        throw new error('serv존재하지 않는 게시글입니다. 게시글 수정');
      if (findOnePost.userId !== userId)
        throw new error('serv수정 권한이 없습니다. 게시글 수정');

      const updatePost = await this.postRepository.updatePost(
        postId,
        userId,
        categoryId,
        locationId,
        title,
        content,
        postImgUrl,
        price
      );
      if (updatePost) {
        return { message: '거래글이 수정되었습니다.' };
      } else {
        return { message: '수정 실패' };
      }
    } catch (err) {
      console.log(err);
      return { errorMesage: err.message };
    }
  };

  // 거래글 status 수정
  updateStatus = async (postId, userId, status) => {
    try {
      const findOnePost = await this.postRepository.findOnePost(postId);
      if (!findOnePost)
        throw new error('serv존재하지 않는 게시글입니다. 상태 수정');
      if (findOnePost.userId !== userId)
        throw new error('serv수정 권한이 없습니다. 상태 수정');

      const updateStatus = await this.postRepository.updateStatus(
        postId,
        userId,
        status
      );
      if (updateStatus) {
        return { message: '상태가 수정되었습니다.' };
      } else {
        return { message: '수정 실패' };
      }
    } catch (err) {
      console.log(err);
      return { errorMesage: err.message };
    }
  };

  // 거래글 삭제
  deletePost = async (userId, postId) => {
    try {
      const existPost = await this.postRepository.findOnePost(postId);
      if (!existPost)
        throw new Error('거래글이 존재하지 않습니다. serv delete');
      if (existPost.userId !== userId)
        throw new Error('삭제 권한이 없습니다. serv delete');

      const deletePost = await this.postRepository.deletePost(userId, postId);

      return deletePost;
    } catch (err) {
      console.log(err);
      return { errorMesage: err.message };
    }
  };

  // // 찜목록 구현 안함
  // wishList = async (userId) => {
  //   try {
  //     const wishList = await this.postRepository.wishList(userId);

  //     const allWishList = wishList.map((wish) => {
  //       return {
  //         postId: wish.postId,
  //         userId: wish.userId,
  //         createdAt: wish.createdAt,
  //       };
  //     });

  //     console.log('serv wishlist');

  //     return allWishList;
  //   } catch (err) {
  //     console.log(err);
  //     return { errorMessage: err.message };
  //   }
  // };

  //찜 update(추가삭제 동시)
  updateWish = async (userId, postId) => {
    const findWish = await this.postRepository.findWish(userId, postId);
    if (!findWish) {
      await this.postRepository.createWish({ userId: userId, postId: postId });
      await this.postRepository.increment({ userId: userId });
      return { message: '찜목록에 추가하였습니다.' };
    } else {
      await this.postRepository.deleteWish({ userId: userId, postId: postId });
      await this.postRepository.decrement({ userId: userId });
      return { message: '찜목록에서 삭제하였습니다.' };
    }
  };
}

module.exports = PostService;
