const { body } = require('express-validator/check')

module.exports = {
  authenticate: [body('username').exists(), body('password').exists()],
}
