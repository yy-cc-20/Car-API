const { getUserProfileService, updateUserProfileService } = require('../Services/UserService')
const { StatusCodes } = require('http-status-codes')

const getUserProfile = async (req, res) => {
    const { userId } = req;

    userProfileDTO = await getUserProfileService(userId);
    console.log(`${req.body.timestamp} Get user profile for user ${userId}`)
    res.status(StatusCodes.OK).json(userProfileDTO);
}

const updateUserProfile = async (req, res) => {
    const { userId } = req;
    const { displayusername, timestamp } = req.body;

    updatedUserProfileDTO = await updateUserProfileService(userId, displayusername)
    console.log(`${timestamp} Updated display username '${displayusername}'`)
    res.status(StatusCodes.OK).json(updatedUserProfileDTO);    
}

module.exports = {
    getUserProfile,
    updateUserProfile
}
