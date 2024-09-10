const express = require('express')
const router = express.Router()
const { register, login, logout } = require('../Controllers/AuthenticationController')

router.post('/signup', register)
router.post('/session/login', login)
router.post('/session/logout', authenticationMiddleware, logout)

module.exports = router
