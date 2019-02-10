const express = require('express')
const router = express.Router()
const controllers = require('./controllers')
const validate = require('./validators')

router.post('/authenticate', validate.authenticate, controllers.authenticate)

module.exports = router
