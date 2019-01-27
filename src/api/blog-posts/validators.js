const { body } = require('express-validator/check')

module.exports = {
  delete: body('postId').isString(),
  post: [body('title').isString(), body('content').isString()],
}
