const express = require('express')
const router = express.Router()
const { get, update } = require('../Controllers/UserController')

router.post('/getprofile', get)
router.post('/updatemyprofile', update)

module.exports = router
