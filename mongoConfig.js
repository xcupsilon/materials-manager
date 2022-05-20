const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGODB_URL || 'mongodb+srv://xcyan:xcyancesium@prototype.lplwy.mongodb.net/?retryWrites=true&w=majority'

// If connection fails, will show up here
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
