const controllers = require('./controllers')
const stackMiddleware = require('./middleware')

module.exports = app => {
  Object.keys(controllers).forEach((controller) => {
    const { path, router, middleware } = controllers[controller]
    if (middleware) {
      middleware.map((middleware) => {
        if (stackMiddleware.hasOwnProperty(middleware)) {
          app.use(stackMiddleware[middleware])
        }
      })
    }
    app.use(path, router)
  })
}
