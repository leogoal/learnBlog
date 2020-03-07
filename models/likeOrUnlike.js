const LikeOrUnlike = require('../lib/mongo').LikeOrUnlike;

module.exports = {
    //创建一个赞、踩
    create: function create(likeOrUnlike) {
        return LikeOrUnlike.create(LikeOrUnlike).exec();
    },

    getLikeCountByPostId: function getLikeCountByPostId(postId) {

    },

    getUnlikeCountByPostId: function getUnlikeCountByPostId(postId) {

    }
}