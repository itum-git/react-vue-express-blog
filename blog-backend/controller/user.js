const userTable = require('../database/user')
const { uniqIdFromTime } = require('../utils/uuid')
const Result = require('../utils/response')
const JWT = require('../utils/token')
const md5 = require('md5')

const $refreshTokenExpiresTime = 24 * 60 * 60

// 用户登录
exports.login = async (req, res, next) => {
    try {
        const param = req.body
        if (!param.username || !param.password) {
            res.$fail(3)
            return
        }

        const result = await userTable.queryByName(param.username)
        if (Array.isArray(result) && result.length === 1) {
            const user = result[0]
            if (user.password === param.password) {
                const token = JWT.generateToken({ user_id: user.userid, user: user.username })
                const refreshToken = JWT.generateToken({ userid: user.userid }, { expiresIn: $refreshTokenExpiresTime })
                res.$success({ user: param.username, token: token, re_token: refreshToken })
            } else {
                res.$fail(5)
            }
        } else if (Array.isArray(result) && result.length > 1) {
            res.$fail(8)
        } else {
            res.$fail(4)
        }
    } catch (err) {
        // 跳转到错误处理中间件
        next(err)
    }
}

// 注册
exports.register = async (req, res, next) => {
    try {
        const param = req.body;
        if (!param.username || !param.password) {
            res.json(Result.fail("缺少参数！"))
            return
        }
        param.userid = uniqIdFromTime(20);

        const result = await userTable.add('blogdb', param)
        console.log(result);
        res.json(Result.success(result))
    } catch (err) {
        // 跳转到错误处理中间件
        next(err)
    }
}

exports.refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.body.re_token
        if (typeof refreshToken === 'string') {
            const isValidToken = JWT.varifyToken(refreshToken, { expiresIn: $refreshTokenExpiresTime })
            console.log("refresh token data", isValidToken)
            if (isValidToken.state === 0) {
                res.$fail(7, 'token已过期，请重新登录！')
            } else if (isValidToken.state === 1) {
                const userid = isValidToken.data.userid
                const result = await userTable.queryById(userid)
                if (Array.isArray(result) && result.length === 1) {
                    const token = JWT.generateToken({ userid: result[0].userid, user_name: param.user_pass })
                    const refreshToken = JWT.generateToken({ userid: result[0].userid }, { expiresIn: $refreshTokenExpiresTime })
                    res.$success(1, { token, re_oken: refreshToken })
                } else {
                    res.$fail(2)
                }
            } else {
                res.$fail(2)
            }
        } else {
            res.$fail(2)
        }
        next()
    } catch (err) {
        next(err)
    }
}

// 删除用户
exports.deleteUser = async (req, res, next) => {
    try {
        const { _id } = req.params
        const result = await userTable.deleteOne('blogdb', { _id })
        res.json(Result.successObj(result))
    } catch (err) {
        // 跳转到错误处理中间件
        next(err)
    }
}