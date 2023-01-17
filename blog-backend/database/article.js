
const { articleDB } = require('./dbconfig/poolextend');

const articleTable = {
    addNewArticle: function (param) {
        const sql = 'INSERT INTO article(user_id, article_id, article_title, article_type, article_content, article_views, article_likes, update_time, create_time) VALUES(?,?,?,?,?,?,?)'
        const values = [param.user_id, param.article_id, param.article_title, param.article_type, param.article_content, 0, 0, Date.now(), Date.now()]
        return articleDB(sql, values)
    },
    getArticleById: function (article_id) {
        const sql = 'SELECT * FROM article WHERE article_id=?'
        return articleDB(sql, article_id)
    },
    deleteArticleById: function (article_id) {
        const sql = 'DELETE FROM article WHERE article_id=?'
        return articleDB(sql, article_id)
    },
    updateArticleById: function (param) {
        const sql = 'UPDATE article SET article_title=?, article_type=?, article_content=? WHERE article_id=?'
        const values = [param.article_title, param.article_type, param.article_content, param.article_id]
        return articleDB(sql, values)
    },
    queryArticleByUserId: function (user_id) {
        const sql = 'SELECT * FROM user WHERE user_id=?'
        return articleDB(sql, user_id)
    },
    queryAllArticle: function () {
        const sql = 'SELECT * FROM article'
        return articleDB(sql)
    }
};

module.exports = articleTable;