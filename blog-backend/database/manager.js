
/**
 * 数据增删改查模块封装
 * req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
 * req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
 * req.body通常用来解析POST请求中的数据
 */


// 引入连接池配置
const { createPool } = require('./dbconfig/poolextend');
// 引入SQL模块
const { manager } = require('./dbconfig/sqlstatement');

const database = 'blogdb';
const managerTable = {
    add: function (param) {
        return new Promise((resolve, reject) => {
            // 引入创建连接池函数
            const pool = createPool(database)
            pool.getConnection(function (err, connection) {
                connection.query(manager.insert, [param.userid, param.username, param.password, param.regtime], function (err, result) {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                    // 释放连接
                    connection.release();
                });
            });
        })
    },
    delete: function (userid) {
        return new Promise((resolve, reject) => {
            // 引入创建连接池函数
            const pool = createPool(database)
            pool.getConnection(function (err, connection) {
                connection.query(manager.delete, userid, function (err, result) {
                    resolve(result)
                    // 释放连接
                    connection.release();
                });
            });
        })
    },
    update: function (param) {
        return new Promise((resolve, reject) => {
            if (param.username == null || param.password == null) {
                const result = "undefined param";
                resolve(result);
            }
            // 引入创建连接池函数
            const pool = createPool(database)
            pool.getConnection(function (err, connection) {
                connection.query(manager.update, [param.username, param.password, param.userid], function (err, result) {
                    resolve(result)
                    // 释放连接
                    connection.release();
                });
            });
        })
    },
    queryByName: function (user_name) {
        return new Promise((resolve, reject) => {
            // 引入创建连接池函数
            const pool = createPool(database)
            pool.getConnection(function (err, connection) {
                connection.query(manager.queryByName, user_name, function (err, result) {
                    resolve(result)
                    // 释放连接
                    connection.release();
                });
            });
        })
    },
    queryById: function (userid) {
        return new Promise((resolve, reject) => {
            // 引入创建连接池函数
            const pool = createPool(database)
            pool.getConnection(function (err, connection) {
                connection.query(manager.queryById, userid, function (err, result) {
                    resolve(result)
                    // 释放连接
                    connection.release();
                });
            });
        })
    },
    queryAll: function () {
        return new Promise((resolve, reject) => {
            // 引入创建连接池函数
            const pool = createPool(database)
            pool.getConnection(function (err, connection) {
                connection.query(manager.queryAll, function (err, result) {
                    resolve(result)
                    // 释放连接
                    connection.release();
                });
            });
        })
    }
};
module.exports = managerTable;