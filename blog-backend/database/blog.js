
const { blogDB } = require('./dbconfig/poolextend');

const blogTable = {
    addNewBlog: function (param) {
        const sql = 'INSERT INTO blog(user_id, blog_id, blog_name, blog_type, blog_content, update_time, create_time) VALUES(?,?,?,?,?,?,?)'
        const values = [param.user_id, param.blog_id, param.blog_name, param.blog_type, param.blog_content, Date.now(), Date.now()]
        return blogDB(sql, values)
    },
    getBlogById: function (blog_id) {
        const sql = 'SELECT * FROM blog WHERE blog_id=?'
        return blogDB(sql, blog_id)
    },
    deleteBlogById: function (blog_id) {
        const sql = 'DELETE FROM blog WHERE blog_id=?'
        return blogDB(sql, blog_id)
    },
    updateBlogById: function (param) {
        const sql = 'UPDATE blog SET blog_name=?, blog_type=?, blog_content=? WHERE blog_id=?'
        const values = [param.blog_name, param.blog_type, param.blog_content, param.blog_id]
        return blogDB(sql, values)
    },
    queryBlogByUserId: function (user_id) {
        const sql = 'SELECT * FROM user WHERE user_id=?'
        return blogDB(sql, user_id)
    },
    queryAllBlog: function () {
        const sql = 'SELECT * FROM blog'
        return blogDB(sql)
    }
};

module.exports = blogTable;