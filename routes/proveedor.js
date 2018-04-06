var express = require('express');
var mongoose = require('mongoose');

var Proveedor = require('../models/proveedor.js');

var app = express();

app.get('/', (req, res, next) => {

    Proveedor.find({}).exec((err, proveedores)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso en base de datos',
                errores: err
            })
        }
        res.status(200).json(proveedores);
        // res.status(200).json({
        //     ok: true,
        //     proveedores: proveedores
        // })
    });
});

app.post('/', (req, res)=>{

    var body = req.body;

    var proveedor = new Proveedor({
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

    proveedor.save((err, proveedorGuardado)=>{  //por una parte te manda el error y por otra el objeto que guarda
        //Con esos dos parámetros creamos una lógica para gestionarlo
        if(err) {
            return res.status(400).json({
                //metemos aquí dentro un objeto
                ok: false,
                mensaje: 'Error al crear el proveedor',
                errores: err //esto es para que nos mande los errores
            })
        }
        //en caso de que no haya error hace esto
        res.status(200).json({
            ok: true,
            //aquí podemos devolver el mismo objeto que ha creado
            proveedor: proveedorGuardado,
        })
    });
});

app.put('/:id', function(req, res, next){

    Proveedor.findByIdAndUpdate(req.params.id, req.body, function(err, datos){ //(hace una búsqueda en la base de datos, con qué lo quiero actualizar, la función )
        if(err) return next(err);
        res.status(201).json({
            ok: true,
            mensaje: 'Proveedor actualizado'
        });
    });

});

app.delete('/:id', function(req, res, error){

    Proveedor.findByIdAndRemove(req.params.id, function(err, datos){
        if(err) return next(err);
        //Para que nos salga el nombre el proveedor al eliminarlo
        var mensaje = 'Proveedor ' + datos.nombre + ' eliminado'
        res.status(200).json({
            ok: true,
            mensaje: mensaje
        });    
    });

});

module.exports = app;