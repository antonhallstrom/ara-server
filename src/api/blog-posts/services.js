const mongoose = require('mongoose')
const BlogPost = require('../../models/blog-post')

/**
 * Gets all post
 * @returns {Promise.<Object[]|Error>} A list of posts if fulfilled or error if rejected
 */
const _get = async () => {
  return await BlogPost.find()
    .select('title content published _id')
    .then(res => res)
    .catch(e => e)
}

/**
 * Saves a post
 * @param {Object} payload
 * @param {String} payload.title - Title
 * @param {String} payload.content - Content
 * @returns {Promise.<Object|Error>} The saved post if fulfilled or error if rejected
 */
const _post = async payload => {
  const doc = new BlogPost({
    _id: new mongoose.Types.ObjectId(),
    title: payload.title,
    content: payload.content,
    published: new Date(),
  })

  await doc
    .save()
    .then(res => res)
    .catch(e => e)
}

/**
 * Deletes post with provided postId
 * @param {Object} payload
 * @param {String} postId - Unique identifier for a post
 * @returns {Promise.<Object|Error>} Deleted post if fulfilled or error if rejected
 */
const _delete = async payload => {
  return await BlogPost.deleteOne({ _id: payload.postId })
    .then(res => res)
    .catch(e => e)
}

module.exports = { get: _get, post: _post, delete: _delete }
