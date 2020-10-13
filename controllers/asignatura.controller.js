var mongoose = require('mongoose');
var Request = require("request");
const Asignatura = require('../models/asignatura.model');
const Previa = require('../models/previa.model');
const Horario = require('../models/horario.model');
const Evaluacion = require('../models/evaluacion.model');
const Parcial = require('../models/parcial.model');
const Examen = require('../models/examen.model');
const Laboratorio = require('../models/laboratorio.model');

exports.asignatura_nueva = function (req, res) {

          var asignatura = new Asignatura(
            {
              _id: new mongoose.Types.ObjectId(),
              codigo: req.body.codigo,
              nombre: req.body.nombre,
              creditos: req.body.creditos,
              programa: req.body.programa,
              apruebaPor: req.body.apruebaPor,
              nombreDoc: req.body.nombreDoc,
              correoDoc: req.body.correoDoc,
              fechaInscripcion: req.body.fechaInscripcion
            }
        );

        asignatura.save(function (err) {
            if (err) {
                console.log(err);
                res.json({data:'Error'});
            }
        res.json({data:'Asignatura agregada con éxito'});

        })
};

exports.asignatura_nuevaPrevia = function (req, res) {

        Asignatura.findById(req.body.idAsigPrevia, function (err, asig) {
          if (err) {
            console.log(err);
                res.json({data:'Error la asignatura previa no existe'});
          }

          var previa = new Previa(
              {
                _id: new mongoose.Types.ObjectId(),
                tipo: req.body.tipo,
                asignatura: asig
              }
          );

          previa.save(function (err) {
              if (err) {
                  console.log(err);
                  res.json({data:'Error'});
              }

                Asignatura.findOneAndUpdate(
                 { _id: req.body.idAsig },
                 { $push: { previas: previa  } },
                 function (error, success) {
                       if (error) {
                          console.log(error);
                          res.json({data:'Error asig'});
                       }
                 res.json({data:'Previa agregado con éxito'});
              });
           })
        })
};

exports.asignatura_deletePrevia = function (req, res) {

  Previa.findById(req.body.id, function (err, prev) {
      if (err) {
        console.log(err);
            res.json({data:'Error la previa no existe'});
      }
    Asignatura.findById(req.body.idAsig, function (err, asig) {
      if (err) {
        console.log(err);
            res.json({data:'Error la asignatura no existe'});
      }
            asig.previas.pull({ _id: prev._id });
        Asignatura.findByIdAndUpdate(asig._id,{previas: asig.previas},function(err,asignatura){
          if(err){
              console.log(err);
              res.json({data:'Error al eliminar la previa'});
          }
          Previa.findByIdAndRemove(req.body.id,function(err,pdel){
            if(err){
                console.log(err);
                res.json({data:'Error la previa no existe'});
            }
            res.json({data:'Previa eliminada con exito'});
        })
      })
    })
  })
};

exports.asignatura_nuevoHorario = function (req, res) {

          Asignatura.findById(req.body.idAsig, function (err, asig) {
          if (err) {
            console.log(err);
                res.json({data:'Error la asignatura no existe'});
          }

          var horario = new Horario(
            {
              _id: new mongoose.Types.ObjectId(),
              semestre: req.body.semestre,
              dia: req.body.dia,
              horaDesde: req.body.horaDesde,
              horaHasta: req.body.horaHasta,
              asignatura: asig
            }
          );
            horario.save(function (err) {
            if (err) {
                console.log(err);
                res.json({data:'Error'});
            }

            Asignatura.findOneAndUpdate(
             { _id: req.body.idAsig },
             { $push: { horarios: horario  } },
            function (error, success) {
                  if (error) {
                      console.log(error);
                      res.json({data:'Error asig'});
                  }
            res.json({data:'Horario agregado con éxito'});
          });
         })
        })
};

