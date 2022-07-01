
// 引入连接池配置
const { createPool, blogDB } = require('./dbconfig/poolextend');
// 引入SQL模块
const { blog } = require('./dbconfig/sqlstatement');
// 引入创建连接池函数
const database = 'blogdb'
const blogTable = {
    addNewBlog: function (param) {
        const values = [param.user_id, param.blog_id, param.blog_name, param.blog_type, param.blog_content, Date.now(), Date.now()]
        return new Promise((resolve, reject) => {
            const pool = createPool(database)
            pool.getConnection(function (err, connection) {
                connection.query(blog.insertNewBlog, values, function (err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                    // 释放连接
                    connection.release();
                });
            });
        })
    },
    getBlogById: function (blog_id) {
        return blogDB(blog.queryBlogById, blog_id)
    },
    deleteBlogById: function (blog_id) {
        return new Promise((resolve, reject) => {
            const pool = createPool(database)
            pool.getConnection(function (err, connection) {
                connection.query(blog.deleteBlogById, blog_id, function (err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                    // 释放连接
                    connection.release();
                });
            });
        })
    },
    updateBlogById: function (param) {
        const values = [param.blog_name, param.blog_type, param.blog_content, param.blog_id]
        return new Promise((resolve, reject) => {
            const pool = createPool(database)
            pool.getConnection(function (err, connection) {
                connection.query(blog.updateBlogById, values, function (err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                    // 释放连接
                    connection.release();
                });
            });
        })
    },
    queryBlogByUserId: function (user_id) {
        return new Promise((resolve, reject) => {
            const pool = createPool(database)
            pool.getConnection(function (err, connection) {
                connection.query(blog.queryBlogByUserId, user_id, function (err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                    // 释放连接
                    connection.release();
                });
            });
        })
    },
    queryAllBlog: function () {
        return new Promise((resolve, reject) => {
            const pool = createPool(database)
            pool.getConnection(function (err, connection) {
                connection.query(blog.queryAllBlog, function (err, result) {
                    resolve(result)
                    // 释放连接
                    connection.release();
                });
            });
        })
    }
};

module.exports = blogTable;