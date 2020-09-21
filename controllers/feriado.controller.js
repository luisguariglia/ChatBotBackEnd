var mongoose = require('mongoose');
var Request = require("request");
const Feriado = require('../models/feriado.model');

exports.feriado_nuevo = function (req, res) {

          var feriado = new Feriado(
            {
              _id: new mongoose.Types.ObjectId(),
              fecha: req.body.fecha,
              motivo: req.body.motivo
            }
        );

        feriado.save(function (err) {
            if (err) {
                console.log(err);
                res.send('Error');
            }
        res.send('Feriado agregado con éxito');

        })
};
