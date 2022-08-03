
/**
 * 数据增删改查模块封装
 * req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
 * req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
 * req.body通常用来解析POST请求中的数据
 */

const { blogDB } = require('./dbconfig/poolextend');

const userTable = {
    add: function (param) {
        const sql = 'INSERT INTO user(userid, username, password) VALUES(?,?,?)'
        const values = [param.userid, param.username, param.password]
        return blogDB(sql, values)
    },
    delete: function (userid) {
        const sql = 'DELETE FROM user WHERE userid=?'
        return blogDB(sql, userid)
    },
    update: function (param) {
        const sql = 'UPDATE user SET username=?, password=? WHERE userid=?'
        const values = [param.username, param.password, param.userid]
        return blogDB(sql, values)
    },
    queryByName: function (username) {
        const sql = 'SELECT * FROM user WHERE username=?'
        return blogDB(sql, username)
    },
    queryById: function (userid) {
        const sql = 'SELECT * FROM user WHERE userid=?'
        return blogDB(sql, userid)
    },
    queryAll: function () {
        const sql = 'SELECT * FROM user'
        return blogDB(sql)
    }
};
module.exports = userTable;