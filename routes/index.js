module.exports = function (app) {
  app.use(function (req, res, next) {
    if(req.url === "/posts/icon.jpg") {
      return;
    }
    next()
  })

  app.get('/', function (req, res) {
    res.redirect('/posts')
  })
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/posts', require('./posts'))
  app.use('/comments', require('./comments'))
  app.use('/posts/tags', require('./tags'))
  app.use('/likeOrUnlike', require('./likeOrUnlike'))

  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}
