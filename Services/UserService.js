const User = require('../Models/User');
const { NotFoundError } = require('../CustomErrors')

async function getUserProfileService(userId) {
    const user = await User.findOne({
        _id: userId,
    })
    if (!user) {
        throw new NotFoundError(`No user with id ${userId}`)
    }

    return toUserProfileDTO(user);
}

async function updateUserProfileService(userId, displayUsername) {
    const user = await User.findByIdAndUpdate(
        { _id: userId },
        { displayUsername: displayUsername },
        { new: true, runValidators: true }
    )

    return toUserProfileDTO(user);
}

async function toUserProfileDTO(user) {
    return {
        username: user.username,
        displayusername: user.displayusername,
        userid: user._id
    };
}

module.exports = {
    getUserProfileService,
    updateUserProfileService
}