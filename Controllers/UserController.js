const { getUserProfileService, updateUserProfileService } = require('../Services/UserService')
const { StatusCodes } = require('http-status-codes')

const getUserProfile = async (req, res) => {
    const { user: { userId } } = req;

    userProfileDTO = getUserProfileService(userId);
    console.log(`${timestamp} Get user profile for user ${userId}`)
    res.status(StatusCodes.OK).json(userProfileDTO);
}

const updateUserProfile = async (req, res) => {
    const { user: { userId } } = req;
    const { displayusername, timestamp } = req.body;

    updatedUserProfileDTO = updateUserProfileService(userId, displayusername)
    console.log(`${timestamp} Updated display username '${displayusername}'`)
    res.status(StatusCodes.OK).json(updateUserProfileDTO);    
}

module.exports = {
    getUserProfile,
    updateUserProfile
}
