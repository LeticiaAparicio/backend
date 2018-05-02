var express = require('express');
var mongoose = require('mongoose');

var Sesiones = require('../models/sesiones.js');

var app = express();

app.get('/', (req, res, next) => {

    var nombre = req.query.nombre;

    Sesiones.find({nombre:nombre}).sort({_id:-1}).exec((err, sesiones) => { //el primer nombre es el de la propiedad, y el segundo es el de la consulta que estamos almacenando arriba
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso en base de datos',
                errores: err
            })
        }
        // res.status(200).json(proveedores);
        res.status(200).json({
            ok: true,
            sesiones: sesiones
        })
    });
});

app.post('/', function (req, res, next) {
    var body = req.body;

    var sesiones = new Sesiones({
        nombre: body.nombre,
        login: body.login,
        logout: body.logout,
        duracion: body.duracion
    })
    sesiones.save((err, sesionGuardada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al registrar sesion',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            sesiones: sesionGuardada
        })
    })
})

// app.delete('/:id', function (req, res, error) {

//     Sesiones.findByIdAndRemove(req.params.id, function (err, datos) {
//         if (err) return next(err);
//         //Para que nos salga el nombre el proveedor al eliminarlo
//         var mensaje = 'Sesión ' + datos.nombre + ' eliminada'
//         res.status(200).json({
//             ok: true,
//             mensaje: mensaje
//         });
//     });

// });

module.exports = app;


/*
    app.peticionHttp(funcion callback{
        leer el mensaje
        crea el objeto con la clase mongoose
        objeto.metodoMongoose (funcion callback{
            gestion de la respuestas
        })
    })
*/