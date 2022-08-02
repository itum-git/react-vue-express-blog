
const { blogDB } = require('./dbconfig/poolextend');
const { blog } = require('./dbconfig/sqlstatement');
const blogTable = {
    addNewBlog: function (param) {
        const values = [param.user_id, param.blog_id, param.blog_name, param.blog_type, param.blog_content, Date.now(), Date.now()]
        return blogDB(blog.insertNewBlog, values)
    },
    getBlogById: function (blog_id) {
        return blogDB(blog.queryBlogById, blog_id)
    },
    deleteBlogById: function (blog_id) {
        return blogDB(blog.deleteBlogById, blog_id)
    },
    updateBlogById: function (param) {
        const values = [param.blog_name, param.blog_type, param.blog_content, param.blog_id]
        return blogDB(blog.updateBlogById, values)
    },
    queryBlogByUserId: function (user_id) {
        return blogDB(blog.queryBlogByUserId, user_id)
    },
    queryAllBlog: function () {
        return blogDB(blog.queryAllBlog)
    }
};

module.exports = blogTable;