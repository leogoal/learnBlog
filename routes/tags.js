const express = require('express');
const router = express.Router();
const PostModel = require('../models/posts')


router.get('/:tag', function (req, res, next) {
    const author = req.query.author;
    const tag = req.params.tag;

    PostModel.getPostsByTag(tag, author)
        .then(function (posts) {
            res.render('posts', {
                posts: posts
            })
        })
        .catch(next)
})

module.exports = router;