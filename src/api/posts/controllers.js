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
    return res.status(200).json({
      message: 'Handling GET request to /posts',
      result,
    })
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
    return res.status(201).json({
      message: 'Handling POST request to /posts',
      result,
    })
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
  try {
    const result = await services.delete({
      id: req.params.postId,
    })
    return res.status(200).json({
      message: 'Handling DELETE request to /posts',
      result,
    })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

module.exports = { get: _get, post: _post, delete: _delete }
