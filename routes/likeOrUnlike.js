const express = require('express');
const router = express.Router();
const likeOrUnlikeModel = require('../models/likeOrUnlike');

router.post('/', function (req, res, next) {
    const author = req.session.user._id;
    const postId = req.fields.postId;

    likeOrUnlikeModel.checkFinished(postId, author).then(function (count) {
        if (0 === count) {
            let data = {
                author: author,
                postId: postId,
                likeOrUnlike: req.fields.likeOrUnlike
            }
            likeOrUnlikeModel.create(data).then(function () {
                req.flash('success', '评价成功');
                return res.redirect('back');
            })
                .catch(function (e) {
                    if (e) {
                        throw e;
                    }
                })
        }
    })
})

module.exports = router;