exports.asignatura_updateHorario = function (req, res) {

  Horario.findByIdAndUpdate(req.body.id,{semestre: req.body.semestre, dia: req.body.dia, horaDesde: req.body.horaDesde, horaHasta: req.body.horaHasta},function(err,horario){
      if(err){
          console.log(err);
          res.json({data:'Error al modificar el horario'});
      }
      Horario.findById(req.body.id, function (err, hora) {
          if (err) {
          	console.log(err);
  	            res.json({data:'Error el horario no existe'});
          }
          res.json({data:'Horario modificado con exito', horario: hora});
      })
  })
};

exports.asignatura_deleteHorario = function (req, res) {

  Horario.findById(req.body.id, function (err, hora) {
      if (err) {
        console.log(err);
            res.json({data:'Error el horario no existe'});
      }
    Asignatura.findById(hora.asignatura._id, function (err, asig) {
      if (err) {
        console.log(err);
            res.json({data:'Error la asignatura no existe'});
      }
            asig.horarios.pull({ _id: hora._id });
        Asignatura.findByIdAndUpdate(asig._id,{horarios: asig.horarios},function(err,asignatura){
          if(err){
              console.log(err);
              res.json({data:'Error al eliminar el horario'});
          }
        Horario.findByIdAndRemove(req.body.id,function(err,hdel){
            if(err){
                console.log(err);
                res.json({data:'Error el horario no existe'});
            }
            res.json({data:'Horario eliminado con exito'});
        })
      })
    })
  })
};

exports.asignatura_deleteEvaluacion = function (req, res) {

  Evaluacion.findById(req.body.id, function (err, ev) {
      if (err) {
        console.log(err);
            res.json({data:'Error la evaluacion no existe'});
      }
    Asignatura.findById(ev.asignatura._id, function (err, asig) {
      if (err) {
        console.log(err);
            res.json({data:'Error la asignatura no existe'});
      }
            asig.evaluaciones.pull({ _id: ev._id });
        Asignatura.findByIdAndUpdate(asig._id,{evaluaciones: asig.evaluaciones},function(err,asignatura){
          if(err){
              console.log(err);
              res.json({data:'Error al eliminar la evaluacion'});
          }
          if (req.body.tipo == "Parcial") {
            Parcial.findByIdAndRemove(ev.parcial._id,function(err,edel){
                if(err){
                    console.log(err);
                    res.json({data:'Error la evaluacion no existe'});
                }
            })
          }else if (req.body.tipo == "Examen") {
            Examen.findByIdAndRemove(ev.examen._id,function(err,edel){
                if(err){
                    console.log(err);
                    res.json({data:'Error la evaluacion no existe'});
                }
            })
          }else {
            Laboratorio.findByIdAndRemove(ev.laboratorio._id,function(err,edel){
                if(err){
                    console.log(err);
                    res.json({data:'Error la evaluacion no existe'});
                }
            })
          }
        Evaluacion.findByIdAndRemove(req.body.id,function(err,edel){
            if(err){
                console.log(err);
                res.json({data:'Error la evaluacion no existe'});
            }
            res.json({data:'Evaluacion eliminada con exito'});
        })
      })
    })
  })
};

