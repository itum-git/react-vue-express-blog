
/**
 * 数据增删改查模块封装
 * req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
 * req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
 * req.body通常用来解析POST请求中的数据
 */


const { blogDB } = require('./dbconfig/poolextend');
const { user } = require('./dbconfig/sqlstatement');

const userData = {
    add: function (param) {
        const values = [param.userid, param.username, param.password]
        return blogDB(user.insert, values)
    },
    delete: function (userid) {
        return blogDB(user.delete, userid)
    },
    update: function (param) {
        const values = [param.username, param.password, param.userid]
        return blogDB(user.update, values)
    },
    queryByName: function (username) {
        return blogDB(user.queryByName, username)
    },
    queryById: function (userid) {
        return blogDB(user.queryById, userid)
    },
    queryAll: function () {
        return blogDB(user.queryAll)
    }
};
module.exports = userData;