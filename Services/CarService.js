const Car = require('../Models/Car')
const CarVariance = require('../Models/CarVariance')
const { BadRequestError, NotFoundError } = require('../CustomErrors')

async function getCarListWithSearchingAndPagingService(carname, pageindex, pagesize) {
    const queryObject = {};

    if (carname) {
        queryObject.name = { $regex: `.*${carname}.*`, $options: 'i' };
    }

    // Eager-load the "CarVariance" data using the populate method
    const result = await Car.find(queryObject).populate("CarVariance");

    // Paging
    const totalCount = await Car.countDocuments(queryObject);
    const page = Number(pageindex) || 1;
    const limit = Number(pagesize) || 10;
    const totalPages = Math.ceil(totalCount / limit);
    if (page > totalPages) {
        page = totalPages
        // Handle invalid page number, redirect to the last page.
    }
    const skip = (page - 1) * limit;

    const carList = await result.skip(skip).limit(limit);

    return { list: carList, totalcount: totalCount };
}

module.exports = {
    getCarListWithSearchingAndPagingService
}