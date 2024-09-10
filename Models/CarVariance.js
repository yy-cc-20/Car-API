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
        price: {
            type: Number,
            required: [true, 'Please provide price'],
            min: 0,
            max: 999999,
            precision: 0
        },
        carId: {
            type: mongoose.Types.ObjectId,
            ref: 'Car',
            required: [true, 'Please provide car id'],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Car', carSchema)

    