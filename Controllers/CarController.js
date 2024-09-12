const { getCarListWithSearchingAndPagingService } = require('../Services/CarService')
const { StatusCodes } = require('http-status-codes')

const getCarListWithSearchingAndPaging = async (req, res) => {
    const { carname, pageindex, pagesize, timestamp } = req.body;

    carList = getCarListWithSearchingAndPagingService(carname, pageindex, pagesize);

    console.log(`${timestamp} Get car list`)

    res.status(StatusCodes.OK).json(carList);
}

module.exports = {
    getCarListWithSearchingAndPaging
}
