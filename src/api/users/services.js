const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const bcrypt = require('bcrypt')

const authenticate = async payload => {
  try {
    const user = await User.findOne({ username: payload.username })
    if (user && bcrypt.compareSync(payload.password, user.password)) {
      return jwt.sign({ username: user.username }, process.env.ARA_API_SECRET, {
        expiresIn: 30,
      })
    } else {
      return {}
    }
  } catch (e) {
    return e
  }
}

module.exports = { authenticate }
