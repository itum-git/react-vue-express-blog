
const express = require('express')
const router = express.Router()
const { likeArticle, commentArticle } = require('../../controller/article')

router.put('/like', likeArticle)

router.put('/comment', commentArticle)

module.exports = router