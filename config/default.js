module.exports = {
  options: {
    host: 'localhost',
    port: 3306,
    database: 'session_test'        //数据库名
  },
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
}
