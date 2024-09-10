const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
    const user = await User.create({ ...req.body }) // throw error if not valid   
    const token = user.createJWT()
    console.log("User is registered.")
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    // compare password
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

const logout = async (req, res) => {
    // Invalidate the user's session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ message: 'Error logging out' });
        }
        // Remove the user's token from the database or cache
        await removeUserToken(req.user.id);
        res.clearCookie('sessionToken');
        res.status(200).send({ message: 'Logged out successfully' });
    });
};

module.exports = {
    register,
    login,
    logout
}
