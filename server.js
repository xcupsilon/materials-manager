const express = require('express')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')

// Routers
const ApiRouter = require('./routes/api')

// Start the app and get mongoDB url
const app = express()
const MONGO_URL = process.env.MONGODB_URL || 'mongodb+srv://xcyan:xcyancesium@prototype.lplwy.mongodb.net/?retryWrites=true&w=majority'

app.use(express.json()) // Parse body using middleware

// If connection fails, will show up here
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cookieSession({
  name: 'session',
  keys: ['mango!'],
  maxAge: 24 * 60 * 60 * 1000, // expiration time: 24 hours
}))

app.use('/api', ApiRouter)

// Erorr handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return
  }
  res.status(500)
  res.send(`An error has occured, reason: "${err.message}"`)
})

app.listen(5000, () => {
  console.log('listening on port 5000')
})
