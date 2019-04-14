const { body } = require('express-validator/check')
const R = require('ramda')

module.exports = {
  delete: body('postId').isString(),
  post: [
    body('title').isString(),
    body('subtitle').isString(),
    body('content').isString(),
    body('published').isBoolean(),
    body('categories').isArray(),
  ],
  put: [body('postId').isString(), body('properties').exists()],
}
