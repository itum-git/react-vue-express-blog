const managerTable = require('../../database/manager')
const { uniqIdFromTime } = require('../utils/uuid')
const JWT = require('../utils/token')

const $refreshTokenExpiresTime = 24*60*60

exports.login = async (req, res, next) => {
    try {
        const param = req.body
        if (!param.user_name || !param.user_pass) {
            res.$fail(3, 'user_name user_pass')
            return
        }
        const result = await managerTable.queryByName(param.user_name)
        if (!result || result.length !== 1) {
            res.$fail(4)
        } else if (result[0].user_pass !== param.user_pass) {
            res.$fail(5)
        } else {
            const token = JWT.generateToken({ user_id: result[0].user_id, user_name: param.user_name })
            const refreshToken = JWT.generateToken({ user_id: result[0].user_id }, {expiresIn: $refreshTokenExpiresTime})
            res.$success(1, { user_id: result[0].user_id, user_name: param.user_name, token, re_oken: refreshToken })
        }
        next()
    } catch (err) {
        next(err)
    }
}
/**
 * 管理员注册
 * user_id(用户ID)、user_name(用户名)、user_pass(密码)、create_time(注册时间)
 */
exports.register = async (req, res, next) => {
    try {
        const param = req.body;
        if (!param.user_name || !param.user_pass) {
            res.$fail(3)
            return
        }
        const isUser = await managerTable.queryByName(param.user_name)
        if (isUser && isUser.length > 0) {
            res.$fail(6)
            return
        }
        param.user_id = uniqIdFromTime(20)
        param.create_time = Date.now()
        const result = await new managerTable.add(param)
        // console.log(result);
        res.$success(1, '注册成功！')
        next()
    } catch (err) {
        next(err)
    }
}

exports.getUserInfo = async (req, res, next) => {
    try {
        const user_name = req.user.user_name
        const managers = await managerTable.queryByName(user_name)
        if (managers && managers.length === 1) {
            const {user_name, create_time} = managers[0]
            res.$success(1, {user_name, create_time})
        } else {
            res.$fail()
        }
    } catch (err) {
        next(err)
    }
}

exports.getAdmins = async (req, res, next) => {
    try {
        const admins = await managerTable.queryAll()
        res.$success(1, admins)
        next()
    } catch (err) {
        next(err)
    }
}

exports.refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.body.re_token
        if (typeof refreshToken === 'string') {
            const isValidToken = JWT.varifyToken(refreshToken, {expiresIn: $refreshTokenExpiresTime})
            console.log("refresh token data", isValidToken)
            if (isValidToken.state === 0) {
                res.$fail(7, 'token已过期，请重新登录！')
            } else if (isValidToken.state === 1) {
                const user_id = isValidToken.data.user_id
                const result = await managerTable.queryById(user_id)
                if (Array.isArray(result) && result.length === 1) {
                    const token = JWT.generateToken({ user_id: result[0].user_id, user_name: param.user_pass })
                    const refreshToken = JWT.generateToken({ user_id: result[0].user_id }, {expiresIn: $refreshTokenExpiresTime})
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