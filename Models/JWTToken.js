const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../CustomErrors')

const JWTTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        index: true
    },
})

JWTTokenSchema.generateToken = async function (userId) {
    return jwt.sign(
        { userId: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )
}

JWTTokenSchema.blacklistToken = async function (token) {
    const existingToken = await Token.findOne({ token });
    if (!existingToken) {
        await new Token({ token }).save();
    }
}

JWTTokenSchema.decodingToken = async function (token) {
    const blacklistedToken = await Token.findOne({ token });
    if (blacklistedToken) {
        throw new UnauthenticatedError('Token has been revoked');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId
    } catch (error) {
        throw new UnauthenticatedError('Invalid token');
    }
}

module.exports = mongoose.model('BlacklistedJWTToken', JWTTokenSchema)
