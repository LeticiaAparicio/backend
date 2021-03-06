//Ponemos la librería de token porque vamos a utilizarla
var jsonwebtoken = require('jsonwebtoken');

exports.verificarToken = function(req, res, next){ 

    var token = req.query.token;

    jsonwebtoken.verify(token, 'hghjgersweio', (err, decoded)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'token incorrecto',
                errores: err
            })
        }
        req.usuario = decoded.usuario;
        next();
    })
}