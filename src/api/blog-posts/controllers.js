const R = require('ramda')
const services = require('./services')

/**
 * Gets posts
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const _get = async (req, res, next) => {
  try {
    const result = await services.get()
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

/**
 * Stores post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const _post = async (req, res, next) => {
  try {
    const result = await services.post({
      title: req.body.title,
    })
    return res.status(201).json(result)
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

/**
 * Deletes a post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const _delete = async (req, res, next) => {
  if (R.isNil(req.params.postId) || req.params.postId === 'undefined') {
    return res
      .status(400)
      .json({ message: `Missing required parameter postId.` })
  } else {
    try {
      await services.delete({
        id: req.params.postId,
      })
      return res.status(200).json({
        message: `Deleted post.`,
      })
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }
}

module.exports = { get: _get, post: _post, delete: _delete }
