const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    country: {
        type: String
    },
    website: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    user_type: {
        type:String,
        enum: [
            'normal',
            'company'
        ],
        default: 'normal',
        required: true
    },
    profile: {
        type: String,
        default: '/public/uploads/default.jpg'
    },
    password: {
        type: String,
        required: true,
        select: false
    }


}, {
    toJSON: { virtuals: true},
    toObject: {virtuals: true}
})
UserSchema.virtual('job_listing', {
    ref: 'job',
    localField: '_id',
    foreignField: 'user',
    justOne: false
})

module.exports = mongoose.model('user', UserSchema)