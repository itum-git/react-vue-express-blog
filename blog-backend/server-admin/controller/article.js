const articleTable = require('../../database/article')
const { uniqIdFromTime } = require('../../common/utils/uuid')

exports.addNewArticle = async (req, res, next) => {
    try {
        const { article_title, article_type, article_content } = req.body
        if (!article_title|| !article_type || !article_content) {
            res.$fail(3, 'article_title, article_content')
            return
        }
        const article_id = uniqIdFromTime()
        const params = {
            user_id: req.user.user_id,
            article_id,
            article_title,
            article_type,
            article_content
        }
        const result = await articleTable.addNewArticle(params)
        if (result instanceof Error) {
            res.$fail(8)
        } else {
            res.$success(1, 'success')
        }
    } catch (err) {
        // 跳转到错误处理中间件
        next(err)
    }
}

exports.getAllArticle = async (req, res, next) => {
    try {
        const articles = await articleTable.queryAllArticle()
        if (Array.isArray(articles) && articles.length > 0) {
            res.$success(1, articles)
        } else {
            res.$fail(0, '未查询到博客文章！')
        }
    } catch (err) {
        next(err)
    }
}