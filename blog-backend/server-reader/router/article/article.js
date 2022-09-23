
const express = require('express')
const router = express.Router()
const { getArticles, getArticleById } = require('../../controller/article')

router.get('/getall', getArticles)

router.get('/get', getArticleById)

module.exports = router