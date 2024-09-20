const mongoose = require('mongoose')
const uuid = require('uuid');

const carSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
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
        variance: [{
            _id: {
                type: String,
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
        }]
    },
    { timestamps: true }
)

carSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;

        ret.carname = ret.name;
        delete ret.name;

        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;

        // Transform the variance array
        if (Array.isArray(ret.variance)) {
            ret.variance = ret.variance.map(variance => {
                const transformedVariance = { ...variance };
                transformedVariance.id = transformedVariance._id;
                delete transformedVariance._id;
                return transformedVariance;
            });
        } else {
            ret.variance = [];
        }

        return ret;
    }
});

module.exports = mongoose.model('Car', carSchema)
