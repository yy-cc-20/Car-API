const { StatusCodes } = require('http-status-codes')
const { registerUserService, loginService, logoutService } = require('../Services/AuthenticationService')

const register = async (req, res) => {
    const { password, username, displayusername, timestamp } = req.body;

    const userDTOAndToken = registerUserService(password, username, displayusername, timestamp);
    console.log(`${timestamp} User ${userDTOAndToken.userid} is registered`)
    res.status(StatusCodes.CREATED).json(userDTOAndToken)
}

const login = async (req, res) => {
    const { username, timestamp, password } = req.body

    const userDTOAndToken = loginService(username, password);
    console.log(`${timestamp} User ${userDTOAndToken.userid} is logined`)
    res.status(StatusCodes.OK).json(userDTOAndToken)
}

const logout = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    logoutService(token)
    res.status(StatusCodes.OK);
};

module.exports = {
    register,
    login,
    logout
}
