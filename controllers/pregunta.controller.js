var mongoose = require('mongoose');
var Request = require("request");
const Pregunta = require('../models/pregunta.model');


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
            res.send('Error no hay preguntas');
      }
         res.send(preguntas);
      });
};
