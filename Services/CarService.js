const Car = require('../Models/Car')

//async function getCarListWithSearchingAndPagingService(carname, pageindex, pagesize) {
//    const queryObject = {};

//    if (carname) {
//        queryObject.name = { $regex: `.*${carname}.*`, $options: 'i' };
//    }

//    // Eager-load the "CarVariance" data using the populate method
//    const result = await Car.find(queryObject);

//    // Paging
//    const totalCount = await Car.countDocuments(queryObject);
//    // Validate pageindex and pagesize
//    const pageIndex = Math.max(1, Math.floor(Number(pageindex) || 1));
//    const pageSize = Math.max(1, Math.min(Number(pagesize) || 10, 100)); // Limit pagesize to a maximum of 100
//    let page = Number(pageindex) || 1;
//    const limit = Number(pagesize) || 10;
//    const totalPages = Math.ceil(totalCount / limit);
//    if (page > totalPages) {
//        page = totalPages
//        // Handle invalid page number, redirect to the last page.
//    }
//    const skip = (page - 1) * limit;

//    const carList = await result.skip(skip).limit(limit);

//    return { list: carList, totalcount: totalCount };
//}

async function getCarListWithSearchingAndPagingService(carname, pageindex, pagesize) {
    // Validate pageindex and pagesize
    const pageIndex = Math.max(1, Math.floor(Number(pageindex) || 1));
    const pageSize = Math.max(1, Math.min(Number(pagesize) || 10, 100)); // Limit pagesize to a maximum of 100

    const queryObject = {};

    if (carname) {
        queryObject.name = { $regex: `.*${carname}.*`, $options: 'i' };
    }

    const result = await Car.find({})
        .skip((pageIndex - 1) * pageSize) // Adjust page index to 0-based
        .limit(pageSize);

    const total = await Car.countDocuments(queryObject);
    const totalPages = Math.ceil(total / pageSize);

    console.log(JSON.stringify(result, null, 2))
    
    return { list: result, totalcount: total/*, totalPages */};
}

module.exports = {
    getCarListWithSearchingAndPagingService
}