var express = require('express');
var mongoose = require('mongoose');

var Articulo = require('../models/articulo.js');

var app = express();

app.get('/', (req, res, next) => {

    Articulo.find({}).exec((err, articulos)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso en base de datos',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            articulos: articulos
        })
    });
});

app.get('/:id', function(req, res, next){
    
    Articulo.findById(req.params.id, (err, articulo)=>{  
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso a la base de datos',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            articulo: articulo
        })
    })  
});

app.post('/', (req, res)=>{

    var body = req.body;

    var articulo = new Articulo({
        referencia: body.referencia, //esto es parecido a lo de los formularios de angular
        precio: body.precio
    })

    articulo.save((err, articuloGuardado)=>{  
        if(err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el cliente',
                errores: err 
            })
        }
        res.status(200).json({
            ok: true
        })
    });
});

app.put('/:id', function(req, res, next){

    Articulo.findByIdAndUpdate(req.params.id, req.body, function(err, datos){ //(hace una búsqueda en la base de datos, con qué lo quiero actualizar, la función )
        if(err) return next(err);
        res.status(201).json({
            ok: true,
            mensaje: 'Artículo actualizado'
        });
    });

});

app.delete('/:id', function(req, res, error){

    Articulo.findByIdAndRemove(req.params.id, function(err, datos){
        if(err) return next(err);
        var mensaje = 'Artículo eliminado'
        res.status(200).json({
            ok: 'true',
            mensaje: mensaje
        });    
    });
});

module.exports = app;