var express = require('express');
var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor');
var facturas = require('./routes/facturas');
var usuario = require('./routes/usuario');
var login = require('./routes/login');
var clientes = require('./routes/clientes.js');
var sesiones = require('./routes/sesiones');
var presupuesto = require('./routes/presupuesto');
var articulo = require('./routes/articulo');

var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// mongoose.connect('mongodb://localhost:27101,localhost:27102,localhost:27103/erp?replicaSet=clusterserv', {promiseLibrary: require('bluebird')}) //este es el puerto del servidor de mongo
mongoose.connect('mongodb://localhost:27017/erp', {promiseLibrary: require('bluebird')}) //este es el puerto del servidor de mongo    
.then(()=>{
        console.log('Conectado a la DB')
    })
    .catch((err)=>{
        console.error(err);
    })

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    next(); //te permite ejecutar el código que hay debajo, si no lo bloquea
});

//para poder leer los json
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use('/proveedor', proveedor);
app.use('/facturas', facturas);
app.use('/usuario', usuario);
app.use('/login', login);
app.use('/clientes', clientes);
app.use('/sesiones', sesiones);
app.use('/presupuesto', presupuesto);
app.use('/articulo', articulo);


app.listen(3000, function(){
    console.log('Servidor ok en puerto 3000')
})
