
const express = require('express')
const cookieParser = require('cookie-parser')
const adminRouter = require('./router/router')
const packResponse = require('./utils/response')
const admin = express()

// 解析表单请求体 application/json
admin.use(express.json())
// 解析表单请求体 application/x-www-form-urlencoded
admin.use(express.urlencoded({ extended: false }))

admin.use(cookieParser())
// 给response封装两个方法 $success() 和 $fail()
admin.use(packResponse)

admin.use('/api', adminRouter)

/***** 以下中间件不处理next，防止继续执行主程序中间件 *****/
// TODO 统一返回
admin.use(function (req, res, next) {
    console.log("admin last middleware")
})

admin.use(function (err, req, res, next) {
    console.log("error in admin")
    // render the error page
    res.status(err.status || 500)
    // res.render('index');
    res.$fail(0, err)
})

admin.listen(4000, () => {
    console.log('admin server running at http://localhost:4000')
})

module.exports = admin