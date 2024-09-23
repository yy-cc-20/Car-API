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

JWTTokenSchema.statics.generateToken = async function (userId) {
    token = jwt.sign(
        { userId: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )
    return token;
}

JWTTokenSchema.statics.blacklistToken = async function (token) {
    console.log(token)
    const existingToken = await this.findOne({ token });
    if (!existingToken) {
        await new Token({ token }).save();
    }
}

JWTTokenSchema.statics.decoding = async function (token) {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId
    } catch (error) {
        throw new UnauthenticatedError('Invalid token');
    }
}

module.exports = mongoose.model('JWTToken', JWTTokenSchema)
