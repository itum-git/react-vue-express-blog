
// 引入mysql
const mysql = require('mysql');
// 引入mysql连接配置
const dbconfig = require('./dbconfig');
// 创建连接池缓存map
const poolMap = new Map()

function createPool (dbname) {
  // 使用连接池，提升性能
  if (!poolMap.has(dbname)) {
      const pool = mysql.createPool(dbconfig[dbname])

      pool.on('acquire', function (connection) {
          console.log('a new database connection acquired, id: %d', connection.threadId)
      })
      pool.on('connection', function (connection) {
          console.log('a new database connection is made, id: %d', connection.threadId)
      })
      pool.on('enqueue', function () {
          console.log('a new callback has been queued')
      })
      pool.on('release', function (connection) {
          console.log('a connection is released, %d', connection.threadId)
      })
      poolMap.set(dbname, pool)
  }

  return poolMap.get(dbname)
}

function blogDB(sqlstatement, values) {
  return new Promise((resolve, reject) => {
    const pool = createPool('blogdb')
    pool.getConnection(function (err, connection) {
      connection.query(sqlstatement, values, function (err, result) {
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
}

module.exports = {
  createPool,
  blogDB
};