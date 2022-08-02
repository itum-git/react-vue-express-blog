
const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')

const defaultPayload = {
  algorithm: 'HS256',
  audience: 'tower',
  subject: '',
  expiresIn: 2*60*60
}

const JWT = {

  sign (data, payload) {
    const token = jwt.sign(data, process.env.SECRET_KEY, Object.assign(defaultPayload, payload))
    return token
  },

  varify (token, payload) {
    try {
      let result = jwt.verify(token, process.env.SECRET_KEY, Object.assign(defaultPayload, payload))
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
  },

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