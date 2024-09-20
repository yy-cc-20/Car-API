const JWTToken = require('../Models/JWTToken')
const { UnauthenticatedError } = require('../CustomErrors')

const auth = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Token is not provided')
    }

    const token = authHeader.split(' ')[1]
    const userId = await JWTToken.decoding(token)
    req.userId = userId
    next()
}

module.exports = auth
