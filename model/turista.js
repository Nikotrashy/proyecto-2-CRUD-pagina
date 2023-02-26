const mongoose = require('mongoose')
EstSchema = new mongoose.Schema({
    _id: Number,
    nombre: String,
    nacionalidad: String,
    edad: Number
}, {
    versionKey: false
})
module.exports = mongoose.model('Turista', EstSchema, 'Turista')
