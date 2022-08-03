const blogTable = require('../database/blog')

exports.getBlogs = async (req, res, next) => {
    try {
        const result = await blogTable.queryAllBlog()
        if (Array.isArray(result)) {
            res.$success(result)
        } else {
            res.$fail(8)
        }
        next()
    } catch (err) {
        next(err)
    }
}

exports.getBlogById = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await blogTable.getBlogById(id)
        if (Array.isArray(result)) {
            result.length === 1 ? res.$success(result[0]) : res.$fail(8, '数据库存在多个相同id')
        } else {
            res.$fail(0, '文章不存在')
        }
        next()
    } catch (err) {
        next(err)
    }
}

exports.likeBlog = async (req, res, next) => {
    try {
        const userid = req.user.userid
        const blogid = req.params.blogid
        const result = await blogTable.getBlogById(blogid)
        // TODO
        next()
    } catch (err) {
        next(err)
    }
}

exports.commentBlog = async (req, res, next) => {
    try {
        const userid = req.user.userid
        const blogid = req.params.blogid
        const result = await blogTable.getBlogById(id)
        // TODO
        next()
    } catch (err) {
        next(err)
    }
}