//User.js model
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const roleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    scopes: {
        type: [String],
        required: true
    }
}, { timestamps: true })

exports.Role = mongoose.model('role', roleSchema)