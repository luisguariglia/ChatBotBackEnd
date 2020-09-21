var mongoose = require('mongoose');
var Request = require("request");
const Usuario = require('../models/usuario.model');
const UsuarioAsignatura = require('../models/usuarioAsignatura.model');

exports.usuario_nuevo = function (req, res) {

          var usuario = new Usuario(
            {
              _id: new mongoose.Types.ObjectId(),
              cedula: req.body.cedula,
              nombre: req.body.nombre,
              contrasenia: req.body.contrasenia,
              apellido: req.body.apellido,
              admin: req.body.admin
            }
        );

        usuario.save(function (err) {
            if (err) {
                console.log(err);
                res.json({data:'Error'});
            }
        res.json({data:'Usuario agregado con éxito'});

        })
};

exports.usuarioAsignatura_nuevo = function (req, res) {

          var usuarioAsignatura = new UsuarioAsignatura(
            {
              _id: new mongoose.Types.ObjectId(),
              estado: req.body.estado
            }
        );

        usuarioAsignatura.save(function (err) {
            if (err) {
                console.log(err);
                res.json({data:'Error'});
            }
        res.json({data:'usuarioAsignatura agregado con éxito'});

        })
};
