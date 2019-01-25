const mongoose = require('mongoose')

const blogPostSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
})

module.exports = mongoose.model('BlogPost', blogPostSchema)
