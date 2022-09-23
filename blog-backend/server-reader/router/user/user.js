const express = require('express')
const { login, register, refreshToken } = require('../../controller/user')

const router = express.Router()

// 用户登录
router.post('/login', login)

// 用户注册
router.post('/register', register)

// 用户刷新token
router.post('/refresh', refreshToken)


module.exports = router