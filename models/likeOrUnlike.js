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
    }
}