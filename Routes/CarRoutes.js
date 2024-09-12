const express = require('express')
const router = express.Router()
const { getCarListWithSearchingAndPaging } = require('../Controllers/CarController')

router.route('/getcarlist').post(getCarListWithSearchingAndPaging)

module.exports = router
