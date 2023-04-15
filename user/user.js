//User.js model
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roleId:
    {
        type: String,
        required: true
    }

}, { timestamps: true })

exports.User = mongoose.model('user', userSchema)