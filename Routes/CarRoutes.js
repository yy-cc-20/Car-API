const express = require('express')
const router = express.Router()
const { getCarListWithSearchingAndPaging } = require('../Controllers/CarController')
const authenticationMiddleware = require('../Middlewares/AuthenticationMiddleware')

router.post('/getcarlist', authenticationMiddleware, getCarListWithSearchingAndPaging)

module.exports = router
