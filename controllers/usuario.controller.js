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
                res.send('Error');
            }
        res.send('Usuario agregado con éxito');

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
                res.send('Error');
            }
        res.send('usuarioAsignatura agregado con éxito');

        })
};
