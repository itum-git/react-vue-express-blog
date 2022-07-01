
// 引入mysql
const mysql = require('mysql');
// 引入mysql连接配置
const dbconfig = require('./dbconfig');
// 创建连接池缓存map
const poolMap = new Map()

function createPool(dbname) {
  // 使用连接池，提升性能
  if (!poolMap.has(dbname)) {
    poolMap.set(dbname, mysql.createPool(dbconfig[dbname]));
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

// function newDBIfYouNeed(sqlstatement, values) {
//   return new Promise((resolve, reject) => {
//     const pool = createPool('newdb')
//     pool.getConnection(function (err, connection) {
//       connection.query(sqlstatement, values, function (err, result) {
//         if (err) {
//           reject(err)
//         } else {
//           resolve(result)
//         }
//         // 释放连接
//         connection.release();
//       });
//     });
//   })
// }

module.exports = {
  createPool,
  blogDB,
  // newDBIfYouNeed
};