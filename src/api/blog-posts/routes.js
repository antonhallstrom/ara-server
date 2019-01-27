const express = require('express')
const router = express.Router()
const controllers = require('./controllers')
const validate = require('./validators')

router.get('/', controllers.get)
router.post('/', validate.post, controllers.post)
router.delete('/', validate.delete, controllers.delete)

module.exports = router
