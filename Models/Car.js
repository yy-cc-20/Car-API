const mongoose = require('mongoose')
const uuid = require('uuid');

const carSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            index: true,
            default: uuid.v4
        },
        name: {
            type: String,
            required: [true, 'Please provide name'],
            maxlength: 150,
            unique: true
        },
        brand: {
            type: String,
            required: [true, 'Please provide brand'],
            maxlength: 150,
        },
        description: {
            type: String,
            required: [true, 'Please provide description'],
            maxlength: 100000,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Car', carSchema)
