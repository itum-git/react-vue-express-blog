const reactFuncData = require('../database/react')
const { uniqIdFromTime } = require('../utils/uuid')
const Result = require('../utils/response')
const fs = require('fs')
const md5 = require('md5')

// 添加React函数
exports.addReactFunction = async (req, res, next) => {
  try {
      const body = req.body
      if (!body.func_name || !body.func_desc) {
        throw {state: 0}
        // res.json(Result.fail("缺少参数！"))
        return
      }

      const isHas = await reactFuncData.queryByName(body.func_name, res)
      if (isHas.length > 0) {
        fs.readdir('./uploads/react-files', function (err, files) {
          files.forEach(file => {
            const reg = new RegExp("^" + body.func_name)
            if (reg.test(file) && body.func_desc !== file) {
              fs.unlink('./uploads/react-files/' + file, () => {})
            }
          })
        })
        const func_id = isHas[0].func_id
        const data = await reactFuncData.update({func_name: body.func_name, func_desc: body.func_desc, func_id})
        if (data) {
          res.json(Result.success("更新成功"))
        }
        return
      }

      body.func_id = uniqIdFromTime(20)
      const result = await reactFuncData.add(body, res)
      if (result) {
        res.json(Result.success("添加成功！"))
      } else if(Object.prototype.toString.call(result).slice(8,-1) === "Array") {
        res.json(Result.fail("数据库返回空数组"))
      } else {
        throw {state: 0}
        // res.json(Result.fail(Object.prototype.toString.call(result).slice(8,-1)))
      }
  } catch (err) {
      // 跳转到错误处理中间件
      next(err)
  }
}

// 获取所有react文章名列表
exports.getReactFunctions = async (req, res, next) => {
  try {
      const result = await new reactFuncData.queryNames()
      res.json(Result.success(result))
  } catch (err) {
      // 跳转到错误处理中间件
      next(err)
  }
}


exports.getFuncFiles = async (req, res, next) => {
  try {
    const query = req.query
    if (query.func_id && query.func_name) {
      const result = await reactFuncData.queryById(query.func_id)
      if (result) {
        const location = result[0].func_desc
        fs.readFile('./uploads/react-files/' + location, function (err, data) {
          if (err) {
            throw {state: 0, ...err}
          }
          data && res.json(Result.success(data.toString()))
        })
      } else {
        res.json(Result.fail("未找到指定内容"))
      }
    } else {
      throw {state: 0}
    }
  } catch (err) {
    // 跳转到错误处理中间件
    next(err)
  }
}