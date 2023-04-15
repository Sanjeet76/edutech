
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },

    schoolId: {
        type: String,
        required: true
    }



}, { timestamps: true })

exports.Student = mongoose.model('student', studentSchema)