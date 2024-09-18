const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const uuid = require('uuid');
const timestamps = require('mongoose-timestamp');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    username: {
        type: String,
        required: [true, 'Please provide username'],
        maxlength: 100,
        unique: true
    },
    displayUsername: {
        type: String,
        required: [true, 'Please provide display username'],
        maxlength: 500,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        maxLength: 50,
    },
})

userSchema.plugin(timestamps, {
    createdAt: {
        type: Date,
        default: Date.now,
        timezone: 'UTC'
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        timezone: 'UTC'
    }
});

userSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', userSchema)
