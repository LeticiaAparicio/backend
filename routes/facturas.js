var express = require('express');
var mongoose = require('mongoose');

var Facturas = require('../models/facturas.js');

var app = express();

app.get('/', (req, res, next) => {

    Facturas.find({}).exec((err, facturas)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso en base de datos',
                errores: err
            })
        }
        // res.status(200).json(facturas);
        res.status(200).json({
            ok: true,
            facturas: facturas
        })
    });
});

app.get('/:id', function(req, res, next){
    Facturas.findById(req.params.id, (err, factura)=>{  //el método de mongoose de findById, busca el id
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso a la base de datos',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            factura: factura
        })
    })  
});


app.post('/', (req, res)=>{

    var body = req.body;

    var facturas = new Facturas({
        proveedor: body.proveedor, 
        cif: body.cif,
        fecha: body.fecha,
        concepto: body.concepto,
        base: body.base,
        retencion: body.retencion,
        tipo: body.tipo,
        irpf: body.irpf,
        importe: body.importe,
        total: body.total
    })

    facturas.save((err, facturaGuardada)=>{  
        if(err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la factura',
                errores: err 
            })
        }
        res.status(200).json({
            ok: true,
            facturas: facturaGuardada
        })
    });
});

app.put('/:id', function(req, res, next){

    Facturas.findByIdAndUpdate(req.params.id, req.body, function(err, datos){ 
        if(err) return next(err);
        res.status(201).json({
            ok: true,
            mensaje: 'Factura actualizada'
        });
    });
});

app.delete('/:id', function(req, res, error){

    Facturas.findByIdAndRemove(req.params.id, function(err, datos){
        if(err) return next(err);
        var mensaje = 'Factura eliminada'
        res.status(200).json({
            ok: true,
            mensaje: mensaje
        });    
    });

});

module.exports = app;