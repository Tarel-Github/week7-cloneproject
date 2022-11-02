const PostService = require('./post.service');

class PostController {
  postService = new PostService();

  // 위치별 거래글 조회
  findPostByLoc = async (req, res, next) => {
    try {
      // const { locationId } = res.locals.user; // user랑 합치면 이걸로 돌려놔야함
      const { locationId } = req.params; // 임시
      const locationPost = await this.postService.findPostByLoc(locationId);

      res.status(200).send({ data: locationPost });
    } catch (err) {
      next(err);
    }
  };

  // 카테고리별 거래글 조회
  findPostByCat = async (req, res, next) => {
    try {
      const { categoryId } = req.params;

      const categoryPost = await this.postService.findPostByCat(categoryId);

      res.status(200).send(categoryPost);
    } catch (err) {
      next(err);
    }
  };

  // 제목검색 거래글 조회 검색기능 왜 잘될까?
  findPostByTitle = async (req, res, next) => {
    try {
      let { keyword } = req.query;
      keyword = keyword.trim();

      if (keyword < 1) throw new Error('키워드를 두 글자 이상 입력해주세요');

      const titlePost = await this.postService.findPostByTitle(keyword);

      res.status(200).send(titlePost);
    } catch (err) {
      next(err);
    }
  };

  // 거래글 상세 조회
  findOnePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      if (typeof (postId / 1) === NaN || postId.search(/\s/) != -1)
        throw new error('postId가 잘못됐습니다.');

      const findOnePost = await this.postService.findOnePost(postId);

      // let isWish = await this.postService.isWish(postId);

      console.log('controller detail');
      return res.status(200).send(findOnePost);
    } catch (err) {
      next(err);
    }
  };

  // 거래글 생성
  createPost = async (req, res, next) => {
    try {
      await this.postService.createPost(req, res);

      res.status(200).send({ ok: 'true', message: '거래글이 생성되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  // 거래글 수정
  updatePost = async (req, res, next) => {
    try {
      // const { userId, locationId } = res.locals.user;
      const userId = 1; // 임시
      const locationId = 1; // 임시

      const { postId } = req.params;

      const { categoryId, title, content, postImgUrl, price } = req.body;

      // title 없을 때
      if (!title) res.status(400).send({ message: '제목을 입력해주세요.' });
      // title 공백으로 시작할 때
      else if (/^[\s]+/.test(title))
        res
          .status(400)
          .send({ message: '제목은 공백으로 시작할 수 없습니다.' });
      else if (title) {
        const updatePost = await this.postService.updatePost(
          postId,
          userId,
          categoryId,
          locationId,
          title,
          content,
          postImgUrl,
          price
        );
        return res.status(200).send(updatePost);
      }
    } catch (err) {
      next(err);
    }
  };

  // 거래글 status 수정
  updateStatus = async (req, res, next) => {
    try {
      // const { userId } = res.locals.user;
      const userId = 1; // 임시

      const { postId } = req.params;

      const { status } = req.body;

      const updateStatus = await this.postService.updateStatus(
        postId,
        userId,
        status
      );

      return res.status(200).send(updateStatus);
    } catch (err) {
      next(err);
    }
  };

  // 거래글 삭제
  deletePost = async (req, res, next) => {
    try {
      // const { userId } = res.locals.user;
      const userId = 1; // 임시

      const { postId } = req.params;

      const deletePost = await this.postService.deletePost(userId, postId);

      return res.status(200).send({ data: deletePost });
    } catch (err) {
      next(err);
    }
  };

  // 찜 update
  updateWish = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      const updateWish = await this.postService.updateWish(userId, postId);

      return res.status(200).json({ data: updateWish });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = PostController;
