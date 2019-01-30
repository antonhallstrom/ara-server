const { body } = require('express-validator/check')
const R = require('ramda')

module.exports = {
  delete: body('postId').isString(),
  post: [
    body('title').isString(),
    body('content').isString(),
    body('published').isBoolean(),
  ],
  put: [body('postId').isString(), body('properties').exists()],
}