exports.asignatura_nuevaEvaluacion = function (req, res) {

        Asignatura.findById(req.body.idAsig, function (err, asig) {
        if (err) {
          console.log(err);
              res.json({data:'Error la asignatura no existe'});
        }
          if (req.body.tipo == "Parcial") {
            var parcial = new Parcial(
                {
                  _id: new mongoose.Types.ObjectId()
                }
            );

            parcial.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json({data:'Error'});
                }

                var evaluacion = new Evaluacion(
                    {
                      _id: new mongoose.Types.ObjectId(),
                      nombre: req.body.nombre,
                      fecha: req.body.fecha,
                      tipo: req.body.tipo,
                      asignatura: asig,
                      parcial: parcial
                    }
                );
                evaluacion.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.json({data:'Error ev'});
                    }
                    Asignatura.findOneAndUpdate(
                     { _id: req.body.idAsig },
                     { $push: { evaluaciones: evaluacion  } },
                    function (error, success) {
                          if (error) {
                              console.log(error);
                              res.json({data:'Error asig'});
                          }
                    res.json({data:'Evaluacion agregada con éxito'});
                  });
                })
            })
          }else if (req.body.tipo == "Examen") {
            var examen = new Examen(
                {
                  _id: new mongoose.Types.ObjectId()
                }
            );

            examen.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json({data:'Error'});
                }

                var evaluacion = new Evaluacion(
                    {
                      _id: new mongoose.Types.ObjectId(),
                      nombre: req.body.nombre,
                      fecha: req.body.fecha,
                      tipo: req.body.tipo,
                      asignatura: asig,
                      examen: examen
                    }
                );
                evaluacion.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.json({data:'Error ev'});
                    }
                    Asignatura.findOneAndUpdate(
                     { _id: req.body.idAsig },
                     { $push: { evaluaciones: evaluacion  } },
                    function (error, success) {
                          if (error) {
                              console.log(error);
                              res.json({data:'Error asig'});
                          }
                    res.json({data:'Evaluacion agregada con éxito'});
                    });
                  })
            })
          }else {
            var laboratorio = new Laboratorio(
                {
                  _id: new mongoose.Types.ObjectId(),
                  fechaEntrega: req.body.fechaEntrega,
                  fechaDefensa: req.body.fechaDefensa
                }
            );

            laboratorio.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json({data:'Error'});
                }

                var evaluacion = new Evaluacion(
                    {
                      _id: new mongoose.Types.ObjectId(),
                      nombre: req.body.nombre,
                      fecha: req.body.fecha,
                      tipo: req.body.tipo,
                      asignatura: asig,
                      laboratorio: laboratorio
                    }
                );
                evaluacion.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.json({data:'Error ev'});
                    }
                    Asignatura.findOneAndUpdate(
                     { _id: req.body.idAsig },
                     { $push: { evaluaciones: evaluacion  } },
                    function (error, success) {
                          if (error) {
                              console.log(error);
                              res.json({data:'Error asig'});
                          }
                    res.json({data:'Evaluacion agregada con éxito'});
                    });
                  })
            })
          }
        })
};

exports.asignatura_detalleEvaluacion = function (req, res) {

    Evaluacion.findById(req.body.id, function (err, ev) {
        if (err) {
        	console.log(err);
	            res.json({data:'Error la evaluacion no existe'});
        }
        res.json({evaluacion: ev});
    })
};

exports.asignatura_listado = function (req, res) {

    Asignatura.find({}, function(err, asigs) {
      if (err) {
        console.log(err);
            res.json({data:'Error no hay asignaturas'});
      }
         res.json({data:asigs});
      });
};

exports.asignatura_update = function (req, res) {

  Asignatura.findByIdAndUpdate(req.body.id,{codigo: req.body.codigo, nombre: req.body.nombre, creditos: req.body.creditos,
                                            programa: req.body.programa, apruebaPor: req.body.apruebaPor, nombreDoc: req.body.nombreDoc,
                                            correoDoc: req.body.correoDoc, fechaInscripcion: req.body.fechaInscripcion},function(err,asignatura){
      if(err){
          console.log(err);
          res.json({data:'Error al modificar la asignatura'});
      }
      Asignatura.findById(req.body.id, function (err, asig) {
          if (err) {
          	console.log(err);
  	            res.json({data:'Error la asignatura no existe'});
          }
          res.json({data:'Asignatura modificada con exito', asignatura: asig});
      })
  })
};

exports.asignatura_details = function (req, res) {

    Asignatura.findById(req.body.id, function (err, asig) {
        if (err) {
        	console.log(err);
	            res.json({data:'Error la asignatura no existe'});
        }
        res.json({asignatura: asig});
    })
};

exports.asignatura_detalleHorario = function (req, res) {

    Horario.findById(req.body.id, function (err, hor) {
        if (err) {
        	console.log(err);
	            res.json({data:'Error el horario no existe'});
        }
        res.json({horario: hor});
    })
};

exports.asignatura_delete = function(req,res){
    Asignatura.findByIdAndRemove(req.body.id,function(err,asig){
        if(err){
            console.log(err);
            res.json({data:'Error la asignatura no existe'});
        }
        res.json({data:'Asignatura eliminada con exito'});
    })
};
