const R = require('ramda')
const services = require('./services')
const { validationResult } = require('express-validator/check')

/**
 * Express request object representing the HTTP request
 * @typedef Request
 * @type {Object}
 * @see [Express API reference]{@link https://expressjs.com/en/4x/api.html#res}
 */

/**
 * Express response object representing the HTTP response of the request
 * @typedef Response
 * @type {Object}
 * @see [Express API reference]{@link https://expressjs.com/en/4x/api.html#res}
 */

/**
 * Gets blog posts
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 */
const _get = async (req, res) => {
  try {
    const result = await services.get()
    return res.status(200).json(result)
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

/**
 * Stores blog post
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 */
const _post = async (req, res) => {
  try {
    const result = await services.post({
      title: req.body.title,
      content: req.body.content,
      shouldPublish: req.body.shouldPublish,
    })
    return res.status(201).json(result)
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

/**
 * Deletes blog post
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 */
const _delete = async (req, res) => {
  const errors = validationResult(req)

  if (R.not(errors.isEmpty())) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    try {
      await services.delete({
        postId: req.body.postId,
      })
      return res.status(200).json({
        message: `Deleted post.`,
      })
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }
}

/**
 * Patches blog post
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 */
const _put = async (req, res) => {
  const errors = validationResult(req)

  if (R.not(errors.isEmpty())) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    try {
      await services.put({
        postId: req.body.postId,
        properties: req.body.properties,
      })
      return res.status(202).json({ message: 'Published.' })
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }
}

module.exports = { get: _get, post: _post, delete: _delete, put: _put }
