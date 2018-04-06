var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

//nos vamos a crear un esquema para estos proveedores
//nos creamos la variable proveedor
var ProveedorSchema = new mongoose.Schema({
    //aquí dentro vamos a describir qué propiedades va a tener este modelo
    //definiremos cada propiedad del objeto con la particularidad de que se pueden tipar
    //la sintaxis es casi igual que en angular
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

ProveedorSchema.plugin(unique, {message: 'El cif introducido ya existe'});

module.exports = mongoose.model('Proveedor', ProveedorSchema); //lo primero es el nombre con el que lo queremos
                                                                // exportar y lo segundo el esquema 
                                                                //con lo que lo estás exportando

                                                                