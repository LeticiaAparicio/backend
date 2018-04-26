var express = require('express');
var bcryptjs = require('bcryptjs');

var Sesiones = require('../models/sesiones');

var app = express();

app.get('/', (req, res, next) => {

    Sesiones.find({}).exec((err, sesiones) => {
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
        logout: body.logout
    })
    sesiones.save((err, datos) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la sesion',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Sesion creada correctamente'
        })
    })
})

app.delete('/:id', function (req, res, error) {

    Sesiones.findByIdAndRemove(req.params.id, function (err, datos) {
        if (err) return next(err);
        //Para que nos salga el nombre el proveedor al eliminarlo
        var mensaje = 'Sesión ' + datos.nombre + ' eliminada'
        res.status(200).json({
            ok: true,
            mensaje: mensaje
        });
    });

});

module.exports = app;