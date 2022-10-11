const express = require('express')
const { signin, signup, refreshToken } = require('../../controller/user')

const router = express.Router()

// 用户登录
router.post('/signin', signin)

// 用户注册
router.post('/signup', signup)

// 用户刷新token
router.post('/refresh', refreshToken)


module.exports = router