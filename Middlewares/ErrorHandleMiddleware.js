const { StatusCodes } = require('http-status-codes')
const { CustomError } = require('../CustomErrors')

// catch all errors here
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err.message)

    if (process.env.NODE_ENV === 'production')
        return res.status(StatusCodes.FORBIDDEN).json({ errors: "Failed" })
    
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ msg: err.message })
    }

    let customError = {
        // set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    }

    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
        customError.statusCode = 400
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`
        customError.statusCode = 400
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`
        customError.statusCode = 404
    }
    console.log(customError.msg)
    return res.status(customError.statusCode).json({ errors: customError.msg })
}

module.exports = errorHandlerMiddleware
