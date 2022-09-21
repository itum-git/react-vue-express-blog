
const express = require('express')
const router = express.Router()
const { login, register, getUserInfo, getAdmins } = require('../../controller/user')
const { addNewBlog, getAllBlog } = require('../../controller/blog')
const JWT = require('../../utils/token')

router.use(function (req, res, next) {
    if (req.path === '/login') {
        next()
    } else {
        const token = req.headers['authorization']
        if (typeof token === 'string') {
            const isValidToken = JWT.varifyToken(token)
            // console.log("token data", isValidToken)
            if (isValidToken.state === 1) {
                req.user = isValidToken.data
                next()
            } else if (isValidToken.state === 0) {
                res.$fail(7)
            } else {
                res.$fail(2)
            }
        } else {
            res.$fail(2)
        }
    }
})

// 用户登录
router.post('/login', login)
// 用户注册
router.post('/register', register)
// 获取用户信息
router.get('/user/info', getUserInfo)
// 获取所有管理员
router.post('/adminlist', getAdmins)
// 添加博客文章
router.post('/blog/add', addNewBlog)
// 获取所有文章
router.post('/blog/getall', getAllBlog)

module.exports = router
