var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var Request = require("request");
const Usuario = require('../models/usuario.model');
const UsuarioAsignatura = require('../models/usuarioAsignatura.model');

exports.usuario_nuevo = function (req, res) {

          var usuario = new Usuario(
            {
              _id: new mongoose.Types.ObjectId(),
              cedula: req.body.cedula,
              nombre: req.body.nombre,
              contrasenia: bcrypt.hashSync(req.body.contrasenia, 10),
              apellido: req.body.apellido,
              admin:req.body.admin
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

exports.login = function (req, res) {

        Usuario.findOne({ cedula: req.body.cedula}, (erro, usuarioDB)=>{
              if (erro) {
               return res.status(500).json({
                  ok: false,
                  err: erro
               })
            }
        // Verifica que exista un usuario con el mail escrita por el usuario.
           if (!usuarioDB) {
              return res.json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
             })
           }
        // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
        bcrypt.compare(req.body.contrasenia, usuarioDB.contrasenia).then(function(result) {
          if(result){
            let token = jwt.sign({
                   usuario: usuarioDB,
                }, process.env.SEED_AUTENTICACION, {
                expiresIn: process.env.CADUCIDAD_TOKEN
            })
         // res.json({data:'Error no hay usuarios'});
          return res.json({
             ok: true,
             usuario: usuarioDB,
             token,
          });
        }else {
            return res.json({
               ok: false,
               err: {
                 message: "Usuario o contraseña incorrectos"
               }
            });
          }
        });
      })
};

exports.usuario_listado = function (req, res) {

    Usuario.find({}, function(err, users) {
      if (err) {
        console.log(err);
            res.json({data:'Error no hay usuarios'});
      }
         res.json({data:users});
      });
};
