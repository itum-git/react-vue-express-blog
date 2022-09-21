const userTable = require('../database/user')
const { uniqIdFromTime } = require('../utils/uuid')
const JWT = require('../utils/token')

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
                const token = JWT.sign({ userid: user.userid, username: user.username })
                const refreshToken = JWT.sign({ userid: user.userid }, { expiresIn: $refreshTokenExpiresTime })
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
        next(err)
    }
}

// 注册
exports.register = async (req, res, next) => {
    try {
        const params = req.body;
        if (!params.username || !params.password) {
            res.$fail(3)
            return
        }
        const isUser = await userTable.queryByName(params.username)
        if (isUser.length > 0) {
            res.$fail(6)
            return
        }
        params.userid = uniqIdFromTime();

        const result = await userTable.add(params)
        if (result) {
            res.$success('注册成功')
        }
    } catch (err) {
        next(err)
    }
}

exports.refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.body.re_token
        if (typeof refreshToken === 'string') {
            const isValidToken = JWT.varify(refreshToken, { expiresIn: $refreshTokenExpiresTime })

            if (isValidToken.state === 0) {
                res.$fail(7, 'token已过期，请重新登录！')
            } else if (isValidToken.state === 1) {
                const userid = isValidToken.data.userid
                const result = await userTable.queryById(userid)
                if (Array.isArray(result) && result.length === 1) {
                    const user = result[0]
                    const token = JWT.sign({ userid: user.userid, username: user.username })
                    const re_oken = JWT.sign({ userid: user.userid }, { expiresIn: $refreshTokenExpiresTime })
                    res.$success({ token, re_oken })
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

// 注册
exports.deleteUser = async (req, res, next) => {
    try {
        const params = req.body;
        if (!params.user_id) {
            res.$fail(3)
            return
        }
        const result = await userTable.delete(params.user_id)
        if (result) {
            res.$success('删除成功')
        }
    } catch (err) {
        next(err)
    }
}