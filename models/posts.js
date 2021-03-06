const marked = require('marked')
const Post = require('../lib/mongo').Post
const CommentModel = require('./comments')
const LikeOrUnLikeModel = require('./likeOrUnlike');

// 给 post 添加留言数 commentsCount
Post.plugin('addCommentsCount', {
  afterFind: function (posts) {
    return Promise.all(posts.map(function (post) {
      return CommentModel.getCommentsCount(post._id).then(function (commentsCount) {
        post.commentsCount = commentsCount
        return post
      })
    }))
  },
  afterFindOne: function (post) {
    if (post) {
      return CommentModel.getCommentsCount(post._id).then(function (count) {
        post.commentsCount = count
        return post
      })
    }
    return post
  }
})

// 将 post 的 content 从 markdown 转换成 html
Post.plugin('contentToHtml', {
  afterFind: function (posts) {
    return posts.map(function (post) {
      post.content = marked(post.content)
      return post
    })
  },
  afterFindOne: function (post) {
    if (post) {
      post.content = marked(post.content)
    }
    return post
  }
})

Post.plugin('subStrContent', {
  afterFind: function (posts) {
    return posts.map(function (post) {
      let content = post.content;
      post.content = content.length > 100 ? `<strong>[点击标题阅读全文]</strong><br><br>${content.substr(0, 100)}......` : content;
      return post;
    })
  }
})

Post.plugin('addLikeOrUnLikeCount', {
  afterFind: function (posts) {
    return Promise.all(posts.map(function (post) {
      return LikeOrUnLikeModel.getLikeOrUnlikeCountByPostId(post._id).then(function (counts) {
        post.likeCount = counts[0];
        post.unlikeCount = counts[1];
        return post;
      });
    }))
  },
  afterFindOne: function (post) {
    if (post) {
      return LikeOrUnLikeModel.getLikeOrUnlikeCountByPostId(post._id).then(function (counts) {
        post.likeCount = counts[0];
        post.unlikeCount = counts[1];
        return post;
      });
    }
    return post;
  }
})

module.exports = {
  // 创建一篇文章
  create: function create(post) {
    return Post.create(post).exec()
  },

  // 通过文章 id 获取一篇文章
  getPostById: function getPostById(postId) {
    return Post
      .findOne({ _id: postId })
      .populate({ path: 'author', model: 'User' })
      .addCreatedAt()
      .contentToHtml()
      .addCommentsCount()
      .addLikeOrUnLikeCount()
      .exec()
  },

  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getPosts: function getPosts(author) {
    const query = {}
    if (author) {
      query.author = author
    }
    return Post
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: -1 })
      .addCreatedAt()
      .contentToHtml()
      .subStrContent()
      .addCommentsCount()
      .addLikeOrUnLikeCount()
      .exec()
  },

  //按创建时间降根据tag序获取所有用户文章或者某个特定用户的所有文章
  getPostsByTag: function getPostsByTag(tag, author) {
    const query = {}
    query.tag = tag
    if (author) {
      query.author = author
    }
    return Post
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: -1 })
      .addCreatedAt()
      .addCommentsCount()
      .contentToHtml()
      .subStrContent()
      .addLikeOrUnLikeCount()
      .exec()
  },

  // 通过文章 id 给 pv 加 1
  incPv: function incPv(postId) {
    return Post
      .update({ _id: postId }, { $inc: { pv: 1 } })
      .exec()
  },

  // 通过文章 id 获取一篇原生文章（编辑文章）
  getRawPostById: function getRawPostById(postId) {
    return Post
      .findOne({ _id: postId })
      .populate({ path: 'author', model: 'User' })
      .exec()
  },

  // 通过文章 id 更新一篇文章
  updatePostById: function updatePostById(postId, data) {
    return Post.update({ _id: postId }, { $set: data }).exec()
  },

  // 通过文章 id 删除一篇文章
  delPostById: function delPostById(postId) {
    return Post.deleteOne({ _id: postId })
      .exec()
      .then(function (res) {
        // 文章删除后，再删除该文章下的所有留言
        if (res.result.ok && res.result.n > 0) {
          CommentModel.delCommentsByPostId(postId);
          LikeOrUnLikeModel.delLikeOrUnlikeByPostId(postId);
        }
      })
  }
}
