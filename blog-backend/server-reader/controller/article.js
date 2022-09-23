const articleTable = require('../../database/article')

exports.getArticles = async (req, res, next) => {
    try {
        const result = await articleTable.queryAllArticle()
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

exports.getArticleById = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await articleTable.getArticleById(id)
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

exports.likeArticle = async (req, res, next) => {
    try {
        const user_id = req.user.user_id
        const article_id = req.params.article_id
        const result = await articleTable.getArticleById(article_id)
        // TODO
        next()
    } catch (err) {
        next(err)
    }
}

exports.commentArticle = async (req, res, next) => {
    try {
        const user_id = req.user.user_id
        const article_id = req.params.article_id
        const result = await articleTable.getArticleById(article_id)
        // TODO
        next()
    } catch (err) {
        next(err)
    }
}