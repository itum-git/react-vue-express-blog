
const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')

const tokenPayload = {
  algorithm: 'HS256',
  audience: 'tower',
  subject: '',
  expiresIn: 15
}
const secret = '81r6732536J85533h39827S8f19186X3553608I5H3h378877801d136737526'

class JWT {

  constructor (defaultPayload, secret) {
    this.defaultPayload = defaultPayload
    this.secret = secret
  }

  sign (data, payload) {
    const token = jwt.sign(data, this.secret, Object.assign(this.defaultPayload, payload))
    return token
  }

  varify (token, payload) {
    try {
      let result = jwt.verify(token, this.secret, Object.assign(this.defaultPayload, payload))
      return {state: 1, data: result}
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
  }

  decode (token) {
    try {
      let result = jwt.decode(token)
      return {state: 1, data: result}
    } catch (e) {
      return e
    }
  }
}

module.exports = JWT