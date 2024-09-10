const CustomError = require('./CustomError')
const UnauthenticatedError = require('./UnauthenticatedError')
const NotFoundError = require('./NotFoundError')
const BadRequestError = require('./BadRequestError')
const InternalServerError = require('./InternalServerError')

module.exports = {
    CustomError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
    InternalServerError
}
