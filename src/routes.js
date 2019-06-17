const controllers = require('./controllers')

module.exports = app => {
  Object.keys(controllers).forEach((controller) => {
    const { path, router } = controllers[controller]
    app.use(path, router)
  })
}
