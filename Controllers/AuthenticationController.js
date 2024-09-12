const { StatusCodes } = require('http-status-codes')
const { registerUserService } = require('../Services/AuthenticationService')

const register = async (req, res) => {
    const { password, username, displayusername, timestamp } = req.body;

    const userDTOAndToken = registerUserService(password, username, displayusername, timestamp);
    console.log(`${timestamp} User ${userDTOAndToken.userid} is registered`)
    res.status(StatusCodes.CREATED).json(userDTOAndToken)
}

const login = async (req, res) => {
    const { username, timestamp, password } = req.body

    const userDTOAndToken = loginUserService(username, password);
    console.log(`${timestamp} User ${userDTOAndToken.userid} is logined`)
    res.status(StatusCodes.OK).json(userDTOAndToken)
}

const logout = async (req, res) => {
    // Invalidate the user's session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ message: 'Error logging out' });
        }
        // Remove the user's token from the database or cache
        //await removeUserToken(req.user.id);
        res.clearCookie('sessionToken');
        res.status(200).send({ message: 'Logged out successfully' });
    });
};

module.exports = {
    register,
    login,
    logout
}
