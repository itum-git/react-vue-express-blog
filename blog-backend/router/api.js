const blogAuth = require('./blog/blog-auth')
const userAuth = require('./user/user-auth')
const express = require('express')
const router = express.Router()
const JWT = require('../utils/token')

router.use(function (req, res, next) {
    const token = req.headers['authorization']
    if (typeof token === 'string') {
        const isValidToken = JWT.varifyToken(token)
        if (isValidToken.state === 0) {
            req.user = isValidToken.data
            next()
        } else if (isValidToken.state === 1) {
            res.$fail(7)
        } else {
            res.$fail(2)
        }
    } else {
        res.$fail(2)
    }
})

router.use('/blog', blogAuth)
router.use('/user', userAuth)

module.exports = router