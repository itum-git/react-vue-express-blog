const express = require('express')
const path = require('path');
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const indexRouter = require('./router/index')
const { expressLogger, expressErrorLogger } = require('./logger/winston')

// 主APP
const app = express()

// 成功日志生成器
app.use(expressLogger)

// 静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 解析表单请求体 application/json
app.use(express.json())
// 解析表单请求体 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser());

app.all('*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    next()
})

// 注册路由
app.use('/', indexRouter)

// 404中间件
app.use('*', function (req, res, next) {
    next(createError(404));
})

// 错误日志生成器
app.use(expressErrorLogger)
// 错误处理中间件
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    // res.render('index');
    res.json(err)
})

app.listen(3000, () => {
    console.log('reader server running at http://localhost:3000')
})

module.exports = app;