const express = require('express')
const cookieSession = require('cookie-session')

const createServer = () => {
  // Start the app and get mongoDB url
  const app = express()

  app.use(express.json()) // Parse body using middleware

  app.use(cookieSession({
    name: 'session',
    keys: ['mango!'],
    maxAge: 24 * 60 * 60 * 1000, // expiration time: 24 hours
  }))

  return app
}

module.exports = createServer
