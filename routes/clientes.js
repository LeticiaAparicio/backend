var express = require('express');
var mongoose = require('mongoose');

var Clientes = require('../models/clientes.js');

var app = express();

app.get('/nombre/:nombre', (req, res, next) => {

    var nombre = req.params.nombre;

    Clientes.find({nombre:{$regex:nombre,$options:'i'}}).exec((err, clientes)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso en base de datos',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            clientes: clientes
        })
    });
});

app.get('/localidad/:localidad', (req, res, next) => {

    var localidad = req.params.localidad;

    Clientes.find({localidad:{$regex:localidad,$options:'i'}}).exec((err, clientes)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso en base de datos',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            clientes: clientes
        })
    });
});

app.get('/mixto/:nombre/:localidad', (req, res, next) => {

    var nombre = req.params.nombre;
    var localidad = req.params.localidad;

    // Clientes.find({$or:[{nombre:{$regex:nombre,$options:'i'}},{localidad:{$regex:localidad,$options:'i'}}]}).exec((err, clientes)=>{
    Clientes.find({nombre:{$regex:nombre,$options:'i'},localidad:{$regex:localidad,$options:'i'}}).exec((err, clientes)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso en base de datos',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            clientes: clientes
        })
    });
});

app.get('/:id', function(req, res, next){
    Clientes.findById(req.params.id, (err, clientes)=>{  
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso a la base de datos',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            clientes: clientes
        })
    })  
});

app.post('/', (req, res)=>{

    var body = req.body;

    var clientes = new Clientes({
        nombre: body.nombre, //esto es parecido a lo de los formularios de angular
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,
        email: body.email,
        contacto: body.contacto
    })

    clientes.save((err, clienteGuardado)=>{  
        if(err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el cliente',
                errores: err 
            })
        }
        res.status(200).json({
            ok: true,
            clientes: clienteGuardado,
        })
    });
});

app.put('/:id', function(req, res, next){

    Clientes.findByIdAndUpdate(req.params.id, req.body, function(err, datos){ //(hace una búsqueda en la base de datos, con qué lo quiero actualizar, la función )
        if(err) return next(err);
        res.status(201).json({
            ok: true,
            mensaje: 'Cliente actualizado'
        });
    });

});

app.delete('/:id', function(req, res, error){

    Clientes.findByIdAndRemove(req.params.id, function(err, datos){
        if(err) return next(err);
        //Para que nos salga el nombre el proveedor al eliminarlo
        var mensaje = 'Cliente eliminado'
        res.status(200).json({
            ok: 'true',
            mensaje: mensaje
        });    
    });

});

module.exports = app;