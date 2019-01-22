const mongoose = require('mongoose')
const models = require('./models')

const get = async () => {
  try {
    return await models.Post.find().select('title _id')
  } catch (e) {
    return e
  }
}

const post = async payload => {
  const doc = new models.Post({
    _id: new mongoose.Types.ObjectId(),
    title: payload.title,
  })
  try {
    return await doc.save()
  } catch (e) {
    return e
  }
}

const remove = async payload => {
  try {
    return await models.Post.remove({ _id: payload.id })
  } catch (e) {
    return e
  }
}

module.exports = { get, post, remove }
