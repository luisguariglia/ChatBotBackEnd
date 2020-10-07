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
               return res.json({
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

exports.usuario_update = function (req, res) {

  Usuario.findByIdAndUpdate(req.body.id,{cedula: req.body.cedula, nombre: req.body.nombre, apellido: req.body.apellido},function(err,usuario){
      if(err){
          console.log(err);
          res.json({data:'Error al modificar el usuario'});
      }
      Usuario.findById(req.body.id, function (err, user) {
          if (err) {
          	console.log(err);
  	            res.json({data:'Error el usuario no existe'});
          }
          res.json({data:'Usuario modificado con exito', usuario: user});
      })
  })
};

exports.usuario_details = function (req, res) {

    Usuario.findById(req.body.id, function (err, user) {
        if (err) {
        	console.log(err);
	            res.json({data:'Error el usuario no existe'});
        }
        res.json({usuario: user});
    })
};

exports.usuario_delete = function(req,res){
    Usuario.findByIdAndRemove(req.body.id,function(err,user){
        if(err){
            console.log(err);
            res.json({data:'Error el usuario no existe'});
        }
        res.json({data:'Usuario eliminado con exito'});
    })
};

exports.usuario_updatePassword = function (req, res) {

    Usuario.findById(req.body.id, function (err, user) {
        if (err) {
        	console.log(err);
	            res.json({data:'Error el usuario no existe'});
        }
        bcrypt.compare(req.body.actual, user.contrasenia).then(function(result) {
          if(result){
            Usuario.findByIdAndUpdate(req.body.id,{contrasenia: bcrypt.hashSync(req.body.contrasenia, 10)},function(err,usuario){
                if(err){
                    console.log(err);
                    res.json({data:'Error al modificar la contraseña'});
                }else{
                  res.json({data:'Contraseña actualizada con exito'});
                }
            })
          }else{
            res.json({data:'La contraseña actual es incorrecta'});
          }
        });
    })
};
