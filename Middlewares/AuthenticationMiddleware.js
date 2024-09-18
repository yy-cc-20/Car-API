const JWTToken = require('../Models/JWTToken')
const { UnauthenticatedError } = require('../CustomErrors')

const auth = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]
    try {
        const userId = await JWTToken.decoding(token)
        req.userId = userId
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}

module.exports = auth
