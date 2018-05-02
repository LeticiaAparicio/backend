var mongoose = require('mongoose');

var SesionesSchema = new mongoose.Schema({
    nombre: String,
    login: Date,
    logout: Date,
    duracion: String
})

module.exports = mongoose.model('Sesiones', SesionesSchema);