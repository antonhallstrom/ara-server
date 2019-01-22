const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
})

module.exports = { Post: mongoose.model('Post', postSchema) }
