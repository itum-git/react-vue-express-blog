
const winston = require('winston')
const expressWinston = require('express-winston')
const path = require('path')


const expressLogger = expressWinston.logger({
  transports: [
      // new (winston.transports.Console)({
      //   json: true,
      //   colorize: true
      // }),
      new winston.transports.File({
        filename: path.join(__dirname, 'access.log')
      })
  ]
})

// 错误请求的日志
const expressErrorLogger = expressWinston.errorLogger({
  transports: [
    // new winston.transports.Console({
    //   json: true,
    //   colorize: true
    // }),
    new winston.transports.File({
      filename: path.join(__dirname, 'error.log')
    })
  ]
});

module.exports = { expressLogger, expressErrorLogger }