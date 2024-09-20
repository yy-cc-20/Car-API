const express = require('express')
const router = express.Router()
const { getUserProfile, updateUserProfile } = require('../Controllers/UserController')
const authenticationMiddleware = require('../Middlewares/AuthenticationMiddleware')

router.post('/getprofile', authenticationMiddleware, getUserProfile)
router.post('/updatemyprofile', authenticationMiddleware, updateUserProfile)

module.exports = router
