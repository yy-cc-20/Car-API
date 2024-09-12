const express = require('express')
const router = express.Router()
const { getUserProfile, updateUserProfile } = require('../Controllers/UserController')

router.post('/getprofile', getUserProfile)
router.post('/updatemyprofile', updateUserProfile)

module.exports = router
