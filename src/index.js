const dotenv = require('dotenv')
const Server = require('./server')

dotenv.config()

Server.start()
