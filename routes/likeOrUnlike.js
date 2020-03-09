const express = require('express');
const router = express.Router();
const likeOrUnlikeModel = require('../models/likeOrUnlike');

router.post('/', function (req, res, next) {
    const author = req.session.user._id;
    const postId = req.fields.postId;

    likeOrUnlikeModel.checkFinished(postId, author).then(function (count) {
        if (count > 0) {
            res.send()
            alert('error', '你已经点过了，请勿重复操作!!!');
        } else {
            let data = {
                author: author,
                postId: postId,
                likeOrUnlike: req.fields.likeOrUnlike
            }
            likeOrUnlikeModel.create(data).then(function () {
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