const express = require('express')
const cors = require('cors')

const routes = require('./routes')

class Server {
  init () {
    this.app = express()

    this.middleware()
    this.routes()

    return this
  }

  middleware () {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  routes () {
    routes(this.app)
  }

  start () {
    this.app.listen(process.env.SERVER_PORT, function () {
      console.log(`App listening on port ${process.env.SERVER_PORT}!`)
    })
  }
}

const server = new Server()

module.exports = server.init()
