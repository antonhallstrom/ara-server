const R = require('ramda')

function validateRequestAccess(permissions, req, res, next) {
  if (R.includes(R.path(['user', 'scope'], req), permissions)) {
    return next()
  } else {
    return res.status(403).json({ message: 'Forbidden' })
  }
}

module.exports = validateRequestAccess
