var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var ClientesSchema = new mongoose.Schema({
    nombre: String,
    cif: { type: String, unique: true},
    domicilio: String,
    cp: Number,
    localidad: String,
    provincia: String,
    telefono: String,
    email: String,
    contacto: String
})

ClientesSchema.plugin(unique, { message: 'El cif introducido ya existe'});


module.exports = mongoose.model('Clientes', ClientesSchema);