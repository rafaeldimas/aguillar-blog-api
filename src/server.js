const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')

const { database, server } = require('./configs')
const routes = require('./routes')

class Server {
  init () {
    this.app = express()

    this.database()
    this.globalMiddleware()
    this.routes()

    return this
  }

  database () {
    const auth = (database.user && database.password)
      ? `${database.user}:${database.password}@`
      : ''

    mongoose.connect(
      `mongodb://${auth}${database.host}:${database.port}/${database.db}`,
      {
        useCreateIndex: true,
        useNewUrlParser: true
      }
    )

    mongoose.plugin(slug)
  }

  globalMiddleware () {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  routes () {
    routes(this.app)
  }

  start () {
    this.app.listen(server.port, function () {
      console.log(`App listening on port ${server.port}!`)
    })
  }
}

const serverInstance = new Server()

module.exports = serverInstance.init()
