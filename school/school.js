
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schoolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    }

}, { timestamps: true })

exports.School = mongoose.model('school', schoolSchema)