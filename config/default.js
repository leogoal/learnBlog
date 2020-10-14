module.exports = {
  port: 3000,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://lh2:messi111@localhost:27017/myblog10',
  tags: [
    "H5CQ",
    "前端",
    "NodeJS",
    "其他"
  ],
  firstPath: '/myblog',
  staticDir: '/static_myblog'
}
