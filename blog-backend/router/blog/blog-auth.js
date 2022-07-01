
const express = require('express')
const router = express.Router()
const { likeBlog, commentBlog } = require('../../controller/blog')

router.put('./like', likeBlog)

router.put('/comment', commentBlog)

module.exports = router