const User = require('../Models/User')
const { BadRequestError, UnauthenticatedError } = require('../CustomErrors')

function registerUserService(password, username, displayUsername, createdAt) {
    user = await User.create({ password, username, displayUsername, createdAt })
    const token = createJWTToken(user._id)
    return { token, displayUsername, userid };
}

function loginService(username, password) {
    if (!username || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ username })
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = createJWTToken(user._id)
    return { token: token, displayusername: user.displayUsername, userid: user._id }
}
    
function createJWTToken(userId) {
    return jwt.sign(
        { userId: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )
}

module.exports = {
    registerUserService,
    loginService
}