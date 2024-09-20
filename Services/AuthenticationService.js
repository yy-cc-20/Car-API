const User = require('../Models/User')
const { BadRequestError, UnauthenticatedError } = require('../CustomErrors')
const JWTToken = require('../Models/JWTToken')

async function registerUserService(password, username, displayUsername, createdAt) {
    user = await User.create({ password, username, displayUsername, createdAt })
    const token = await JWTToken.generateToken(user._id)
    return { token, displayUsername, userid: user._id };
}

async function loginService(username, password) {
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
    const token = await JWTToken.generateToken(user._id)
    return { token: token, displayusername: user.displayUsername, userid: user._id }
}

function logoutService(token) {
    const blacklistedToken = JWTToken.findOne({ token });
    if (blacklistedToken) {
        console.log('Token has been revoked');
    } else
        JWTToken.blacklistToken(token);
}

module.exports = {
    registerUserService,
    loginService,
    logoutService
}