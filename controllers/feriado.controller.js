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
                res.json({data:'Error'});
            }
        res.json({data:'Feriado agregado con éxito'});

        })
};

/*
var f = new Date();
document.write(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
*/
