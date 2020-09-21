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
              codigo: req.body.cedula,
              nombre: req.body.nombre,
              creditos: req.body.creditos,
              programa: req.body.programa,
              apruebaPor: req.body.apruebaPor,
              nombreDoc: req.body.nombreDoc,
              correoDoc: req.body.correoDoc,
              fechaInscripción: req.body.fechaInscripción
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

          var previa = new Previa(
            {
              _id: new mongoose.Types.ObjectId(),
              tipo: req.body.tipo
            }
        );

        previa.save(function (err) {
            if (err) {
                console.log(err);
                res.json({data:'Error'});
            }
        res.json({data:'Previa agregada con éxito'});

        })
};

exports.asignatura_nuevoHorario = function (req, res) {

          var horario = new Horario(
            {
              _id: new mongoose.Types.ObjectId(),
              semestre: req.body.semestre,
              dia: req.body.dia,
              horaDesde: req.body.horaDesde,
              horaHasta: req.body.horaHasta,
            }
        );

        horario.save(function (err) {
            if (err) {
                console.log(err);
                res.json({data:'Error'});
            }
        res.json({data:'Horario agregado con éxito'});

        })
};

exports.asignatura_nuevaEvaluacion = function (req, res) {

          var evaluacion = new Evaluacion(
            {
              _id: new mongoose.Types.ObjectId(),
              nombre: req.body.nombre,
              fecha: req.body.fecha
            }
        );

        evaluacion.save(function (err) {
            if (err) {
                console.log(err);
                res.json({data:'Error'});
            }
        res.json({data:'Evaluacion agregada con éxito'});

        })
};

exports.asignatura_nuevoParcial = function (req, res) {

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
        res.json({data:'Parcial agregado con éxito'});

        })
};

exports.asignatura_nuevoExamen = function (req, res) {

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
        res.json({data:'Examen agregado con éxito'});

        })
};

exports.asignatura_nuevoLaboratorio = function (req, res) {

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
        res.json({data:'Laboratorio agregado con éxito'});

        })
};
