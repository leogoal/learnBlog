const LikeOrUnlike = require('../lib/mongo').LikeOrUnlike;

module.exports = {
    //创建一个赞、踩
    create: function create(likeOrUnlike) {
        return LikeOrUnlike.create(likeOrUnlike).exec();
    },

    getLikeOrUnlikeCountByPostId: function getLikeOrUnlikeCountByPostId(postId) {
        return Promise.all([
            LikeOrUnlike.count({ postId: postId, likeOrUnlike: '1' }).exec(),
            LikeOrUnlike.count({ postId: postId, likeOrUnlike: '0' }).exec()
        ])
    },

    checkFinished: function checkFinished(postId, author) {
        return LikeOrUnlike.count({ postId: postId, author: author }).exec();
    },

    // 通过文章 id 删除该文章下所有赞/踩
    delLikeOrUnlikeByPostId: function delLikeOrUnlikeByPostId (postId) {
        return LikeOrUnlike.deleteMany({ postId: postId }).exec()
      },

}