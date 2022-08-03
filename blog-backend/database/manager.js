
/**
 * 数据增删改查模块封装
 * req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
 * req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
 * req.body通常用来解析POST请求中的数据
 */

const { blogDB } = require('./dbconfig/poolextend');

const managerTable = {
    add: function (param) {
        const sql = 'INSERT INTO manager(user_id, user_name, user_pass, create_time) VALUES(?,?,?,?)'
        const values = [param.userid, param.username, param.password, param.regtime]
        return blogDB(sql, values)
    },
    delete: function (userid) {
        const sql = 'DELETE FROM manager WHERE user_id=?'
        return blogDB(sql, userid)
    },
    update: function (param) {
        const sql = 'UPDATE manager SET user_name=?, user_pass=? WHERE user_id=?'
        const values = [param.username, param.password, param.userid]
        return blogDB(sql, values)
    },
    queryByName: function (user_name) {
        const sql = 'SELECT * FROM manager WHERE user_name=?'
        return blogDB(sql, user_name)
    },
    queryById: function (userid) {
        const sql = 'SELECT user_id, user_name, create_time FROM manager WHERE user_id=?'
        return blogDB(sql, userid)
    },
    queryAll: function () {
        const sql = 'SELECT user_id, user_name, create_time FROM manager'
        return blogDB(sql)
    }
};
module.exports = managerTable;