var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var SesionesSchema = new mongoose.Schema({
    nombre: String,
    login: String,
    logout: String
})

SesionesSchema.plugin(unique, {message: 'Sesión creada correctamente'});

module.exports = mongoose.model('Sesiones', SesionesSchema);