const mongoose = require('mongoose')

const blogPostSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  published: { type: Date },
  title: String,
  subtitle: String,
  categories: Array,
  imageId: String,
  content: String,
})

module.exports = mongoose.model('BlogPost', blogPostSchema)
