const express = require('express')
const router = express.Router()
const controllers = require('./controllers')
const validate = require('./validators')

router.get('/posts', controllers.get)
router.post('/posts', validate.post, controllers.post)
router.delete('/posts', validate.delete, controllers.delete)
router.put('/posts', validate.put, controllers.put)

module.exports = router
