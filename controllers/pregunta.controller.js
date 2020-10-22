var mongoose = require('mongoose');
var Request = require("request");
const Pregunta = require('../models/pregunta.model');
const Usuario = require('../models/usuario.model');
const UsuarioAsignatura = require('../models/usuarioAsignatura.model');
const Asignatura = require('../models/asignatura.model');
const Feriado = require('../models/feriado.model');

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
            res.json({Reply:'Error el usuario no existe'});
      }

    var suma = 0;
     for (const item of user.usuarioAsignaturas) {
       var myPromise = () => {
         return new Promise((resolve, reject) => {
             UsuarioAsignatura.findById(item._id).populate('asignatura').exec( function (err, uA) {
                  if (err) {
                    console.log(err);
                        res.json({Reply:'Error el usuario no existe'});
                  }
                  if (uA.estado == "Exonerada") {
                    resolve(uA.asignatura.creditos);
                  }else{
                    resolve(0);
                  }
              })

            });
        };
        suma += await myPromise();
      }
      res.json({Reply:'Tienes '+suma+' créditos obtenidos!'});
  })
};

exports.pregunta_FAQcal2 = async function (req, res) {
	Usuario.findById(req.body.id, async function (err, user) {
      if (err) {
        console.log(err);
            res.json({Reply:'Error el usuario no existe'});
      }

    var suma = 0;
     for (const item of user.usuarioAsignaturas) {
       var myPromise = () => {
         return new Promise((resolve, reject) => {
             UsuarioAsignatura.findById(item._id).populate('asignatura').exec( function (err, uA) {
                  if (err) {
                    console.log(err);
                        res.json({Reply:'Error el usuario no existe'});
                  }
                  if (uA.estado == "Exonerada") {
                    resolve(uA.asignatura.creditos);
                  }else{
                    resolve(0);
                  }
              })

            });
        };
        suma += await myPromise();
      }
      res.json({Reply:'La cantidad de creditos que le faltan para obtener el titulo es de: '+ (252-suma)});
  })
};

exports.pregunta_FAQcal3 = async function (req, res) {
	Usuario.findById(req.body.id, async function (err, user) {
      if (err) {
        console.log(err);
            res.json({Reply:'Error el usuario no existe'});
      }

    var cont = 0;
     for (const item of user.usuarioAsignaturas) {
       var myPromise = () => {
         return new Promise((resolve, reject) => {
             UsuarioAsignatura.findById(item._id).populate('asignatura').exec( function (err, uA) {
                  if (err) {
                    console.log(err);
                        res.json({Reply:'Error el usuario no existe'});
                  }
                  if (uA.estado == "Exonerada") {
                    if (uA.asignatura.codigo == "arq" || uA.asignatura.codigo == "so" || uA.asignatura.codigo == "red" ||
                        uA.asignatura.codigo == "pp" || uA.asignatura.codigo == "eda" || uA.asignatura.codigo == "pa" ||
                        uA.asignatura.codigo == "bd1" || uA.asignatura.codigo == "bd2" ) {
                        resolve(1);
                    }else {
                      resolve(0);
                    }
                  }else{
                    resolve(0);
                  }
              })
            });
        };
        cont += await myPromise();
      }
      if (cont == 8) {
        res.json({Reply:'Si, estás en condiciones de realizar la Pasantía Laboral'});
      }else{
        res.json({Reply:'No, no estás en condiciones de realizar la Pasantía Laboral'});
      }
  })
};


exports.pregunta_FAQcal4 = async function (req, res) {
	Usuario.findById(req.body.id, async function (err, user) {
      if (err) {
        console.log(err);
            res.json({Reply:'Error el usuario no existe'});
      }

    var cont = 0;
     for (const item of user.usuarioAsignaturas) {
       var myPromise = () => {
         return new Promise((resolve, reject) => {
             UsuarioAsignatura.findById(item._id).populate('asignatura').exec( function (err, uA) {
                  if (err) {
                    console.log(err);
                        res.json({Reply:'Error el usuario no existe'});
                  }
                  if (uA.estado == "Exonerada") {
                    if (uA.asignatura.codigo == "arq" || uA.asignatura.codigo == "so" || uA.asignatura.codigo == "adm1" ||
                        uA.asignatura.codigo == "red" || uA.asignatura.codigo == "ingsof" || uA.asignatura.codigo == "mdl1" ||
                        uA.asignatura.codigo == "mdl2" || uA.asignatura.codigo == "pp" || uA.asignatura.codigo == "eda" ||
                        uA.asignatura.codigo == "pa" || uA.asignatura.codigo == "progapl" || uA.asignatura.codigo == "bd1" ||
                        uA.asignatura.codigo == "bd2" ) {
                        resolve(1);
                    }else {
                      resolve(0);
                    }
                  }else{
                    resolve(0);
                  }
              })

            });
        };
        cont += await myPromise();
      }
      if (cont == 13) {
        res.json({Reply:'Si, estás en condiciones de realizar el Proyecto Final'});
      }else{
        res.json({Reply:'No, no estás en condiciones de realizar el Proyecto Final'});
      }
  })
};

exports.pregunta_FAQcal5 = async function (req, res) {

    var f = new Date();

    Feriado.find({}, async function(err, feriado) {
      if (err) {
        console.log(err);
            res.json({Reply:'Error no hay feriados'});
    }
    var dev = "";
    var cont = 0;
     for (const fec of feriado) {
       var myPromise = () => {
         return new Promise((resolve, reject) => {

           if (fec.fecha.getDate() + "/" + (fec.fecha.getMonth() +1) == (f.getDate() +1) + "/" + (f.getMonth() +1)) {
             resolve(fec.motivo);
             cont += 1;
           }else{
             resolve("");
           }
         })
       };
        dev += await myPromise();
      }
      if (cont == 1) {
        res.json({Reply:'Mañana no hay clases debido al feriado de: '+dev});
      }else{
        res.json({Reply:'Mañana hay clases!'});
      }
  })
};

exports.pregunta_FAQcal7 = async function (req, res) {

    var f = new Date();

    Feriado.find({}, async function(err, feriado) {
      if (err) {
        console.log(err);
            res.json({Reply:'Error no hay feriados'});
    }
    var dev = "";
    var cont = 0;
     for (const fec of feriado) {
       var myPromise = () => {
         return new Promise((resolve, reject) => {

           if (fec.fecha.getDate() + "/" + (fec.fecha.getMonth() +1) == f.getDate() + "/" + (f.getMonth() +1)) {
             resolve(fec.motivo);
             cont += 1;
           }else{
             resolve("");
           }
         })
       };
        dev += await myPromise();
      }
      if (cont == 1) {
        res.json({Reply:'Hoy no hay clases debido al feriado de: '+dev});
      }else{
        res.json({Reply:'Hoy hay clases!'});
      }
  })
};
