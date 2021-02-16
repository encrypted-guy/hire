const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    title: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    work_type: {
        type: String,
        enum: [
            'remote',
            'in office'
        ],
        default: 'remote'
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    created_At: {
        type: String
    }
})
JobSchema.pre('save', function(next){
    let date_info = new Date
    let date_into = (date_info.getMonth()+1) + '/' + date_info.getDate() + '/' +  date_info.getFullYear()
    this.created_At = date_into
    next()
})
module.exports = mongoose.model('job', JobSchema)