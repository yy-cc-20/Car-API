const Car = require('../Models/Car')

async function getCarListWithSearchingAndPagingService(carname, pageindex, pagesize) {
    // Validate pageindex and pagesize
    const pageIndex = Math.max(1, Math.floor(Number(pageindex) || 1));
    const pageSize = Math.max(1, Math.min(Number(pagesize) || 10, 100)); // Limit pagesize to a maximum of 100

    const queryObject = {};

    if (carname) {
        queryObject.name = { $regex: `.*${carname}.*`, $options: 'i' };
    }

    const result = await Car.find(queryObject)
        .skip((pageIndex - 1) * pageSize)
        .limit(pageSize);

    const total = await Car.countDocuments(queryObject);
    const totalPages = Math.ceil(total / pageSize);

    console.log(JSON.stringify(result, null, 2))
    
    return { list: result, totalcount: total/*, totalPages */};
}

module.exports = {
    getCarListWithSearchingAndPagingService
}
