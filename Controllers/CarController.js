const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).populate('foreign key').sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

module.exports = {
    getCarList
}
