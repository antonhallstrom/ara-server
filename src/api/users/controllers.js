const services = require('./services')
const R = require('ramda')

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
 * Authenticates user credentials
 * @param {Request} req - HTTP request
 * @param {Response} res - HTTP response
 */
const authenticate = async (req, res) => {
  try {
    const result = await services.authenticate({
      username: req.body.username,
      password: req.body.password,
    })
    if (R.not(R.isEmpty(result))) {
      res.status(200).json({ access_token: result, expiresIn: 30 })
    } else {
      return res.status(403).json({ message: 'Invalid username or password' })
    }
  } catch (err) {
    return res.status(401).json({ message: err })
  }
}

module.exports = { authenticate }
