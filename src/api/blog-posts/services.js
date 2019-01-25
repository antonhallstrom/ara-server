const mongoose = require('mongoose')
const BlogPost = require('../../models/blog-post')

const get = async () => {
  try {
    return await BlogPost.find().select('title _id')
  } catch (e) {
    console.log(e)
    return e
  }
}

const post = async payload => {
  const doc = new BlogPost({
    _id: new mongoose.Types.ObjectId(),
    title: payload.title,
  })
  try {
    return await doc.save()
  } catch (e) {
    return e
  }
}

const _delete = async payload => {
  try {
    return await BlogPost.remove({ _id: payload.id })
  } catch (e) {
    return e
  }
}

module.exports = { get, post, delete: _delete }
