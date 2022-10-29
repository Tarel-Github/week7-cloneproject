const PostRepository = require("./post.repository");//리포지토리의 내용을 가져와야한다.

class PostService {
    postRepository = new PostRepository();

}

module.exports = PostService;