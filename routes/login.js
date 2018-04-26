var express = require('express');
var bcryptjs = require('bcryptjs');
var jsonwebtoken = require('jsonwebtoken');

var Usuario = require('../models/usuario');

var app = express();

app.post('/', (req, res, next)=>{

    var body = req.body;

    Usuario.findOne({email: body.email}, (err, datos)=>{ //findOne solo busca un objeto por una característica, en este caso por lo que nos viene en el mensaje
                                                   //hace una consulta en la colección usuarios y busca el objeto que tenga ese correo electrónico
        if(err) {
            return res.status(500).json({ //este es el error del servidor de base de datos
                ok: false,
                mensaje: 'Error de conexión',
                errores: err
            })
        }
        if(!datos){  //en el caso de que datos no exista, vamos a devolver un error
            return res.status(400).json({
                ok: false,
                mensaje: 'El correo electrónico no existe.',
                errores: err
            })
        }
        if(!bcryptjs.compareSync(body.password, datos.password)){ //El segúndo parametro del metodo compareSync es la contraseña de la base de datos
            return res.status(400).json({
                ok: false,
                mensaje: 'La contraseña no es correcta.',
                errores: err
            })
        }

        var token = jsonwebtoken.sign({usuario:datos}, 'hghjgersweio', {expiresIn: 60})

        res.status(200).json({
            ok: true,
            // mensaje: 'Bienvenido'
            token: token,
            nombre: datos.nombre,
            rol: datos.rol
        })
    })  
})

module.exports = app;