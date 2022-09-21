
const fs = require('fs')
const jwt = require('jsonwebtoken')

const tokenPayload = {
  algorithm: 'HS256',
  audience: 'tower',
  subject: '',
  expiresIn: 15
}

const JWT = {
  
  sign (data, options) {
    const token = jwt.sign(data, process.env.ADMIN_SECRET_KEY, Object.assign(defaultOptions, options))
    return token
  },

  varify (token, options) {
    try {
      let data = jwt.verify(token, process.env.ADMIN_SECRET_KEY, Object.assign(defaultOptions, options))
      return {state: 1, data: data}
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
          return {state: 0}
        } else if (e instanceof jwt.JsonWebTokenError ) {
          return {state: -1}
        } else if (e instanceof jwt.NotBeforeError) {
          return {state: -2}
        } else {
          return e
        }
    }
  },

  decode (token) {
    try {
      let data = jwt.decode(token)
      return {state: 1, data: data}
    } catch (e) {
      return e
    }
  }
}

module.exports = JWT