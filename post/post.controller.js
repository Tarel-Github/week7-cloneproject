const PostService = require('./post.service');

class PostController {
    postService = new PostService();

    getPost = async (req, res, next) =>{

    }


}

module.exports = PostController;