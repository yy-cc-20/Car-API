const { StatusCodes } = require('http-status-codes')
const { registerUserService, loginService, logoutService } = require('../Services/AuthenticationService')

const register = async (req, res) => {
    const { password, username, displayusername, timestamp } = req.body;

    const userDTOAndToken = await registerUserService(password, username, displayusername, timestamp);
    console.log(`${timestamp} User ${userDTOAndToken.userid} is registered`)
    
    res.status(StatusCodes.CREATED).json(userDTOAndToken)
}

const login = async (req, res) => {
    const { username, timestamp, password } = req.body
    const userDTOAndToken = await loginService(username, password);
    console.log(`${timestamp} User ${userDTOAndToken.userid} is logined`)
    res.status(StatusCodes.OK).json(userDTOAndToken)
}

const logout = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    logoutService(token)
    console.log(`${req.body.timestamp} User ${req.userId} is logout`)
    res.status(StatusCodes.NO_CONTENT).json({})
};

module.exports = {
    register,
    login,
    logout
}
