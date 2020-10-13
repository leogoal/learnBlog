const config = require('config-lite')(__dirname)
const firstPath = config.firstPath;

module.exports = function (app) {
  app.get(`${firstPath}`, function (req, res) {
    res.redirect(`${firstPath}/posts`)
  })
  app.use(`${firstPath}/signup`, require('./signup'))
  app.use(`${firstPath}/signin`, require('./signin'))
  app.use(`${firstPath}/signout`, require('./signout'))
  app.use(`${firstPath}/posts`, require('./posts'))
  app.use(`${firstPath}/comments`, require('./comments'))
  app.use(`${firstPath}/posts/tags`, require('./tags'))
  app.use(`${firstPath}/likeOrUnlike`, require('./likeOrUnlike'))

  // 404 page
  app.use(function (req, res) {

    if (!res.headersSent) {
      if('production' === process.env.NODE_ENV) {
        res.redirect(`${firstPath}404`)
      } else {
        res.status(404).render('404')
      }
    }
  })
}
