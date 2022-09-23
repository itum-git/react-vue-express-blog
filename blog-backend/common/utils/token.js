
const fs = require('fs')
const jwt = require('jsonwebtoken')

const defaultOptions = {
  algorithm: 'HS256',
  audience: 'tower',
  subject: '',
  expiresIn: 15
}

class JWT {

  secret = null

  constructor(secret) {
    this.secret = secret
  }
  
  sign (data, options) {
    const token = jwt.sign(data, secret, Object.assign(defaultOptions, options))
    return token
  }

  varify (token, options) {
    try {
      let data = jwt.verify(token, secret, Object.assign(defaultOptions, options))
      return {state: 0, data: data}
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
          return {state: 1}
        } else if (e instanceof jwt.JsonWebTokenError ) {
          return {state: 2}
        } else if (e instanceof jwt.NotBeforeError) {
          return {state: 3}
        } else {
          return e
        }
    }
  }

  decode (token) {
    try {
      let data = jwt.decode(token)
      return {state: 0, data: data}
    } catch (e) {
      return e
    }
  }
}

module.exports = JWT