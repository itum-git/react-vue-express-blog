const blogTable = require('../../database/blog')
const { uniqIdFromTime } = require('../utils/uuid')

exports.addNewBlog = async (req, res, next) => {
    try {
        const param = req.body
        if (!param.blog_name|| !param.blog_type || !param.blog_content) {
            res.$fail(3, 'blog_name, blog_content')
            return
        }
        Object.assign(param, req.user)
        param.blog_id = uniqIdFromTime(15)
        const result = await blogTable.addNewBlog(param)
        if (result instanceof Error) {
            res.$fail(8)
        } else {
            res.$success(1, '添加成功！')
        }
        next()
    } catch (err) {
        // 跳转到错误处理中间件
        next(err)
    }
}

exports.getAllBlog = async (req, res, next) => {
    try {
        const blogs = await blogTable.queryAllBlog()
        if (Array.isArray(blogs) && blogs.length > 0) {
            res.$success(1, blogs)
        } else {
            res.$fail(0, '未查询到博客文章！')
        }
    } catch (err) {
        next(err)
    }
}