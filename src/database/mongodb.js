const mongoose = require('mongoose')

module.exports = {
  connect() {
    mongoose
      .connect(process.env.MONGO_DB_ATLAS_URI, { useNewUrlParser: true })
      .then(() => console.log('Connected'))
      .catch(err => console.log('Failed to connect.', err))
  },
}
