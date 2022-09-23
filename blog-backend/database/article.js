
const { articleDB } = require('./dbconfig/poolextend');

const articleTable = {
    addNewBlog: function (param) {
        const sql = 'INSERT INTO article(user_id, article_id, article_name, article_type, article_content, update_time, create_time) VALUES(?,?,?,?,?,?,?)'
        const values = [param.user_id, param.article_id, param.article_name, param.article_type, param.article_content, Date.now(), Date.now()]
        return articleDB(sql, values)
    },
    getBlogById: function (article_id) {
        const sql = 'SELECT * FROM article WHERE article_id=?'
        return articleDB(sql, article_id)
    },
    deleteBlogById: function (article_id) {
        const sql = 'DELETE FROM article WHERE article_id=?'
        return articleDB(sql, article_id)
    },
    updateBlogById: function (param) {
        const sql = 'UPDATE article SET article_name=?, article_type=?, article_content=? WHERE article_id=?'
        const values = [param.article_name, param.article_type, param.article_content, param.article_id]
        return articleDB(sql, values)
    },
    queryBlogByUserId: function (user_id) {
        const sql = 'SELECT * FROM user WHERE user_id=?'
        return articleDB(sql, user_id)
    },
    queryAllBlog: function () {
        const sql = 'SELECT * FROM article'
        return articleDB(sql)
    }
};

module.exports = articleTable;