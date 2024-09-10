const express = require('express')
const router = express.Router()
const {	getCarList } = require('../Controllers/CarController')

router.route('/getcarlist').post(getCarList)

module.exports = router
