

/* 线上 mysql 配置信息 */
const blogdb_pro = {
      host: '127.0.0.1', // 主机名
      user: 'uroot', // 用户名
      password: 'password', // 密码
      database: 'blog', // 数据库名 
      port: 3306 // 端口号（默认都是3306）
};

/* 测试 mysql 配置信息 */
const blogdb_dev = {
      host: '127.0.0.1', // 主机名
      user: 'uroot', // 用户名
      password: 'password', // 密码
      database: 'blog', // 数据库名
      port: 3306 // 端口号（默认都是3306）
};

// const newdb = {
//       host: '127.0.0.1',
//       user: 'uroot',
//       password: 'password',
//       database: 'newdb',
//       port: 3306
// }

module.exports = {
      blogdb_pro,
      blogdb_dev,
      // newdb
}