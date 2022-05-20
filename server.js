const createServer = require('./appserver')

// Routers
const ApiRouter = require('./routes/api')

const app = createServer()

// Connect to mongodb
require('./mongoConfig')

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
