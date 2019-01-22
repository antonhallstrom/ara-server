const express = require('express')
const router = express.Router()
const controllers = require('./controllers')

router.get('/', controllers.get)
router.post('/', controllers.post)
router.delete('/:postId', controllers.delete)

module.exports = router
