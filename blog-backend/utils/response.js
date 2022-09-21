
const codeMap = {
  "0": "请求成功",
  "1": "请求失败",
  "2": "token无效",
  "3": "缺少参数",
  "4": "用户不存在",
  "5": "密码错误",
  "6": "用户已存在",
  "7": "token已过期",
  "8": "数据库错误"
}

/**
* 请求成功
* @param {number} code 内部响应状态码
* @param {object} data 响应数据 
* @param {string} msg 附加信息
*/
function success (code = 0, data = {}, msg) {
  if (this.$responsed) {return}
  this.$responsed = true
  
  if (typeof code === 'object' && code !== null) {
    data = code
    code = 0
  }
  if (typeof code === 'string') {
    msg = code
    code = 0
  }
  this.json({
      code,
      data,
      msg: msg ? msg : codeMap[code]
  })
}

/**
* 请求失败
* @param {number} code 内部响应状态码 
* @param {string} msg 附加信息
*/
function fail (code = 1, msg) {
  if (this.$responsed) {return}
  this.$responsed = true
  if (msg instanceof Error) {
      msg = msg.message
  } else if (typeof msg !== "string") {
      msg = codeMap[code]
  }
  this.json({
      code,
      msg 
  })
}

module.exports = function (_, res, next) {
  res.$success = success
  res.$fail = fail
  next()
}