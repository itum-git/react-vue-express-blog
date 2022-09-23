const express = require('express')
const router = express.Router()
const path = require('path');
const packResponse = require('../utils/response')
const api = require('./api')
const blog = require('./article/article')
const user = require('./user/user')

// 给response封装两个方法 $success() 和 $fail()
router.use(packResponse)

/** GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'), function (err) {
    if (err) {
      console.log(err);
      next(err)
    }
  });
});

/** 对api接口类型做登录验证 */
router.use('/api', api)

/** 无需登录验证的接口 */
router.use('/blog', blog)
router.use('/user', user)

module.exports = router