
const express = require('express')
const router = express.Router()
const { getBlogs, getBlogById } = require('../../controller/blog')

router.get('/getall', getBlogs)

router.get('/get', getBlogById)

module.exports = router