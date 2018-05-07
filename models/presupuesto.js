var mongoose = require('mongoose');
//var unique = require('mongoose-unique-validator');

var PresupuestoSchema = new mongoose.Schema({
    cliente: String,
    fecha: String,
    items: Array,
    suma: Number,
    tipo: Number,
    iva: Number,
    total: Number
})

//PresupuestoSchema.plugin(unique, { message: 'El cif introducido ya existe'});

module.exports = mongoose.model('Presupuesto', PresupuestoSchema);