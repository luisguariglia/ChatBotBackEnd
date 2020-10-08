var mongoose = require('mongoose');
var Request = require("request");
const Pregunta = require('../models/pregunta.model');
const Usuario = require('../models/usuario.model');
const UsuarioAsignatura = require('../models/usuarioAsignatura.model');
const Asignatura = require('../models/asignatura.model');

exports.pregunta_nueva = function (req, res) {

          var pregunta = new Pregunta(
            {
              _id: new mongoose.Types.ObjectId(),
              pregunta: req.body.pregunta,
              respuesta: req.body.respuesta
            }
        );

        pregunta.save(function (err) {
            if (err) {
                console.log(err);
                res.json({data:"Error"});
            }
        res.json({data:"Pregunta agregada con éxito"});
        })
};

exports.pregunta_listado = function (req, res) {

    Pregunta.find({}, function(err, preguntas) {
      if (err) {
        console.log(err);
            res.json({data:'Error no hay preguntas'});
      }
         res.json({data:preguntas});
      });
};

exports.pregunta_FAQcal1 = async function (req, res) {
	Usuario.findById(req.body.id, async function (err, user) {
      if (err) {
        console.log(err);
            res.json({data:'Error el usuario no existe'});
      }

    var suma = 0;
     for (const item of user.usuarioAsignaturas) {
       var myPromise = () => {
         return new Promise((resolve, reject) => {
             UsuarioAsignatura.findById(item._id).populate('asignatura').exec( function (err, uA) {
                  if (err) {
                    console.log(err);
                        res.json({data:'Error el usuario no existe'});
                  }
                  resolve(uA.asignatura.creditos);
              })

            });
        };
        suma += await myPromise();
      }
      res.json({data:'La cantidad de creditos que ha obtenido es de: '+suma});
  })
};

exports.pregunta_FAQcal2 = async function (req, res) {
	Usuario.findById(req.body.id, async function (err, user) {
      if (err) {
        console.log(err);
            res.json({data:'Error el usuario no existe'});
      }

    var suma = 0;
     for (const item of user.usuarioAsignaturas) {
       var myPromise = () => {
         return new Promise((resolve, reject) => {
             UsuarioAsignatura.findById(item._id).populate('asignatura').exec( function (err, uA) {
                  if (err) {
                    console.log(err);
                        res.json({data:'Error el usuario no existe'});
                  }
                  resolve(uA.asignatura.creditos);
              })

            });
        };
        suma += await myPromise();
      }
      res.json({data:'La cantidad de creditos que le faltan para obtener el titulo es de: '+ (252-suma)});
  })
};
